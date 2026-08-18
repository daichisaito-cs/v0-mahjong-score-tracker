-- 026: 本番データ修正 — 記録漏れの役満を追加
-- 齋藤大地の2026年8月8日(JST) 00:54 の三麻(136,000点 / +146.00pt)で大三元・字一色
-- game_id: 61340e7a-2adc-45b3-a6a0-5e033fc54451
UPDATE game_results
SET yakuman = ARRAY['大三元', '字一色']
WHERE id = '80a114d7-a87a-4862-90f8-b49bd2e1966a';
