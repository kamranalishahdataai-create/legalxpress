
DROP VIEW IF EXISTS public.lawyers_public;

CREATE VIEW public.lawyers_public
WITH (security_invoker = true) AS
SELECT id, full_name, lso_number, practice_areas, bio, avatar_url, is_active, created_at
FROM public.lawyers
WHERE is_active = true;

GRANT SELECT ON public.lawyers_public TO anon, authenticated;
