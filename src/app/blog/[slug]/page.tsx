import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { LuArrowLeft, LuClock, LuTag, LuUser, LuCalendar } from 'react-icons/lu';
import { fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/dal';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { GlassCard } from '@/components/ui/GlassCard';
import { BlogPostContent } from '@/components/sections/BlogPostContent';
import { getAuthor } from '@/lib/authors';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found — JusRental Blog' };
  }

  return {
    title: `${post.title} | JusRental Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await fetchBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const author = getAuthor(post.author);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage || undefined,
      datePublished: post.publishedDate,
      dateModified: post.publishedDate,
      author: {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        url: 'https://www.jusrental.com/about',
      },
      publisher: {
        '@type': 'Organization',
        name: 'JusRental',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.jusrental.com/images/monogram.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.jusrental.com/blog/${slug}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jusrental.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.jusrental.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.jusrental.com/blog/${slug}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#006194]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mt-4 transition-colors"
          >
            <LuArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article */}
      <article className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cover image */}
          <div className="rounded-2xl overflow-hidden aspect-[21/9] relative mb-8">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-[#006194]/10 text-[#006194] border border-[#006194]/20">
              <LuTag className="w-3.5 h-3.5" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <LuClock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <LuCalendar className="w-3.5 h-3.5" />
              {post.publishedDate}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[var(--muted)]">
              <LuUser className="w-3.5 h-3.5" />
              {post.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-[var(--muted)] mb-8">{post.excerpt}</p>

          {/* Content */}
          <BlogPostContent content={post.content} />

          {/* Author Bio */}
          <div className="mt-10 pt-6 border-t border-glass-border">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[#006194] flex items-center justify-center shrink-0">
                <span className="text-lg font-bold text-white">{author.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold font-[family-name:var(--font-heading)]">
                  Written by {author.name}
                </p>
                <p className="text-sm text-[#006194] font-medium mb-1">{author.role}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{author.bio}</p>
                <Link
                  href="/about"
                  className="inline-block mt-2 text-sm text-[#006194] hover:underline"
                >
                  Learn more about our team
                </Link>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-glass-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-surface-light text-[var(--muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
                Related Articles
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                    <GlassCard className="h-full overflow-hidden p-0 group">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <Image
                          src={rp.coverImage}
                          alt={rp.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="50vw"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold font-[family-name:var(--font-heading)] group-hover:text-[#006194] transition-colors line-clamp-2">
                          {rp.title}
                        </h3>
                        <p className="text-sm text-[var(--muted)] mt-1">{rp.readTime} min read</p>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
