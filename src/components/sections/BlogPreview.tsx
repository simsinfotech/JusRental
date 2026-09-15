'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import type { BlogPost } from '@/types';

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with View All */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006194]/10 text-[#006194] text-sm font-medium mb-4">
              From Our Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-[#131b2e] mb-2">
              Rental <span className="text-[#006194]">Tips & Area Guides</span>
            </h2>
            <p className="text-[#3f4850] max-w-xl">
              Expert advice to help you find, rent, and manage your perfect home.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[#006194] font-medium border border-[#006194]/20 hover:bg-[#006194]/5 transition-all text-sm"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={fadeInUp}>
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group h-full border border-slate-100">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#006194] text-white">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e] mb-2 group-hover:text-[#006194] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#3f4850] mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#707881]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </span>
                      <span>{post.publishedDate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile View All */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[#006194] font-medium border border-[#006194]/20 hover:bg-[#006194]/5 transition-all text-sm"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
