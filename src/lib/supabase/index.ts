/**
 * Supabase utilities and types for the Velvele blog
 *
 * This module provides a unified interface for all Supabase-related functionality.
 */

// Server-side utilities
export { createServerClient, createAdminClient } from './server';

// Client-side utilities
export { createClient, createClientWithOptions } from './client';

// Types
export type {
  Database,
  Author,
  AuthorInsert,
  AuthorUpdate,
  Tag,
  TagInsert,
  TagUpdate,
  Post,
  PostInsert,
  PostUpdate,
  PostTag,
  PostTagInsert,
  PostTagUpdate,
  PostWithAuthor,
  PostWithTags,
  PostWithAuthorAndTags,
  AuthorWithPosts,
  TagWithPosts,
} from './types';
