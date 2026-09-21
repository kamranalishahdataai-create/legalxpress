
-- 1. Create private schema for internal helper functions
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO postgres, service_role;

-- 2. Recreate has_role in private schema
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO postgres, service_role;

-- 3. Recreate is_lawyer in private schema
CREATE OR REPLACE FUNCTION private.is_lawyer(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.lawyers
    WHERE user_id = _user_id AND is_active = true
  )
$$;
REVOKE ALL ON FUNCTION private.is_lawyer(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.is_lawyer(uuid) TO postgres, service_role;

-- 4. Rewrite every policy that referenced public.has_role / public.is_lawyer to use the private schema versions.
-- We rebuild referencing policies. Fetch and rewrite is done inline per policy.
DO $$
DECLARE
  r RECORD;
  new_qual TEXT;
  new_check TEXT;
  cmd TEXT;
BEGIN
  FOR r IN
    SELECT
      pol.polname,
      cls.relname AS tablename,
      nsp.nspname AS schemaname,
      pol.polcmd,
      pg_get_expr(pol.polqual, pol.polrelid)  AS qual,
      pg_get_expr(pol.polwithcheck, pol.polrelid) AS with_check,
      pol.polroles,
      pol.polpermissive
    FROM pg_policy pol
    JOIN pg_class cls ON cls.oid = pol.polrelid
    JOIN pg_namespace nsp ON nsp.oid = cls.relnamespace
    WHERE nsp.nspname = 'public'
      AND (
        pg_get_expr(pol.polqual, pol.polrelid) ~ 'has_role\s*\(|is_lawyer\s*\('
        OR pg_get_expr(pol.polwithcheck, pol.polrelid) ~ 'has_role\s*\(|is_lawyer\s*\('
      )
  LOOP
    new_qual  := regexp_replace(regexp_replace(coalesce(r.qual,''),  '(^|[^a-zA-Z_.])has_role\(', '\1private.has_role(', 'g'), '(^|[^a-zA-Z_.])is_lawyer\(', '\1private.is_lawyer(', 'g');
    new_check := regexp_replace(regexp_replace(coalesce(r.with_check,''), '(^|[^a-zA-Z_.])has_role\(', '\1private.has_role(', 'g'), '(^|[^a-zA-Z_.])is_lawyer\(', '\1private.is_lawyer(', 'g');

    EXECUTE format('DROP POLICY %I ON public.%I', r.polname, r.tablename);

    cmd := format('CREATE POLICY %I ON public.%I FOR %s',
      r.polname,
      r.tablename,
      CASE r.polcmd WHEN 'r' THEN 'SELECT' WHEN 'a' THEN 'INSERT' WHEN 'w' THEN 'UPDATE' WHEN 'd' THEN 'DELETE' ELSE 'ALL' END
    );

    IF r.polroles IS NOT NULL AND NOT (0 = ANY(r.polroles)) THEN
      cmd := cmd || ' TO ' || (
        SELECT string_agg(quote_ident(rolname), ', ')
        FROM pg_roles WHERE oid = ANY(r.polroles)
      );
    END IF;

    IF r.qual IS NOT NULL THEN
      cmd := cmd || ' USING (' || new_qual || ')';
    END IF;
    IF r.with_check IS NOT NULL THEN
      cmd := cmd || ' WITH CHECK (' || new_check || ')';
    END IF;

    EXECUTE cmd;
  END LOOP;
END $$;

-- 5. Drop old public helpers now that policies no longer depend on them
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP FUNCTION IF EXISTS public.is_lawyer(uuid);

-- 6. Lock down remaining trigger-only SECURITY DEFINER functions in public
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.decrement_subscriber_counter() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.decrement_subscriber_counter() TO postgres, service_role;

-- 7. chat_messages: remove NULL user_id loophole; require authenticated
DROP POLICY IF EXISTS "Users can view their own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create their own chat messages" ON public.chat_messages;

CREATE POLICY "Users can view their own messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages"
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Enforce non-null owner going forward so no orphaned/anon rows can be inserted
ALTER TABLE public.chat_messages ALTER COLUMN user_id SET NOT NULL;

REVOKE ALL ON TABLE public.chat_messages FROM anon;

-- 8. community_referrals: explicitly deny anon and lock down grants to only what policies need
REVOKE ALL ON TABLE public.community_referrals FROM anon;
GRANT INSERT ON TABLE public.community_referrals TO anon;   -- matches "Anyone can submit referrals" INSERT policy
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.community_referrals TO authenticated;
GRANT ALL ON TABLE public.community_referrals TO service_role;

-- 9. lawyer_referral_requests: explicitly deny anon SELECT/UPDATE/DELETE; allow only INSERT for public form
REVOKE ALL ON TABLE public.lawyer_referral_requests FROM anon;
GRANT INSERT ON TABLE public.lawyer_referral_requests TO anon;   -- matches "Anyone can submit referral requests" INSERT policy
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.lawyer_referral_requests TO authenticated;
GRANT ALL ON TABLE public.lawyer_referral_requests TO service_role;
