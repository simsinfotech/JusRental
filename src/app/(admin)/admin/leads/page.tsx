'use client';

import { useEffect, useState } from 'react';
import { Users, Phone, Mail, MessageSquare, Calendar, Download, User } from 'lucide-react';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

type Tab = 'contacts' | 'visits' | 'listings';
type LeadRow = Record<string, unknown>;

const STATUS_FLOW = ['new', 'read', 'responded', 'closed'];

export default function AdminLeadsPage() {
  const [tab, setTab] = useState<Tab>('contacts');
  const [contacts, setContacts] = useState<LeadRow[]>([]);
  const [visits, setVisits] = useState<LeadRow[]>([]);
  const [listings, setListings] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    const supabase = createSupabaseBrowser();
    const [c, v, l] = await Promise.all([
      supabase.from('js_contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('js_book_visit_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('js_property_listing_requests').select('*').order('created_at', { ascending: false }),
    ]);
    setContacts(c.data || []);
    setVisits(v.data || []);
    setListings(l.data || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const updateStatus = async (table: string, id: string, status: string) => {
    const supabase = createSupabaseBrowser();
    await supabase.from(table).update({ status }).eq('id', id);
    loadData();
  };

  const exportCSV = () => {
    const data = tab === 'contacts' ? contacts : tab === 'visits' ? visits : listings;
    if (data.length === 0) return;

    const keys = Object.keys(data[0]);
    const csv = [
      keys.join(','),
      ...data.map((row) => keys.map((k) => `"${String(row[k] ?? '').replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { key: 'contacts' as Tab, label: 'Contact Submissions', count: contacts.length },
    { key: 'visits' as Tab, label: 'Visit Requests', count: visits.length },
    { key: 'listings' as Tab, label: 'Listing Requests', count: listings.length },
  ];

  const currentData = tab === 'contacts' ? contacts : tab === 'visits' ? visits : listings;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[var(--muted)]">Loading leads...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">Leads</h1>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-glass-border text-sm font-medium hover:bg-surface-light transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-surface-light rounded-xl p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              tab === t.key
                ? 'bg-[var(--background)] shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Lead cards */}
      <div className="space-y-3">
        {currentData.length > 0 ? (
          currentData.map((lead) => (
            <div key={lead.id as string} className="glass-card p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{lead.name as string}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {new Date(lead.created_at as string).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <StatusBadge status={(lead.status as string) || 'new'} />
              </div>

              <div className="grid sm:grid-cols-2 gap-2 text-sm mb-3">
                {lead.phone ? (
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <Phone className="w-3.5 h-3.5" />
                    <a href={`tel:${lead.phone}`} className="hover:text-blue-600">{String(lead.phone)}</a>
                  </div>
                ) : null}
                {lead.email ? (
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <Mail className="w-3.5 h-3.5" />
                    <a href={`mailto:${lead.email}`} className="hover:text-blue-600">{String(lead.email)}</a>
                  </div>
                ) : null}
                {lead.preferred_date ? (
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <Calendar className="w-3.5 h-3.5" />
                    {String(lead.preferred_date)}{lead.preferred_time ? ` at ${String(lead.preferred_time)}` : ''}
                  </div>
                ) : null}
                {lead.subject ? (
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {String(lead.subject)}
                  </div>
                ) : null}
              </div>

              {lead.message ? (
                <p className="text-sm text-[var(--muted)] bg-surface-light rounded-lg p-3 mb-3">
                  {String(lead.message)}
                </p>
              ) : null}

              {/* Status flow buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-glass-border">
                <span className="text-xs text-[var(--muted)] mr-2">Update:</span>
                {STATUS_FLOW.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      const table = tab === 'contacts'
                        ? 'js_contact_submissions'
                        : tab === 'visits'
                        ? 'js_book_visit_requests'
                        : 'js_property_listing_requests';
                      updateStatus(table, lead.id as string, s);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer capitalize ${
                      lead.status === s
                        ? 'bg-blue-500 text-white'
                        : 'bg-surface-light text-[var(--muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card p-8 text-center">
            <Users className="w-12 h-12 mx-auto text-[var(--muted)] mb-3" />
            <p className="text-[var(--muted)]">No {tab} yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
