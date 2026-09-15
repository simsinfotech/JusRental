import { createSupabaseServer } from '@/lib/supabase-ssr';
import Link from 'next/link';
import { Home, Plus, Eye, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

export default async function OwnerPropertiesPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: properties } = await supabase
    .from('js_properties')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Home className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">My Properties</h1>
        </div>
        <Link
          href="/owner/properties/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Link>
      </div>

      {properties && properties.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {properties.map((p) => (
            <GlassCard key={p.id} hover={false}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-space-grotesk)]">{p.title}</h3>
                  <p className="text-sm text-[var(--muted)] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {p.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  {p.verified && <Badge variant="success">Verified</Badge>}
                  <Badge variant={p.status === 'active' ? 'info' : 'warning'}>
                    {p.status || 'active'}
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
                  <Eye className="w-3.5 h-3.5" />
                  {p.views_count || 0} views
                </span>
                <Link
                  href={`/owner/properties/${p.id}/edit`}
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Edit
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <GlassCard hover={false} className="text-center py-12">
          <Home className="w-12 h-12 mx-auto text-[var(--muted)] mb-4" />
          <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
          <p className="text-[var(--muted)] mb-4">Add your first property to start getting tenants.</p>
          <Link
            href="/owner/properties/new"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Property
          </Link>
        </GlassCard>
      )}
    </div>
  );
}
