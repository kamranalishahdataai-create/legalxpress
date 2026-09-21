-- Create lawyers table for the legal team roster
CREATE TABLE public.lawyers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  lso_number TEXT NOT NULL UNIQUE,
  practice_areas TEXT[] NOT NULL DEFAULT '{}',
  email TEXT,
  phone TEXT,
  bio TEXT,
  avatar_url TEXT,
  google_calendar_id TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;

-- Create policy for public viewing of active lawyers
CREATE POLICY "Anyone can view active lawyers"
ON public.lawyers
FOR SELECT
USING (is_active = true);

-- Create policy for admins to manage lawyers
CREATE POLICY "Admins can manage lawyers"
ON public.lawyers
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_lawyers_updated_at
BEFORE UPDATE ON public.lawyers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add lawyer_id column to consultations table to track which lawyer handles the consultation
ALTER TABLE public.consultations 
ADD COLUMN lawyer_id UUID REFERENCES public.lawyers(id);

-- Insert Shiv Kumar Passi as the first lawyer
INSERT INTO public.lawyers (
  full_name,
  lso_number,
  practice_areas,
  email,
  bio,
  is_active
) VALUES (
  'Shiv Kumar Passi',
  '70089L',
  ARRAY['Corporate Law', 'Incorporation', 'Shareholder Agreements', 'Commercial Contracts'],
  NULL,
  'Shiv Kumar Passi is a dedicated corporate lawyer with expertise in business formations, shareholder agreements, and commercial transactions. Licensed with the Law Society of Ontario.',
  true
);