import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zero Brokerage Policy — JusRental',
  description: 'JusRental\'s commitment to zero brokerage for tenants in Bangalore.',
};

export default function ZeroBrokeragePolicyPage() {
  return (
    <>
      <PageHero title="Zero Brokerage Policy" subtitle="Our commitment to brokerage-free rentals" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Zero Brokerage Policy' }]} />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-slate max-w-none space-y-6 text-[#3f4850] text-sm leading-relaxed">
          <p><strong>Effective Date:</strong> 1 October 2026</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">1. What Zero Brokerage Means</h2>
          <p>At JusRental, tenants never pay brokerage. Traditional rental brokers charge 1-2 months&apos; rent as brokerage, which can amount to tens of thousands of rupees. We have eliminated this cost entirely for tenants.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">2. How It Works</h2>
          <p>JusRental works directly with property owners to list verified homes. We earn a small verification fee for our services, not a percentage of your rent. This means you save significantly compared to traditional brokers.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">3. What You Pay</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Verification Fee:</strong> A nominal one-time fee for property verification and visit coordination</li>
            <li><strong>Security Deposit:</strong> Paid directly to the property owner as per the rental agreement</li>
            <li><strong>Monthly Rent:</strong> Paid directly to the property owner</li>
          </ul>
          <p>No brokerage, no hidden charges, no surprise fees.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">4. Our Guarantee</h2>
          <p>If you are charged any brokerage through JusRental, we will refund the full amount. Report any such instances to <a href="mailto:hello@jusrental.com" className="text-[#006194] hover:underline">hello@jusrental.com</a>.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">5. Why Zero Brokerage?</h2>
          <p>We believe finding a home should not come with an unfair financial burden. Our technology-driven approach eliminates the need for traditional brokers, passing the savings directly to you.</p>
        </div>
      </section>
    </>
  );
}
