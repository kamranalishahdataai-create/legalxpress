-- Create a table for community referrals
CREATE TABLE public.community_referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_name TEXT NOT NULL,
  referrer_email TEXT NOT NULL,
  referrer_phone TEXT,
  referred_name TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_phone TEXT,
  case_type TEXT NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  is_successful BOOLEAN DEFAULT false,
  is_winner BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.community_referrals ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit referrals (public form)
CREATE POLICY "Anyone can submit referrals" 
ON public.community_referrals 
FOR INSERT 
WITH CHECK (true);

-- Admins can view and manage all referrals
CREATE POLICY "Admins can view all referrals" 
ON public.community_referrals 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update referrals" 
ON public.community_referrals 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete referrals" 
ON public.community_referrals 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_community_referrals_updated_at
BEFORE UPDATE ON public.community_referrals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();