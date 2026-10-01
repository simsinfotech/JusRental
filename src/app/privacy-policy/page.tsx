import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — JusRental',
  description: 'Learn how JusRental collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" subtitle="How we collect, use, and protect your information" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-slate max-w-none space-y-6 text-[#3f4850] text-sm leading-relaxed">
          <p><strong>Effective Date:</strong> 1 October 2026</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">1. Information We Collect</h2>
          <p>We collect personal information you provide when using JusRental, including your name, phone number, email address, and property preferences. We also collect usage data such as pages visited, search queries, and device information.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">2. How We Use Your Information</h2>
          <p>Your information is used to match you with rental properties, facilitate communication between tenants and property owners, process visit bookings, and improve our services. We may also use your contact details to send service-related updates.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">3. Information Sharing</h2>
          <p>We do not sell your personal information. We share your details only with property owners or concierges when you request a visit or express interest in a property. We may share anonymised data with analytics partners to improve our platform.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">4. Data Security</h2>
          <p>We use industry-standard encryption and security measures to protect your data. All data is stored securely and access is restricted to authorised personnel only.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">5. Your Rights</h2>
          <p>You can request access to, correction of, or deletion of your personal data at any time by contacting us at hello@jusrental.com. You may also opt out of marketing communications.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">6. Contact Us</h2>
          <p>For privacy-related queries, email us at <a href="mailto:hello@jusrental.com" className="text-[#006194] hover:underline">hello@jusrental.com</a>.</p>
        </div>
      </section>
    </>
  );
}
