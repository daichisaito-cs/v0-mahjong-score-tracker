-- ペア打ち対応:
-- - game_results に席番号を追加
-- - point を小数2桁へ拡張
-- - 同順位を許容するため (game_id, rank) 一意制約を削除

ALTER TABLE game_results
  ADD COLUMN IF NOT EXISTS seat_index INTEGER;

WITH numbered AS (
  SELECT
    id,
    ROW_NUMBER() OVER (PARTITION BY game_id ORDER BY rank ASC, created_at ASC, id ASC) AS seat_idx
  FROM game_results
)
UPDATE game_results gr
SET seat_index = numbered.seat_idx
FROM numbered
WHERE gr.id = numbered.id
  AND gr.seat_index IS NULL;

ALTER TABLE game_results
  ALTER COLUMN seat_index SET NOT NULL;

ALTER TABLE game_results
  DROP CONSTRAINT IF EXISTS game_results_seat_index_check;

ALTER TABLE game_results
  ADD CONSTRAINT game_results_seat_index_check CHECK (seat_index >= 1);

ALTER TABLE game_results
  ALTER COLUMN point TYPE NUMERIC(10, 2);

ALTER TABLE game_results
  DROP CONSTRAINT IF EXISTS game_results_game_id_rank_key;
