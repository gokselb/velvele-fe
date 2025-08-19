import { MetadataRoute } from 'next';
import { createAdminClient } from '@velvele/lib/supabase';

function getBasicSitemap(baseUrl: string): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/arsiv`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/etiket`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://velvele.net';

  // Check if required environment variables are set
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set, returning basic sitemap');
    return getBasicSitemap(baseUrl);
  }

  try {
    const supabase = await createAdminClient();

    // Fetch latest 100 published posts
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug, lang, updated_at')
      .eq('status', 'published')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching posts for sitemap:', error);
      // Return basic sitemap if posts fetch fails
      return getBasicSitemap(baseUrl);
    }

    // Generate post URLs
    const postUrls =
      posts?.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })) || [];

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/arsiv`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/etiket`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
    ];

    return [...staticPages, ...postUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return basic sitemap on error
    return getBasicSitemap(baseUrl);
  }
}
