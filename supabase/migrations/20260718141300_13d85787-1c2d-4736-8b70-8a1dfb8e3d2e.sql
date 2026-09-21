ALTER TABLE public.price_match_requests
  ADD COLUMN IF NOT EXISTS quoted_lawyer_name TEXT,
  ADD COLUMN IF NOT EXISTS quoted_law_firm TEXT,
  ADD COLUMN IF NOT EXISTS quoted_amount TEXT,
  ADD COLUMN IF NOT EXISTS quote_reference TEXT;