
-- Create promo spots counter table
CREATE TABLE public.promo_spots_counter (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  spots_remaining INTEGER NOT NULL DEFAULT 500,
  total_spots INTEGER NOT NULL DEFAULT 500,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Seed with one row
INSERT INTO public.promo_spots_counter (spots_remaining, total_spots) VALUES (500, 500);

-- Enable RLS
ALTER TABLE public.promo_spots_counter ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view promo counter"
ON public.promo_spots_counter
FOR SELECT
USING (true);

-- System-only update (no direct user updates)
CREATE POLICY "System can update promo counter"
ON public.promo_spots_counter
FOR UPDATE
USING (false);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.promo_spots_counter;
