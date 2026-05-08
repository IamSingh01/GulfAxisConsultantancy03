-- Supabase schema for Gulf Apex Consultancy
-- Run this in your Supabase SQL Editor

-- 1. Enquiries table (Modal / Home page enquiries)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  date_from date,
  date_to date,
  guests text,
  package_name text,
  budget text,
  message text,
  source text DEFAULT 'modal',
  created_at timestamptz DEFAULT now()
);

-- 2. Contact enquiries table
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  service text,
  budget text,
  date_from date,
  date_to date,
  guests text,
  message text,
  source text DEFAULT 'contact_page',
  created_at timestamptz DEFAULT now()
);

-- 3. Visa enquiries table
CREATE TABLE IF NOT EXISTS public.visa_enquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  visa_type text,
  travel_date date,
  passengers text,
  message text,
  source text DEFAULT 'visa_page',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security (optional - disable for open inserts)
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public form submissions)
-- Remove these policies if you want to restrict access
CREATE POLICY "Allow anonymous inserts on enquiries"
  ON public.enquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on contact_enquiries"
  ON public.contact_enquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts on visa_enquiries"
  ON public.visa_enquiries
  FOR INSERT
  WITH CHECK (true);

-- Grant usage to anon role
GRANT INSERT ON public.enquiries TO anon;
GRANT INSERT ON public.contact_enquiries TO anon;
GRANT INSERT ON public.visa_enquiries TO anon;

-- Optional: Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON public.contact_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visa_enquiries_created_at ON public.visa_enquiries(created_at DESC);
