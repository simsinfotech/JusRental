'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { LuHouse, LuCircleAlert, LuSave, LuShieldCheck } from 'react-icons/lu';
import { GlassCard } from '@/components/ui/GlassCard';
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
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    title: '', location: '', area: '', price: '', bhk: '', sqft: '',
    type: 'Apartment', furnished: 'Semi-Furnished', description: '',
    deposit: '', floor: '', facing: 'East', sharingType: 'Family',
    amenities: [] as string[], available: true,
  });

  useEffect(() => {
    const loadProperty = async () => {
      const supabase = createSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('js_properties')
        .select('*')
        .eq('id', id)
        .eq('owner_id', user.id)
        .single();

      if (data) {
        setStatus(data.status || 'pending');
        setForm({
          title: data.title, location: data.location, area: data.area,
          price: data.price.toString(), bhk: data.bhk.toString(), sqft: data.sqft.toString(),
          type: data.type, furnished: data.furnished, description: data.description,
          deposit: data.deposit.toString(), floor: data.floor, facing: data.facing,
          sharingType: data.sharing_type, amenities: data.amenities || [],
          available: data.available,
        });
      }
      setFetching(false);
    };
    loadProperty();
  }, [id]);

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
    const { error: updateError } = await supabase
      .from('js_properties')
      .update({
        title: form.title, location: form.location, area: form.area,
        price: parseInt(form.price), bhk: parseInt(form.bhk), sqft: parseInt(form.sqft),
        type: form.type, furnished: form.furnished, description: form.description,
        deposit: parseInt(form.deposit), floor: form.floor, facing: form.facing,
        sharing_type: form.sharingType, amenities: form.amenities,
        available: form.available,
      })
      .eq('id', id);

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    router.push('/owner/properties');
    router.refresh();
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
        <LuHouse className="w-6 h-6 text-[#006194]" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Edit Property</h1>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
          <LuCircleAlert className="w-4 h-4 shrink-0" />
          {error}
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
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.available}
                  onChange={(e) => setForm({ ...form, available: e.target.checked })}
                  className="w-4 h-4 rounded" />
                <span className="text-sm font-medium">Available for rent</span>
              </label>
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
