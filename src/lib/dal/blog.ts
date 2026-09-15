import { supabase } from '@/lib/supabase';
import { mapDbBlogPost, type DbBlogPost } from './mappers';
import type { BlogPost } from '@/types';

export async function fetchBlogPosts(category?: string): Promise<BlogPost[]> {
  let query = supabase
    .from('js_blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_date', { ascending: false });

  if (category && category !== 'All') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return (data as DbBlogPost[]).map(mapDbBlogPost);
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('js_blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) {
    return null;
  }

  return mapDbBlogPost(data as DbBlogPost);
}

export async function fetchBlogCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('js_blog_posts')
    .select('category')
    .eq('published', true);

  if (error) return [];

  const categories = ['All', ...new Set((data as { category: string }[]).map((d) => d.category))];
  return categories;
}
