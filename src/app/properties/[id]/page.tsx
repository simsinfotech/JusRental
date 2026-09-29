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

  const title = property.seoTitle || `${property.title} — ₹${property.price.toLocaleString()}/month | JusRental`;
  const description = property.seoDescription || property.description.slice(0, 160);

  return {
    title,
    description,
    keywords: property.seoKeywords || undefined,
    openGraph: {
      title: property.seoTitle || `${property.title} — ₹${property.price.toLocaleString()}/month`,
      description,
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
