'use client';

import { useEffect, useState } from 'react';
import { LuUsers, LuPhone, LuMail, LuMessageSquare, LuCalendar, LuDownload, LuUser, LuPlus, LuX } from 'react-icons/lu';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

type Tab = 'contacts' | 'visits' | 'listings';
type LeadRow = Record<string, unknown>;

const STATUS_FLOW = ['new', 'read', 'responded', 'closed'];

const TIME_SLOTS = ['10 AM - 1 PM', '2 PM - 5 PM', '5 PM - 8 PM'];

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  property_id: '',
  preferred_date: '',
  preferred_time: '',
  message: '',
  status: 'pending',
};

export default function AdminLeadsPage() {
  const [tab, setTab] = useState<Tab>('contacts');
  const [contacts, setContacts] = useState<LeadRow[]>([]);
  const [visits, setVisits] = useState<LeadRow[]>([]);
  const [listings, setListings] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddVisit, setShowAddVisit] = useState(false);
  const [properties, setProperties] = useState<{ id: string; title: string }[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const loadData = async () => {
    const supabase = createSupabaseBrowser();
    const [c, v, l, p] = await Promise.all([
      supabase.from('js_contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('js_book_visit_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('js_property_listing_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('js_properties').select('id, title').order('title'),
    ]);
    setContacts(c.data || []);
    setVisits(v.data || []);
    setListings(l.data || []);
    setProperties(p.data || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const openAddVisit = () => {
    setForm({ ...emptyForm });
    setSaveError('');
    setShowAddVisit(true);
  };

  const handleAddVisit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setSaveError('Name and phone are required.');
      return;
    }
    setSaving(true);
    setSaveError('');
    const supabase = createSupabaseBrowser();
    const payload: Record<string, string> = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      status: form.status,
    };
    if (form.email.trim()) payload.email = form.email.trim();
    if (form.property_id) payload.property_id = form.property_id;
    if (form.preferred_date) payload.preferred_date = form.preferred_date;
    if (form.preferred_time) payload.preferred_time = form.preferred_time;
    if (form.message.trim()) payload.message = form.message.trim();

    const { error } = await supabase.from('js_book_visit_requests').insert([payload]);
    setSaving(false);
    if (error) {
      setSaveError(error.message);
      return;
    }
    setShowAddVisit(false);
    loadData();
  };

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
          <LuUsers className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Leads</h1>
        </div>
        <div className="flex items-center gap-2">
          {tab === 'visits' && (
            <button
              onClick={openAddVisit}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#006194] text-white text-sm font-medium hover:bg-[#005580] transition-all cursor-pointer"
            >
              <LuPlus className="w-4 h-4" />
              Add Visit Request
            </button>
          )}
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-glass-border text-sm font-medium hover:bg-surface-light transition-all cursor-pointer"
          >
            <LuDownload className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Add Visit Request Modal */}
      {showAddVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[var(--background)] rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-glass-border">
              <h2 className="text-lg font-bold font-[family-name:var(--font-heading)]">Add Visit Request</h2>
              <button onClick={() => setShowAddVisit(false)} className="text-[var(--muted)] hover:text-[var(--foreground)] cursor-pointer">
                <LuX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-xl border border-glass-border bg-surface-light text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-3 py-2 rounded-xl border border-glass-border bg-surface-light text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-glass-border bg-surface-light text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Property</label>
                <select
                  value={form.property_id}
                  onChange={(e) => setForm({ ...form, property_id: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-glass-border bg-surface-light text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/30"
                >
                  <option value="">— Select property (optional) —</option>
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={form.preferred_date}
                    onChange={(e) => setForm({ ...form, preferred_date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-glass-border bg-surface-light text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Preferred Time</label>
                  <select
                    value={form.preferred_time}
                    onChange={(e) => setForm({ ...form, preferred_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-glass-border bg-surface-light text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/30"
                  >
                    <option value="">— Select slot —</option>
                    {TIME_SLOTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message / Notes</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Any additional notes..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-xl border border-glass-border bg-surface-light text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/30 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-glass-border bg-surface-light text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/30"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {saveError && (
                <p className="text-sm text-red-500 bg-red-50 rounded-xl px-3 py-2">{saveError}</p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddVisit(false)}
                  className="flex-1 px-4 py-2 rounded-xl border border-glass-border text-sm font-medium hover:bg-surface-light transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddVisit}
                  disabled={saving}
                  className="flex-1 px-4 py-2 rounded-xl bg-[#006194] text-white text-sm font-medium hover:bg-[#005580] transition-all cursor-pointer disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Visit Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  <div className="w-10 h-10 rounded-full bg-[#006194]/10 flex items-center justify-center">
                    <LuUser className="w-5 h-5 text-[#006194]" />
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
                    <LuPhone className="w-3.5 h-3.5" />
                    <a href={`tel:${lead.phone}`} className="hover:text-[#006194]">{String(lead.phone)}</a>
                  </div>
                ) : null}
                {lead.email ? (
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <LuMail className="w-3.5 h-3.5" />
                    <a href={`mailto:${lead.email}`} className="hover:text-[#006194]">{String(lead.email)}</a>
                  </div>
                ) : null}
                {lead.preferred_date ? (
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <LuCalendar className="w-3.5 h-3.5" />
                    {String(lead.preferred_date)}{lead.preferred_time ? ` at ${String(lead.preferred_time)}` : ''}
                  </div>
                ) : null}
                {lead.subject ? (
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <LuMessageSquare className="w-3.5 h-3.5" />
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
                        ? 'bg-[#006194] text-white'
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
            <LuUsers className="w-12 h-12 mx-auto text-[var(--muted)] mb-3" />
            <p className="text-[var(--muted)]">No {tab} yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
