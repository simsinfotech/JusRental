'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuHouse, LuPlus, LuEye, LuMapPin, LuTrash2 } from 'react-icons/lu';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

interface PropertyRow {
  id: string;
  title: string;
  location: string;
  area: string;
  price: number;
  bhk: number;
  sqft: number;
  status: string;
  verified: boolean;
  views_count: number;
}

export default function OwnerPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProperties = async () => {
    const supabase = createSupabaseBrowser();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('js_properties')
      .select('id, title, location, area, price, bhk, sqft, status, verified, views_count')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });

    setProperties((data as PropertyRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { loadProperties(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    const supabase = createSupabaseBrowser();
    await supabase.from('js_properties').delete().eq('id', id);
    loadProperties();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted)]">Loading properties...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <LuHouse className="w-6 h-6 text-[#006194]" />
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">My Properties</h1>
        </div>
        <Link
          href="/owner/properties/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006194] text-white font-medium text-sm shadow-lg shadow-[#006194]/25 hover:shadow-[#006194]/40 transition-all"
        >
          <LuPlus className="w-4 h-4" />
          Add Property
        </Link>
      </div>

      {properties.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {properties.map((p) => (
            <GlassCard key={p.id} hover={false}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-heading)]">{p.title}</h3>
                  <p className="text-sm text-[var(--muted)] flex items-center gap-1 mt-1">
                    <LuMapPin className="w-3 h-3" />
                    {p.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  {p.verified && <Badge variant="success">Verified</Badge>}
                  <Badge variant={p.status === 'active' ? 'info' : p.status === 'pending' ? 'warning' : 'default'}>
                    {p.status === 'pending' ? 'Pending Approval' : p.status || 'active'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-[var(--muted)] mb-4">
                <span>{p.bhk} BHK</span>
                <span>|</span>
                <span>{p.sqft} sqft</span>
                <span>|</span>
                <span>₹{p.price.toLocaleString()}/mo</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-glass-border">
                <span className="flex items-center gap-1 text-sm text-[var(--muted)]">
                  <LuEye className="w-3.5 h-3.5" />
                  {p.views_count || 0} views
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 font-medium cursor-pointer"
                  >
                    <LuTrash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                  <Link
                    href={`/owner/properties/${p.id}/edit`}
                    className="text-sm text-[#006194] font-medium hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <GlassCard hover={false} className="text-center py-12">
          <LuHouse className="w-12 h-12 mx-auto text-[var(--muted)] mb-4" />
          <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
          <p className="text-[var(--muted)] mb-4">Add your first property to start getting tenants.</p>
          <Link
            href="/owner/properties/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#006194] text-white font-medium"
          >
            <LuPlus className="w-4 h-4" />
            Add Property
          </Link>
        </GlassCard>
      )}
    </div>
  );
}
