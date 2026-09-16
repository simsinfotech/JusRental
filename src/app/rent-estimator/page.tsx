import { fetchRentData, fetchRentAreas } from '@/lib/dal';
import { RentEstimatorContent } from '@/components/sections/RentEstimatorContent';
import { PageHero } from '@/components/layout/PageHero';

export const dynamic = 'force-dynamic';

export default async function RentEstimatorPage() {
  const [rentData, rentAreas] = await Promise.all([
    fetchRentData(),
    fetchRentAreas(),
  ]);

  const bhkOptions = Object.keys(rentData);

  return (
    <>
      <PageHero
        title="Rent Estimator"
        subtitle="Get accurate rental estimates for properties across all North Bangalore areas. Updated for 2026."
        breadcrumbs={[{ label: 'Rent Estimator' }]}
      />
      <RentEstimatorContent
        rentData={rentData}
        rentAreas={rentAreas}
        bhkOptions={bhkOptions}
      />
    </>
  );
}
