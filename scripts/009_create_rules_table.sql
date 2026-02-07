-- ルールテーブルとRLSを作成

CREATE TABLE IF NOT EXISTS rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  game_type TEXT NOT NULL CHECK (game_type IN ('four_player', 'three_player')),
  starting_points INTEGER NOT NULL,
  return_points INTEGER NOT NULL,
  uma_first INTEGER NOT NULL,
  uma_second INTEGER NOT NULL,
  uma_third INTEGER NOT NULL,
  uma_fourth INTEGER,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (
    (game_type = 'four_player' AND uma_fourth IS NOT NULL) OR
    (game_type = 'three_player' AND uma_fourth IS NULL)
  )
);

CREATE INDEX IF NOT EXISTS rules_created_by_idx ON rules (created_by);

ALTER TABLE rules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "rules_select_authenticated" ON rules;
CREATE POLICY "rules_select_authenticated" ON rules
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "rules_insert_own" ON rules;
CREATE POLICY "rules_insert_own" ON rules
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

DROP POLICY IF EXISTS "rules_update_own" ON rules;
CREATE POLICY "rules_update_own" ON rules
  FOR UPDATE
  USING (auth.uid() = created_by);

DROP POLICY IF EXISTS "rules_delete_own" ON rules;
CREATE POLICY "rules_delete_own" ON rules
  FOR DELETE
  USING (auth.uid() = created_by);

-- updated_atの自動更新
CREATE OR REPLACE FUNCTION public.set_rules_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_rules_updated_at ON rules;
CREATE TRIGGER set_rules_updated_at
  BEFORE UPDATE ON rules
  FOR EACH ROW
  EXECUTE FUNCTION public.set_rules_updated_at();
