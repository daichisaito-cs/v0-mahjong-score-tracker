-- games に対局作成時点のルールスナップショットを保存
-- これにより rules の更新/削除後も既存対局の計算根拠を保持できる
ALTER TABLE games
  ADD COLUMN IF NOT EXISTS applied_rule_id UUID REFERENCES rules(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS applied_rule_name TEXT,
  ADD COLUMN IF NOT EXISTS applied_starting_points INTEGER,
  ADD COLUMN IF NOT EXISTS applied_return_points INTEGER,
  ADD COLUMN IF NOT EXISTS applied_uma_first INTEGER,
  ADD COLUMN IF NOT EXISTS applied_uma_second INTEGER,
  ADD COLUMN IF NOT EXISTS applied_uma_third INTEGER,
  ADD COLUMN IF NOT EXISTS applied_uma_fourth INTEGER;

CREATE INDEX IF NOT EXISTS games_applied_rule_id_idx ON games (applied_rule_id);
