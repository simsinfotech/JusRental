import { fetchBlogPosts, fetchBlogCategories } from '@/lib/dal';
import { BlogContent } from '@/components/sections/BlogContent';
import { PageHero } from '@/components/layout/PageHero';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    fetchBlogPosts(),
    fetchBlogCategories(),
  ]);

  return (
    <>
      <PageHero
        title="Blog & Guides"
        subtitle="Expert rental tips, area guides, and legal advice for tenants and property owners in Bangalore."
        breadcrumbs={[{ label: 'Blog' }]}
      />
      <BlogContent posts={posts} categories={categories} />
    </>
  );
}
