'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LuHouse, LuPlus, LuCircleCheck, LuCircleX, LuTrash2, LuEye, LuShieldCheck } from 'react-icons/lu';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

interface PropertyRow {
  id: string;
  title: string;
  location: string;
  area: string;
  price: number;
  bhk: number;
  type: string;
  status: string;
  verified: boolean;
  views_count: number;
  created_at: string;
  [key: string]: unknown;
}

export default function AdminPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProperties = async () => {
    const supabase = createSupabaseBrowser();
    const { data } = await supabase
      .from('js_properties')
      .select('id, title, location, area, price, bhk, type, status, verified, views_count, created_at')
      .order('created_at', { ascending: false });

    // Normalize null/undefined status to 'pending'
    const normalized = ((data as PropertyRow[]) || []).map((p) => ({
      ...p,
      status: p.status || 'pending',
    }));
    setProperties(normalized);
    setLoading(false);
  };

  useEffect(() => { loadProperties(); }, []);

  const handleStatusChange = async (id: string, status: string) => {
    const supabase = createSupabaseBrowser();
    await supabase.from('js_properties').update({ status }).eq('id', id);
    loadProperties();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    const supabase = createSupabaseBrowser();
    await supabase.from('js_properties').delete().eq('id', id);
    loadProperties();
  };

  const columns = [
    {
      key: 'title',
      label: 'Property',
      sortable: true,
      render: (item: PropertyRow) => (
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-[var(--muted)]">{item.location}</p>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Rent',
      sortable: true,
      render: (item: PropertyRow) => <span>₹{item.price.toLocaleString()}/mo</span>,
    },
    {
      key: 'bhk',
      label: 'BHK',
      sortable: true,
      render: (item: PropertyRow) => <span>{item.bhk} BHK · {item.type}</span>,
    },
    {
      key: 'views_count',
      label: 'Views',
      sortable: true,
      render: (item: PropertyRow) => (
        <span className="flex items-center gap-1 text-[var(--muted)]">
          <LuEye className="w-3 h-3" />
          {item.views_count || 0}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item: PropertyRow) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={item.status || 'active'} />
          {item.verified && <StatusBadge status="verified" />}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item: PropertyRow) => (
        <div className="flex items-center gap-2">
          {item.status === 'pending' ? (
            <button
              onClick={(e) => { e.stopPropagation(); handleStatusChange(item.id, 'active'); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors cursor-pointer text-xs font-semibold shadow-sm"
              title="Approve property — makes it visible on the website"
            >
              <LuShieldCheck className="w-4 h-4" />
              Approve
            </button>
          ) : item.status === 'active' ? (
            <button
              onClick={(e) => { e.stopPropagation(); handleStatusChange(item.id, 'inactive'); }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 transition-colors cursor-pointer text-xs font-medium"
              title="Deactivate — hides from the website"
            >
              <LuCircleX className="w-3.5 h-3.5" />
              Deactivate
            </button>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); handleStatusChange(item.id, 'active'); }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors cursor-pointer text-xs font-medium"
              title="Activate — makes it visible on the website"
            >
              <LuCircleCheck className="w-3.5 h-3.5" />
              Activate
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors cursor-pointer text-xs font-medium"
            title="Delete property permanently"
          >
            <LuTrash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      ),
    },
  ];

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
          <LuHouse className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Properties</h1>
          <span className="text-sm text-[var(--muted)]">({properties.length})</span>
        </div>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium text-sm"
        >
          <LuPlus className="w-4 h-4" />
          Add Property
        </Link>
      </div>

      <DataTable
        data={properties}
        columns={columns}
        searchKeys={['title', 'location', 'area']}
        onRowClick={(item) => router.push(`/admin/properties/${item.id}`)}
      />
    </div>
  );
}
