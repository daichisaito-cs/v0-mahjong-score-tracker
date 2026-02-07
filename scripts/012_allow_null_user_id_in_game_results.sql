-- 手動入力プレイヤーを保存できるように game_results.user_id を任意にする
ALTER TABLE game_results
  ALTER COLUMN user_id DROP NOT NULL;
