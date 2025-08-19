/**
 * PostList component for displaying a collection of blog posts
 * Supports grid and stack layouts with responsive design
 */

import { EmptyState, SkeletonPost } from './ui';

import { PostCard } from './PostCard';
import type { PostWithAuthorAndTags } from '@velvele/lib/supabase';
import { twMerge } from 'tailwind-merge';

interface PostListProps {
  posts: PostWithAuthorAndTags[];
  layout?: 'grid' | 'stack';
  loading?: boolean;
  emptyState?: {
    title: string;
    description?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  className?: string;
}

export function PostList({
  posts,
  layout = 'grid',
  loading = false,
  emptyState,
  className,
}: PostListProps) {
  // Loading state
  if (loading) {
    const skeletonCount = layout === 'grid' ? 8 : 3;
    return (
      <div
        className={twMerge(
          layout === 'grid'
            ? 'grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'space-y-12',
          className
        )}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      </div>
    );
  }

  // Empty state
  if (posts.length === 0) {
    return (
      <EmptyState
        title={emptyState?.title || 'No posts found'}
        description={
          emptyState?.description ||
          'There are no posts to display at the moment.'
        }
        action={emptyState?.action}
        icon={
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-4.5A1.125 1.125 0 0110.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H6A1.125 1.125 0 004.875 3.5H3.375A1.125 1.125 0 002.25 4.625v4.875c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h4.5A1.125 1.125 0 0013.5 12.75h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125H18a2.25 2.25 0 002.25-2.25 2.25 2.25 0 00-2.25-2.25H19.5z"
            />
          </svg>
        }
        className={className}
      />
    );
  }

  // Posts list
  return (
    <div
      className={twMerge(
        layout === 'grid'
          ? 'grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          : 'space-y-12',
        className
      )}
    >
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          className={
            layout === 'stack'
              ? 'border-b border-gray-200 pb-12 last:border-b-0 last:pb-0'
              : ''
          }
        />
      ))}
    </div>
  );
}
