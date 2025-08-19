import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/ui-demo', '/api/'],
    },
    sitemap: 'https://velvele.net/sitemap.xml',
  };
}
