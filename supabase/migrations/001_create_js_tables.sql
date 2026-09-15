-- ============================================================
-- JusRental Database Schema (js_ prefix)
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. js_properties — Property listings
-- ============================================================
CREATE TABLE IF NOT EXISTS js_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  area TEXT NOT NULL,
  price INTEGER NOT NULL,
  bhk INTEGER NOT NULL,
  sqft INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Apartment', 'Villa', 'Independent House')),
  furnished TEXT NOT NULL CHECK (furnished IN ('Furnished', 'Semi-Furnished', 'Unfurnished')),
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  verified BOOLEAN DEFAULT false,
  available BOOLEAN DEFAULT true,
  description TEXT DEFAULT '',
  deposit INTEGER DEFAULT 0,
  floor TEXT DEFAULT '',
  facing TEXT DEFAULT '',
  nearby_places JSONB DEFAULT '[]',
  sharing_type TEXT DEFAULT 'Any' CHECK (sharing_type IN ('Family', 'Bachelor', 'Any')),
  posted_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for common filters
CREATE INDEX IF NOT EXISTS idx_js_properties_area ON js_properties(area);
CREATE INDEX IF NOT EXISTS idx_js_properties_bhk ON js_properties(bhk);
CREATE INDEX IF NOT EXISTS idx_js_properties_price ON js_properties(price);
CREATE INDEX IF NOT EXISTS idx_js_properties_type ON js_properties(type);
CREATE INDEX IF NOT EXISTS idx_js_properties_furnished ON js_properties(furnished);
CREATE INDEX IF NOT EXISTS idx_js_properties_available ON js_properties(available);

-- ============================================================
-- 2. js_areas — Neighborhood/area data
-- ============================================================
CREATE TABLE IF NOT EXISTS js_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  properties_count INTEGER DEFAULT 0,
  price_range TEXT DEFAULT '',
  image TEXT DEFAULT '',
  popular BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. js_blog_posts — Blog articles
-- ============================================================
CREATE TABLE IF NOT EXISTS js_blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  content TEXT DEFAULT '',
  author TEXT DEFAULT 'JusRental Team',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  cover_image TEXT DEFAULT '',
  read_time INTEGER DEFAULT 5,
  published_date DATE DEFAULT CURRENT_DATE,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_js_blog_posts_slug ON js_blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_js_blog_posts_category ON js_blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_js_blog_posts_published ON js_blog_posts(published);

-- ============================================================
-- 4. js_testimonials — Customer testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS js_testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Tenant',
  avatar TEXT DEFAULT '',
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'video')),
  video_url TEXT,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. js_key_features — Platform features display
-- ============================================================
CREATE TABLE IF NOT EXISTS js_key_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. js_nri_services — NRI service offerings
-- ============================================================
CREATE TABLE IF NOT EXISTS js_nri_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. js_contact_submissions — Contact form submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS js_contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT NOT NULL,
  subject TEXT DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. js_book_visit_requests — Visit booking requests
-- ============================================================
CREATE TABLE IF NOT EXISTS js_book_visit_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT DEFAULT '',
  preferred_date DATE,
  preferred_time TEXT DEFAULT '',
  message TEXT DEFAULT '',
  property_id UUID REFERENCES js_properties(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_js_book_visit_property ON js_book_visit_requests(property_id);

-- ============================================================
-- 9. js_property_listing_requests — Owner listing requests
-- ============================================================
CREATE TABLE IF NOT EXISTS js_property_listing_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_type TEXT DEFAULT '',
  bhk TEXT DEFAULT '',
  area TEXT DEFAULT '',
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'verified')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'listed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. js_rent_data — Rent estimation data
-- ============================================================
CREATE TABLE IF NOT EXISTS js_rent_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  area TEXT NOT NULL,
  bhk TEXT NOT NULL,
  rent_range TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(area, bhk)
);

CREATE INDEX IF NOT EXISTS idx_js_rent_data_area ON js_rent_data(area);

-- ============================================================
-- Auto-update updated_at triggers
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_js_properties_updated_at
  BEFORE UPDATE ON js_properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_js_blog_posts_updated_at
  BEFORE UPDATE ON js_blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE js_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE js_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE js_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE js_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE js_key_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE js_nri_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE js_contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE js_book_visit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE js_property_listing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE js_rent_data ENABLE ROW LEVEL SECURITY;

-- Public read access for display tables
CREATE POLICY "Public read js_properties" ON js_properties FOR SELECT USING (true);
CREATE POLICY "Public read js_areas" ON js_areas FOR SELECT USING (true);
CREATE POLICY "Public read js_blog_posts" ON js_blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read js_testimonials" ON js_testimonials FOR SELECT USING (visible = true);
CREATE POLICY "Public read js_key_features" ON js_key_features FOR SELECT USING (true);
CREATE POLICY "Public read js_nri_services" ON js_nri_services FOR SELECT USING (true);
CREATE POLICY "Public read js_rent_data" ON js_rent_data FOR SELECT USING (true);

-- Public insert for form submissions (anyone can submit)
CREATE POLICY "Public insert js_contact_submissions" ON js_contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert js_book_visit_requests" ON js_book_visit_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert js_property_listing_requests" ON js_property_listing_requests FOR INSERT WITH CHECK (true);

-- Service role full access (for admin operations)
CREATE POLICY "Service role full access js_properties" ON js_properties FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access js_areas" ON js_areas FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access js_blog_posts" ON js_blog_posts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access js_testimonials" ON js_testimonials FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access js_key_features" ON js_key_features FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access js_nri_services" ON js_nri_services FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access js_contact_submissions" ON js_contact_submissions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access js_book_visit_requests" ON js_book_visit_requests FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access js_property_listing_requests" ON js_property_listing_requests FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access js_rent_data" ON js_rent_data FOR ALL USING (auth.role() = 'service_role');
