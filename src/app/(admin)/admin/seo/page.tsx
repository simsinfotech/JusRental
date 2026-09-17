'use client';

import { useEffect, useState } from 'react';
import { LuSearch, LuSave, LuCircleAlert, LuCircleCheck, LuGlobe, LuFileText, LuCode } from 'react-icons/lu';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

interface SeoSettings {
  defaultTitle: string;
  defaultDescription: string;
  gtmContainerId: string;
  searchConsoleCode: string;
}

export default function AdminSEOPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const [form, setForm] = useState<SeoSettings>({
    defaultTitle: '',
    defaultDescription: '',
    gtmContainerId: '',
    searchConsoleCode: '',
  });

  // SEO scores
  const scores = [
    {
      label: 'Title Length',
      check: form.defaultTitle.length >= 30 && form.defaultTitle.length <= 60,
      detail: `${form.defaultTitle.length}/60 chars`,
    },
    {
      label: 'Meta Description',
      check: form.defaultDescription.length >= 120 && form.defaultDescription.length <= 160,
      detail: `${form.defaultDescription.length}/160 chars`,
    },
    {
      label: 'GTM Connected',
      check: form.gtmContainerId.length > 0,
      detail: form.gtmContainerId || 'Not set',
    },
    {
      label: 'Search Console',
      check: form.searchConsoleCode.length > 0,
      detail: form.searchConsoleCode ? 'Configured' : 'Not set',
    },
  ];

  const overallScore = Math.round((scores.filter((s) => s.check).length / scores.length) * 100);

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowser();
      const { data } = await supabase
        .from('js_site_settings')
        .select('*')
        .eq('key', 'seo')
        .single();

      if (data?.value) {
        const val = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
        setForm({
          defaultTitle: val.defaultTitle || '',
          defaultDescription: val.defaultDescription || '',
          gtmContainerId: val.gtmContainerId || '',
          searchConsoleCode: val.searchConsoleCode || '',
        });
      }
      setFetching(false);
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const supabase = createSupabaseBrowser();
    const { error } = await supabase
      .from('js_site_settings')
      .upsert({
        key: 'seo',
        value: form,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' });

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'SEO settings saved.' });
    }
    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted)]">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <LuSearch className="w-6 h-6 text-red-600" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">SEO Management</h1>
      </div>

      {message && (
        <div className={`mb-4 flex items-center gap-2 p-3 rounded-xl text-sm ${
          message.type === 'error' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-600'
        }`}>
          {message.type === 'error' ? <LuCircleAlert className="w-4 h-4" /> : <LuCircleCheck className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      {/* SEO Score */}
      <div className="glass-card p-6 mb-6">
        <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
          SEO Health Score
        </h2>
        <div className="flex items-center gap-6 mb-4">
          <div className={`text-4xl font-bold ${overallScore >= 75 ? 'text-green-600' : overallScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {overallScore}%
          </div>
          <div className="flex-1">
            <div className="h-3 bg-surface-light rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  overallScore >= 75 ? 'bg-green-500' : overallScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${overallScore}%` }}
              />
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {scores.map((score) => (
            <div key={score.label} className="flex items-center gap-3 text-sm">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                score.check ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
              }`}>
                {score.check ? <LuCircleCheck className="w-3 h-3" /> : <LuCircleAlert className="w-3 h-3" />}
              </div>
              <span className="font-medium">{score.label}</span>
              <span className="text-[var(--muted)] ml-auto">{score.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Settings Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <LuGlobe className="w-5 h-5 text-[#006194]" />
            <h2 className="text-lg font-semibold">Default Meta Tags</h2>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Default Title <span className="text-[var(--muted)]">({form.defaultTitle.length}/60)</span>
            </label>
            <input type="text" value={form.defaultTitle}
              onChange={(e) => setForm({ ...form, defaultTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Default Description <span className="text-[var(--muted)]">({form.defaultDescription.length}/160)</span>
            </label>
            <textarea value={form.defaultDescription}
              onChange={(e) => setForm({ ...form, defaultDescription: e.target.value })} rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light resize-none" />
          </div>

          {/* SEO Preview */}
          <div className="p-4 rounded-xl bg-surface-light">
            <p className="text-xs text-[var(--muted)] mb-2">Google Preview</p>
            <p className="text-[#006194] text-base font-medium truncate">{form.defaultTitle || 'Page Title'}</p>
            <p className="text-green-700 text-xs">https://jusrental.com</p>
            <p className="text-sm text-[var(--muted)] line-clamp-2 mt-0.5">{form.defaultDescription || 'Page description...'}</p>
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <LuCode className="w-5 h-5 text-[#006194]" />
            <h2 className="text-lg font-semibold">Tracking & Verification</h2>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">GTM Container ID</label>
            <input type="text" value={form.gtmContainerId}
              onChange={(e) => setForm({ ...form, gtmContainerId: e.target.value })}
              placeholder="GTM-XXXXXXX"
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light font-mono" />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Search Console Verification Code</label>
            <input type="text" value={form.searchConsoleCode}
              onChange={(e) => setForm({ ...form, searchConsoleCode: e.target.value })}
              placeholder="google-site-verification=..."
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light font-mono" />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold cursor-pointer disabled:opacity-50">
            <LuSave className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save SEO Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
