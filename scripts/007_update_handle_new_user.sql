-- 招待メール経由のフレンド追加に対応するため、handle_new_userを更新

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  inviter_text TEXT;
  inviter_uuid UUID;
BEGIN
  INSERT INTO public.profiles (id, display_name, email)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    new.email
  )
  ON CONFLICT (id) DO NOTHING;

  inviter_text := new.raw_user_meta_data ->> 'inviter_id';

  IF inviter_text IS NOT NULL THEN
    BEGIN
      inviter_uuid := inviter_text::uuid;
    EXCEPTION
      WHEN others THEN
        inviter_uuid := NULL;
    END;
  END IF;

  IF inviter_uuid IS NOT NULL THEN
    BEGIN
      IF EXISTS (SELECT 1 FROM public.profiles WHERE id = inviter_uuid) THEN
        INSERT INTO public.friendships (requester_id, addressee_id, status)
        VALUES (inviter_uuid, new.id, 'accepted')
        ON CONFLICT DO NOTHING;
      ELSE
        RAISE LOG 'handle_new_user: inviter profile missing (id=%)', inviter_uuid;
      END IF;
    EXCEPTION
      WHEN others THEN
        RAISE LOG 'handle_new_user: friendship insert failed: %', SQLERRM;
    END;
  END IF;

  RETURN new;
END;
$$;
