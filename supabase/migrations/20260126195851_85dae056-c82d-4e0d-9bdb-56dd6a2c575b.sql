-- Fix the permissive chat messages policy to be more restrictive
DROP POLICY IF EXISTS "Anyone can create chat messages" ON public.chat_messages;

-- Create a proper policy for chat messages
CREATE POLICY "Users can create their own chat messages" ON public.chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Also fix case analyses anonymous policy to be the same as the authenticated one
DROP POLICY IF EXISTS "Anyone can create anonymous analyses" ON public.case_analyses;