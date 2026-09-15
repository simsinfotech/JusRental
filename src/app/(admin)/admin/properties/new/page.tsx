'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, Save, AlertCircle, ArrowLeft } from 'lucide-react';
import { createSupabaseBrowser } from '@/lib/supabase-browser';
import { ImageUpload } from '@/components/ui/ImageUpload';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Independent House'];
const FURNISHED_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
const SHARING_TYPES = ['Family', 'Bachelor', 'Any'];
const FACING_OPTIONS = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];
const AMENITY_OPTIONS = ['WiFi', 'Gym', 'Parking', 'Power Backup', 'Pool', 'Security', 'Water Purifier', 'AC', 'Lift'];

export default function AdminAddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: '', location: '', area: '', price: '', bhk: '', sqft: '',
    type: 'Apartment', furnished: 'Semi-Furnished', description: '',
    deposit: '', floor: '', facing: 'East', sharingType: 'Family',
    amenities: [] as string[],
  });

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
    setLoading(true);

    const supabase = createSupabaseBrowser();
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      + '-' + Date.now().toString(36);

    const { error: insertError } = await supabase.from('js_properties').insert({
      title: form.title, location: form.location, area: form.area,
      price: parseInt(form.price), bhk: parseInt(form.bhk), sqft: parseInt(form.sqft),
      type: form.type, furnished: form.furnished, description: form.description,
      deposit: parseInt(form.deposit) || parseInt(form.price) * 2,
      floor: form.floor, facing: form.facing,
      sharing_type: form.sharingType, amenities: form.amenities,
      images: images.length > 0 ? images : ['/images/scene-1.png'],
      nearby_places: [], slug,
      status: 'active', verified: true, available: true,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/properties');
    router.refresh();
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-surface-light cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Home className="w-6 h-6 text-red-600" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Add Property</h1>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Title *</label>
          <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Location *</label>
            <input type="text" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Area *</label>
            <input type="text" required value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Rent (₹/mo) *</label>
            <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">BHK *</label>
            <input type="number" required value={form.bhk} onChange={(e) => setForm({ ...form, bhk: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Sqft *</label>
            <input type="number" required value={form.sqft} onChange={(e) => setForm({ ...form, sqft: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Deposit</label>
            <input type="number" value={form.deposit} onChange={(e) => setForm({ ...form, deposit: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light" />
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
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
            <label className="text-sm font-medium mb-1.5 block">Facing</label>
            <select value={form.facing} onChange={(e) => setForm({ ...form, facing: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer">
              {FACING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
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
                  form.amenities.includes(a) ? 'bg-blue-500 text-white' : 'bg-surface-light text-[var(--muted)]'
                }`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">Images</label>
          <ImageUpload images={images} onChange={setImages} folder="admin" />
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold cursor-pointer disabled:opacity-50">
            <Save className="w-4 h-4" />
            {loading ? 'Creating...' : 'Create Property'}
          </button>
        </div>
      </form>
    </div>
  );
}
