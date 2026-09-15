'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Plus, CheckCircle, XCircle, Trash2, Eye } from 'lucide-react';
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

    setProperties((data as PropertyRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { loadProperties(); }, []);

  const handleVerify = async (id: string, verified: boolean) => {
    const supabase = createSupabaseBrowser();
    await supabase.from('js_properties').update({ verified }).eq('id', id);
    loadProperties();
  };

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
          <Eye className="w-3 h-3" />
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
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); handleVerify(item.id, !item.verified); }}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              item.verified ? 'text-green-600 hover:bg-green-500/10' : 'text-[var(--muted)] hover:bg-surface-light'
            }`}
            title={item.verified ? 'Unverify' : 'Verify'}
          >
            <CheckCircle className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(item.id, item.status === 'active' ? 'inactive' : 'active');
            }}
            className="p-1.5 rounded-lg text-[var(--muted)] hover:bg-surface-light transition-colors cursor-pointer"
            title={item.status === 'active' ? 'Deactivate' : 'Activate'}
          >
            <XCircle className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
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
          <Home className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Properties</h1>
          <span className="text-sm text-[var(--muted)]">({properties.length})</span>
        </div>
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
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
