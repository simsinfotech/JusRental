'use client';

import { useEffect, useState } from 'react';
import { Settings, Save, AlertCircle, CheckCircle, Globe, MessageCircle, Share2 } from 'lucide-react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

interface GeneralSettings {
  siteName: string;
  tagline: string;
  whatsappNumber: string;
}

interface SocialSettings {
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const [general, setGeneral] = useState<GeneralSettings>({
    siteName: 'JusRental',
    tagline: '',
    whatsappNumber: '',
  });

  const [social, setSocial] = useState<SocialSettings>({
    instagram: '',
    facebook: '',
    twitter: '',
    youtube: '',
  });

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowser();
      const { data } = await supabase
        .from('js_site_settings')
        .select('*')
        .in('key', ['general', 'social']);

      data?.forEach((row) => {
        const val = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
        if (row.key === 'general') {
          setGeneral({
            siteName: val.siteName || 'JusRental',
            tagline: val.tagline || '',
            whatsappNumber: val.whatsappNumber || '',
          });
        }
        if (row.key === 'social') {
          setSocial({
            instagram: val.instagram || '',
            facebook: val.facebook || '',
            twitter: val.twitter || '',
            youtube: val.youtube || '',
          });
        }
      });
      setFetching(false);
    };
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const supabase = createSupabaseBrowser();
    const now = new Date().toISOString();

    const [generalRes, socialRes] = await Promise.all([
      supabase.from('js_site_settings').upsert({ key: 'general', value: general, updated_at: now }, { onConflict: 'key' }),
      supabase.from('js_site_settings').upsert({ key: 'social', value: social, updated_at: now }, { onConflict: 'key' }),
    ]);

    if (generalRes.error || socialRes.error) {
      setMessage({ type: 'error', text: generalRes.error?.message || socialRes.error?.message || 'Error saving.' });
    } else {
      setMessage({ type: 'success', text: 'Settings saved.' });
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
        <Settings className="w-6 h-6 text-red-600" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Site Settings</h1>
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
        {/* General Settings */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">General</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Site Name</label>
              <input type="text" value={general.siteName}
                onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Tagline</label>
              <input type="text" value={general.tagline}
                onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-600" />
              WhatsApp Number
            </label>
            <input type="text" value={general.whatsappNumber}
              onChange={(e) => setGeneral({ ...general, whatsappNumber: e.target.value })}
              placeholder="919036317765"
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            <p className="text-xs text-[var(--muted)] mt-1">Include country code without + (e.g., 919036317765)</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Share2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Social Media</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Instagram URL</label>
              <input type="url" value={social.instagram}
                onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Facebook URL</label>
              <input type="url" value={social.facebook}
                onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Twitter/X URL</label>
              <input type="url" value={social.twitter}
                onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                placeholder="https://x.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">YouTube URL</label>
              <input type="url" value={social.youtube}
                onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold cursor-pointer disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
