-- Allow admins to view all case analyses
CREATE POLICY "Admins can view all case analyses" 
ON public.case_analyses 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all profiles (for user management)
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));