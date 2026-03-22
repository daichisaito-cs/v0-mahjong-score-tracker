-- 024: game_results に役満カラムを追加
-- yakuman は text[] 型で、役満名の配列を格納する（例: ARRAY['四暗刻'], ARRAY['国士無双', '字一色']）

ALTER TABLE game_results ADD COLUMN IF NOT EXISTS yakuman text[] DEFAULT NULL;

-- 本番データ: 齋藤大地の2026年3月21日(JST)の+64.30ポイントの試合で四暗刻
-- game_result id: 78b2e7ce-9590-4275-bc73-dc7a76a97e2d
UPDATE game_results
SET yakuman = ARRAY['四暗刻']
WHERE id = '78b2e7ce-9590-4275-bc73-dc7a76a97e2d';
