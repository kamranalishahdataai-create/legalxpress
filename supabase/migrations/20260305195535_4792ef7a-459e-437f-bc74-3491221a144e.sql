CREATE TABLE public.price_match_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  practice_area TEXT NOT NULL,
  case_description TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  scope_details TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.price_match_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert price match requests"
ON public.price_match_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Only admins can view price match requests"
ON public.price_match_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));