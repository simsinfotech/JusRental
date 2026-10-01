import Link from 'next/link';
import { LuMapPin, LuBuilding, LuTrainFront, LuBriefcase, LuGraduationCap, LuLightbulb, LuChevronRight } from 'react-icons/lu';
import type { AreaContent } from '@/lib/area-content';
import type { Property } from '@/types';
import { PropertyCard } from '@/components/properties/PropertyCard';

interface AreaPageProps {
  area: AreaContent;
  properties: Property[];
}

export function AreaPage({ area, properties }: AreaPageProps) {
  const bhk1 = properties.filter((p) => p.bhk === 1);
  const bhk2 = properties.filter((p) => p.bhk === 2);
  const bhk3 = properties.filter((p) => p.bhk >= 3);
  const furnished = properties.filter((p) => p.furnished === 'Furnished');
  const semiFurnished = properties.filter((p) => p.furnished === 'Semi-Furnished');

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-[var(--muted)] mb-6">
        <Link href="/" className="hover:text-[#006194]">Home</Link>
        <LuChevronRight className="w-3.5 h-3.5" />
        <Link href="/properties" className="hover:text-[#006194]">Properties</Link>
        <LuChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground font-medium">{area.name}</span>
      </nav>

      {/* Hero */}
      <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
        Rental Homes in {area.name}, Bangalore
      </h1>
      <p className="text-[var(--muted)] text-lg mb-8 leading-relaxed">{area.intro}</p>

      {/* Available Properties */}
      {properties.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
            <LuMapPin className="w-5 h-5 text-[#006194]" />
            Available Properties in {area.name}
          </h2>
          <p className="text-[var(--muted)] mb-6">
            {properties.length} verified rental {properties.length === 1 ? 'property' : 'properties'} currently available in {area.name}.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
            {properties.slice(0, 6).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          {properties.length > 6 && (
            <Link href={`/properties?area=${encodeURIComponent(area.name)}`}
              className="inline-flex items-center gap-1.5 text-[#006194] font-medium hover:underline">
              View all {properties.length} properties in {area.name}
              <LuChevronRight className="w-4 h-4" />
            </Link>
          )}
        </section>
      )}

      {/* BHK Options */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
          <LuBuilding className="w-5 h-5 text-[#006194]" />
          Rental Options by BHK in {area.name}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {area.rentRanges.map((r) => (
            <div key={r.bhk} className="p-4 rounded-xl border border-glass-border bg-surface-light">
              <p className="text-lg font-semibold mb-1">{r.bhk}</p>
              <p className="text-[#006194] font-medium">{r.range}</p>
              <p className="text-xs text-[var(--muted)] mt-1">
                {r.bhk === '1 BHK' && `${bhk1.length} available`}
                {r.bhk === '2 BHK' && `${bhk2.length} available`}
                {r.bhk === '3 BHK' && `${bhk3.length} available`}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Furnished vs Semi-Furnished */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Furnished vs Semi-Furnished Rentals</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-glass-border bg-surface-light">
            <p className="font-semibold mb-1">Furnished</p>
            <p className="text-sm text-[var(--muted)]">{furnished.length} properties available. Move-in ready with furniture, appliances, and essentials included.</p>
          </div>
          <div className="p-4 rounded-xl border border-glass-border bg-surface-light">
            <p className="font-semibold mb-1">Semi-Furnished</p>
            <p className="text-sm text-[var(--muted)]">{semiFurnished.length} properties available. Includes basic fixtures — bring your own furniture for a personal touch.</p>
          </div>
        </div>
      </section>

      {/* Popular Societies */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Popular Residential Societies in {area.name}</h2>
        <div className="flex flex-wrap gap-2">
          {area.popularSocieties.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-lg bg-surface-light border border-glass-border text-sm">{s}</span>
          ))}
        </div>
      </section>

      {/* Connectivity */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
          <LuTrainFront className="w-5 h-5 text-[#006194]" />
          Connectivity from {area.name}
        </h2>
        <ul className="space-y-2">
          {area.connectivity.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#006194] shrink-0" />
              {c}
            </li>
          ))}
        </ul>
      </section>

      {/* Employment Hubs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
          <LuBriefcase className="w-5 h-5 text-[#006194]" />
          Nearby Employment Hubs
        </h2>
        <ul className="space-y-2">
          {area.employmentHubs.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#006194] shrink-0" />
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* Schools & Hospitals */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
          <LuGraduationCap className="w-5 h-5 text-[#006194]" />
          Schools & Hospitals near {area.name}
        </h2>
        <div className="flex flex-wrap gap-2">
          {area.schoolsHospitals.map((s) => (
            <span key={s} className="px-3 py-1.5 rounded-lg bg-surface-light border border-glass-border text-sm">{s}</span>
          ))}
        </div>
      </section>

      {/* Tenant Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
          <LuLightbulb className="w-5 h-5 text-[#006194]" />
          Tenant Considerations for {area.name}
        </h2>
        <ul className="space-y-2">
          {area.tenantTips.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {area.faqs.map((faq) => (
            <div key={faq.q} className="p-4 rounded-xl border border-glass-border bg-surface-light">
              <p className="font-semibold mb-2">{faq.q}</p>
              <p className="text-sm text-[var(--muted)]">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center p-8 rounded-2xl bg-[#006194]/5 border border-[#006194]/10">
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-3">
          Find a Rental Home in {area.name}
        </h2>
        <p className="text-[var(--muted)] mb-6 max-w-md mx-auto">
          Browse verified properties with zero brokerage. Schedule a visit and move in hassle-free.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href={`/properties?area=${encodeURIComponent(area.name)}`}
            className="px-6 py-2.5 rounded-xl bg-[#006194] text-white font-semibold hover:bg-[#005080] transition-colors">
            Browse {area.name} Properties
          </Link>
          <Link href="/contact"
            className="px-6 py-2.5 rounded-xl border border-glass-border font-semibold hover:bg-surface-light transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
