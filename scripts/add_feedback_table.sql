-- Create feedback table for diagnosis accuracy reporting
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  scan_id UUID REFERENCES public.plant_scans(id) ON DELETE CASCADE,
  user_id UUID,
  is_accurate BOOLEAN,
  feedback_type TEXT CHECK (feedback_type IN ('accurate', 'inaccurate', 'partially_correct')),
  user_comments TEXT,
  correct_diagnosis TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to insert their own feedback
CREATE POLICY "Users can insert their own feedback" ON public.feedback
  FOR INSERT WITH CHECK (true);

-- Policy to allow users to view feedback (for analytics)
CREATE POLICY "Users can view feedback" ON public.feedback
  FOR SELECT USING (true);

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_feedback_scan_id ON public.feedback(scan_id);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback(created_at);
