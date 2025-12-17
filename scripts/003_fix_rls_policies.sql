-- 無限再帰を解消するためRLSポリシーを修正

-- 既存のポリシーを削除
DROP POLICY IF EXISTS "games_select_participant" ON games;
DROP POLICY IF EXISTS "game_results_select_participant" ON game_results;

-- gamesのSELECTポリシーを簡素化（game_resultsを参照しない）
-- 自分が作成した対局、または自分がリーグメンバーの対局を参照可能
CREATE POLICY "games_select_participant" ON games FOR SELECT USING (
  created_by = auth.uid() OR
  (league_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM league_members WHERE league_id = games.league_id AND user_id = auth.uid()
  )) OR
  (league_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM leagues WHERE id = games.league_id AND owner_id = auth.uid()
  ))
);

-- game_resultsのSELECTポリシーを簡素化（gamesを参照しない）
-- 自分の結果、または自分がゲーム作成者の結果を参照可能
-- SECURITY DEFINERの関数を使って安全にgamesを参照
CREATE OR REPLACE FUNCTION is_game_creator(game_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM games WHERE id = game_uuid AND created_by = auth.uid()
  );
$$;

CREATE POLICY "game_results_select_participant" ON game_results FOR SELECT USING (
  user_id = auth.uid() OR
  is_game_creator(game_id)
);
