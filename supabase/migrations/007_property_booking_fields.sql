-- ============================================================
-- Migration: Add booking/concierge fields to js_properties
-- Run in Supabase SQL Editor
-- ============================================================

-- Add verification_fee column (default ₹599)
ALTER TABLE js_properties
  ADD COLUMN IF NOT EXISTS verification_fee INTEGER DEFAULT 599;

-- Add concierge_name column (default 'JusRental Team')
ALTER TABLE js_properties
  ADD COLUMN IF NOT EXISTS concierge_name TEXT DEFAULT 'JusRental Team';
