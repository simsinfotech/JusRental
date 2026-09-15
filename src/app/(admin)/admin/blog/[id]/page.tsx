'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Save, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

const CATEGORIES = ['Renting Tips', 'Market Trends', 'Neighbourhood Guides', 'Legal', 'NRI Corner'];

export default function AdminEditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Renting Tips',
    tags: '',
    coverImage: '',
    readTime: '5',
    status: 'published',
  });

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowser();
      const { data } = await supabase
        .from('js_blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          author: data.author,
          category: data.category,
          tags: (data.tags || []).join(', '),
          coverImage: data.cover_image || '',
          readTime: (data.read_time || 5).toString(),
          status: data.status || 'published',
        });
      }
      setFetching(false);
    };
    load();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const supabase = createSupabaseBrowser();
    const { error } = await supabase
      .from('js_blog_posts')
      .update({
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        author: form.author,
        category: form.category,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        cover_image: form.coverImage,
        read_time: parseInt(form.readTime) || 5,
        status: form.status,
      })
      .eq('id', id);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Post updated.' });
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted)]">Loading post...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-surface-light cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <FileText className="w-6 h-6 text-red-600" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">Edit Post</h1>
      </div>

      {message && (
        <div className={`mb-4 flex items-center gap-2 p-3 rounded-xl text-sm ${
          message.type === 'error' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'
        }`}>
          {message.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Title</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Slug</label>
            <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light font-mono text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light resize-none" />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Author</label>
              <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Read Time (min)</label>
              <input type="number" value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Tags (comma-separated)</label>
              <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Cover Image URL</label>
              <input type="text" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Status</label>
            <div className="flex gap-4">
              {['published', 'draft'].map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="status" value={s} checked={form.status === s}
                    onChange={() => setForm({ ...form, status: s })} className="w-4 h-4" />
                  <span className="text-sm capitalize">{s}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <label className="text-sm font-medium mb-1.5 block">Content (Markdown)</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={20}
            className="w-full px-4 py-3 rounded-xl border border-glass-border bg-surface-light font-mono text-sm resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold cursor-pointer disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
