/**
 * Blog post data fetching functions
 * Server-side functions for fetching posts with proper typing
 */

import type { PostWithAuthorAndTags } from '@velvele/lib/supabase';
import { createServerClient } from '@velvele/lib/supabase';

// Type for the raw post data from Supabase
interface RawPost {
  id: string;
  lang: 'tr' | 'en';
  slug: string;
  title: string;
  excerpt: string | null;
  content_md: string | null;
  cover_url: string | null;
  status: 'draft' | 'published';
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    name: string;
    slug: string;
    avatar_url: string | null;
    bio: string | null;
    created_at: string;
  } | null;
  tags?: Array<{
    tag: {
      id: string;
      name: string;
      slug: string;
    };
  }> | null;
}

export interface ListPostsParams {
  page?: number;
  limit?: number;
  tagSlug?: string;
  lang?: 'tr' | 'en';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface ListPostsResult {
  posts: PostWithAuthorAndTags[];
  pagination: PaginationInfo;
}

export interface GetPostBySlugParams {
  slug: string;
  lang: 'tr' | 'en';
}

/**
 * List published posts with pagination and optional filtering
 */
export async function listPosts({
  page = 1,
  limit = 12,
  tagSlug,
  lang = 'tr',
}: ListPostsParams): Promise<ListPostsResult> {
  const supabase = await createServerClient();

  let query = supabase
    .from('posts')
    .select(
      `
      *,
      author:authors(*),
      tags:post_tags(
        tag:tags(*)
      )
    `
    )
    .eq('status', 'published')
    .eq('lang', lang)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  // Get total count for pagination (simpler query)
  let countQuery = supabase
    .from('posts')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published')
    .eq('lang', lang)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString());

  if (tagSlug) {
    countQuery = countQuery.eq('post_tags.tag.slug', tagSlug);
  }

  const { count: totalCount } = await countQuery;

  // Filter by tag if specified
  if (tagSlug) {
    query = query.eq('post_tags.tag.slug', tagSlug);
  }

  // Apply pagination
  const offset = (page - 1) * limit;
  const { data: posts, error } = await query.range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }

  // Transform the data to match PostWithAuthorAndTags type
  const transformedPosts: PostWithAuthorAndTags[] = (posts || []).map(
    (post: RawPost) => ({
      ...post,
      author: post.author || null,
      tags: post.tags?.map((pt) => pt.tag).filter(Boolean) || [],
    })
  );

  const totalPages = Math.ceil((totalCount || 0) / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    posts: transformedPosts,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount: totalCount || 0,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
    },
  };
}

/**
 * Get a single post by slug and language
 */
export async function getPostBySlug({
  slug,
  lang,
}: GetPostBySlugParams): Promise<PostWithAuthorAndTags | null> {
  const supabase = await createServerClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      author:authors(*),
      tags:post_tags(
        tag:tags(*)
      )
    `
    )
    .eq('slug', slug)
    .eq('lang', lang)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .limit(1);

  if (error) {
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  const post = posts[0];

  // Transform the data to match PostWithAuthorAndTags type
  const transformedPost: PostWithAuthorAndTags = {
    ...post,
    author: post.author || null,
    tags:
      post.tags
        ?.map(
          (pt: { tag: { id: string; name: string; slug: string } }) => pt.tag
        )
        .filter(Boolean) || [],
  };

  return transformedPost;
}

/**
 * Get related posts (same tags, different post)
 */
export async function getRelatedPosts(
  currentPostId: string,
  tagIds: string[],
  lang: 'tr' | 'en',
  limit: number = 3
): Promise<PostWithAuthorAndTags[]> {
  if (tagIds.length === 0) return [];

  const supabase = await createServerClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      author:authors(*),
      tags:post_tags(
        tag:tags(*)
      )
    `
    )
    .neq('id', currentPostId)
    .eq('status', 'published')
    .eq('lang', lang)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .in('post_tags.tag_id', tagIds)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  // Transform the data
  return (posts || []).map((post: RawPost) => ({
    ...post,
    author: post.author || null,
    tags: post.tags?.map((pt) => pt.tag).filter(Boolean) || [],
  }));
}

/**
 * Get latest posts for hero section
 */
export async function getLatestPosts(
  lang: 'tr' | 'en' = 'tr',
  limit: number = 1
): Promise<PostWithAuthorAndTags[]> {
  const supabase = await createServerClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select(
      `
      *,
      author:authors(*),
      tags:post_tags(
        tag:tags(*)
      )
    `
    )
    .eq('status', 'published')
    .eq('lang', lang)
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }

  // Transform the data
  return (posts || []).map((post: RawPost) => ({
    ...post,
    author: post.author || null,
    tags: post.tags?.map((pt) => pt.tag).filter(Boolean) || [],
  }));
}
