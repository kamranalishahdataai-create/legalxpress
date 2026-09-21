
ALTER TABLE public.community_referrals 
ADD COLUMN draw_status text NOT NULL DEFAULT 'pending',
ADD COLUMN draw_month date NULL;

COMMENT ON COLUMN public.community_referrals.draw_status IS 'pending = waiting for referral engagement, active = approved for draw, entered = entered in specific month draw, winner = won the draw';
COMMENT ON COLUMN public.community_referrals.draw_month IS 'The month this referral entry is assigned to for the draw (chosen by referrer after approval)';
