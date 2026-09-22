'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuHouse, LuSave, LuCircleAlert, LuArrowLeft, LuCircleCheck, LuExternalLink, LuPhone, LuBuilding2, LuMaximize2, LuCompass, LuSparkles, LuCalendar } from 'react-icons/lu';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Independent House'];
const FURNISHED_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
const SHARING_TYPES = ['Family', 'Bachelor', 'Any'];
const FACING_OPTIONS = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];
const STATUS_OPTIONS = ['active', 'pending', 'inactive'];
const AMENITY_OPTIONS = ['WiFi', 'Gym', 'Parking', 'Power Backup', 'Pool', 'Security', 'Water Purifier', 'AC', 'Lift'];

export default function AdminPropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: '',
    location: '',
    area: '',
    price: '',
    bhk: '',
    sqft: '',
    deposit: '',
    type: 'Apartment',
    furnished: 'Semi-Furnished',
    floor: '',
    facing: 'East',
    sharingType: 'Family',
    description: '',
    amenities: [] as string[],
    available: true,
    verified: false,
    status: 'active',
    ownerPhone: '',
    verificationFee: '599',
    concierge: 'JusRental Team',
  });

  useEffect(() => {
    const load = async () => {
      const supabase = createSupabaseBrowser();
      const { data, error } = await supabase
        .from('js_properties')
        .select('*')
        .eq('id', id)
        .single();

      if (data) {
        setImages(data.images || []);
        setForm({
          title: data.title || '',
          location: data.location || '',
          area: data.area || '',
          price: (data.price || '').toString(),
          bhk: (data.bhk || '').toString(),
          sqft: (data.sqft || '').toString(),
          deposit: (data.deposit || '').toString(),
          type: data.type || 'Apartment',
          furnished: data.furnished || 'Semi-Furnished',
          floor: data.floor || '',
          facing: data.facing || 'East',
          sharingType: data.sharing_type || 'Family',
          description: data.description || '',
          amenities: data.amenities || [],
          available: data.available ?? true,
          verified: data.verified ?? false,
          status: data.status || 'active',
          ownerPhone: data.owner_phone || '',
          verificationFee: (data.verification_fee ?? 599).toString(),
          concierge: data.concierge_name || 'JusRental Team',
        });
      } else if (error) {
        setMessage({ type: 'error', text: error.message });
      }
      setFetching(false);
    };
    load();
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
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/properties/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title: form.title,
          location: form.location,
          area: form.area,
          price: form.price,
          bhk: form.bhk,
          sqft: form.sqft,
          deposit: form.deposit,
          type: form.type,
          furnished: form.furnished,
          floor: form.floor,
          facing: form.facing,
          sharing_type: form.sharingType,
          description: form.description,
          amenities: form.amenities,
          images: images.length > 0 ? images : ['/images/scene-1.png'],
          available: form.available,
          verified: form.verified,
          status: form.status,
          owner_phone: form.ownerPhone || null,
          verification_fee: parseInt(form.verificationFee || '599', 10),
          concierge_name: form.concierge || 'JusRental Team',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update property.');
      }

      setMessage({ type: 'success', text: 'Property updated successfully! All changes are live.' });
    } catch (err: unknown) {
      console.error('Submit error:', err);
      const msg = err instanceof Error ? err.message : 'Error updating property.';
      setMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted)]">Loading property...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      {/* Header with back button & Live view */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-surface-light cursor-pointer">
            <LuArrowLeft className="w-5 h-5" />
          </button>
          <LuHouse className="w-6 h-6 text-red-600" />
          <div>
            <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Edit Property (Admin)</h1>
            <p className="text-xs text-[var(--muted)]">ID: {id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/properties/${id}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-light hover:bg-surface-lighter text-sm font-medium transition-colors"
          >
            <LuExternalLink className="w-4 h-4 text-[#006194]" />
            View Live on Website
          </Link>
        </div>
      </div>

      {message && (
        <div className={`mb-6 flex items-center justify-between gap-2 p-4 rounded-xl text-sm ${
          message.type === 'error'
            ? 'bg-red-500/10 text-red-600 border border-red-500/20'
            : 'bg-green-500/10 text-green-600 border border-green-500/20'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'error' ? <LuCircleAlert className="w-5 h-5 shrink-0" /> : <LuCircleCheck className="w-5 h-5 shrink-0" />}
            <span>{message.text}</span>
          </div>
          {message.type === 'success' && (
            <Link href={`/properties/${id}`} target="_blank" className="font-semibold underline ml-2">
              Preview Page →
            </Link>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-base font-semibold border-b border-glass-border pb-3 flex items-center gap-2">
            <LuBuilding2 className="w-4 h-4 text-[#006194]" />
            Basic Property Information
          </h2>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Property Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
              placeholder="e.g. Prestige Lake Ridge 3BHK"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Location Address *</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                placeholder="e.g. Hennur Main Road, Hennur"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Neighbourhood / Area *</label>
              <input
                type="text"
                required
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                placeholder="e.g. Hennur"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Key Specifications */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-base font-semibold border-b border-glass-border pb-3 flex items-center gap-2">
            <LuMaximize2 className="w-4 h-4 text-[#006194]" />
            Pricing & Specifications
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Rent (₹/month) *</label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light font-semibold text-[#006194]"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Security Deposit (₹)</label>
              <input
                type="number"
                value={form.deposit}
                onChange={(e) => setForm({ ...form, deposit: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                placeholder="e.g. 150000"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">BHK Configuration *</label>
              <input
                type="number"
                required
                value={form.bhk}
                onChange={(e) => setForm({ ...form, bhk: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Super Built-up (sqft) *</label>
              <input
                type="number"
                required
                value={form.sqft}
                onChange={(e) => setForm({ ...form, sqft: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Property Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer"
              >
                {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Furnishing Grade</label>
              <select
                value={form.furnished}
                onChange={(e) => setForm({ ...form, furnished: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer"
              >
                {FURNISHED_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Floor Level</label>
              <input
                type="text"
                value={form.floor}
                onChange={(e) => setForm({ ...form, floor: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                placeholder="e.g. Floor 10 or 7th of 14"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Facing Direction</label>
              <select
                value={form.facing}
                onChange={(e) => setForm({ ...form, facing: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer"
              >
                {FACING_OPTIONS.map((fc) => <option key={fc} value={fc}>{fc}</option>)}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Tenant Preference</label>
              <select
                value={form.sharingType}
                onChange={(e) => setForm({ ...form, sharingType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer"
              >
                {SHARING_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Listing Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer"
              >
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Owner Contact Phone</label>
              <input
                type="text"
                value={form.ownerPhone}
                onChange={(e) => setForm({ ...form, ownerPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                placeholder="e.g. +91 9876543210"
              />
            </div>
          </div>

          <div className="flex items-center gap-8 pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => setForm({ ...form, available: e.target.checked })}
                className="w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
              />
              <span className="text-sm font-medium">Ready to Occupy (Available)</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.verified}
                onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                className="w-4 h-4 rounded text-green-600 focus:ring-green-600"
              />
              <span className="text-sm font-medium text-green-700">Verified by JusRental</span>
            </label>
          </div>
        </div>

        {/* Section 3: Description & Amenities */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-base font-semibold border-b border-glass-border pb-3 flex items-center gap-2">
            <LuSparkles className="w-4 h-4 text-[#006194]" />
            Description & Amenities
          </h2>

          <div>
            <label className="text-sm font-medium mb-1.5 block">About This Property (Description)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light resize-none"
              placeholder="Describe apartment interiors, ventilation, floor plan, modular kitchen, etc."
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">Community & In-Unit Amenities</label>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    form.amenities.includes(a)
                      ? 'bg-[#006194] text-white shadow-sm'
                      : 'bg-surface-light text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3b: Booking Card Settings */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-base font-semibold border-b border-glass-border pb-3 flex items-center gap-2">
            <LuCalendar className="w-4 h-4 text-[#006194]" />
            Booking Card Settings
            <span className="ml-auto text-xs font-normal text-[var(--muted)] bg-surface-light px-2 py-0.5 rounded-lg">Visible on property page sidebar</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">JusRental Verification Fee (₹)</label>
              <input
                type="number"
                value={form.verificationFee}
                onChange={(e) => setForm({ ...form, verificationFee: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light font-semibold text-[#006194]"
                placeholder="e.g. 599"
                min="0"
              />
              <p className="text-xs text-[var(--muted)] mt-1">Shown as &ldquo;JusRental Verification Fee&rdquo; in booking card. Default: ₹599</p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Assigned Concierge Name</label>
              <input
                type="text"
                value={form.concierge}
                onChange={(e) => setForm({ ...form, concierge: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                placeholder="e.g. JusRental Team"
              />
              <p className="text-xs text-[var(--muted)] mt-1">Displayed in the concierge card below the visit scheduler.</p>
            </div>
          </div>
        </div>

        {/* Section 4: Property Images */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-base font-semibold border-b border-glass-border pb-3 flex items-center gap-2">
            <LuHouse className="w-4 h-4 text-[#006194]" />
            Property Images & Cover Photo
          </h2>

          <ImageUpload
            images={images}
            onChange={setImages}
            folder="admin"
            maxFiles={12}
          />
        </div>

        {/* Submit action */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-xl border border-glass-border text-sm font-medium hover:bg-surface-light cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold shadow-md cursor-pointer disabled:opacity-50 transition-all"
          >
            <LuSave className="w-5 h-5" />
            {loading ? 'Saving Changes...' : 'Save & Publish Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
