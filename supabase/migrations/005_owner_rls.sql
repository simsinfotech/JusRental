-- ============================================================
-- Migration 005: Owner-specific RLS policies
-- ============================================================

-- Owners can read their own properties
CREATE POLICY "Owners can read own properties" ON js_properties
  FOR SELECT USING (auth.uid() = owner_id);

-- Owners can insert their own properties
CREATE POLICY "Owners can insert own properties" ON js_properties
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- Owners can update their own properties
CREATE POLICY "Owners can update own properties" ON js_properties
  FOR UPDATE USING (auth.uid() = owner_id);

-- Owners can read visit requests for their properties
CREATE POLICY "Owners can read own visit requests" ON js_book_visit_requests
  FOR SELECT USING (
    property_id IN (
      SELECT id FROM js_properties WHERE owner_id = auth.uid()
    )
  );
