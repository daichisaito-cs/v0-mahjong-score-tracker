-- Initial page loads were bottlenecked by common filters without dedicated indexes.
-- Add targeted indexes used by dashboard/games/leagues queries.

CREATE INDEX IF NOT EXISTS game_results_user_id_idx
ON public.game_results (user_id);

CREATE INDEX IF NOT EXISTS game_results_game_id_idx
ON public.game_results (game_id);

CREATE INDEX IF NOT EXISTS league_members_user_id_idx
ON public.league_members (user_id);

CREATE INDEX IF NOT EXISTS leagues_owner_id_idx
ON public.leagues (owner_id);

CREATE INDEX IF NOT EXISTS games_league_id_played_at_idx
ON public.games (league_id, played_at DESC);
