/**
 * Blog tag data fetching functions
 * Server-side functions for fetching tags with post counts
 */

import type { Tag } from '@velvele/lib/supabase';
import { createServerClient } from '@velvele/lib/supabase';

export interface TagWithCount extends Tag {
  post_count: number;
}

/**
 * Get all tags with post counts
 */
export async function getAllTags(
  lang: 'tr' | 'en' = 'tr'
): Promise<TagWithCount[]> {
  const supabase = await createServerClient();

  const { data: tags, error } = await supabase
    .from('tags')
    .select(
      `
      *,
      post_count:post_tags!inner(
        post:posts!inner(
          id
        )
      )
    `
    )
    .eq('post_tags.post.lang', lang)
    .eq('post_tags.post.status', 'published')
    .not('post_tags.post.published_at', 'is', null)
    .lte('post_tags.post.published_at', new Date().toISOString());

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  // Transform and count posts per tag
  const tagMap = new Map<string, TagWithCount>();

  tags?.forEach((tag) => {
    const existingTag = tagMap.get(tag.id);
    if (existingTag) {
      existingTag.post_count += 1;
    } else {
      tagMap.set(tag.id, {
        ...tag,
        post_count: 1,
      });
    }
  });

  // Convert to array and sort by post count
  return Array.from(tagMap.values()).sort(
    (a, b) => b.post_count - a.post_count
  );
}

/**
 * Get a single tag by slug
 */
export async function getTagBySlug(slug: string): Promise<Tag | null> {
  const supabase = await createServerClient();

  const { data: tags, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .limit(1);

  if (error) {
    console.error('Error fetching tag:', error);
    return null;
  }

  return tags?.[0] || null;
}
