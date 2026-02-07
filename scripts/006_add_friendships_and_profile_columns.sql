-- profilesテーブルへ必要なカラムを追加し、フレンド機能用のテーブルとRLSを作成

-- ================================
-- 1. profilesにavatar_url / friend_codeを追加
-- ================================

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS friend_code TEXT;

-- フレンドコードを一意に生成するユーティリティ
CREATE OR REPLACE FUNCTION public.generate_friend_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  new_code TEXT;
BEGIN
  LOOP
    new_code := upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 8));
    EXIT WHEN NOT EXISTS (SELECT 1 FROM profiles WHERE friend_code = new_code);
  END LOOP;
  RETURN new_code;
END;
$$;

-- 既存ユーザーにコードを割り当て
UPDATE profiles
SET friend_code = generate_friend_code()
WHERE friend_code IS NULL;

-- 制約とデフォルトを設定
ALTER TABLE profiles
ALTER COLUMN friend_code SET DEFAULT generate_friend_code();

ALTER TABLE profiles
ALTER COLUMN friend_code SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_type = 'UNIQUE'
      AND table_schema = 'public'
      AND table_name = 'profiles'
      AND constraint_name = 'profiles_friend_code_key'
  ) THEN
    ALTER TABLE profiles
    ADD CONSTRAINT profiles_friend_code_key UNIQUE (friend_code);
  END IF;
END;
$$;

-- ================================
-- 2. friendshipsテーブルの作成
-- ================================

CREATE TABLE IF NOT EXISTS friendships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  addressee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (requester_id <> addressee_id)
);

-- 片方向と双方向の重複を防ぐ
CREATE UNIQUE INDEX IF NOT EXISTS friendships_requester_addressee_key
ON friendships (requester_id, addressee_id);

CREATE UNIQUE INDEX IF NOT EXISTS friendships_pair_unique_idx
ON friendships (LEAST(requester_id, addressee_id), GREATEST(requester_id, addressee_id));

CREATE INDEX IF NOT EXISTS friendships_requester_idx ON friendships (requester_id);
CREATE INDEX IF NOT EXISTS friendships_addressee_idx ON friendships (addressee_id);

-- updated_atを自動更新する共通トリガー
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_friendships_updated_at ON friendships;
CREATE TRIGGER set_friendships_updated_at
  BEFORE UPDATE ON friendships
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- ================================
-- 3. friendshipsのRLS
-- ================================

ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "friendships_select_participant" ON friendships;
CREATE POLICY "friendships_select_participant" ON friendships
  FOR SELECT
  USING (requester_id = auth.uid() OR addressee_id = auth.uid());

DROP POLICY IF EXISTS "friendships_insert_requester" ON friendships;
CREATE POLICY "friendships_insert_requester" ON friendships
  FOR INSERT
  WITH CHECK (requester_id = auth.uid());

DROP POLICY IF EXISTS "friendships_update_participant" ON friendships;
CREATE POLICY "friendships_update_participant" ON friendships
  FOR UPDATE
  USING (requester_id = auth.uid() OR addressee_id = auth.uid())
  WITH CHECK (requester_id = auth.uid() OR addressee_id = auth.uid());

DROP POLICY IF EXISTS "friendships_delete_participant" ON friendships;
CREATE POLICY "friendships_delete_participant" ON friendships
  FOR DELETE
  USING (requester_id = auth.uid() OR addressee_id = auth.uid());
