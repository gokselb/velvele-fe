/**
 * PostList component for displaying a collection of blog posts
 * Supports grid and stack layouts with responsive design
 */

import { EmptyState } from './ui/EmptyState';
import { FileTextIcon } from '@phosphor-icons/react';
import { PostCard } from './PostCard';
import type { PostWithAuthorAndTags } from '@velvele/lib/supabase';
import { SkeletonPost } from './ui/Skeleton';
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
        icon={<FileTextIcon className="h-6 w-6" weight="regular" />}
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
