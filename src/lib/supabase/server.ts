/**
 * Server-side Supabase client for React Server Components and Route Handlers
 *
 * This module provides a type-safe Supabase client that can be used in:
 * - React Server Components (RSC)
 * - API Route Handlers
 * - Server Actions
 *
 * The client automatically handles cookies for authentication state.
 */

import { Database } from './types';
import { cookies } from 'next/headers';
import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';

/**
 * Creates a Supabase client for server-side usage
 *
 * @returns Promise<SupabaseClient<Database>> - Configured Supabase client
 *
 * @example
 * ```typescript
 * // In a Server Component
 * const supabase = await createServerClient();
 * const { data: posts } = await supabase
 *   .from('posts')
 *   .select('*')
 *   .eq('status', 'published');
 * ```
 *
 * @example
 * ```typescript
 * // In a Route Handler
 * export async function GET() {
 *   const supabase = await createServerClient();
 *   const { data: user } = await supabase.auth.getUser();
 *   return Response.json({ user });
 * }
 * ```
 */
export async function createServerClient() {
  const cookieStore = await cookies();

  return createSupabaseServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

/**
 * Creates a Supabase client with admin privileges using service role key
 *
 * ⚠️ WARNING: Only use this in trusted server-side contexts!
 * This bypasses RLS policies and should not be exposed to client-side code.
 *
 * @returns SupabaseClient<Database> - Admin-level Supabase client
 *
 * @example
 * ```typescript
 * // In a trusted server context only
 * const supabase = createAdminClient();
 * const { data: allPosts } = await supabase
 *   .from('posts')
 *   .select('*'); // Bypasses RLS
 * ```
 */
export async function createAdminClient() {
  const { createClient } = await import('@supabase/supabase-js');

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
