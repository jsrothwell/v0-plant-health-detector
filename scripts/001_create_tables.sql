-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plant_scans table for scan history
CREATE TABLE IF NOT EXISTS public.plant_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  analysis_result JSONB NOT NULL,
  confidence_score DECIMAL(5,2),
  disease_detected TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plant_scans ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_delete_own" ON public.profiles 
  FOR DELETE USING (auth.uid() = id);

-- Create RLS policies for plant_scans
CREATE POLICY "plant_scans_select_own" ON public.plant_scans 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "plant_scans_insert_own" ON public.plant_scans 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "plant_scans_update_own" ON public.plant_scans 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "plant_scans_delete_own" ON public.plant_scans 
  FOR DELETE USING (auth.uid() = user_id);
