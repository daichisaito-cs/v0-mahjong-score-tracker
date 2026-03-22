-- 025: 対局に参加しているがleague_membersに未登録のユーザーをバックフィル
-- これにより、過去のリーグ対局参加者も正しくリーグメンバーとして登録される

INSERT INTO league_members (league_id, user_id)
SELECT DISTINCT g.league_id, gr.user_id
FROM game_results gr
JOIN games g ON g.id = gr.game_id
WHERE g.league_id IS NOT NULL
  AND gr.user_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1 FROM league_members lm
    WHERE lm.league_id = g.league_id AND lm.user_id = gr.user_id
  );
