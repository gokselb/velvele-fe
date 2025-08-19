/**
 * PostCard component for displaying blog post previews
 * Clean, newsroom-style design with image, tags, title, excerpt, and author info
 */

import { Avatar, TagBadge } from './ui';

import Image from 'next/image';
import type { PostWithAuthorAndTags } from '@velvele/lib/supabase';
import { formatDateDistance } from '@velvele/lib/utils';

interface PostCardProps {
  post: PostWithAuthorAndTags;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  const { title, excerpt, cover_url, slug, lang, published_at, author, tags } =
    post;

  const postUrl = `/posts/${slug}`;
  const authorUrl = author ? `/authors/${author.slug}` : undefined;

  return (
    <article className={`group space-y-4 ${className || ''}`}>
      {/* Cover Image */}
      {cover_url && (
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 max-h-64 sm:max-h-72 lg:max-h-80">
          <a href={postUrl} className="block h-full w-full relative">
            <Image
              src={cover_url}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </a>
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge
                key={tag.id}
                href={`/${lang}/tags/${tag.slug}`}
                variant="default"
                size="sm"
              >
                {tag.name}
              </TagBadge>
            ))}
            {tags.length > 3 && (
              <TagBadge variant="outline" size="sm">
                +{tags.length - 3}
              </TagBadge>
            )}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold leading-tight text-gray-900">
          <a
            href={postUrl}
            className="hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:rounded-sm"
          >
            {title}
          </a>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Author and Date */}
        <div className="flex items-center space-x-3 text-sm text-gray-500">
          {author && (
            <>
              <div className="flex items-center space-x-2">
                <Avatar src={author.avatar_url} name={author.name} size="sm" />
                <span>
                  {authorUrl ? (
                    <a
                      href={authorUrl}
                      className="font-medium text-gray-700 hover:text-gray-900"
                    >
                      {author.name}
                    </a>
                  ) : (
                    <span className="font-medium text-gray-700">
                      {author.name}
                    </span>
                  )}
                </span>
              </div>
              <span>•</span>
            </>
          )}
          {published_at && (
            <time dateTime={published_at}>
              {formatDateDistance(published_at)}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}
