-- ============================================================
-- Migration 003: Add owner & management fields to js_properties
-- ============================================================

ALTER TABLE js_properties ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id);
ALTER TABLE js_properties ADD COLUMN IF NOT EXISTS owner_phone TEXT;
ALTER TABLE js_properties ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE js_properties ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;
ALTER TABLE js_properties ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'rejected'));

-- Generate slugs from existing property titles
UPDATE js_properties
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  )
) || '-' || LEFT(id::TEXT, 8)
WHERE slug IS NULL;

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_js_properties_slug ON js_properties(slug);
CREATE INDEX IF NOT EXISTS idx_js_properties_owner ON js_properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_js_properties_status ON js_properties(status);
