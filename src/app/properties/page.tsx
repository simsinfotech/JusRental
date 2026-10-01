import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchProperties, fetchAllAreas, fetchAllTypes } from '@/lib/dal';
import { PropertiesContent } from '@/components/properties/PropertiesContent';
import { PageHero } from '@/components/layout/PageHero';
import { getAllAreaSlugs, getAreaContent } from '@/lib/area-content';

interface PropertiesPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ searchParams }: PropertiesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const hasFilters = params.q || params.type || params.bhk || params.budgetMin || params.budgetMax || params.area || params.furnished || params.sort || params.page;

  return {
    alternates: {
      canonical: '/properties',
    },
    ...(hasFilters && {
      robots: { index: false, follow: true },
    }),
  };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;

  const filters = {
    q: params.q,
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
        subtitle="Explore verified rental homes across Bangalore. Filter by area, budget, and more."
        breadcrumbs={[{ label: 'Properties' }]}
      />
      <Suspense>
        <PropertiesContent
          properties={properties}
          allAreas={allAreas}
          allTypes={allTypes}
          initialFilters={{
            q: params.q || '',
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

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
          Rental Properties in Bangalore — Your Complete Guide
        </h2>

        <div className="prose prose-sm max-w-none text-[var(--muted)] space-y-4">
          <p>
            Bangalore, often called the Silicon Valley of India, is home to millions of professionals, students, and families from across the country. The city&apos;s booming IT sector, pleasant climate, and cosmopolitan culture make it one of India&apos;s most popular cities for renting a home. Whether you are relocating for a new job, looking for a family-friendly neighbourhood, or seeking a budget-friendly bachelor pad, Bangalore&apos;s rental market has something for everyone.
          </p>

          <h3 className="text-lg font-semibold text-foreground">Why Rent in Bangalore?</h3>
          <p>
            Bangalore offers a unique combination of career opportunities and quality of life that few Indian cities can match. The city houses headquarters and major offices of global tech giants alongside a thriving startup ecosystem. With world-class healthcare, prestigious educational institutions, excellent dining and nightlife, and year-round pleasant weather, Bangalore consistently ranks among the best cities to live in India. Renting allows you to experience different neighbourhoods before committing to a long-term decision, and with zero-brokerage platforms like JusRental, the process has never been easier or more affordable.
          </p>

          <h3 className="text-lg font-semibold text-foreground">Understanding Bangalore&apos;s Rental Market</h3>
          <p>
            Rental prices in Bangalore vary significantly based on location, property type, furnishing status, and amenities. Central areas like Koramangala, Indiranagar, and HSR Layout command premium rents, while North Bangalore localities such as Hennur, Hebbal, Yelahanka, and Thanisandra offer excellent value with modern apartments and strong IT park connectivity. A 1 BHK apartment in North Bangalore typically ranges from ₹8,000 to ₹20,000 per month, while a 2 BHK costs between ₹15,000 and ₹35,000. Premium 3 BHK apartments in gated communities can range from ₹25,000 to ₹70,000 depending on the locality and developer.
          </p>

          <h3 className="text-lg font-semibold text-foreground">North Bangalore — The Fastest Growing Rental Market</h3>
          <p>
            North Bangalore has emerged as the city&apos;s most dynamic rental corridor. Driven by Manyata Tech Park, proximity to Kempegowda International Airport, and ongoing metro expansion, areas like Hebbal, Hennur, Thanisandra, Yelahanka, Horamavu, Jakkur, and Devanahalli are witnessing unprecedented demand for rental housing. New gated communities by top developers such as Prestige, Brigade, Sobha, and Godrej offer world-class amenities including swimming pools, gymnasiums, children&apos;s play areas, and 24/7 security — all at rents significantly lower than South and East Bangalore.
          </p>

          <h3 className="text-lg font-semibold text-foreground">Types of Rental Properties Available</h3>
          <p>
            JusRental lists a diverse range of rental properties to suit every need and budget. <strong>Apartments</strong> in gated communities are the most popular choice, offering security, amenities, and community living. <strong>Independent houses</strong> provide more space and privacy, ideal for larger families or those who prefer a standalone home. <strong>Villas</strong> in premium localities cater to those seeking luxury living with private gardens and parking. Properties are available in furnished, semi-furnished, and unfurnished configurations — furnished apartments are perfect for professionals who need a move-in-ready solution, while unfurnished options offer flexibility to set up the home according to your taste.
          </p>

          <h3 className="text-lg font-semibold text-foreground">Tips for Renting a Home in Bangalore</h3>
          <p>
            Before signing a rental agreement, visit the property in person and check essentials like water supply, power backup, parking availability, and maintenance charges. Ask about the notice period and deposit terms — most landlords in Bangalore ask for a deposit of 6 to 10 months&apos; rent, though this varies by area. Verify the owner&apos;s identity and property ownership documents. Check the commute time to your workplace during peak hours, as Bangalore traffic can significantly impact your daily routine. Finally, understand the society rules regarding pets, guests, and working from home before making a decision.
          </p>

          <h3 className="text-lg font-semibold text-foreground">Why Choose JusRental?</h3>
          <p>
            JusRental simplifies the rental process with 100% verified listings, zero brokerage, and a tenant-first approach. Every property on our platform is personally verified by our team, ensuring accurate photos, genuine pricing, and up-to-date availability. Our WhatsApp-first communication makes scheduling visits quick and hassle-free. For NRI property owners, we offer comprehensive property management services including tenant discovery, rent collection, and maintenance coordination.
          </p>
        </div>

        {/* Area Links */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-4">Browse by Area</h3>
          <div className="flex flex-wrap gap-2">
            {getAllAreaSlugs().map((slug) => {
              const area = getAreaContent(slug);
              if (!area) return null;
              return (
                <Link key={slug} href={`/properties/${slug}`}
                  className="px-4 py-2 rounded-xl bg-surface-light border border-glass-border text-sm font-medium hover:bg-[#006194]/10 hover:text-[#006194] hover:border-[#006194]/20 transition-colors">
                  {area.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
