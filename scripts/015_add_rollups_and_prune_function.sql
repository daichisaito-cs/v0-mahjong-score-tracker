-- ロールアップ（全期間集計）を保持し、作成者ごとに直近N対局だけを残すための仕組み

-- ================================
-- 1) ロールアップテーブル
-- ================================

CREATE TABLE IF NOT EXISTS public.user_game_rollups (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL CHECK (game_type IN ('four_player', 'three_player')),
  rolled_game_count INTEGER NOT NULL DEFAULT 0,
  rolled_total_points NUMERIC NOT NULL DEFAULT 0,
  rolled_rank1_count INTEGER NOT NULL DEFAULT 0,
  rolled_rank2_count INTEGER NOT NULL DEFAULT 0,
  rolled_rank3_count INTEGER NOT NULL DEFAULT 0,
  rolled_rank4_count INTEGER NOT NULL DEFAULT 0,
  rolled_best_raw_score INTEGER NULL,
  rolled_low_raw_score INTEGER NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, game_type)
);

CREATE TABLE IF NOT EXISTS public.league_user_game_rollups (
  league_id UUID NOT NULL REFERENCES public.leagues(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_type TEXT NOT NULL CHECK (game_type IN ('four_player', 'three_player')),
  rolled_game_count INTEGER NOT NULL DEFAULT 0,
  rolled_total_points NUMERIC NOT NULL DEFAULT 0,
  rolled_rank1_count INTEGER NOT NULL DEFAULT 0,
  rolled_rank2_count INTEGER NOT NULL DEFAULT 0,
  rolled_rank3_count INTEGER NOT NULL DEFAULT 0,
  rolled_rank4_count INTEGER NOT NULL DEFAULT 0,
  rolled_best_raw_score INTEGER NULL,
  rolled_low_raw_score INTEGER NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (league_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_user_game_rollups_user_id ON public.user_game_rollups (user_id);
CREATE INDEX IF NOT EXISTS idx_league_user_game_rollups_user_id ON public.league_user_game_rollups (user_id);
CREATE INDEX IF NOT EXISTS idx_games_created_by_recent ON public.games (created_by, played_at DESC, created_at DESC, id DESC);

ALTER TABLE public.user_game_rollups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.league_user_game_rollups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_game_rollups_select_authenticated" ON public.user_game_rollups;
CREATE POLICY "user_game_rollups_select_authenticated" ON public.user_game_rollups
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "league_user_game_rollups_select_authenticated" ON public.league_user_game_rollups;
CREATE POLICY "league_user_game_rollups_select_authenticated" ON public.league_user_game_rollups
  FOR SELECT
  TO authenticated
  USING (true);

-- ================================
-- 2) ロールアップ＆削除関数（作成者ごと）
-- ================================

CREATE OR REPLACE FUNCTION public.rollup_and_prune_games_for_user(p_keep INTEGER DEFAULT 30)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_purged_count INTEGER := 0;
  v_purge_ids UUID[];
BEGIN
  IF p_keep IS NULL OR p_keep < 0 THEN
    RAISE EXCEPTION 'p_keep must be >= 0';
  END IF;

  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'authentication required';
  END IF;

  -- 同一ユーザーの同時実行を直列化（xact lockなのでトランザクション終了で解放）
  PERFORM pg_advisory_xact_lock(hashtext(auth.uid()::text)::bigint);

  SELECT ARRAY_AGG(id)
  INTO v_purge_ids
  FROM (
    SELECT id
    FROM public.games
    WHERE created_by = auth.uid()
    ORDER BY played_at DESC, created_at DESC, id DESC
    OFFSET p_keep
  ) t;

  IF v_purge_ids IS NULL OR array_length(v_purge_ids, 1) IS NULL THEN
    RETURN 0;
  END IF;

  -- ユーザー全体のロールアップを更新
  INSERT INTO public.user_game_rollups (
    user_id,
    game_type,
    rolled_game_count,
    rolled_total_points,
    rolled_rank1_count,
    rolled_rank2_count,
    rolled_rank3_count,
    rolled_rank4_count,
    rolled_best_raw_score,
    rolled_low_raw_score,
    updated_at
  )
  SELECT
    gr.user_id,
    g.game_type,
    COUNT(*)::int AS rolled_game_count,
    COALESCE(SUM(gr.point), 0) AS rolled_total_points,
    SUM(CASE WHEN gr.rank = 1 THEN 1 ELSE 0 END)::int AS rolled_rank1_count,
    SUM(CASE WHEN gr.rank = 2 THEN 1 ELSE 0 END)::int AS rolled_rank2_count,
    SUM(CASE WHEN gr.rank = 3 THEN 1 ELSE 0 END)::int AS rolled_rank3_count,
    SUM(CASE WHEN gr.rank = 4 THEN 1 ELSE 0 END)::int AS rolled_rank4_count,
    MAX(gr.raw_score) AS rolled_best_raw_score,
    MIN(gr.raw_score) AS rolled_low_raw_score,
    NOW()
  FROM public.game_results gr
  JOIN public.games g ON g.id = gr.game_id
  WHERE g.id = ANY(v_purge_ids)
    AND gr.user_id IS NOT NULL
  GROUP BY gr.user_id, g.game_type
  ON CONFLICT (user_id, game_type) DO UPDATE SET
    rolled_game_count = public.user_game_rollups.rolled_game_count + EXCLUDED.rolled_game_count,
    rolled_total_points = public.user_game_rollups.rolled_total_points + EXCLUDED.rolled_total_points,
    rolled_rank1_count = public.user_game_rollups.rolled_rank1_count + EXCLUDED.rolled_rank1_count,
    rolled_rank2_count = public.user_game_rollups.rolled_rank2_count + EXCLUDED.rolled_rank2_count,
    rolled_rank3_count = public.user_game_rollups.rolled_rank3_count + EXCLUDED.rolled_rank3_count,
    rolled_rank4_count = public.user_game_rollups.rolled_rank4_count + EXCLUDED.rolled_rank4_count,
    rolled_best_raw_score = CASE
      WHEN public.user_game_rollups.rolled_best_raw_score IS NULL THEN EXCLUDED.rolled_best_raw_score
      WHEN EXCLUDED.rolled_best_raw_score IS NULL THEN public.user_game_rollups.rolled_best_raw_score
      ELSE GREATEST(public.user_game_rollups.rolled_best_raw_score, EXCLUDED.rolled_best_raw_score)
    END,
    rolled_low_raw_score = CASE
      WHEN public.user_game_rollups.rolled_low_raw_score IS NULL THEN EXCLUDED.rolled_low_raw_score
      WHEN EXCLUDED.rolled_low_raw_score IS NULL THEN public.user_game_rollups.rolled_low_raw_score
      ELSE LEAST(public.user_game_rollups.rolled_low_raw_score, EXCLUDED.rolled_low_raw_score)
    END,
    updated_at = NOW();

  -- リーグ内ロールアップを更新（リーグ対局のみ）
  INSERT INTO public.league_user_game_rollups (
    league_id,
    user_id,
    game_type,
    rolled_game_count,
    rolled_total_points,
    rolled_rank1_count,
    rolled_rank2_count,
    rolled_rank3_count,
    rolled_rank4_count,
    rolled_best_raw_score,
    rolled_low_raw_score,
    updated_at
  )
  SELECT
    g.league_id,
    gr.user_id,
    g.game_type,
    COUNT(*)::int AS rolled_game_count,
    COALESCE(SUM(gr.point), 0) AS rolled_total_points,
    SUM(CASE WHEN gr.rank = 1 THEN 1 ELSE 0 END)::int AS rolled_rank1_count,
    SUM(CASE WHEN gr.rank = 2 THEN 1 ELSE 0 END)::int AS rolled_rank2_count,
    SUM(CASE WHEN gr.rank = 3 THEN 1 ELSE 0 END)::int AS rolled_rank3_count,
    SUM(CASE WHEN gr.rank = 4 THEN 1 ELSE 0 END)::int AS rolled_rank4_count,
    MAX(gr.raw_score) AS rolled_best_raw_score,
    MIN(gr.raw_score) AS rolled_low_raw_score,
    NOW()
  FROM public.game_results gr
  JOIN public.games g ON g.id = gr.game_id
  WHERE g.id = ANY(v_purge_ids)
    AND g.league_id IS NOT NULL
    AND gr.user_id IS NOT NULL
  GROUP BY g.league_id, gr.user_id, g.game_type
  ON CONFLICT (league_id, user_id) DO UPDATE SET
    rolled_game_count = public.league_user_game_rollups.rolled_game_count + EXCLUDED.rolled_game_count,
    rolled_total_points = public.league_user_game_rollups.rolled_total_points + EXCLUDED.rolled_total_points,
    rolled_rank1_count = public.league_user_game_rollups.rolled_rank1_count + EXCLUDED.rolled_rank1_count,
    rolled_rank2_count = public.league_user_game_rollups.rolled_rank2_count + EXCLUDED.rolled_rank2_count,
    rolled_rank3_count = public.league_user_game_rollups.rolled_rank3_count + EXCLUDED.rolled_rank3_count,
    rolled_rank4_count = public.league_user_game_rollups.rolled_rank4_count + EXCLUDED.rolled_rank4_count,
    rolled_best_raw_score = CASE
      WHEN public.league_user_game_rollups.rolled_best_raw_score IS NULL THEN EXCLUDED.rolled_best_raw_score
      WHEN EXCLUDED.rolled_best_raw_score IS NULL THEN public.league_user_game_rollups.rolled_best_raw_score
      ELSE GREATEST(public.league_user_game_rollups.rolled_best_raw_score, EXCLUDED.rolled_best_raw_score)
    END,
    rolled_low_raw_score = CASE
      WHEN public.league_user_game_rollups.rolled_low_raw_score IS NULL THEN EXCLUDED.rolled_low_raw_score
      WHEN EXCLUDED.rolled_low_raw_score IS NULL THEN public.league_user_game_rollups.rolled_low_raw_score
      ELSE LEAST(public.league_user_game_rollups.rolled_low_raw_score, EXCLUDED.rolled_low_raw_score)
    END,
    game_type = EXCLUDED.game_type,
    updated_at = NOW();

  -- 最後に purge 対象の対局を削除（CASCADEで game_results も削除）
  DELETE FROM public.games
  WHERE id = ANY(v_purge_ids);

  GET DIAGNOSTICS v_purged_count = ROW_COUNT;
  RETURN v_purged_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.rollup_and_prune_games_for_user(INTEGER) TO authenticated;
