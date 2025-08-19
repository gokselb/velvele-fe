/**
 * Individual post page
 * Fetches post by slug and renders with markdown
 */

import { Avatar, Container, Section, TagBadge } from '@velvele/components/ui';
import { getPostBySlug, getRelatedPosts } from '@velvele/lib/blog/posts';

import Image from 'next/image';
import { Markdown } from '@velvele/components/Markdown';
import type { Metadata } from 'next';
import { PostList } from '@velvele/components/PostList';
import { formatDateDistance } from '@velvele/lib/utils';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Revalidate every 5 minutes for post content
export const revalidate = 300;

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug({
    slug: resolvedParams.slug,
    lang: 'tr',
  });

  if (!post) {
    return {
      title: 'Yazı Bulunamadı | Velvele',
      description: 'Aradığınız yazı bulunamadı.',
    };
  }

  const title = `${post.title} | Velvele`;
  const description = post.excerpt || `${post.title} - Velvele blog yazısı`;
  const canonical = `https://velvele.net/posts/${post.slug}`;

  const openGraph: Metadata['openGraph'] = {
    title: post.title,
    description: post.excerpt || '',
    type: 'article',
    url: canonical,
    images: post.cover_url
      ? [
          {
            url: post.cover_url,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ]
      : [],
    authors: post.author ? [post.author.name] : [],
    publishedTime: post.published_at || undefined,
    modifiedTime: post.updated_at || undefined,
  };

  const twitter: Metadata['twitter'] = {
    card: 'summary_large_image',
    title: post.title,
    description: post.excerpt || '',
    images: post.cover_url ? [post.cover_url] : [],
  };

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph,
    twitter,
    authors: post.author ? [{ name: post.author.name }] : [],
    keywords: post.tags?.map((tag) => tag.name).join(', '),
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug({
    slug: resolvedParams.slug,
    lang: 'tr',
  });

  if (!post) {
    notFound();
  }

  // Get related posts based on tags
  const relatedPosts = await getRelatedPosts(
    post.id,
    post.tags.map((tag) => tag.id),
    'tr',
    3
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Container>
        <Section spacing="lg">
          {post.cover_url && (
            <div className="mb-8 aspect-[21/9] relative overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={post.cover_url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                priority
              />
            </div>
          )}

          {/* Post Header */}
          <div className="mb-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagBadge
                    key={tag.id}
                    href={`/etiket/${tag.slug}`}
                    variant="default"
                    size="sm"
                  >
                    {tag.name}
                  </TagBadge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="mb-6 flex items-center space-x-4 text-sm text-gray-600">
              {post.author && (
                <div className="flex items-center space-x-2">
                  <Avatar
                    src={post.author.avatar_url}
                    name={post.author.name}
                    size="sm"
                  />
                  <span className="font-medium text-gray-900">
                    {post.author.name}
                  </span>
                </div>
              )}

              {post.published_at && (
                <time dateTime={post.published_at}>
                  {formatDateDistance(post.published_at)}
                </time>
              )}
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>
        </Section>
      </Container>

      {/* Content */}
      <Container size="md">
        <Section spacing="lg">
          <article className="prose prose-lg mx-auto max-w-none">
            {post.content_md ? (
              <Markdown content={post.content_md} />
            ) : (
              <p className="text-gray-500 italic">İçerik henüz eklenmemiş.</p>
            )}
          </article>
        </Section>
      </Container>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Container>
          <Section spacing="xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                İlgili Yazılar
              </h2>
              <p className="mt-2 text-gray-600">
                Bu yazıyla ilgili diğer içerikler
              </p>
            </div>

            <PostList posts={relatedPosts} layout="grid" />
          </Section>
        </Container>
      )}
    </div>
  );
}

// Generate static params for known posts (optional)
export async function generateStaticParams() {
  // This could be implemented to pre-generate popular posts
  // For now, we'll use dynamic rendering with ISR
  return [];
}
