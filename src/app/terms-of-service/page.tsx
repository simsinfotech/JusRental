import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — JusRental',
  description: 'Terms and conditions governing the use of the JusRental platform.',
};

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero title="Terms of Service" subtitle="Terms and conditions for using JusRental" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-slate max-w-none space-y-6 text-[#3f4850] text-sm leading-relaxed">
          <p><strong>Effective Date:</strong> 1 October 2026</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">1. Acceptance of Terms</h2>
          <p>By accessing or using JusRental, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">2. Services</h2>
          <p>JusRental is a rental property discovery platform that connects tenants with verified rental homes in Bangalore. We facilitate property search, visit scheduling, and rental agreement assistance. We are not a party to any rental agreement between tenants and property owners.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">3. User Responsibilities</h2>
          <p>Users must provide accurate information during registration and property interactions. You agree not to misuse the platform, post false listings, or engage in fraudulent activity.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">4. Property Listings</h2>
          <p>While we verify properties to the best of our ability, JusRental does not guarantee the accuracy of all listing details. Tenants are advised to physically inspect properties before entering into agreements.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">5. Limitation of Liability</h2>
          <p>JusRental acts as an intermediary and is not liable for disputes between tenants and property owners, property conditions, or financial losses arising from rental transactions.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">6. Modifications</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">7. Contact</h2>
          <p>For questions about these terms, reach us at <a href="mailto:hello@jusrental.com" className="text-[#006194] hover:underline">hello@jusrental.com</a>.</p>
        </div>
      </section>
    </>
  );
}
