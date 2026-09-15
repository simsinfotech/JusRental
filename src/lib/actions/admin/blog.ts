'use server';

import { createSupabaseServer } from '@/lib/supabase-ssr';

export async function fetchAdminBlogPosts() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('js_blog_posts')
    .select('*')
    .order('published_date', { ascending: false });

  return { data: data || [], error: error?.message };
}

export async function fetchAdminBlogPost(id: string) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('js_blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error: error?.message };
}

export async function createBlogPost(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  cover_image: string;
  read_time: number;
  status?: string;
}) {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('js_blog_posts')
    .insert({
      ...post,
      published_date: new Date().toISOString().slice(0, 10),
    })
    .select()
    .single();

  return { data, error: error?.message };
}

export async function updateBlogPost(id: string, updates: Record<string, unknown>) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('js_blog_posts')
    .update(updates)
    .eq('id', id);

  return { error: error?.message };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('js_blog_posts')
    .delete()
    .eq('id', id);

  return { error: error?.message };
}
