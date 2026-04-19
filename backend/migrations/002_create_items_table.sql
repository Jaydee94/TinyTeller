-- Migration: Create items table
-- Version: 002
-- Created: 2026-04-19

CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_items_owner_id ON items(owner_id);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_created_at ON items(created_at DESC);

-- Comments
COMMENT ON TABLE items IS 'User-created items (primary domain objects)';
COMMENT ON COLUMN items.id IS 'Primary key (UUID)';
COMMENT ON COLUMN items.owner_id IS 'Foreign key to users table';
COMMENT ON COLUMN items.title IS 'Item title (required)';
COMMENT ON COLUMN items.content IS 'Item description or details (optional)';
COMMENT ON COLUMN items.status IS 'Item status: draft, active, or archived';
