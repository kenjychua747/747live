-- Add facebook_url column to form_inquiries table
ALTER TABLE form_inquiries ADD COLUMN IF NOT EXISTS facebook_url TEXT;
