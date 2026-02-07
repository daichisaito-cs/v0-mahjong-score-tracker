-- games を「対局参加者」も閲覧できるようにする
-- game_results を参照するが、SECURITY DEFINER 関数で RLS ループを回避

CREATE OR REPLACE FUNCTION is_game_participant(game_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM game_results
    WHERE game_id = game_uuid
      AND user_id = auth.uid()
  );
$$;

DROP POLICY IF EXISTS "games_select_participant" ON games;

CREATE POLICY "games_select_participant" ON games FOR SELECT USING (
  created_by = auth.uid() OR
  is_game_participant(id) OR
  (league_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM league_members WHERE league_id = games.league_id AND user_id = auth.uid()
  )) OR
  (league_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM leagues WHERE id = games.league_id AND owner_id = auth.uid()
  ))
);
