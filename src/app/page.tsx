/**
 * Homepage - Server component
 * Displays hero post and paginated feed
 */

import { Container, Section } from '@velvele/components/ui';
import { getLatestPosts, listPosts } from '@velvele/lib/blog/posts';

import { Hero } from '@velvele/components/Hero';
import { Pagination } from '@velvele/components/Pagination';
import { PostList } from '@velvele/components/PostList';

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

// Revalidate every 60 seconds for fresh content
export const revalidate = 60;

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);

  // Fetch latest post for hero
  const latestPosts = await getLatestPosts('tr', 1);
  const heroPost = latestPosts[0];

  // Fetch posts for feed (excluding hero post)
  const feedResult = await listPosts({
    page,
    limit: 12,
    lang: 'tr',
  });

  // Filter out hero post from feed if it exists
  const feedPosts = heroPost
    ? feedResult.posts.filter((post) => post.id !== heroPost.id)
    : feedResult.posts;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {heroPost && (
        <Container>
          <Section spacing="xl">
            <Hero post={heroPost} />
          </Section>
        </Container>
      )}

      {/* Feed Section */}
      <Container>
        <Section spacing="xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Son Yazılar
            </h2>
            <p className="mt-2 text-gray-600">
              En güncel blog yazılarımızı keşfedin
            </p>
          </div>

          {feedPosts.length > 0 ? (
            <>
              <PostList
                posts={feedPosts}
                layout="grid"
                emptyState={{
                  title: 'Henüz yazı yok',
                  description: 'Blog yazıları yakında eklenecek.',
                }}
              />

              {/* Pagination */}
              <div className="mt-12">
                <Pagination pagination={feedResult.pagination} />
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
