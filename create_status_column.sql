-- Add status column to form_inquiries table for lead tracking
ALTER TABLE form_inquiries ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'New';

-- Add index for filtering by status
CREATE INDEX IF NOT EXISTS idx_form_inquiries_status ON form_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_form_inquiries_created_at ON form_inquiries(created_at DESC);

-- ===== FIX: Add missing RLS policies for form_inquiries =====
-- The table already has INSERT (anon) and SELECT (auth) policies.
-- We need UPDATE and DELETE for the admin panel's status tracking.
-- We also need anon SELECT since admin panel now uses anon key instead of auth tokens.

DROP POLICY IF EXISTS "Allow authenticated reads" ON form_inquiries;

CREATE POLICY "Allow anon reads" ON form_inquiries
  FOR SELECT USING (true);

CREATE POLICY "Allow anon update status" ON form_inquiries
  FOR UPDATE USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon delete" ON form_inquiries
  FOR DELETE USING (true);

-- ===== RLS policies for admin_credentials (allow anon SELECT and PATCH) =====
-- The admin panel now uses the anon key to read/write admin credentials for login
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon select admin_credentials" ON admin_credentials
  FOR SELECT USING (true);

CREATE POLICY "Allow anon update admin_credentials" ON admin_credentials
  FOR UPDATE USING (true)
  WITH CHECK (true);

-- ===== RLS policies for site_config (allow anon SELECT and PATCH) =====
-- The admin panel uses the anon key to save site config changes
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon select site_config" ON site_config
  FOR SELECT USING (true);

CREATE POLICY "Allow anon update site_config" ON site_config
  FOR UPDATE USING (true)
  WITH CHECK (true);
