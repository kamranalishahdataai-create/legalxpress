ALTER TABLE public.subscriber_counter
  ADD COLUMN IF NOT EXISTS ai_spots_claimed integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS real_spots_claimed integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_ai_decrement_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS next_ai_decrement_at timestamptz NOT NULL DEFAULT now() + (interval '4 hours') + (random() * interval '1 hour');

CREATE OR REPLACE FUNCTION public.tick_ai_subscriber_spot()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.subscriber_counter
  SET spots_remaining = GREATEST(0, spots_remaining - 1),
      ai_spots_claimed = ai_spots_claimed + 1,
      last_ai_decrement_at = now(),
      next_ai_decrement_at = now() + (interval '4 hours') + (random() * interval '1 hour'),
      updated_at = now()
  WHERE now() >= next_ai_decrement_at
    AND spots_remaining > 0;
END;
$$;

REVOKE ALL ON FUNCTION public.tick_ai_subscriber_spot() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.decrement_subscriber_counter()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.subscriber_counter
  SET spots_remaining = GREATEST(0, spots_remaining - 1),
      real_spots_claimed = real_spots_claimed + 1,
      updated_at = now()
  WHERE id = (SELECT id FROM public.subscriber_counter LIMIT 1);
  RETURN NEW;
END;
$$;

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;