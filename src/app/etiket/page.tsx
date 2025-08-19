/**
 * Tags list page
 * Shows all tags with post counts
 */

import { Container, Section, TagBadge } from '@velvele/components/ui';

import { getAllTags } from '@velvele/lib/blog/tags';

export default async function TagsPage() {
  const tags = await getAllTags('tr');

  return (
    <div className="min-h-screen bg-white">
      <Container>
        <Section spacing="xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
              Etiketler
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Blog yazılarımızı kategorilere göre keşfedin
            </p>
          </div>

          {/* Tags Grid */}
          {tags.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="group p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <TagBadge
                      href={`/etiket/${tag.slug}`}
                      variant="default"
                      size="md"
                      className="text-base"
                    >
                      {tag.name}
                    </TagBadge>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {tag.post_count}
                    </span>
                  </div>

                  <a
                    href={`/etiket/${tag.slug}`}
                    className="block text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {tag.post_count} yazı görüntüle →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Henüz etiket bulunmuyor.</p>
            </div>
          )}
        </Section>
      </Container>
    </div>
  );
}
