import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient<Database>(supabaseUrl, supabaseServiceKey)
  : null

// SQL for creating the strains table
export const createStrainsTable = `
  CREATE TABLE IF NOT EXISTS strains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('indica', 'sativa', 'hybrid')),
    genetics TEXT,
    breeder TEXT,
    flowering_time TEXT,
    yield_indoor TEXT,
    yield_outdoor TEXT,
    height_indoor TEXT,
    height_outdoor TEXT,
    thc_content TEXT,
    cbd_content TEXT,
    description TEXT,
    effects TEXT[] DEFAULT '{}',
    flavors TEXT[] DEFAULT '{}',
    medical_uses TEXT[] DEFAULT '{}',
    growing_difficulty TEXT CHECK (growing_difficulty IN ('easy', 'moderate', 'difficult')),
    seedfinder_url TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Create indexes for better performance
  CREATE INDEX IF NOT EXISTS idx_strains_name ON strains(name);
  CREATE INDEX IF NOT EXISTS idx_strains_type ON strains(type);
  CREATE INDEX IF NOT EXISTS idx_strains_breeder ON strains(breeder);
  CREATE INDEX IF NOT EXISTS idx_strains_seedfinder_url ON strains(seedfinder_url);

  -- Create trigger to auto-update updated_at
  CREATE OR REPLACE FUNCTION update_updated_at_column()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
  END;
  $$ language 'plpgsql';

  CREATE TRIGGER IF NOT EXISTS update_strains_updated_at 
    BEFORE UPDATE ON strains
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
`