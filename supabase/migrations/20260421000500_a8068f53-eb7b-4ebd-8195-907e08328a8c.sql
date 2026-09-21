
-- 1. Lawyers: restrict sensitive PII columns from anonymous public access
DROP POLICY IF EXISTS "Anyone can view active lawyers" ON public.lawyers;

-- Public (anon + authenticated) can view active lawyers, but app should only select non-sensitive cols.
-- Create a public-safe view for anonymous browsing.
CREATE OR REPLACE VIEW public.lawyers_public AS
SELECT id, full_name, lso_number, practice_areas, bio, avatar_url, is_active, created_at
FROM public.lawyers
WHERE is_active = true;

GRANT SELECT ON public.lawyers_public TO anon, authenticated;

-- Only authenticated users can read full lawyer rows (including email/phone/calendar)
CREATE POLICY "Authenticated users can view active lawyers"
ON public.lawyers
FOR SELECT
TO authenticated
USING (is_active = true);

-- 2. case_analyses: remove anonymous access loophole
DROP POLICY IF EXISTS "Users can view their own analyses" ON public.case_analyses;

CREATE POLICY "Users can view their own analyses"
ON public.case_analyses
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Tighten INSERT to require auth.uid() match (no anonymous user_id NULL inserts via this policy)
DROP POLICY IF EXISTS "Users can create analyses" ON public.case_analyses;

CREATE POLICY "Users can create their own analyses"
ON public.case_analyses
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 3. user_roles: explicitly block self-assignment of roles by non-admins
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
