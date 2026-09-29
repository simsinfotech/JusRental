'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuHouse, LuPlus, LuEye, LuMapPin, LuTrash2, LuShieldCheck, LuCircleCheck, LuCircleX, LuSearch, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

const PAGE_SIZE = 12;

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
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const loadProperties = async () => {
    const supabase = createSupabaseBrowser();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('js_properties')
      .select('id, title, location, area, price, bhk, sqft, status, verified, views_count')
      .order('created_at', { ascending: false });

    setProperties(((data as PropertyRow[]) || []).map((p) => ({ ...p, status: p.status || 'active' })));
    setLoading(false);
  };

  useEffect(() => { loadProperties(); }, []);

  // Filter by search
  const filtered = useMemo(() => {
    if (!search.trim()) return properties;
    const q = search.toLowerCase();
    return properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q)
    );
  }, [properties, search]);

  // Reset to page 1 when search changes
  useEffect(() => { setPage(1); }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleStatusChange = async (id: string, status: string) => {
    const res = await fetch('/api/properties/update-status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to update status');
      return;
    }
    loadProperties();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    const res = await fetch('/api/properties/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to delete property');
      return;
    }
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <LuHouse className="w-6 h-6 text-[#006194]" />
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">All Properties</h1>
          <span className="text-sm text-[var(--muted)]">({filtered.length})</span>
        </div>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006194] text-white font-medium text-sm shadow-lg shadow-[#006194]/25 hover:shadow-[#006194]/40 transition-all"
        >
          <LuPlus className="w-4 h-4" />
          Add Property
        </Link>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, location, or area..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194]/30 transition-all text-sm"
        />
      </div>

      {paginated.length > 0 ? (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            {paginated.map((p) => (
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
                      {p.status === 'pending' ? 'Pending Approval' : p.status}
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
                  <div className="flex items-center gap-2">
                    {p.status === 'pending' ? (
                      <button
                        onClick={() => handleStatusChange(p.id, 'active')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors cursor-pointer text-xs font-semibold shadow-sm"
                      >
                        <LuShieldCheck className="w-3.5 h-3.5" />
                        Approve
                      </button>
                    ) : p.status === 'active' ? (
                      <button
                        onClick={() => handleStatusChange(p.id, 'inactive')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 transition-colors cursor-pointer text-xs font-medium"
                      >
                        <LuCircleX className="w-3.5 h-3.5" />
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(p.id, 'active')}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors cursor-pointer text-xs font-medium"
                      >
                        <LuCircleCheck className="w-3.5 h-3.5" />
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors cursor-pointer text-xs font-medium"
                    >
                      <LuTrash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                    <Link
                      href={`/admin/properties/${p.id}/edit`}
                      className="text-sm text-[#006194] font-medium hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-glass-border">
              <p className="text-sm text-[var(--muted)]">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg hover:bg-surface-light transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <LuChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | 'ellipsis')[]>((acc, p, i, arr) => {
                    if (i > 0 && p - (arr[i - 1]) > 1) acc.push('ellipsis');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, i) =>
                    item === 'ellipsis' ? (
                      <span key={`e${i}`} className="px-1 text-[var(--muted)]">...</span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => setPage(item)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          page === item
                            ? 'bg-[#006194] text-white'
                            : 'hover:bg-surface-light text-[var(--muted)]'
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg hover:bg-surface-light transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <LuChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <GlassCard hover={false} className="text-center py-12">
          {search.trim() ? (
            <>
              <LuSearch className="w-12 h-12 mx-auto text-[var(--muted)] mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-[var(--muted)] mb-4">Try a different search term.</p>
            </>
          ) : (
            <>
              <LuHouse className="w-12 h-12 mx-auto text-[var(--muted)] mb-4" />
              <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
              <p className="text-[var(--muted)] mb-4">Add your first property to start getting tenants.</p>
              <Link
                href="/admin/properties/new"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#006194] text-white font-medium"
              >
                <LuPlus className="w-4 h-4" />
                Add Property
              </Link>
            </>
          )}
        </GlassCard>
      )}
    </div>
  );
}
