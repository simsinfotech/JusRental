import { PageHero } from '@/components/layout/PageHero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy — JusRental',
  description: 'Understand JusRental\'s refund policy for verification fees and service charges.',
};

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero title="Refund Policy" subtitle="Our policy on verification fees and service charges" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Refund Policy' }]} />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="prose prose-slate max-w-none space-y-6 text-[#3f4850] text-sm leading-relaxed">
          <p><strong>Effective Date:</strong> 1 October 2026</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">1. Verification Fee</h2>
          <p>JusRental charges a nominal verification fee for property visits. This fee covers the cost of verifying property details, coordinating with the owner, and scheduling visits.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">2. Refund Eligibility</h2>
          <p>A full refund of the verification fee is available if:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>The property visit was cancelled by JusRental or the property owner</li>
            <li>The property was found to be significantly different from the listing</li>
            <li>The visit could not be completed due to reasons beyond your control</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#131b2e]">3. Non-Refundable Cases</h2>
          <p>Refunds are not available if:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You cancel the visit after it has been confirmed and the owner has been notified</li>
            <li>You fail to show up for a scheduled visit</li>
            <li>You choose not to proceed after a completed visit</li>
          </ul>

          <h2 className="text-lg font-semibold text-[#131b2e]">4. Refund Process</h2>
          <p>Eligible refunds are processed within 5-7 business days to the original payment method. To request a refund, contact us at <a href="mailto:hello@jusrental.com" className="text-[#006194] hover:underline">hello@jusrental.com</a> with your booking details.</p>

          <h2 className="text-lg font-semibold text-[#131b2e]">5. Zero Brokerage Guarantee</h2>
          <p>JusRental does not charge any brokerage to tenants. The verification fee is the only charge, and there are no hidden fees at any stage of the rental process.</p>
        </div>
      </section>
    </>
  );
}
