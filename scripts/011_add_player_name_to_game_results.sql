-- game_resultsにプレイヤー名を保持するカラムを追加
ALTER TABLE game_results
  ADD COLUMN IF NOT EXISTS player_name TEXT;
