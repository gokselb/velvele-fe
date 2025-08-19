/**
 * Archive page
 * Shows all posts ordered by date with pagination
 */

import { Container, Section } from '@velvele/components/ui';

import { Pagination } from '@velvele/components/Pagination';
import { PostList } from '@velvele/components/PostList';
import { listPosts } from '@velvele/lib/blog/posts';

interface ArchivePageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

// Revalidate every 60 seconds for fresh content
export const revalidate = 60;

export default async function ArchivePage({ searchParams }: ArchivePageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const postsResult = await listPosts({
    page,
    limit: 12,
    lang: 'tr',
  });

  return (
    <div className="min-h-screen bg-white">
      <Container>
        <Section spacing="xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
              Arşiv
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tüm blog yazılarımızı kronolojik sırayla keşfedin
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Toplam {postsResult.pagination.totalCount} yazı bulundu
            </p>
          </div>

          {/* Posts */}
          {postsResult.posts.length > 0 ? (
            <>
              <PostList posts={postsResult.posts} layout="stack" />

              {/* Pagination */}
              <div className="mt-12">
                <Pagination pagination={postsResult.pagination} />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Henüz yazı bulunmuyor.</p>
            </div>
          )}
        </Section>
      </Container>
    </div>
  );
}
