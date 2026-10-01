import type { Metadata } from 'next';
import Link from 'next/link';
import { LuHouse, LuShieldCheck, LuMapPin, LuUsers, LuBuilding, LuTarget } from 'react-icons/lu';
import { PageHero } from '@/components/layout/PageHero';
import { GlassCard } from '@/components/ui/GlassCard';

export const metadata: Metadata = {
  title: 'About JusRental — Our Story, Team & Mission | Bangalore Rentals',
  description:
    'Learn about JusRental — Bangalore\'s trusted zero-brokerage rental platform. Meet our team, discover our mission, and see why thousands of tenants trust us.',
  openGraph: {
    title: 'About JusRental — Our Story, Team & Mission',
    description:
      'Bangalore\'s trusted zero-brokerage rental platform. Meet the team behind 1200+ verified listings across 25+ neighborhoods.',
    url: 'https://www.jusrental.com/about',
  },
  alternates: { canonical: '/about' },
};

const team = [
  {
    name: 'Shamique',
    role: 'Founder & CEO',
    initials: 'S',
    bio: 'With deep roots in Bangalore\'s real estate market, Shamique founded JusRental to eliminate brokerage and bring transparency to the rental experience.',
  },
  {
    name: 'JusRental Property Team',
    role: 'Verification & Listings',
    initials: 'JP',
    bio: 'Our dedicated property team personally verifies every listing — from inspecting properties to validating owner details — so tenants never face surprises.',
  },
  {
    name: 'JusRental Support',
    role: 'Customer Success',
    initials: 'JS',
    bio: 'Available 6 days a week, our support team guides tenants through property visits, agreements, and move-in — making the entire process seamless.',
  },
];

const stats = [
  { value: '1200+', label: 'Verified Listings', icon: LuBuilding },
  { value: '25+', label: 'Neighborhoods Covered', icon: LuMapPin },
  { value: '2000+', label: 'Happy Tenants', icon: LuUsers },
  { value: '₹0', label: 'Tenant Brokerage', icon: LuShieldCheck },
];

const values = [
  {
    title: 'Transparency',
    description: 'Every listing is verified. No hidden charges, no brokerage traps. What you see is what you get.',
    icon: LuShieldCheck,
  },
  {
    title: 'Local Expertise',
    description: 'Our team lives and breathes Bangalore. We know every neighborhood — from Hennur to Hebbal to Yelahanka.',
    icon: LuMapPin,
  },
  {
    title: 'Tenant First',
    description: 'We built JusRental for tenants. Zero brokerage, concierge support, and AI-matched recommendations — all free.',
    icon: LuTarget,
  },
];

export default function AboutPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'Organization'],
      name: 'JusRental',
      url: 'https://www.jusrental.com',
      logo: 'https://www.jusrental.com/images/monogram.png',
      description:
        'Bangalore\'s trusted zero-brokerage rental platform. AI-matched, verified rental homes across 25+ neighborhoods.',
      foundingDate: '2024',
      founder: {
        '@type': 'Person',
        name: 'Shamique',
        jobTitle: 'Founder & CEO',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bengaluru',
        postalCode: '560077',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '13.0827',
        longitude: '77.5877',
      },
      telephone: '+91-90363-17765',
      email: 'hello@jusrental.com',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
      areaServed: {
        '@type': 'City',
        name: 'Bengaluru',
      },
      priceRange: '₹8,000 - ₹1,50,000/month',
      sameAs: ['https://www.facebook.com/profile.php?id=61594353013446'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.jusrental.com' },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.jusrental.com/about' },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title="About JusRental"
        subtitle="Bangalore's trusted zero-brokerage rental platform — built by locals, for everyone looking for a home."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Our Story */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006194]/10 text-[#006194] text-sm font-medium mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
              Why We Built JusRental
            </h2>
            <p className="text-[var(--muted)] text-lg leading-relaxed">
              Finding a rental home in Bangalore shouldn&apos;t mean paying a month&apos;s rent in brokerage
              or dealing with unverified listings. We started JusRental to fix that — a platform where
              every property is personally verified, brokerage is zero for tenants, and our concierge
              team handles everything from property visits to move-in.
            </p>
            <p className="text-[var(--muted)] text-lg leading-relaxed mt-4">
              Powered by our parent company <strong>EstateHive</strong>, JusRental combines local real estate
              expertise with technology to match tenants with their perfect home. We cover 25+ Bangalore
              neighborhoods and have helped thousands of tenants move in hassle-free since our founding.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <GlassCard key={stat.label} hover={false} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#006194]/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-[#006194]" />
                </div>
                <p className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] text-[#006194]">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--muted)] mt-1">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-16 bg-surface-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006194]/10 text-[#006194] text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
              Why Tenants Trust Us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <GlassCard key={value.title} hover={false}>
                <div className="w-12 h-12 rounded-xl bg-[#006194]/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-[#006194]" />
                </div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-2">
                  {value.title}
                </h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{value.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006194]/10 text-[#006194] text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
              Meet the People Behind JusRental
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Real people, real expertise — our team personally verifies every property and supports every tenant.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member) => (
              <GlassCard key={member.name} hover={false} className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#006194] flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                  {member.name}
                </h3>
                <p className="text-sm text-[#006194] font-medium mb-3">{member.role}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{member.bio}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-surface-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LuHouse className="w-10 h-10 text-[#006194] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Ready to Find Your Home?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Browse 1200+ verified rentals across Bangalore. Zero brokerage, always.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/properties"
              className="px-6 py-3 rounded-xl bg-[#006194] text-white font-semibold shadow-lg shadow-[#006194]/25 hover:shadow-[#006194]/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl border border-[#006194]/50 text-[#006194] font-medium hover:bg-[#006194]/10 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
