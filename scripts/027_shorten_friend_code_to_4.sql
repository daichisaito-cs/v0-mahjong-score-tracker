-- フレンドコードを8桁から4桁へ短縮する
-- 既存ユーザーは現在のコードの先頭4文字を引き継ぐ（衝突時のみ新規採番）

CREATE OR REPLACE FUNCTION public.generate_friend_code()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  new_code TEXT;
BEGIN
  LOOP
    new_code := upper(substr(encode(extensions.gen_random_bytes(4), 'hex'), 1, 4));
    EXIT WHEN NOT EXISTS (SELECT 1 FROM profiles WHERE friend_code = new_code);
  END LOOP;
  RETURN new_code;
END;
$$;

DO $$
DECLARE
  r RECORD;
  candidate TEXT;
BEGIN
  FOR r IN SELECT id, friend_code FROM profiles WHERE length(friend_code) > 4 LOOP
    candidate := upper(left(r.friend_code, 4));
    IF EXISTS (SELECT 1 FROM profiles WHERE friend_code = candidate AND id <> r.id) THEN
      candidate := public.generate_friend_code();
    END IF;
    UPDATE profiles SET friend_code = candidate WHERE id = r.id;
  END LOOP;
END;
$$;
