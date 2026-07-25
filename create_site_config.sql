-- Create site_config table (won't error if exists)
CREATE TABLE IF NOT EXISTS site_config (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  config JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default empty config if not exists
INSERT INTO site_config (id, config)
SELECT 1, '{}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM site_config WHERE id = 1);
