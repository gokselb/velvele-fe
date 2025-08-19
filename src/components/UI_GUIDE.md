# Velvele UI System

A minimal, clean UI system designed for the Velvele blog with a newsroom-clean aesthetic.

## Design Principles

- **Newsroom Clean**: Professional, readable, lots of whitespace
- **Mobile-First**: Responsive design that works on all devices
- **Accessible**: Proper focus states, ARIA labels, semantic HTML
- **Readable**: Optimal line lengths, good contrast, clear typography
- **Minimal**: Clean design without unnecessary decoration

## Color Palette

```css
/* Gray Scale - Primary palette */
gray-50:  #fafafa  /* Backgrounds */
gray-100: #f5f5f5  /* Light backgrounds, borders */
gray-200: #e5e5e5  /* Subtle borders */
gray-300: #d4d4d4  /* Borders, dividers */
gray-400: #a3a3a3  /* Disabled text */
gray-500: #737373  /* Secondary text */
gray-600: #525252  /* Body text */
gray-700: #404040  /* Primary text */
gray-800: #262626  /* Headings */
gray-900: #171717  /* Strong emphasis */
```

## Typography

- **Font**: System font stack for optimal performance
- **Line Height**: 1.6 for body text, tighter for headings
- **Font Smoothing**: Antialiased for crisp text
- **Prose**: Enhanced typography for article content

## Base Components

### Container

Provides consistent page layout and responsive max-widths.

```tsx
import { Container } from '@/components/ui';

<Container size="md">
  <p>Centered content with responsive padding</p>
</Container>;
```

**Props:**

- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `className`: Additional CSS classes

### Section

Semantic sections with consistent vertical spacing.

```tsx
import { Section } from '@/components/ui';

<Section spacing="lg" as="main">
  <h1>Main Content</h1>
</Section>;
```

**Props:**

- `spacing`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `as`: 'section' | 'div' | 'article' | 'main' (default: 'section')

### Button

Consistent button styling with multiple variants.

```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md" loading={isLoading}>
  Submit
</Button>;
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'ghost' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `loading`: boolean
- `disabled`: boolean

### TagBadge

Clean tag display with optional interactivity.

```tsx
import { TagBadge } from '@/components/ui';

<TagBadge href="/tags/javascript" variant="default">
  JavaScript
</TagBadge>;
```

**Props:**

- `variant`: 'default' | 'outline'
- `size`: 'sm' | 'md'
- `href`: string (makes it a link)
- `onClick`: function (makes it a button)

### Avatar

User profile images with fallback initials.

```tsx
import { Avatar } from '@/components/ui';

<Avatar src="/avatar.jpg" name="John Doe" size="md" />;
```

**Props:**

- `src`: Image URL
- `name`: User name (for initials fallback)
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `alt`: Alt text

### EmptyState

Displays when no content is available.

```tsx
import { EmptyState } from '@/components/ui';

<EmptyState
  title="No posts found"
  description="Try adjusting your search criteria"
  action={{
    label: 'Create Post',
    onClick: () => router.push('/create'),
  }}
/>;
```

### Skeleton

Loading states with smooth animations.

```tsx
import { Skeleton, SkeletonPost } from '@/components/ui';

// Basic skeleton
<Skeleton variant="text" lines={3} />

// Preset skeletons
<SkeletonPost />
```

## Blog Components

### PostCard

Displays blog post previews with image, tags, title, excerpt, and author.

```tsx
import { PostCard } from '@/components/PostCard';

<PostCard post={postWithAuthorAndTags} />;
```

**Features:**

- Responsive image with hover effects
- Tag chips (max 3 visible)
- Clean typography
- Author avatar and info
- Relative date display

### PostList

Grid or stack layout for multiple posts.

```tsx
import { PostList } from '@/components/PostList';

<PostList
  posts={posts}
  layout="grid"
  loading={isLoading}
  emptyState={{
    title: 'No posts yet',
    description: 'Check back later for new content',
  }}
/>;
```

**Props:**

- `layout`: 'grid' | 'stack'
- `loading`: boolean
- `emptyState`: Custom empty state config

### Pagination

Navigate through pages of content.

```tsx
import { Pagination } from '@/components/Pagination';

<Pagination currentPage={1} totalPages={10} onPageChange={setPage} />;
```

## Layout Examples

### Basic Page Layout

```tsx
import { Container, Section } from '@/components/ui';

export default function BlogPage() {
  return (
    <Container size="lg">
      <Section spacing="xl">
        <h1>Blog Title</h1>
        <PostList posts={posts} layout="grid" />
      </Section>
    </Container>
  );
}
```

### Article Layout

```tsx
import { Container, Section } from '@/components/ui';
import { Markdown } from '@/components/Markdown';

export default function ArticlePage({ post }) {
  return (
    <Container size="md">
      <Section spacing="lg">
        <article className="prose prose-lg mx-auto">
          <h1>{post.title}</h1>
          <Markdown content={post.content_md} />
        </article>
      </Section>
    </Container>
  );
}
```

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are mobile-first and scale up appropriately.

## Accessibility Features

- Proper focus management
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- High contrast ratios
- Semantic HTML structure

## Performance Considerations

- System fonts for fast loading
- Optimized CSS with Tailwind
- Minimal JavaScript
- Lazy loading ready
- Tree-shakeable components

## Usage Tips

1. **Consistent Spacing**: Use Section components for vertical rhythm
2. **Readable Line Lengths**: Keep content in Container components
3. **Progressive Enhancement**: Components work without JavaScript
4. **Mobile First**: Design for mobile, enhance for desktop
5. **Semantic HTML**: Use proper HTML elements for accessibility
