/**
 * Individual tag page
 * Shows posts filtered by tag with pagination
 */

import { Container, Section, TagBadge } from '@velvele/components/ui';

import type { Metadata } from 'next';
import { Pagination } from '@velvele/components/Pagination';
import { PostList } from '@velvele/components/PostList';
import { getTagBySlug } from '@velvele/lib/blog/tags';
import { listPosts } from '@velvele/lib/blog/posts';
import { notFound } from 'next/navigation';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// Revalidate every 60 seconds for fresh content
export const revalidate = 60;

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = await getTagBySlug(resolvedParams.slug);

  if (!tag) {
    return {
      title: 'Etiket Bulunamadı | Velvele',
      description: 'Aradığınız etiket bulunamadı.',
    };
  }

  const title = `${tag.name} Etiketi | Velvele`;
  const description = `${tag.name} etiketi ile ilgili ${tag.post_count} yazı bulundu. Teknoloji, yazılım ve dijital dünya hakkında yazılar.`;
  const canonical = `https://velvele.net/etiket/${tag.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${tag.name} Etiketi | Velvele`,
      description: `${tag.name} etiketi ile ilgili ${tag.post_count} yazı bulundu.`,
      type: 'website',
      url: canonical,
    },
    twitter: {
      card: 'summary',
      title: `${tag.name} Etiketi | Velvele`,
      description: `${tag.name} etiketi ile ilgili ${tag.post_count} yazı bulundu.`,
    },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const resolvedParams = await params;
  const tag = await getTagBySlug(resolvedParams.slug);

  if (!tag) {
    notFound();
  }

  const params2 = await searchParams;
  const page = parseInt(params2.page || '1', 10);
  const postsResult = await listPosts({
    page,
    limit: 12,
    tagSlug: resolvedParams.slug,
    lang: 'tr',
  });

  return (
    <div className="min-h-screen bg-white">
      <Container>
        <Section spacing="xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-4">
              <TagBadge variant="default" size="md" className="text-lg">
                {tag.name}
              </TagBadge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
              {tag.name} Etiketi
            </h1>
            <p className="text-lg text-gray-600">
              Bu etiketle ilgili {postsResult.pagination.totalCount} yazı
              bulundu
            </p>
          </div>

          {/* Posts */}
          {postsResult.posts.length > 0 ? (
            <>
              <PostList posts={postsResult.posts} layout="grid" />

              {/* Pagination */}
              <div className="mt-12">
                <Pagination
                  pagination={postsResult.pagination}
                  baseUrl={`/etiket/${resolvedParams.slug}`}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                Bu etiketle ilgili henüz yazı bulunmuyor.
              </p>
            </div>
          )}
        </Section>
      </Container>
    </div>
  );
}

// Generate static params for known tags (optional)
export async function generateStaticParams() {
  // This could be implemented to pre-generate popular tags
  // For now, we'll use dynamic rendering with ISR
  return [];
}
