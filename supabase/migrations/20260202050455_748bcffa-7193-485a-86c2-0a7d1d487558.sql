-- Create lawyer_case_assignments table to track cases assigned to lawyers
CREATE TABLE public.lawyer_case_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lawyer_id UUID NOT NULL REFERENCES public.lawyers(id) ON DELETE CASCADE,
    consultation_id UUID REFERENCES public.consultations(id) ON DELETE SET NULL,
    case_analysis_id UUID REFERENCES public.case_analyses(id) ON DELETE SET NULL,
    referral_id UUID REFERENCES public.community_referrals(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create analytics_events table for tracking
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    event_data JSONB,
    user_id UUID,
    session_id TEXT,
    page_url TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create monthly_reports table to store generated reports
CREATE TABLE public.monthly_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_month DATE NOT NULL,
    report_type TEXT NOT NULL,
    report_data JSONB NOT NULL,
    generated_by UUID,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.lawyer_case_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_reports ENABLE ROW LEVEL SECURITY;

-- Add user_id to lawyers table to link with auth accounts
ALTER TABLE public.lawyers ADD COLUMN IF NOT EXISTS user_id UUID UNIQUE;

-- Create trigger for updated_at on lawyer_case_assignments
CREATE TRIGGER update_lawyer_case_assignments_updated_at
BEFORE UPDATE ON public.lawyer_case_assignments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to check if user is a lawyer
CREATE OR REPLACE FUNCTION public.is_lawyer(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.lawyers
    WHERE user_id = _user_id
    AND is_active = true
  )
$$;

-- RLS for lawyer_case_assignments
CREATE POLICY "Lawyers can view their own assignments"
ON public.lawyer_case_assignments FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.lawyers l
        WHERE l.id = lawyer_case_assignments.lawyer_id
        AND l.user_id = auth.uid()
    )
);

CREATE POLICY "Admins can manage all assignments"
ON public.lawyer_case_assignments FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- RLS for analytics_events (admins only for viewing, service role for inserting)
CREATE POLICY "Service can insert analytics events"
ON public.analytics_events FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view analytics"
ON public.analytics_events FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- RLS for monthly_reports
CREATE POLICY "Admins can manage reports"
ON public.monthly_reports FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Lawyers can view reports"
ON public.monthly_reports FOR SELECT
USING (is_lawyer(auth.uid()));