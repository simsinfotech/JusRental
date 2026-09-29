-- Add SEO metadata columns to js_properties
ALTER TABLE js_properties ADD COLUMN IF NOT EXISTS seo_title TEXT DEFAULT '';
ALTER TABLE js_properties ADD COLUMN IF NOT EXISTS seo_description TEXT DEFAULT '';
ALTER TABLE js_properties ADD COLUMN IF NOT EXISTS seo_keywords TEXT DEFAULT '';
