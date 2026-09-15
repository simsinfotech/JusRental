import { createSupabaseServer } from '@/lib/supabase-ssr';
import { Calendar, Clock, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

const statusColors: Record<string, 'info' | 'success' | 'warning'> = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'warning',
};

export default async function OwnerVisitsPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Get owner's property IDs
  const { data: properties } = await supabase
    .from('js_properties')
    .select('id, title')
    .eq('owner_id', user.id);

  const propertyIds = properties?.map((p) => p.id) || [];
  const propertyMap = new Map(properties?.map((p) => [p.id, p.title]) || []);

  // Get visit requests for those properties
  const { data: visits } = await supabase
    .from('js_book_visit_requests')
    .select('*')
    .in('property_id', propertyIds)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Visit Requests</h1>
      </div>

      {visits && visits.length > 0 ? (
        <div className="space-y-4">
          {visits.map((visit) => (
            <GlassCard key={visit.id} hover={false}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-[var(--muted)]">Property:</p>
                  <p className="font-semibold">{propertyMap.get(visit.property_id) || 'Unknown'}</p>
                </div>
                <Badge variant={statusColors[visit.status] || 'info'}>
                  {visit.status}
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <User className="w-3.5 h-3.5" />
                  {visit.name}
                </div>
                <div className="flex items-center gap-2 text-[var(--muted)]">
                  <Phone className="w-3.5 h-3.5" />
                  {visit.phone}
                </div>
                {visit.email && (
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <Mail className="w-3.5 h-3.5" />
                    {visit.email}
                  </div>
                )}
                {visit.preferred_date && (
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <Calendar className="w-3.5 h-3.5" />
                    {visit.preferred_date}
                    {visit.preferred_time && ` at ${visit.preferred_time}`}
                  </div>
                )}
              </div>

              {visit.message && (
                <div className="mt-3 pt-3 border-t border-glass-border">
                  <div className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <MessageSquare className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    {visit.message}
                  </div>
                </div>
              )}

              <div className="mt-3 pt-3 border-t border-glass-border text-xs text-[var(--muted)]">
                <Clock className="w-3 h-3 inline mr-1" />
                {new Date(visit.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <GlassCard hover={false} className="text-center py-12">
          <Calendar className="w-12 h-12 mx-auto text-[var(--muted)] mb-4" />
          <h3 className="text-lg font-semibold mb-2">No visit requests yet</h3>
          <p className="text-[var(--muted)]">Visit requests for your properties will appear here.</p>
        </GlassCard>
      )}
    </div>
  );
}
