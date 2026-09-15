import { createSupabaseServer } from '@/lib/supabase-ssr';
import { LayoutDashboard, Home, Users, Eye, Calendar, FileText, TrendingUp } from 'lucide-react';
import { AdminCard } from '@/components/admin/AdminCard';
import { AdminDashboardCharts } from '@/components/admin/AdminDashboardCharts';

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServer();

  // Fetch all stats in parallel
  const [
    { count: propertiesCount },
    { count: activeCount },
    { count: contactsCount },
    { count: visitsCount },
    { count: listingReqCount },
    { count: blogCount },
    { data: properties },
    { data: recentContacts },
    { data: recentVisits },
  ] = await Promise.all([
    supabase.from('js_properties').select('*', { count: 'exact', head: true }),
    supabase.from('js_properties').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('js_contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('js_book_visit_requests').select('*', { count: 'exact', head: true }),
    supabase.from('js_property_listing_requests').select('*', { count: 'exact', head: true }),
    supabase.from('js_blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('js_properties').select('views_count, created_at'),
    supabase.from('js_contact_submissions').select('created_at').order('created_at', { ascending: false }).limit(30),
    supabase.from('js_book_visit_requests').select('created_at').order('created_at', { ascending: false }).limit(30),
  ]);

  const totalViews = properties?.reduce((sum, p) => sum + (p.views_count || 0), 0) || 0;

  const stats = [
    { label: 'Total Properties', value: propertiesCount || 0, icon: Home, color: 'text-blue-600 bg-blue-500/10' },
    { label: 'Active Listings', value: activeCount || 0, icon: TrendingUp, color: 'text-green-600 bg-green-500/10' },
    { label: 'Total Views', value: totalViews, icon: Eye, color: 'text-cyan-600 bg-cyan-500/10' },
    { label: 'Contact Leads', value: contactsCount || 0, icon: Users, color: 'text-purple-600 bg-purple-500/10' },
    { label: 'Visit Requests', value: visitsCount || 0, icon: Calendar, color: 'text-orange-600 bg-orange-500/10' },
    { label: 'Listing Requests', value: listingReqCount || 0, icon: Home, color: 'text-pink-600 bg-pink-500/10' },
    { label: 'Blog Posts', value: blogCount || 0, icon: FileText, color: 'text-indigo-600 bg-indigo-500/10' },
  ];

  // Build chart data: leads per day (last 30 days)
  const leadsPerDay: Record<string, { contacts: number; visits: number }> = {};
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    leadsPerDay[key] = { contacts: 0, visits: 0 };
  }

  recentContacts?.forEach((c) => {
    const key = new Date(c.created_at).toISOString().slice(0, 10);
    if (leadsPerDay[key]) leadsPerDay[key].contacts++;
  });

  recentVisits?.forEach((v) => {
    const key = new Date(v.created_at).toISOString().slice(0, 10);
    if (leadsPerDay[key]) leadsPerDay[key].visits++;
  });

  const chartData = Object.entries(leadsPerDay).map(([date, counts]) => ({
    date: new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    contacts: counts.contacts,
    visits: counts.visits,
  }));

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <LayoutDashboard className="w-6 h-6 text-red-600" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">Admin Dashboard</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.slice(0, 4).map((stat) => (
          <AdminCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {stats.slice(4).map((stat) => (
          <AdminCard key={stat.label} {...stat} />
        ))}
      </div>

      <AdminDashboardCharts chartData={chartData} />
    </div>
  );
}
