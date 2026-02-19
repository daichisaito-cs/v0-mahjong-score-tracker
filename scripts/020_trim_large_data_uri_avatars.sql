-- Large data URI avatars can still bloat response payloads.
-- Keep reasonably small inline avatars and drop larger ones.

UPDATE public.profiles
SET avatar_url = NULL
WHERE avatar_url LIKE 'data:%'
  AND length(avatar_url) > 50000;
