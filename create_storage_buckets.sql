-- Create storage bucket for hero / site images
INSERT INTO storage.buckets (id, name, public) VALUES ('hero-images', 'hero-images', true)
  ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "hero_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'hero-images');

-- Allow authenticated inserts
CREATE POLICY "hero_auth_insert" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'hero-images' AND auth.role() = 'authenticated');

-- Allow authenticated updates
CREATE POLICY "hero_auth_update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'hero-images' AND auth.role() = 'authenticated');

-- Allow authenticated deletes
CREATE POLICY "hero_auth_delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'hero-images' AND auth.role() = 'authenticated');
