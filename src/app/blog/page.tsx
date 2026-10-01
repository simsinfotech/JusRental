import { fetchBlogPosts, fetchBlogCategories } from '@/lib/dal';
import { BlogContent } from '@/components/sections/BlogContent';
import { PageHero } from '@/components/layout/PageHero';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    fetchBlogPosts(),
    fetchBlogCategories(),
  ]);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jusrental.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.jusrental.com/blog' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageHero
        title="Blog & Guides"
        subtitle="Expert rental tips, area guides, and legal advice for tenants and property owners in Bangalore."
        breadcrumbs={[{ label: 'Blog' }]}
      />
      <BlogContent posts={posts} categories={categories} />
    </>
  );
}
