-- ============================================================================
-- Velvele Blog Database Schema
-- ============================================================================
-- This schema creates a multilingual blog system with authors, posts, and tags
-- Supports Turkish (tr) and English (en) content with proper RLS policies
-- ============================================================================

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- AUTHORS TABLE
-- ============================================================================
-- Stores blog author information with unique slugs for SEO-friendly URLs

CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add comment to authors table
COMMENT ON TABLE authors IS 'Blog authors with profile information';
COMMENT ON COLUMN authors.id IS 'Unique identifier for the author';
COMMENT ON COLUMN authors.name IS 'Full name of the author';
COMMENT ON COLUMN authors.slug IS 'URL-friendly unique identifier for the author';
COMMENT ON COLUMN authors.avatar_url IS 'URL to author profile picture';
COMMENT ON COLUMN authors.bio IS 'Author biography/description';
COMMENT ON COLUMN authors.created_at IS 'When the author was created';

-- ============================================================================
-- TAGS TABLE
-- ============================================================================
-- Stores categorization tags for blog posts

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

-- Add comments to tags table
COMMENT ON TABLE tags IS 'Tags for categorizing blog posts';
COMMENT ON COLUMN tags.id IS 'Unique identifier for the tag';
COMMENT ON COLUMN tags.name IS 'Display name of the tag';
COMMENT ON COLUMN tags.slug IS 'URL-friendly unique identifier for the tag';

-- ============================================================================
-- POSTS TABLE
-- ============================================================================
-- Main blog posts table with multilingual support and publishing workflow

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lang TEXT CHECK (lang IN ('tr', 'en')) DEFAULT 'tr',
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content_md TEXT,
    cover_url TEXT,
    status TEXT CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
    author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure unique slug per language
    CONSTRAINT unique_slug_per_lang UNIQUE (slug, lang)
);

-- Add comments to posts table
COMMENT ON TABLE posts IS 'Blog posts with multilingual support and publishing workflow';
COMMENT ON COLUMN posts.id IS 'Unique identifier for the post';
COMMENT ON COLUMN posts.lang IS 'Language code (tr for Turkish, en for English)';
COMMENT ON COLUMN posts.slug IS 'URL-friendly identifier for the post';
COMMENT ON COLUMN posts.title IS 'Post title';
COMMENT ON COLUMN posts.excerpt IS 'Short description/summary of the post';
COMMENT ON COLUMN posts.content_md IS 'Full post content in Markdown format';
COMMENT ON COLUMN posts.cover_url IS 'URL to post cover image';
COMMENT ON COLUMN posts.status IS 'Publishing status (draft or published)';
COMMENT ON COLUMN posts.author_id IS 'Reference to the post author';
COMMENT ON COLUMN posts.published_at IS 'When the post was published (null for drafts)';
COMMENT ON COLUMN posts.created_at IS 'When the post was created';
COMMENT ON COLUMN posts.updated_at IS 'When the post was last updated';

-- ============================================================================
-- POST_TAGS TABLE
-- ============================================================================
-- Many-to-many relationship between posts and tags

CREATE TABLE post_tags (
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Add comments to post_tags table
COMMENT ON TABLE post_tags IS 'Many-to-many relationship between posts and tags';
COMMENT ON COLUMN post_tags.post_id IS 'Reference to the post';
COMMENT ON COLUMN post_tags.tag_id IS 'Reference to the tag';

-- ============================================================================
-- INDEXES
-- ============================================================================
-- Performance indexes for common query patterns

-- Index for posts ordered by publication date (most recent first)
CREATE INDEX idx_posts_published_at_desc ON posts (published_at DESC);

-- Index for filtering posts by status
CREATE INDEX idx_posts_status ON posts (status);

-- Index for filtering posts by language
CREATE INDEX idx_posts_lang ON posts (lang);

-- Index for tag lookups by slug
CREATE INDEX idx_tags_slug ON tags (slug);

-- Index for author lookups by slug
CREATE INDEX idx_authors_slug ON authors (slug);

-- Composite index for published posts by language
CREATE INDEX idx_posts_published_lang ON posts (status, lang, published_at DESC) 
WHERE status = 'published';

-- Index for author posts
CREATE INDEX idx_posts_author_id ON posts (author_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- Enable RLS on all tables to control data access

-- Enable RLS on posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Enable RLS on tags table
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Enable RLS on authors table
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- Enable RLS on post_tags table
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- ============================================================================
-- POSTS POLICIES
-- ============================================================================

-- Allow anonymous users to read only published posts that are actually published
CREATE POLICY "Anonymous users can read published posts" ON posts
    FOR SELECT
    TO anon
    USING (
        status = 'published' 
        AND published_at IS NOT NULL 
        AND published_at <= NOW()
    );

-- Allow authenticated users to read all their own posts
CREATE POLICY "Users can read their own posts" ON posts
    FOR SELECT
    TO authenticated
    USING (auth.uid()::text = author_id::text);

-- Allow authenticated users to create posts (they become the author)
CREATE POLICY "Users can create posts" ON posts
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid()::text = author_id::text);

-- Allow authenticated users to update their own posts
CREATE POLICY "Users can update their own posts" ON posts
    FOR UPDATE
    TO authenticated
    USING (auth.uid()::text = author_id::text)
    WITH CHECK (auth.uid()::text = author_id::text);

-- Allow authenticated users to delete their own posts
CREATE POLICY "Users can delete their own posts" ON posts
    FOR DELETE
    TO authenticated
    USING (auth.uid()::text = author_id::text);

-- ============================================================================
-- TAGS POLICIES
-- ============================================================================

-- Allow everyone to read tags
CREATE POLICY "Anyone can read tags" ON tags
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow authenticated users to create tags
CREATE POLICY "Authenticated users can create tags" ON tags
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Allow authenticated users to update tags
CREATE POLICY "Authenticated users can update tags" ON tags
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- AUTHORS POLICIES
-- ============================================================================

-- Allow everyone to read authors
CREATE POLICY "Anyone can read authors" ON authors
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- Allow authenticated users to read/update their own author profile
CREATE POLICY "Users can manage their own author profile" ON authors
    FOR ALL
    TO authenticated
    USING (auth.uid()::text = id::text)
    WITH CHECK (auth.uid()::text = id::text);

-- ============================================================================
-- POST_TAGS POLICIES
-- ============================================================================

-- Allow everyone to read post-tag relationships for published posts
CREATE POLICY "Anyone can read post-tag relationships for published posts" ON post_tags
    FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM posts 
            WHERE posts.id = post_tags.post_id 
            AND posts.status = 'published' 
            AND posts.published_at IS NOT NULL 
            AND posts.published_at <= NOW()
        )
    );

-- Allow authenticated users to manage tags for their own posts
CREATE POLICY "Users can manage tags for their own posts" ON post_tags
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM posts 
            WHERE posts.id = post_tags.post_id 
            AND auth.uid()::text = posts.author_id::text
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM posts 
            WHERE posts.id = post_tags.post_id 
            AND auth.uid()::text = posts.author_id::text
        )
    );

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at on posts
CREATE TRIGGER update_posts_updated_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically set published_at when status changes to published
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    -- If status is changing to published and published_at is null, set it to now
    IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.published_at IS NULL THEN
        NEW.published_at = NOW();
    END IF;
    
    -- If status is changing from published to draft, clear published_at
    IF NEW.status = 'draft' AND OLD.status = 'published' THEN
        NEW.published_at = NULL;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically manage published_at
CREATE TRIGGER set_posts_published_at 
    BEFORE UPDATE ON posts 
    FOR EACH ROW 
    EXECUTE FUNCTION set_published_at();

-- ============================================================================
-- SAMPLE DATA (Optional - Remove if not needed)
-- ============================================================================

-- Insert sample author
INSERT INTO authors (name, slug, bio) VALUES 
('John Doe', 'john-doe', 'A passionate writer and developer.');

-- Insert sample tags
INSERT INTO tags (name, slug) VALUES 
('Technology', 'technology'),
('Web Development', 'web-development'),
('JavaScript', 'javascript'),
('React', 'react'),
('Next.js', 'nextjs');

-- Note: Sample posts and post_tags would need actual author UUIDs
-- You can add them after creating your first author through the application

-- ============================================================================
-- GRANTS (if needed for specific roles)
-- ============================================================================

-- Grant usage on sequences to authenticated users
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
