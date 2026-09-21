-- Schedule the AI-spot ticker every 30 minutes (idempotent).
-- tick_ai_subscriber_spot() itself only books a spot once the randomized
-- 4–5 hour window has elapsed, so a 30-min cron cadence is safe.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'tick-ai-subscriber-spot') THEN
    PERFORM cron.unschedule('tick-ai-subscriber-spot');
  END IF;
  PERFORM cron.schedule(
    'tick-ai-subscriber-spot',
    '*/30 * * * *',
    $cron$SELECT public.tick_ai_subscriber_spot();$cron$
  );
END;
$$;
