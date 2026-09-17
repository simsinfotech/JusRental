import Link from 'next/link';
import { createSupabaseServer } from '@/lib/supabase-ssr';
import { LuLayoutDashboard, LuHouse, LuEye, LuCalendar } from 'react-icons/lu';
import { GlassCard } from '@/components/ui/GlassCard';

export default async function OwnerDashboard() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch stats
  const [{ count: propertiesCount }, { count: visitsCount }] = await Promise.all([
    supabase.from('js_properties').select('*', { count: 'exact', head: true }).eq('owner_id', user.id),
    supabase.from('js_book_visit_requests').select('*', { count: 'exact', head: true }).in(
      'property_id',
      (await supabase.from('js_properties').select('id').eq('owner_id', user.id)).data?.map(p => p.id) || []
    ),
  ]);

  // Fetch total views
  const { data: properties } = await supabase
    .from('js_properties')
    .select('views_count')
    .eq('owner_id', user.id);

  const totalViews = properties?.reduce((sum, p) => sum + (p.views_count || 0), 0) || 0;

  const stats = [
    { label: 'My Properties', value: propertiesCount || 0, icon: LuHouse, color: 'text-[#006194] bg-[#006194]/10', href: '/owner/properties' },
    { label: 'Total Views', value: totalViews, icon: LuEye, color: 'text-[#006194] bg-[#006194]/10', href: '/owner/properties' },
    { label: 'Visit Requests', value: visitsCount || 0, icon: LuCalendar, color: 'text-green-600 bg-green-500/10', href: '/owner/visits' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <LuLayoutDashboard className="w-6 h-6 text-[#006194]" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Dashboard</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <GlassCard hover>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-[var(--muted)]">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      <GlassCard hover={false}>
        <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href="/owner/properties/new"
            className="flex items-center gap-3 p-4 rounded-xl border border-glass-border hover:bg-surface-light transition-all"
          >
            <LuHouse className="w-5 h-5 text-[#006194]" />
            <div>
              <p className="font-medium">Add New Property</p>
              <p className="text-sm text-[var(--muted)]">List a new property for rent</p>
            </div>
          </a>
          <a
            href="/owner/visits"
            className="flex items-center gap-3 p-4 rounded-xl border border-glass-border hover:bg-surface-light transition-all"
          >
            <LuCalendar className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium">View Visit Requests</p>
              <p className="text-sm text-[var(--muted)]">Manage pending visits</p>
            </div>
          </a>
        </div>
      </GlassCard>
    </div>
  );
}
