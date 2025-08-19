'use client';

/**
 * UI Demo Page - Showcases all UI components
 * This page demonstrates the Velvele UI system components
 */

import {
  Avatar,
  Button,
  Container,
  EmptyState,
  Section,
  Skeleton,
  SkeletonPost,
  TagBadge,
} from '@velvele/components/ui';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

import { Markdown } from '@velvele/components/Markdown';
import { PostList } from '@velvele/components/PostList';

// Mock data for demonstration
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with Next.js 15',
    slug: 'getting-started-nextjs-15',
    lang: 'en' as const,
    excerpt:
      'Learn how to build modern web applications with the latest features in Next.js 15, including improved performance and developer experience.',
    content_md: null,
    cover_url:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    status: 'published' as const,
    author_id: '1',
    published_at: '2024-01-15T10:00:00Z',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    author: {
      id: '1',
      name: 'Sarah Johnson',
      slug: 'sarah-johnson',
      avatar_url:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Frontend developer and technical writer',
      created_at: '2024-01-01T00:00:00Z',
    },
    tags: [
      { id: '1', name: 'Next.js', slug: 'nextjs' },
      { id: '2', name: 'React', slug: 'react' },
      { id: '3', name: 'JavaScript', slug: 'javascript' },
    ],
  },
  {
    id: '2',
    title: 'Modern CSS Techniques for Better UX',
    slug: 'modern-css-techniques',
    lang: 'en' as const,
    excerpt:
      'Explore advanced CSS features that can improve user experience, from container queries to CSS grid subgrid.',
    content_md: null,
    cover_url:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    status: 'published' as const,
    author_id: '2',
    published_at: '2024-01-10T14:30:00Z',
    created_at: '2024-01-10T14:30:00Z',
    updated_at: '2024-01-10T14:30:00Z',
    author: {
      id: '2',
      name: 'Alex Chen',
      slug: 'alex-chen',
      avatar_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      bio: 'CSS expert and design systems architect',
      created_at: '2024-01-01T00:00:00Z',
    },
    tags: [
      { id: '4', name: 'CSS', slug: 'css' },
      { id: '5', name: 'Design', slug: 'design' },
      { id: '6', name: 'UX', slug: 'ux' },
    ],
  },
];

const sampleMarkdown = `# Enhanced Markdown Features

Bu gelişmiş markdown bileşeni MDX benzeri kısayollar ve Türkçe tarih formatlaması destekler.

## Özel Blockquote Türleri

> info: Bu bir bilgi mesajıdır. Mavi renkte görünür.

> warning: Bu bir uyarı mesajıdır. Sarı renkte görünür.

> error: Bu bir hata mesajıdır. Kırmızı renkte görünür.

> success: Bu bir başarı mesajıdır. Yeşil renkte görünür.

> note: Bu bir not mesajıdır. Mor renkte görünür.

## Resimler ve Başlıklar

![Kod örneği | JavaScript kodu örneği](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Kod Örnekleri

\`\`\`javascript
function merhaba() {
  console.log("Merhaba, Dünya!");
  return "Türkçe kod örneği";
}
\`\`\`

Inline kod: \`const x = 42;\`

## Bağlantılar

[Velvele Ana Sayfa](https://velvele.net)

## Listeler

### Sırasız Liste
- Öğe 1
- Öğe 2
- Öğe 3

### Sıralı Liste
1. İlk
2. İkinci
3. Üçüncü

## Tarih Formatlaması

Bugün: ${new Date().toLocaleDateString('tr-TR')}`;

export default function UIDemo() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Container>
        <Section spacing="lg">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Velvele UI System
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A minimal, clean design system for modern blog experiences
            </p>
          </div>
        </Section>
      </Container>

      {/* Buttons */}
      <Container>
        <Section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="primary" loading>
              Loading
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
        </Section>
      </Container>

      {/* Tags */}
      <Container>
        <Section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Tag Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            <TagBadge>JavaScript</TagBadge>
            <TagBadge>React</TagBadge>
            <TagBadge variant="outline">CSS</TagBadge>
            <TagBadge variant="outline">Design</TagBadge>
            <TagBadge size="md">Next.js</TagBadge>
          </div>
        </Section>
      </Container>

      {/* Avatars */}
      <Container>
        <Section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Avatars</h2>
          <div className="flex items-center gap-4">
            <Avatar
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              name="Sarah Johnson"
              size="sm"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              name="Alex Chen"
              size="md"
            />
            <Avatar name="John Doe" size="lg" />
            <Avatar name="Jane Smith" size="xl" />
          </div>
        </Section>
      </Container>

      {/* Skeletons */}
      <Container>
        <Section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Loading States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Text Skeleton
              </h3>
              <Skeleton variant="text" lines={3} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Post Skeleton
              </h3>
              <SkeletonPost />
            </div>
          </div>
        </Section>
      </Container>

      {/* Post List */}
      <Container>
        <Section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Blog Posts
          </h2>
          <PostList posts={mockPosts} layout="grid" />
        </Section>
      </Container>

      {/* Pagination */}
      <Container>
        <Section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Pagination
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              <CaretLeftIcon className="h-4 w-4" weight="regular" />
              <span className="ml-1">Önceki</span>
            </Button>

            <div className="flex items-center space-x-1">
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="primary" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                4
              </Button>
              <Button variant="outline" size="sm">
                5
              </Button>
            </div>

            <Button variant="outline" size="sm">
              <span className="mr-1">Sonraki</span>
              <CaretRightIcon className="h-4 w-4" weight="regular" />
            </Button>
          </div>
        </Section>
      </Container>

      {/* Typography */}
      <Container size="md">
        <Section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Typography
          </h2>
          <div className="prose prose-lg max-w-none">
            <Markdown content={sampleMarkdown} />
          </div>
        </Section>
      </Container>

      {/* Empty State */}
      <Container>
        <Section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Empty State
          </h2>
          <EmptyState
            title="No content found"
            description="This is how empty states look in the system"
            action={{
              label: 'Create Content',
              onClick: () => alert('Create content clicked!'),
            }}
          />
        </Section>
      </Container>
    </div>
  );
}
