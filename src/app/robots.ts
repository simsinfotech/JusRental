import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/superadmin/', '/login', '/signup'],
      },
    ],
    sitemap: 'https://www.jusrental.com/sitemap.xml',
  };
}
