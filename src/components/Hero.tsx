/**
 * Hero component for highlighting the latest post
 * Large card with image overlay and title
 */

import { Avatar, TagBadge } from './ui';

import Image from 'next/image';
import Link from 'next/link';
import type { PostWithAuthorAndTags } from '@velvele/lib/supabase';
import { formatDateDistance } from '@velvele/lib/utils';

interface HeroProps {
  post: PostWithAuthorAndTags;
}

export function Hero({ post }: HeroProps) {
  const { title, excerpt, cover_url, slug, lang, published_at, author, tags } =
    post;
  const postUrl = `/${lang}/posts/${slug}`;

  return (
    <div className="relative aspect-[21/9] overflow-hidden rounded-2xl bg-gray-100">
      {cover_url && (
        <Image
          src={cover_url}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
          priority
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge
                key={tag.id}
                href={`/${lang}/etiket/${tag.slug}`}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {tag.name}
              </TagBadge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          <Link
            href={postUrl}
            className="hover:text-gray-200 transition-colors"
          >
            {title}
          </Link>
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-gray-200 sm:text-xl">
            {excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center space-x-4 text-sm">
          {author && (
            <div className="flex items-center space-x-2">
              <Avatar
                src={author.avatar_url}
                name={author.name}
                size="sm"
                className="border-2 border-white/20"
              />
              <span className="font-medium">{author.name}</span>
            </div>
          )}

          {published_at && (
            <time dateTime={published_at} className="text-gray-300">
              {formatDateDistance(published_at)}
            </time>
          )}
        </div>
      </div>
    </div>
  );
}
