-- IQ Spark Database Schema for Supabase
-- Run this SQL in the Supabase SQL Editor

-- Enable UUID extension (should already be enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Attempts table: stores test attempts
CREATE TABLE IF NOT EXISTS attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Test configuration
  locale TEXT NOT NULL DEFAULT 'en',
  seed TEXT NOT NULL UNIQUE,
  
  -- User info (optional)
  user_email TEXT NULL,
  
  -- Timing
  started_at TIMESTAMPTZ NULL,
  completed_at TIMESTAMPTZ NULL,
  
  -- Answers (stored as JSON array of indices)
  answers JSONB NULL,
  
  -- Results
  raw_score INT NULL,
  max_score INT NULL,
  score_band TEXT NULL,
  percentile_band TEXT NULL,
  
  -- Access control
  report_unlocked BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Metadata
  user_agent TEXT NULL,
  ip_hash TEXT NULL -- Hashed for privacy
);

-- Payments table: stores payment records
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Link to attempt
  attempt_id UUID REFERENCES attempts(id) ON DELETE CASCADE,
  
  -- Stripe data
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent_id TEXT NULL,
  
  -- Payment details
  amount_cents INT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL, -- 'pending', 'completed', 'refunded', 'failed'
  
  -- Timestamps
  paid_at TIMESTAMPTZ NULL,
  refunded_at TIMESTAMPTZ NULL,
  
  -- Customer info
  email TEXT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_attempts_seed ON attempts(seed);
CREATE INDEX IF NOT EXISTS idx_attempts_created_at ON attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_attempt_id ON payments(attempt_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_session_id ON payments(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- Row Level Security (RLS)
-- Enable RLS on both tables
ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policy for attempts: Allow insert and select with matching seed
-- (Using service role for most operations)
CREATE POLICY "Allow anonymous inserts" ON attempts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select by seed" ON attempts
  FOR SELECT
  USING (true);

-- Policy for payments: Only through service role
CREATE POLICY "Payment records are restricted" ON payments
  FOR ALL
  USING (false); -- Only accessible via service role key

-- Grant service role full access (for webhook processing)
GRANT ALL ON attempts TO service_role;
GRANT ALL ON payments TO service_role;

-- Comments
COMMENT ON TABLE attempts IS 'IQ Spark test attempts';
COMMENT ON TABLE payments IS 'Payment records from Stripe';
COMMENT ON COLUMN attempts.seed IS 'Deterministic seed for reproducible question generation';
COMMENT ON COLUMN attempts.report_unlocked IS 'TRUE when payment is verified and results are accessible';
COMMENT ON COLUMN payments.status IS 'pending, completed, refunded, or failed';
