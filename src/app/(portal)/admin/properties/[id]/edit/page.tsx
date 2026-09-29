'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuHouse, LuCircleAlert, LuSave, LuShieldCheck, LuArrowLeft, LuChevronDown, LuChevronUp, LuSearch, LuCircleCheck, LuEye, LuClock } from 'react-icons/lu';
import { GlassCard } from '@/components/ui/GlassCard';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Independent House'];
const FURNISHED_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
const SHARING_TYPES = ['Family', 'Bachelor', 'Any'];
const AMENITY_OPTIONS = ['WiFi', 'Gym', 'Parking', 'Power Backup', 'Pool', 'Security', 'Water Purifier', 'AC', 'Lift'];

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState('');
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [seoOpen, setSeoOpen] = useState(false);
  const [form, setForm] = useState({
    title: '', location: '', area: '', price: '', bhk: '', sqft: '',
    type: 'Apartment', furnished: 'Semi-Furnished', description: '',
    deposit: '', floor: '', facing: 'East', sharingType: 'Family',
    amenities: [] as string[], available: true,
    seoTitle: '', seoDescription: '', seoKeywords: '',
  });

  const loadProperty = async () => {
    const supabase = createSupabaseBrowser();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('js_properties')
      .select('*')
      .eq('id', id)
      .single();

    if (data) {
      setStatus(data.status || 'pending');
      setImages(data.images || []);
      setUpdatedAt(data.updated_at || null);
      setForm({
        title: data.title, location: data.location, area: data.area,
        price: data.price.toString(), bhk: data.bhk.toString(), sqft: data.sqft.toString(),
        type: data.type, furnished: data.furnished, description: data.description,
        deposit: data.deposit.toString(), floor: data.floor, facing: data.facing,
        sharingType: data.sharing_type, amenities: data.amenities || [],
        available: data.available,
        seoTitle: data.seo_title || '', seoDescription: data.seo_description || '',
        seoKeywords: data.seo_keywords || '',
      });
    }
    setFetching(false);
  };

  useEffect(() => { loadProperty(); }, [id]);

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaved(false);
    setLoading(true);

    const res = await fetch('/api/admin/properties/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        title: form.title, location: form.location, area: form.area,
        price: form.price, bhk: form.bhk, sqft: form.sqft,
        type: form.type, furnished: form.furnished, description: form.description,
        deposit: form.deposit, floor: form.floor, facing: form.facing,
        sharing_type: form.sharingType, amenities: form.amenities,
        available: form.available, status,
        images: images.length > 0 ? images : ['/images/scene-1.png'],
        seo_title: form.seoTitle, seo_description: form.seoDescription,
        seo_keywords: form.seoKeywords,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.error || 'Failed to save property');
      setLoading(false);
      return;
    }

    // Use the returned property data directly (saved via admin client)
    if (result.property) {
      setUpdatedAt(result.property.updated_at || new Date().toISOString());
    }
    setSaved(true);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted)]">Loading property...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-surface-light cursor-pointer">
          <LuArrowLeft className="w-5 h-5" />
        </button>
        <LuHouse className="w-6 h-6 text-[#006194]" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Edit Property</h1>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
          <LuCircleAlert className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {saved && (
        <div className="mb-4 flex items-center justify-between p-3 rounded-xl bg-green-500/10 text-green-600 text-sm">
          <div className="flex items-center gap-2">
            <LuCircleCheck className="w-4 h-4 shrink-0" />
            Property saved successfully.
            {updatedAt && (
              <span className="flex items-center gap-1 text-xs text-green-600/70">
                <LuClock className="w-3 h-3" />
                {new Date(updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}, {new Date(updatedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
          <Link href={`/properties/${id}`} target="_blank"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors text-xs font-semibold">
            <LuEye className="w-3.5 h-3.5" />
            View Property
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <GlassCard hover={false}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Title</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Location</label>
                <input type="text" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Area</label>
                <input type="text" required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Rent (₹/mo)</label>
                <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">BHK</label>
                <input type="number" required value={form.bhk} onChange={(e) => setForm({ ...form, bhk: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Sqft</label>
                <input type="number" required value={form.sqft} onChange={(e) => setForm({ ...form, sqft: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Deposit</label>
                <input type="number" value={form.deposit} onChange={(e) => setForm({ ...form, deposit: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer">
                  {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Furnished</label>
                <select value={form.furnished} onChange={(e) => setForm({ ...form, furnished: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer">
                  {FURNISHED_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Sharing</label>
                <select value={form.sharingType} onChange={(e) => setForm({ ...form, sharingType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer">
                  {SHARING_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light resize-none" />
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {AMENITY_OPTIONS.map((a) => (
                  <button key={a} type="button" onClick={() => toggleAmenity(a)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      form.amenities.includes(a) ? 'bg-[#006194] text-white' : 'bg-surface-light text-[var(--muted)]'
                    }`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-3 block">Property Images</label>
              <ImageUpload images={images} onChange={setImages} folder="owner" />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.checked })}
                  className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Available for rent</span>
              </label>
            </div>
            {/* SEO Settings */}
            <div className="border border-glass-border rounded-xl overflow-hidden">
              <button type="button" onClick={() => setSeoOpen(!seoOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-surface-light hover:bg-surface-light/80 transition-colors cursor-pointer">
                <div className="flex items-center gap-2">
                  <LuSearch className="w-4 h-4 text-[#006194]" />
                  <span className="text-sm font-semibold">SEO Settings</span>
                  {(form.seoTitle || form.seoDescription || form.seoKeywords) && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">Configured</span>
                  )}
                </div>
                {seoOpen ? <LuChevronUp className="w-4 h-4" /> : <LuChevronDown className="w-4 h-4" />}
              </button>
              {seoOpen && (
                <div className="p-4 space-y-4 border-t border-glass-border">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      SEO Title <span className="text-[var(--muted)]">({form.seoTitle.length}/60)</span>
                    </label>
                    <input type="text" value={form.seoTitle}
                      onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                      placeholder={form.title || 'Custom search engine title'}
                      className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
                    <p className="text-xs text-[var(--muted)] mt-1">Leave blank to auto-generate from property title</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      SEO Description <span className="text-[var(--muted)]">({form.seoDescription.length}/160)</span>
                    </label>
                    <textarea value={form.seoDescription}
                      onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                      placeholder={form.description?.slice(0, 160) || 'Custom search engine description'}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light resize-none" />
                    <p className="text-xs text-[var(--muted)] mt-1">Leave blank to auto-generate from property description</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">SEO Keywords</label>
                    <input type="text" value={form.seoKeywords}
                      onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })}
                      placeholder="e.g. 2bhk, whitefield, furnished apartment"
                      className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
                    <p className="text-xs text-[var(--muted)] mt-1">Comma-separated keywords for search engines</p>
                  </div>
                  {/* Google Preview */}
                  <div className="p-4 rounded-xl bg-surface-light">
                    <p className="text-xs text-[var(--muted)] mb-2">Google Preview</p>
                    <p className="text-[#1a0dab] text-base font-medium truncate">
                      {form.seoTitle || (form.title ? `${form.title} | JusRental` : 'Page Title')}
                    </p>
                    <p className="text-green-700 text-xs">https://jusrental.com/properties/{id}</p>
                    <p className="text-sm text-[var(--muted)] line-clamp-2 mt-0.5">
                      {form.seoDescription || form.description?.slice(0, 160) || 'Property description...'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={loading}
                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-[#006194] text-white font-semibold cursor-pointer disabled:opacity-50">
                <LuSave className="w-4 h-4" />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </GlassCard>
      </form>
    </div>
  );
}
