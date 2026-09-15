import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/owner/', '/login', '/signup'],
      },
    ],
    sitemap: 'https://jusrental.com/sitemap.xml',
  };
}
