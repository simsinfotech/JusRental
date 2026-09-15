import { Suspense } from 'react';
import { fetchProperties, fetchAllAreas, fetchAllTypes } from '@/lib/dal';
import { PropertiesContent } from '@/components/properties/PropertiesContent';
import { PageHero } from '@/components/layout/PageHero';

interface PropertiesPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;

  const filters = {
    type: params.type,
    bhk: params.bhk,
    budgetMin: params.budgetMin ? parseInt(params.budgetMin) : undefined,
    budgetMax: params.budgetMax ? parseInt(params.budgetMax) : undefined,
    area: params.area,
    furnished: params.furnished,
    sort: params.sort || 'newest',
  };

  const [properties, allAreas, allTypes] = await Promise.all([
    fetchProperties(filters),
    fetchAllAreas(),
    fetchAllTypes(),
  ]);

  return (
    <>
      <PageHero
        title="Browse Properties"
        subtitle="Explore 1200+ verified rental homes across North Bangalore. Filter by area, budget, and more."
        breadcrumbs={[{ label: 'Properties' }]}
      />
      <Suspense>
        <PropertiesContent
          properties={properties}
          allAreas={allAreas}
          allTypes={allTypes}
          initialFilters={{
            type: params.type || '',
            bhk: params.bhk || '',
            budgetMin: params.budgetMin || '',
            budgetMax: params.budgetMax || '',
            area: params.area || '',
            furnished: params.furnished || '',
          }}
          initialSort={params.sort || 'newest'}
          initialPage={parseInt(params.page || '1')}
        />
      </Suspense>
    </>
  );
}
