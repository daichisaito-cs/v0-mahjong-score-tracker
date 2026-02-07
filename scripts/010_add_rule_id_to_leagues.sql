-- leagues に rules 参照を追加
ALTER TABLE leagues
  ADD COLUMN IF NOT EXISTS rule_id UUID;

ALTER TABLE leagues
  ADD CONSTRAINT leagues_rule_id_fkey
  FOREIGN KEY (rule_id) REFERENCES rules(id) ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS leagues_rule_id_idx ON leagues (rule_id);
