import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchPropertyById, fetchSimilarProperties, fetchProperties } from '@/lib/dal';
import { PropertyDetail } from '@/components/properties/PropertyDetail';
import { AreaPage } from '@/components/properties/AreaPage';
import { getAreaContent, getAllAreaSlugs } from '@/lib/area-content';

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllAreaSlugs().map((slug) => ({ id: slug }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;

  // Check if this is an area slug first
  const areaContent = getAreaContent(id);
  if (areaContent) {
    return {
      title: `Rental Homes in ${areaContent.name}, Bangalore — JusRental`,
      description: `Find verified ${areaContent.name} rental properties. Browse 1BHK, 2BHK, 3BHK apartments & houses for rent in ${areaContent.name}, Bangalore. Zero brokerage.`,
      keywords: `${areaContent.name} rentals, house for rent in ${areaContent.name}, flat for rent ${areaContent.name} Bangalore, ${areaContent.name} apartments, rental homes ${areaContent.name}`,
      alternates: { canonical: `/properties/${areaContent.slug}` },
      openGraph: {
        title: `Rental Homes in ${areaContent.name}, Bangalore — JusRental`,
        description: `Browse verified rental properties in ${areaContent.name}. Zero brokerage. Move in hassle-free.`,
        url: `https://www.jusrental.com/properties/${areaContent.slug}`,
      },
    };
  }

  // Otherwise treat as property ID
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

  // Check if this is an area slug
  const areaContent = getAreaContent(id);
  if (areaContent) {
    const properties = await fetchProperties({ area: areaContent.name });

    const faqJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: areaContent.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <AreaPage area={areaContent} properties={properties} />
      </>
    );
  }

  // Otherwise treat as property detail
  const property = await fetchPropertyById(id);

  if (!property) {
    notFound();
  }

  const similar = await fetchSimilarProperties(property);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.seoDescription || property.description.slice(0, 300),
    url: `https://www.jusrental.com/properties/${id}`,
    image: property.images[0] || undefined,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      availability: property.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.area,
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    numberOfRooms: property.bhk,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.sqft,
      unitCode: 'FTK',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetail property={property} similar={similar} />
    </>
  );
}
