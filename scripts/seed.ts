#!/usr/bin/env ts-node

/**
 * Database Seeding Script
 *
 * ⚠️  WARNING: This script uses SUPABASE_SERVICE_ROLE_KEY which has full database access.
 * ⚠️  NEVER commit your actual service role key to version control.
 * ⚠️  Use a temporary value for local development only.
 *
 * Usage:
 *   yarn seed
 *   or
 *   npx ts-node scripts/seed.ts
 *   or
 *   node --loader ts-node/esm scripts/seed.ts
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    console.error('Please check your .env.local file');
    process.exit(1);
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sample data
const sampleAuthor = {
  name: 'Ahmet Yılmaz',
  slug: 'ahmet-yilmaz',
  avatar_url:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: 'Teknoloji yazarı ve yazılım geliştirici. Modern web teknolojileri ve yazılım geliştirme süreçleri hakkında yazıyor.',
};

const sampleTags = [
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'React', slug: 'react' },
  { name: 'Next.js', slug: 'nextjs' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Web Geliştirme', slug: 'web-gelistirme' },
  { name: 'Yazılım Mühendisliği', slug: 'yazilim-muhendisligi' },
];

const samplePosts = [
  {
    title: 'Modern JavaScript ile Fonksiyonel Programlama',
    slug: 'modern-javascript-ile-fonksiyonel-programlama',
    excerpt:
      'ES6+ özelliklerini kullanarak fonksiyonel programlama yaklaşımlarını keşfedin.',
    content_md: `# Modern JavaScript ile Fonksiyonel Programlama

JavaScript'in modern özellikleri ile fonksiyonel programlama yapmak artık çok daha kolay. Bu yazıda, ES6+ özelliklerini kullanarak nasıl temiz ve okunabilir kod yazabileceğinizi göreceksiniz.

## Arrow Functions

Arrow function'lar ile daha kısa ve öz kod yazabilirsiniz:

\`\`\`javascript
// Eski yöntem
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
  return num * 2;
});

// Modern yöntem
const doubled = numbers.map(num => num * 2);
\`\`\`

## Array Methods

Modern array method'ları ile veri işleme çok daha kolay:

\`\`\`javascript
const users = [
  { name: 'Ahmet', age: 25, city: 'İstanbul' },
  { name: 'Ayşe', age: 30, city: 'Ankara' },
  { name: 'Mehmet', age: 28, city: 'İzmir' }
];

// Filtreleme ve dönüştürme
const youngUsers = users
  .filter(user => user.age < 30)
  .map(user => ({ ...user, status: 'genç' }));
\`\`\`

> info: Bu yazı JavaScript'in modern özelliklerini kullanarak fonksiyonel programlama yaklaşımlarını göstermektedir.

![JavaScript kodu örneği | Modern JavaScript syntax örnekleri](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Sonuç

Modern JavaScript ile fonksiyonel programlama yapmak hem performans hem de okunabilirlik açısından büyük avantajlar sağlar. Bu yaklaşımı projelerinizde kullanmaya başlayın ve kod kalitenizi artırın.`,
    cover_url:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    status: 'published',
    lang: 'tr',
    published_at: new Date('2024-01-15T10:00:00Z').toISOString(),
  },
  {
    title: 'React Hooks ile State Yönetimi',
    slug: 'react-hooks-ile-state-yonetimi',
    excerpt:
      "React Hooks kullanarak component state'ini nasıl yöneteceğinizi öğrenin.",
    content_md: `# React Hooks ile State Yönetimi

React Hooks, functional component'larda state yönetimini kolaylaştıran modern bir yaklaşımdır. Bu yazıda, en çok kullanılan hook'ları ve nasıl kullanılacaklarını göreceksiniz.

## useState Hook

\`useState\` hook'u ile component state'ini yönetebilirsiniz:

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Sayı: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Artır
      </button>
      <button onClick={() => setCount(count - 1)}>
        Azalt
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

\`useEffect\` hook'u ile side effect'leri yönetebilirsiniz:

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/users/' + userId);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Kullanıcı yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <div>Yükleniyor...</div>;
  if (!user) return <div>Kullanıcı bulunamadı</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

> warning: useEffect hook'unu kullanırken dependency array'ini doğru şekilde belirtmeyi unutmayın.

![React kodu örneği | React Hooks kullanım örnekleri](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop)

## Sonuç

React Hooks ile state yönetimi artık çok daha kolay ve anlaşılır. Bu yaklaşımı kullanarak daha temiz ve maintainable kod yazabilirsiniz.`,
    cover_url:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    status: 'published',
    lang: 'tr',
    published_at: new Date('2024-01-20T14:30:00Z').toISOString(),
  },
  {
    title: 'Next.js 13 App Router ile Modern Web Uygulamaları',
    slug: 'nextjs-13-app-router-ile-modern-web-uygulamalari',
    excerpt:
      "Next.js 13'ün yeni App Router özelliği ile nasıl modern web uygulamaları geliştireceğinizi öğrenin.",
    content_md: `# Next.js 13 App Router ile Modern Web Uygulamaları

Next.js 13, web geliştirme dünyasında devrim niteliğinde değişiklikler getiriyor. App Router ile birlikte gelen yeni özellikler, daha hızlı ve verimli uygulamalar geliştirmenizi sağlıyor.

## App Router Nedir?

App Router, Next.js 13 ile gelen yeni dosya tabanlı routing sistemidir. Bu sistem ile:

- **Server Components**: Varsayılan olarak server-side rendering
- **Streaming**: Progressive loading ve hydration
- **Nested Layouts**: Daha iyi kod organizasyonu
- **Loading States**: Otomatik loading UI'ları

## Server Components

Server Components ile performansı artırabilirsiniz:

\`\`\`typescript
// app/posts/page.tsx
import { getPosts } from '@/lib/posts';

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <div>
      <h1>Blog Yazıları</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
\`\`\`

> success: App Router ile gelen yeni özellikler, web uygulamalarınızın performansını önemli ölçüde artırır.

![Next.js kodu örneği | Next.js 13 App Router örnekleri](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Sonuç

Next.js 13 App Router, modern web geliştirme için güçlü araçlar sunuyor. Bu yeni özellikleri kullanarak daha hızlı, verimli ve maintainable uygulamalar geliştirebilirsiniz.`,
    cover_url:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    status: 'published',
    lang: 'tr',
    published_at: new Date('2024-01-25T09:15:00Z').toISOString(),
  },
  {
    title: 'TypeScript ile Tip Güvenli Web Geliştirme',
    slug: 'typescript-ile-tip-guvenli-web-gelistirme',
    excerpt:
      'TypeScript kullanarak web uygulamalarınızda tip güvenliği sağlayın ve hataları önleyin.',
    content_md: `# TypeScript ile Tip Güvenli Web Geliştirme

TypeScript, JavaScript'e tip güvenliği ekleyerek daha güvenilir ve maintainable kod yazmanızı sağlar. Bu yazıda, TypeScript'in temel özelliklerini ve web geliştirmede nasıl kullanılacağını göreceksiniz.

## Temel Tipler

TypeScript ile değişken tiplerini belirtebilirsiniz:

\`\`\`typescript
// Temel tipler
let name: string = 'Ahmet';
let age: number = 25;
let isActive: boolean = true;
let hobbies: string[] = ['okuma', 'yazma', 'kodlama'];

// Union types
let status: 'loading' | 'success' | 'error' = 'loading';

// Object types
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

const user: User = {
  id: 1,
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
};
\`\`\`

## Generic Types

Generic tipler ile yeniden kullanılabilir bileşenler oluşturabilirsiniz:

\`\`\`typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
\`\`\`

> note: TypeScript'in utility type'ları, tip dönüşümlerini kolaylaştırır ve kod tekrarını azaltır.

![TypeScript kodu örneği | TypeScript tip sistemi örnekleri](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Sonuç

TypeScript ile tip güvenliği sağlayarak daha güvenilir ve maintainable web uygulamaları geliştirebilirsiniz. Bu yaklaşım, büyük projelerde özellikle değerlidir.`,
    cover_url:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    status: 'published',
    lang: 'tr',
    published_at: new Date('2024-02-01T11:45:00Z').toISOString(),
  },
  {
    title: 'Web Geliştirmede Modern CSS Teknikleri',
    slug: 'web-gelistirmede-modern-css-teknikleri',
    excerpt:
      "CSS Grid, Flexbox ve modern CSS özellikleri ile responsive ve esnek layout'lar oluşturun.",
    content_md: `# Web Geliştirmede Modern CSS Teknikleri

Modern CSS ile web sayfalarınızı daha responsive, esnek ve maintainable hale getirebilirsiniz. Bu yazıda, en güncel CSS özelliklerini ve nasıl kullanılacaklarını göreceksiniz.

## CSS Grid

CSS Grid ile 2D layout'lar oluşturabilirsiniz:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
\`\`\`

## Flexbox

Flexbox ile 1D layout'lar oluşturabilirsiniz:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 300px;
  min-width: 0;
}
\`\`\`

> info: CSS custom properties ile tema değişikliklerini kolayca yapabilirsiniz.

![CSS kodu örneği | Modern CSS teknikleri örnekleri](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Sonuç

Modern CSS teknikleri ile daha responsive, esnek ve maintainable web sayfaları oluşturabilirsiniz. Bu yaklaşım, kullanıcı deneyimini önemli ölçüde artırır.`,
    cover_url:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    status: 'published',
    lang: 'tr',
    published_at: new Date('2024-02-05T16:20:00Z').toISOString(),
  },
  {
    title: 'Yazılım Mühendisliğinde Clean Code Prensipleri',
    slug: 'yazilim-muhendisliginde-clean-code-prensipleri',
    excerpt:
      'Clean Code prensiplerini uygulayarak daha okunabilir, maintainable ve kaliteli kod yazın.',
    content_md: `# Yazılım Mühendisliğinde Clean Code Prensipleri

Clean Code, yazılım geliştirmede kod kalitesini artıran önemli prensiplerdir. Bu yazıda, bu prensipleri ve nasıl uygulanacaklarını göreceksiniz.

## Naming Conventions

Anlamlı isimlendirme, kod okunabilirliğini artırır:

\`\`\`typescript
// Kötü örnek
const d = new Date();
const u = getUsers();
const fn = (x: number) => x * 2;

// İyi örnek
const currentDate = new Date();
const activeUsers = getActiveUsers();
const doubleValue = (value: number) => value * 2;
\`\`\`

## Function Design

Küçük ve tek sorumluluğa sahip fonksiyonlar yazın:

\`\`\`typescript
// İyi örnek - tek sorumluluk
function validateUserData(userData: UserData): boolean {
  return !!(userData.name && userData.email);
}

function transformUserData(userData: UserData): ProcessedUserData {
  return {
    ...userData,
    name: userData.name.trim(),
    email: userData.email.toLowerCase(),
    createdAt: new Date()
  };
}
\`\`\`

> warning: Hataları yakalarken spesifik olun ve kullanıcıya anlamlı mesajlar verin.

![Clean Code örneği | Clean Code prensipleri örnekleri](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Sonuç

Clean Code prensiplerini uygulayarak daha okunabilir, maintainable ve kaliteli kod yazabilirsiniz. Bu yaklaşım, uzun vadede proje başarısını artırır.`,
    cover_url:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    status: 'published',
    lang: 'tr',
    published_at: new Date('2024-02-10T13:10:00Z').toISOString(),
  },
  {
    title: 'Modern Web Güvenliği ve Best Practices',
    slug: 'modern-web-guvenligi-ve-best-practices',
    excerpt:
      "Web uygulamalarınızı güvenli hale getirmek için modern güvenlik tekniklerini ve best practice'leri öğrenin.",
    content_md: `# Modern Web Güvenliği ve Best Practices

Web güvenliği, modern uygulamaların en kritik konularından biridir. Bu yazıda, web uygulamalarınızı güvenli hale getirmek için gerekli teknikleri ve best practice'leri göreceksiniz.

## HTTPS ve SSL/TLS

HTTPS kullanımı zorunludur:

\`\`\`typescript
// Security headers
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'",
};
\`\`\`

## Input Validation

Kullanıcı girdilerini her zaman doğrulayın:

\`\`\`typescript
import { z } from 'zod';

// Input validation schema
const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(120),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});
\`\`\`

> error: Güvenlik açıkları, uygulamanızın tamamen ele geçirilmesine neden olabilir.

![Web güvenliği örneği | Modern web güvenlik teknikleri](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop)

## Sonuç

Modern web güvenliği tekniklerini uygulayarak uygulamalarınızı güvenli hale getirebilirsiniz. Güvenlik, geliştirme sürecinin her aşamasında düşünülmelidir.`,
    cover_url:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    status: 'published',
    lang: 'tr',
    published_at: new Date('2024-02-15T10:30:00Z').toISOString(),
  },
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // 1. Check if author already exists, if not create it
    console.log('📝 Checking/creating author...');
    let { data: author } = await supabase
      .from('authors')
      .select()
      .eq('slug', sampleAuthor.slug)
      .single();

    if (!author) {
      const { data: newAuthor, error: authorError } = await supabase
        .from('authors')
        .insert([sampleAuthor])
        .select()
        .single();

      if (authorError) {
        throw new Error(`Failed to insert author: ${authorError.message}`);
      }
      author = newAuthor;
      console.log(`✅ Author created: ${author.name} (ID: ${author.id})\n`);
    } else {
      console.log(
        `✅ Author already exists: ${author.name} (ID: ${author.id})\n`
      );
    }

    // 2. Check if tags already exist, if not create them
    console.log('🏷️  Checking/creating tags...');
    const tags = [];

    for (const sampleTag of sampleTags) {
      let { data: existingTag } = await supabase
        .from('tags')
        .select()
        .eq('slug', sampleTag.slug)
        .single();

      if (!existingTag) {
        const { data: newTag, error: tagError } = await supabase
          .from('tags')
          .insert([sampleTag])
          .select()
          .single();

        if (tagError) {
          throw new Error(
            `Failed to insert tag ${sampleTag.name}: ${tagError.message}`
          );
        }
        existingTag = newTag;
        console.log(`✅ Tag created: ${existingTag.name}`);
      } else {
        console.log(`✅ Tag already exists: ${existingTag.name}`);
      }
      tags.push(existingTag);
    }
    console.log(
      `\n✅ ${tags.length} tags ready:\n${tags
        .map((t) => `  - ${t.name}`)
        .join('\n')}\n`
    );

    // 3. Check if posts already exist, if not create them
    console.log('📄 Checking/creating posts...');
    const posts = [];

    for (const samplePost of samplePosts) {
      let { data: existingPost } = await supabase
        .from('posts')
        .select()
        .eq('slug', samplePost.slug)
        .eq('lang', samplePost.lang)
        .single();

      if (!existingPost) {
        const postWithAuthor = {
          ...samplePost,
          author_id: author.id,
        };

        const { data: newPost, error: postError } = await supabase
          .from('posts')
          .insert([postWithAuthor])
          .select()
          .single();

        if (postError) {
          throw new Error(
            `Failed to insert post ${samplePost.title}: ${postError.message}`
          );
        }
        existingPost = newPost;
        console.log(`✅ Post created: ${existingPost.title}`);
      } else {
        console.log(`✅ Post already exists: ${existingPost.title}`);
      }
      posts.push(existingPost);
    }
    console.log(
      `\n✅ ${posts.length} posts ready:\n${posts
        .map((p) => `  - ${p.title}`)
        .join('\n')}\n`
    );

    // 4. Check and create post-tag relationships
    console.log('🔗 Checking/creating post-tag relationships...');
    let totalRelationships = 0;

    // Assign 2-3 random tags to each post
    for (const post of posts) {
      const postTags = tags
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 2) + 2); // 2-3 tags

      for (const tag of postTags) {
        // Check if relationship already exists
        const { data: existingRelation } = await supabase
          .from('post_tags')
          .select()
          .eq('post_id', post.id)
          .eq('tag_id', tag.id)
          .single();

        if (!existingRelation) {
          const { error: postTagError } = await supabase
            .from('post_tags')
            .insert([
              {
                post_id: post.id,
                tag_id: tag.id,
              },
            ]);

          if (postTagError) {
            console.warn(
              `⚠️  Failed to create relationship for post "${post.title}" and tag "${tag.name}": ${postTagError.message}`
            );
          } else {
            totalRelationships++;
            console.log(`✅ Relationship created: ${post.title} ↔ ${tag.name}`);
          }
        } else {
          console.log(
            `✅ Relationship already exists: ${post.title} ↔ ${tag.name}`
          );
        }
      }
    }
    console.log(
      `\n✅ ${totalRelationships} new post-tag relationships created\n`
    );

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - 1 author: ${author.name}`);
    console.log(`  - ${tags.length} tags`);
    console.log(`  - ${posts.length} posts`);
    console.log(`  - ${totalRelationships} new post-tag relationships created`);
    console.log('\n🚀 You can now run your application with sample data!');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase();
}
