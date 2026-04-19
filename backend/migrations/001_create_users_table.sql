-- Migration: Create users table
-- Version: 001
-- Created: 2026-04-19

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);

-- Comments
COMMENT ON TABLE users IS 'User accounts for authentication and ownership';
COMMENT ON COLUMN users.id IS 'Primary key (UUID)';
COMMENT ON COLUMN users.email IS 'Unique user email address';
COMMENT ON COLUMN users.password_hash IS 'bcrypt hash of user password';
