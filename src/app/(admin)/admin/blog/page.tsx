'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

interface BlogRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  published_date: string;
  read_time: number;
  status?: string;
  [key: string]: unknown;
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    const supabase = createSupabaseBrowser();
    const { data } = await supabase
      .from('js_blog_posts')
      .select('id, title, slug, category, author, published_date, read_time, status')
      .order('published_date', { ascending: false });

    setPosts((data as BlogRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  const togglePublish = async (id: string, currentStatus: string) => {
    const supabase = createSupabaseBrowser();
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    await supabase.from('js_blog_posts').update({ status: newStatus }).eq('id', id);
    loadPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    const supabase = createSupabaseBrowser();
    await supabase.from('js_blog_posts').delete().eq('id', id);
    loadPosts();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted)]">Loading posts...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Blog Posts</h1>
          <span className="text-sm text-[var(--muted)]">({posts.length})</span>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="glass-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{post.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm text-[var(--muted)]">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{post.author}</span>
                  <span>·</span>
                  <span>{post.read_time} min read</span>
                  <span>·</span>
                  <span>{new Date(post.published_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <StatusBadge status={post.status || 'published'} />
              </div>
            </div>

            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-glass-border">
              <button
                onClick={() => togglePublish(post.id, post.status || 'published')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-surface-light transition-all cursor-pointer text-[var(--muted)]"
              >
                {post.status === 'draft' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {post.status === 'draft' ? 'Publish' : 'Unpublish'}
              </button>
              <button
                onClick={() => router.push(`/admin/blog/${post.id}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-surface-light transition-all cursor-pointer text-[var(--muted)]"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/10 transition-all cursor-pointer text-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="glass-card p-8 text-center">
            <FileText className="w-12 h-12 mx-auto text-[var(--muted)] mb-3" />
            <p className="text-[var(--muted)]">No blog posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
