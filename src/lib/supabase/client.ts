/**
 * Client-side Supabase client for browser components
 *
 * This module provides a type-safe Supabase client that can be used in:
 * - Client Components
 * - Event handlers
 * - Browser-side authentication flows
 *
 * Note: Prefer server-side data fetching when possible for better performance
 * and SEO. Use this client only when you need real-time updates or
 * client-side interactions.
 */

import { Database } from './types';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client for client-side usage
 *
 * @returns SupabaseClient<Database> - Configured Supabase client
 *
 * @example
 * ```typescript
 * // In a Client Component
 * 'use client';
 *
 * import { createClient } from '@velvele/lib/supabase/client';
 *
 * export function LoginForm() {
 *   const supabase = createClient();
 *
 *   const handleSignIn = async () => {
 *     const { error } = await supabase.auth.signInWithPassword({
 *       email: 'user@example.com',
 *       password: 'password'
 *     });
 *   };
 * }
 * ```
 *
 * @example
 * ```typescript
 * // For real-time subscriptions
 * const supabase = createClient();
 * const subscription = supabase
 *   .channel('posts')
 *   .on('postgres_changes',
 *     { event: 'INSERT', schema: 'public', table: 'posts' },
 *     (payload) => console.log('New post:', payload.new)
 *   )
 *   .subscribe();
 * ```
 */
export function createClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Automatically refresh tokens
        autoRefreshToken: true,
        // Persist session in localStorage
        persistSession: true,
        // Detect session in URL (for auth callbacks)
        detectSessionInUrl: true,
      },
      // Enable real-time subscriptions
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    }
  );
}

/**
 * Creates a Supabase client with custom configuration
 *
 * @param options - Custom client options
 * @returns SupabaseClient<Database> - Configured Supabase client
 *
 * @example
 * ```typescript
 * // Custom configuration for specific use cases
 * const supabase = createClientWithOptions({
 *   auth: {
 *     autoRefreshToken: false,
 *     persistSession: false,
 *   },
 *   realtime: {
 *     params: {
 *       eventsPerSecond: 5,
 *     },
 *   },
 * });
 * ```
 */
export function createClientWithOptions(
  options: Parameters<typeof createSupabaseClient>[2]
) {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    options
  );
}
