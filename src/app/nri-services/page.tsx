import { fetchNRIServices } from '@/lib/dal';
import { NRIServicesContent } from '@/components/sections/NRIServicesContent';
import { PageHero } from '@/components/layout/PageHero';

export const dynamic = 'force-dynamic';

export default async function NRIServicesPage() {
  const services = await fetchNRIServices();

  return (
    <>
      <PageHero
        title="NRI Property Management"
        subtitle="Complete end-to-end property management for NRI owners in Bangalore. From tenant finding to maintenance — we handle everything."
        breadcrumbs={[{ label: 'NRI Services' }]}
      />
      <NRIServicesContent services={services} />
    </>
  );
}
