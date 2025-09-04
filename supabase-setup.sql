-- Create raffle_entries table
CREATE TABLE raffle_entries (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  entered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster lookups
CREATE INDEX idx_raffle_entries_phone ON raffle_entries(phone);
CREATE INDEX idx_raffle_entries_email ON raffle_entries(email);

-- Enable Row Level Security
ALTER TABLE raffle_entries ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert
CREATE POLICY "Enable insert for all users" ON raffle_entries
  FOR INSERT WITH CHECK (true);

-- Create policy for reading (only for authenticated admin users)
CREATE POLICY "Enable read for authenticated users only" ON raffle_entries
  FOR SELECT USING (auth.role() = 'authenticated');

-- Function to select random winner
CREATE OR REPLACE FUNCTION select_random_winner()
RETURNS TABLE (
  id INT,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  phone VARCHAR,
  entered_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    re.id,
    re.first_name,
    re.last_name,
    re.email,
    re.phone,
    re.entered_at
  FROM raffle_entries re
  ORDER BY RANDOM()
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;