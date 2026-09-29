import { createSupabaseServer } from '@/lib/supabase-ssr';
import { LuFileText, LuDownload, LuClock, LuCircleCheck } from 'react-icons/lu';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

export default async function OwnerAgreementPage() {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Get owner's properties that have agreements
  const { data: properties } = await supabase
    .from('js_properties')
    .select('id, title, location, status')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <LuFileText className="w-6 h-6 text-[#006194]" />
        <h1 className="text-2xl font-bold font-[family-name:var(--font-heading)]">Rental Agreements</h1>
      </div>

      {properties && properties.length > 0 ? (
        <div className="space-y-4">
          {properties.map((property) => (
            <GlassCard key={property.id} hover={false}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold font-[family-name:var(--font-heading)]">{property.title}</h3>
                  <p className="text-sm text-[var(--muted)] mt-1">{property.location}</p>
                </div>
                <Badge variant={property.status === 'active' ? 'success' : 'warning'}>
                  {property.status === 'active' ? 'Active' : 'Pending'}
                </Badge>
              </div>

              <div className="mt-4 pt-4 border-t border-glass-border">
                <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
                  <div className="flex items-center gap-1.5">
                    <LuClock className="w-3.5 h-3.5" />
                    <span>Agreement not yet generated</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--muted)] mt-3">
                  Rental agreements will be available once a tenant is confirmed for this property.
                  You&apos;ll be able to view, sign, and download agreements here.
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <GlassCard hover={false} className="text-center py-12">
          <LuFileText className="w-12 h-12 mx-auto text-[var(--muted)] mb-4" />
          <h3 className="text-lg font-semibold mb-2">No agreements yet</h3>
          <p className="text-[var(--muted)]">
            Rental agreements will appear here once you have listed properties and confirmed tenants.
          </p>
        </GlassCard>
      )}

      <GlassCard hover={false} className="mt-6">
        <h3 className="font-semibold font-[family-name:var(--font-heading)] mb-3">
          How Agreements Work
        </h3>
        <div className="space-y-3">
          {[
            { icon: LuCircleCheck, text: 'Tenant confirms interest and completes verification' },
            { icon: LuFileText, text: 'Digital rental agreement is generated with all terms' },
            { icon: LuDownload, text: 'Both parties sign digitally — download anytime' },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-[var(--muted)]">
              <step.icon className="w-4 h-4 mt-0.5 text-[#006194] shrink-0" />
              <span>{step.text}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
