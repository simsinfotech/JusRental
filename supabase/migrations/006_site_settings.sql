-- Site settings table for admin configuration
CREATE TABLE IF NOT EXISTS js_site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default settings
INSERT INTO js_site_settings (key, value) VALUES
  ('general', '{"siteName": "JusRental", "tagline": "Find Your Perfect Rental Home in Bangalore", "whatsappNumber": "919036317765"}'),
  ('seo', '{"defaultTitle": "JusRental - Find Rental Homes in Bangalore", "defaultDescription": "Find verified rental properties in North Bangalore. Zero brokerage, 100% verified listings.", "gtmContainerId": "", "searchConsoleCode": ""}'),
  ('social', '{"instagram": "", "facebook": "", "twitter": "", "youtube": ""}')
ON CONFLICT (key) DO NOTHING;

-- RLS
ALTER TABLE js_site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings
CREATE POLICY "Anyone can read settings"
  ON js_site_settings FOR SELECT
  USING (true);

-- Only admins can update
CREATE POLICY "Admins can update settings"
  ON js_site_settings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM js_user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert settings"
  ON js_site_settings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM js_user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
