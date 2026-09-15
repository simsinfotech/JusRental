'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, MapPin, IndianRupee, ImagePlus, AlertCircle, CheckCircle2, Eye } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Independent House'];
const FURNISHED_OPTIONS = ['Furnished', 'Semi-Furnished', 'Unfurnished'];
const SHARING_TYPES = ['Family', 'Bachelor', 'Any'];
const FACING_OPTIONS = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West'];
const AMENITY_OPTIONS = ['WiFi', 'Gym', 'Parking', 'Power Backup', 'Pool', 'Security', 'Water Purifier', 'AC', 'Lift'];

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);

  const [form, setForm] = useState({
    title: '',
    location: '',
    area: '',
    price: '',
    bhk: '',
    sqft: '',
    type: 'Apartment',
    furnished: 'Semi-Furnished',
    description: '',
    deposit: '',
    floor: '',
    facing: 'East',
    sharingType: 'Family',
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files].slice(0, 5));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createSupabaseBrowser();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('You must be logged in.');
        setLoading(false);
        return;
      }

      // Upload images to Supabase Storage
      const imageUrls: string[] = [];
      for (const file of images) {
        const ext = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file);

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('property-images')
            .getPublicUrl(fileName);
          imageUrls.push(publicUrl);
        }
      }

      // If no images uploaded, use a default
      if (imageUrls.length === 0) {
        imageUrls.push('/images/scene-1.png');
      }

      // Generate slug
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        + '-' + Date.now().toString(36);

      // Insert property
      const { error: insertError } = await supabase.from('js_properties').insert({
        title: form.title,
        location: form.location,
        area: form.area,
        price: parseInt(form.price),
        bhk: parseInt(form.bhk),
        sqft: parseInt(form.sqft),
        type: form.type,
        furnished: form.furnished,
        description: form.description,
        deposit: parseInt(form.deposit) || parseInt(form.price) * 2,
        floor: form.floor,
        facing: form.facing,
        sharing_type: form.sharingType,
        amenities: form.amenities,
        images: imageUrls,
        nearby_places: [],
        owner_id: user.id,
        slug,
        status: 'pending',
        verified: false,
        available: true,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }

      router.push('/owner/properties');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Home className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Add New Property</h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= s
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'bg-surface-light text-[var(--muted)]'
            }`}>
              {s}
            </div>
            {s < 4 && <div className={`w-12 h-0.5 ${step > s ? 'bg-blue-500' : 'bg-surface-light'}`} />}
          </div>
        ))}
        <span className="ml-2 text-sm text-[var(--muted)]">
          {step === 1 ? 'Basic Info' : step === 2 ? 'Details' : step === 3 ? 'Images' : 'Preview'}
        </span>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <GlassCard hover={false}>
            <h2 className="text-lg font-semibold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Property Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Prestige Lake Ridge 3BHK"
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Location *</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Hennur Main Road, Hennur"
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Area *</label>
                  <input
                    type="text"
                    required
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    placeholder="e.g. Hennur"
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Rent (₹/mo) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="25000"
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">BHK *</label>
                  <select
                    required
                    value={form.bhk}
                    onChange={(e) => setForm({ ...form, bhk: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} BHK</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Sqft *</label>
                  <input
                    type="number"
                    required
                    value={form.sqft}
                    onChange={(e) => setForm({ ...form, sqft: e.target.value })}
                    placeholder="1200"
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Deposit (₹)</label>
                  <input
                    type="number"
                    value={form.deposit}
                    onChange={(e) => setForm({ ...form, deposit: e.target.value })}
                    placeholder="50000"
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <GlassCard hover={false}>
            <h2 className="text-lg font-semibold mb-6">Property Details</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
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
                  <label className="text-sm font-medium mb-1.5 block">Furnished</label>
                  <select
                    value={form.furnished}
                    onChange={(e) => setForm({ ...form, furnished: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer"
                  >
                    {FURNISHED_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Floor</label>
                  <input
                    type="text"
                    value={form.floor}
                    onChange={(e) => setForm({ ...form, floor: e.target.value })}
                    placeholder="e.g. 5th of 12"
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Facing</label>
                  <select
                    value={form.facing}
                    onChange={(e) => setForm({ ...form, facing: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer"
                  >
                    {FACING_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Sharing</label>
                  <select
                    value={form.sharingType}
                    onChange={(e) => setForm({ ...form, sharingType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light cursor-pointer"
                  >
                    {SHARING_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  placeholder="Describe your property..."
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-3 block">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITY_OPTIONS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => toggleAmenity(a)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                        form.amenities.includes(a)
                          ? 'bg-blue-500 text-white'
                          : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 rounded-xl border border-glass-border text-sm font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Step 3: Images */}
        {step === 3 && (
          <GlassCard hover={false}>
            <h2 className="text-lg font-semibold mb-6">Property Images</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-glass-border rounded-2xl p-8 text-center">
                <ImagePlus className="w-12 h-12 mx-auto text-[var(--muted)] mb-4" />
                <p className="text-sm text-[var(--muted)] mb-2">Drag & drop images or click to browse</p>
                <p className="text-xs text-[var(--muted)] mb-4">Max 5 images, JPEG/PNG</p>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-light text-sm font-medium cursor-pointer hover:bg-surface-lighter transition-all">
                  <ImagePlus className="w-4 h-4" />
                  Choose Files
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-glass-border">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center cursor-pointer"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl border border-glass-border text-sm font-medium cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Step 4: Preview */}
        {step === 4 && (
          <GlassCard hover={false}>
            <div className="flex items-center gap-2 mb-6">
              <Eye className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Review Your Property</h2>
            </div>

            <h3 className="text-xl font-bold mb-4">{form.title}</h3>

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
              <div>
                <span className="text-xs text-[var(--muted)]">Location</span>
                <p className="font-semibold">{form.location}</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">Area</span>
                <p className="font-semibold">{form.area}</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">Rent</span>
                <p className="font-semibold">₹{Number(form.price).toLocaleString()}/mo</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">BHK</span>
                <p className="font-semibold">{form.bhk} BHK</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">Sqft</span>
                <p className="font-semibold">{form.sqft} sqft</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">Deposit</span>
                <p className="font-semibold">{form.deposit ? `₹${Number(form.deposit).toLocaleString()}` : `₹${(Number(form.price) * 2).toLocaleString()} (2x rent)`}</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">Property Type</span>
                <p className="font-semibold">{form.type}</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">Furnished</span>
                <p className="font-semibold">{form.furnished}</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">Floor</span>
                <p className="font-semibold">{form.floor || '—'}</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">Facing</span>
                <p className="font-semibold">{form.facing}</p>
              </div>
              <div>
                <span className="text-xs text-[var(--muted)]">Sharing Type</span>
                <p className="font-semibold">{form.sharingType}</p>
              </div>
            </div>

            {form.description && (
              <div className="mb-6">
                <span className="text-xs text-[var(--muted)]">Description</span>
                <p className="mt-1 text-sm leading-relaxed">{form.description}</p>
              </div>
            )}

            {form.amenities.length > 0 && (
              <div className="mb-6">
                <span className="text-xs text-[var(--muted)] block mb-2">Amenities</span>
                <div className="flex flex-wrap gap-2">
                  {form.amenities.map((a) => (
                    <span key={a} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-600">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <span className="text-xs text-[var(--muted)] block mb-2">Images</span>
              {images.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="w-20 h-20 rounded-lg overflow-hidden border border-glass-border">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--muted)]">(Default image will be used)</p>
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl border border-glass-border text-sm font-medium cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Property'}
              </button>
            </div>
          </GlassCard>
        )}
      </form>
    </div>
  );
}
