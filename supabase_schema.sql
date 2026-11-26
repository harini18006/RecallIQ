-- ==============================================================================
-- RecallIQ Supabase Database Schema & Permission Fix
-- Run this in your Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. Create the `app_users` table
-- Notice: Every user has their own single row, and their search logs are 
-- stored in `search_logs` as a JSONB array, NOT as separate rows per search!
CREATE TABLE IF NOT EXISTS public.app_users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  search_logs JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create index on email for instant authentication lookups
CREATE INDEX IF NOT EXISTS idx_app_users_email ON public.app_users(email);

-- 3. CRITICAL FIX: Grant schema and table privileges to anon and authenticated roles
-- (Without this GRANT, Postgres rejects API requests with 'permission denied for table app_users')
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.app_users TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 4. Disable RLS or set open policy so the custom database auth can read/write directly
ALTER TABLE public.app_users DISABLE ROW LEVEL SECURITY;

-- 5. Helpful Documentation Comments
COMMENT ON TABLE public.app_users IS 'Stores user accounts and their aggregated search activity within their single row';
COMMENT ON COLUMN public.app_users.search_logs IS 'JSON array containing user search terms, filters, and product scan logs in a single row';
