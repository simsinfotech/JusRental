-- Notifications table
CREATE TABLE IF NOT EXISTS js_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  property_id UUID REFERENCES js_properties(id),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property views tracking
CREATE TABLE IF NOT EXISTS js_property_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES js_properties(id),
  viewer_ip TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for notifications
ALTER TABLE js_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications"
  ON js_notifications FOR SELECT
  USING (auth.uid() = recipient_id);

CREATE POLICY "Users can update own notifications"
  ON js_notifications FOR UPDATE
  USING (auth.uid() = recipient_id);

CREATE POLICY "Service role can insert notifications"
  ON js_notifications FOR INSERT
  WITH CHECK (true);

-- RLS for property views
ALTER TABLE js_property_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert views"
  ON js_property_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read views"
  ON js_property_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM js_user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Add status column to blog posts for publish/draft support
ALTER TABLE js_blog_posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';

-- Add status column to contact submissions
ALTER TABLE js_contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- Add status column to book visit requests if not exists
ALTER TABLE js_book_visit_requests ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Add status column to property listing requests
ALTER TABLE js_property_listing_requests ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
