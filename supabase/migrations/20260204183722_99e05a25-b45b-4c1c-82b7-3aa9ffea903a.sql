-- Create subscriber counter table
CREATE TABLE public.subscriber_counter (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  spots_remaining INTEGER NOT NULL DEFAULT 10000,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert the initial counter value
INSERT INTO public.subscriber_counter (spots_remaining) VALUES (10000);

-- Enable RLS
ALTER TABLE public.subscriber_counter ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the counter (public visibility)
CREATE POLICY "Anyone can view subscriber counter"
ON public.subscriber_counter
FOR SELECT
USING (true);

-- Only system/triggers can update (no direct user updates)
CREATE POLICY "System can update counter"
ON public.subscriber_counter
FOR UPDATE
USING (false);

-- Create function to decrement counter when a subscription is created
CREATE OR REPLACE FUNCTION public.decrement_subscriber_counter()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.subscriber_counter
  SET spots_remaining = GREATEST(0, spots_remaining - 1),
      updated_at = now()
  WHERE id = (SELECT id FROM public.subscriber_counter LIMIT 1);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger on contract_subscriptions table
CREATE TRIGGER decrement_counter_on_subscription
AFTER INSERT ON public.contract_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.decrement_subscriber_counter();