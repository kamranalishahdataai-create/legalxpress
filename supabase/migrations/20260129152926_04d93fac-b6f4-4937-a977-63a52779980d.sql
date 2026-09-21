-- Create table for lawyer referral requests
CREATE TABLE public.lawyer_referral_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  practice_area TEXT NOT NULL,
  location TEXT NOT NULL,
  case_description TEXT NOT NULL,
  urgency TEXT DEFAULT 'normal',
  preferred_contact TEXT DEFAULT 'email',
  matched_lawyer_id UUID,
  status TEXT DEFAULT 'pending',
  ai_recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lawyer_referral_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert referral requests (public form)
CREATE POLICY "Anyone can submit referral requests" 
ON public.lawyer_referral_requests 
FOR INSERT 
WITH CHECK (true);

-- Admins can view and manage all requests
CREATE POLICY "Admins can view all referral requests"
ON public.lawyer_referral_requests
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update referral requests"
ON public.lawyer_referral_requests
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger
CREATE TRIGGER update_lawyer_referral_requests_updated_at
BEFORE UPDATE ON public.lawyer_referral_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();