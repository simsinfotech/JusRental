-- Payments table for Razorpay integration
CREATE TABLE IF NOT EXISTS js_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  property_id UUID REFERENCES js_properties(id),
  amount INTEGER NOT NULL, -- paise (59900 = ₹599)
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  status TEXT DEFAULT 'created' CHECK (status IN ('created', 'captured', 'failed', 'refunded')),
  payment_type TEXT DEFAULT 'verified_plan',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE js_payments ENABLE ROW LEVEL SECURITY;

-- Users can read their own payments
CREATE POLICY "Users can read own payments"
  ON js_payments FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert payments
CREATE POLICY "Users can create payments"
  ON js_payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admin can read all payments
CREATE POLICY "Admins can read all payments"
  ON js_payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM js_user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Service role can update (for webhook verification)
CREATE POLICY "Service role can update payments"
  ON js_payments FOR UPDATE
  USING (true);
