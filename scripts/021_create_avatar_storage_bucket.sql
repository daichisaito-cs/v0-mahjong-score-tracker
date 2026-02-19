-- Store profile avatars in Supabase Storage and keep avatar_url as lightweight URL.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  524288,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "avatars public read" ON storage.objects;
CREATE POLICY "avatars public read"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "avatars auth upload own folder" ON storage.objects;
CREATE POLICY "avatars auth upload own folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND split_part(name, '/', 1) = auth.uid()::text
);

DROP POLICY IF EXISTS "avatars auth update own folder" ON storage.objects;
CREATE POLICY "avatars auth update own folder"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND split_part(name, '/', 1) = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND split_part(name, '/', 1) = auth.uid()::text
);

DROP POLICY IF EXISTS "avatars auth delete own folder" ON storage.objects;
CREATE POLICY "avatars auth delete own folder"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'avatars'
  AND auth.role() = 'authenticated'
  AND split_part(name, '/', 1) = auth.uid()::text
);
