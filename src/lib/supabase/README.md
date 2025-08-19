# Supabase Helpers

This directory contains type-safe Supabase utilities for the Velvele blog application.

## Structure

```
src/lib/supabase/
├── index.ts          # Main export file
├── server.ts         # Server-side utilities
├── client.ts         # Client-side utilities
├── types.ts          # TypeScript type definitions
└── README.md         # This file
```

## Usage

### Server-Side (Recommended)

For React Server Components, Route Handlers, and Server Actions:

```typescript
import { createServerClient } from '@velvele/lib/supabase';

// In a Server Component
export default async function BlogPosts() {
  const supabase = await createServerClient();

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published');

  return <div>{/* render posts */}</div>;
}

// In a Route Handler
export async function GET() {
  const supabase = await createServerClient();
  const { data: user } = await supabase.auth.getUser();
  return Response.json({ user });
}
```

### Client-Side

For Client Components that need real-time updates or user interactions:

```typescript
'use client';

import { createClient } from '@velvele/lib/supabase';

export function LoginForm() {
  const supabase = createClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: 'user@example.com',
      password: 'password',
    });
  };

  return <form>{/* form content */}</form>;
}
```

### Admin Access

For trusted server-side operations that bypass RLS:

```typescript
import { createAdminClient } from '@velvele/lib/supabase';

// ⚠️ Only use in trusted server contexts!
export async function getAllPosts() {
  const supabase = await createAdminClient();

  const { data: posts } = await supabase.from('posts').select('*'); // Bypasses RLS

  return posts;
}
```

## Type Safety

All utilities are fully typed with the database schema:

```typescript
import type { Post, PostWithAuthor, Author } from '@velvele/lib/supabase';

// Type-safe queries
const { data: posts } = await supabase.from('posts').select<'posts', Post>('*');

// Type-safe inserts
const { data: newPost } = await supabase
  .from('posts')
  .insert<PostInsert>({
    title: 'My Post',
    slug: 'my-post',
    lang: 'en',
  })
  .select()
  .single();
```

## Best Practices

1. **Prefer Server-Side**: Use `createServerClient()` for data fetching when possible
2. **Client-Side Only When Needed**: Use `createClient()` only for:
   - Real-time subscriptions
   - User authentication flows
   - Interactive forms
3. **Admin Access Carefully**: Only use `createAdminClient()` in trusted server contexts
4. **Type Everything**: Always use the provided types for full type safety

## Environment Variables

Ensure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Migration from Old Supabase Setup

If you were using the old `src/lib/supabase.ts`:

```typescript
// Old
import { createSupabaseClient } from '@velvele/lib/supabase';

// New - Server-side
import { createServerClient } from '@velvele/lib/supabase';

// New - Client-side
import { createClient } from '@velvele/lib/supabase';
```
