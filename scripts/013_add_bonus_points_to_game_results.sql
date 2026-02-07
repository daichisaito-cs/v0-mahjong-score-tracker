-- game_results に飛び賞（pt）を保持するカラムを追加
ALTER TABLE game_results
ADD COLUMN IF NOT EXISTS bonus_points numeric NOT NULL DEFAULT 0;
