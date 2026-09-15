import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPropertyById, fetchSimilarProperties } from '@/lib/dal';
import { PropertyDetail } from '@/components/properties/PropertyDetail';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await fetchPropertyById(id);

  if (!property) {
    return { title: 'Property Not Found — JusRental' };
  }

  return {
    title: `${property.title} — ₹${property.price.toLocaleString()}/month | JusRental`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.title} — ₹${property.price.toLocaleString()}/month`,
      description: property.description.slice(0, 160),
      images: property.images[0] ? [property.images[0]] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await fetchPropertyById(id);

  if (!property) {
    notFound();
  }

  const similar = await fetchSimilarProperties(property);

  return <PropertyDetail property={property} similar={similar} />;
}
