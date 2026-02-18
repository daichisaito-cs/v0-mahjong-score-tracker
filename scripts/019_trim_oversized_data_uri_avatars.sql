-- Optional one-time cleanup:
-- Oversized data URI avatars can make profile joins extremely heavy.
-- This keeps small avatars and clears oversized payloads.

UPDATE public.profiles
SET avatar_url = NULL
WHERE avatar_url LIKE 'data:%'
  AND length(avatar_url) > 200000;
