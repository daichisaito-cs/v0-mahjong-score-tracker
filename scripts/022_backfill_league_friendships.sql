-- リーグメンバー同士のフレンド関係を一括作成するDB関数を追加
-- SECURITY DEFINER でRLSをバイパスし、クライアントからも全ペアを作成可能にする

CREATE OR REPLACE FUNCTION public.ensure_league_friendships(p_league_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO friendships (requester_id, addressee_id, status)
  SELECT DISTINCT
    LEAST(lm1.user_id, lm2.user_id),
    GREATEST(lm1.user_id, lm2.user_id),
    'accepted'
  FROM league_members lm1
  JOIN league_members lm2
    ON lm1.league_id = lm2.league_id
    AND lm1.user_id < lm2.user_id
  WHERE lm1.league_id = p_league_id
  ON CONFLICT DO NOTHING;
END;
$$;

-- 本番データ修復: 全リーグのメンバー同士のフレンド関係が欠落しているペアを補完
INSERT INTO public.friendships (requester_id, addressee_id, status)
SELECT DISTINCT
  LEAST(lm1.user_id, lm2.user_id),
  GREATEST(lm1.user_id, lm2.user_id),
  'accepted'
FROM public.league_members lm1
JOIN public.league_members lm2
  ON lm1.league_id = lm2.league_id
  AND lm1.user_id < lm2.user_id
ON CONFLICT DO NOTHING;
