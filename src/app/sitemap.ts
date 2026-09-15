import { MetadataRoute } from 'next';
import { createSupabaseServer } from '@/lib/supabase-ssr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://jusrental.com';
  const supabase = await createSupabaseServer();

  // Static pages
  const staticPages = [
    '', '/properties', '/list-property', '/rent-estimator',
    '/blog', '/contact', '/book-visit', '/nri-services', '/rental-agreement',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  // Dynamic property pages
  const { data: properties } = await supabase
    .from('js_properties')
    .select('id, created_at')
    .eq('status', 'active');

  const propertyPages = (properties || []).map((p) => ({
    url: `${baseUrl}/properties/${p.id}`,
    lastModified: new Date(p.created_at),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Dynamic blog pages
  const { data: posts } = await supabase
    .from('js_blog_posts')
    .select('slug, published_date');

  const blogPages = (posts || []).map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.published_date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...propertyPages, ...blogPages];
}
