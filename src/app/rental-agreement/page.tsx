'use client';

import { motion } from 'motion/react';
import { LuFileText, LuShieldCheck, LuCircleAlert, LuCircleCheckBig, LuArrowRight, LuPhone } from 'react-icons/lu';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { PageHero } from '@/components/layout/PageHero';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WHATSAPP_URL } from '@/lib/constants';

const steps = [
  { title: 'Share Your Details', desc: 'Provide tenant and owner details along with property information.' },
  { title: 'Agreement Drafted', desc: 'Our legal team drafts a comprehensive rental agreement.' },
  { title: 'Review & Sign', desc: 'Both parties review the agreement and sign electronically or in person.' },
  { title: 'E-Stamp & Registration', desc: 'We handle e-stamp paper and sub-registrar filing if needed.' },
];

const faqs = [
  {
    q: 'Is rental agreement registration mandatory in Karnataka?',
    a: 'Registration is mandatory for lease terms exceeding 11 months. For shorter terms, a notarized agreement is sufficient but registration is still recommended.',
  },
  {
    q: 'What is the cost of e-stamp paper?',
    a: 'E-stamp paper costs depend on the rent amount and deposit. For a typical 2BHK rental, it ranges from ₹500 to ₹2,000.',
  },
  {
    q: 'How much security deposit is standard in Bangalore?',
    a: 'North Bangalore typically follows a 6-10 month deposit norm, though this is negotiable. The new Model Tenancy Act recommends a maximum of 2 months.',
  },
  {
    q: 'Can JusRental help with the entire process?',
    a: 'Yes! Our ₹599 fee includes agreement drafting assistance and guidance through the entire process. E-stamp and registration charges are separate.',
  },
];

const mustInclude = [
  'Tenant and landlord details with ID proof references',
  'Property address and description',
  'Monthly rent amount and due date',
  'Security deposit and return conditions',
  'Lease duration and lock-in period',
  'Maintenance responsibilities',
  'Notice period terms',
  'Termination and renewal clauses',
];

export default function RentalAgreementPage() {
  const { ref: stepsRef, controls: stepsControls } = useAnimateInView(0.1);
  const { ref: faqRef, controls: faqControls } = useAnimateInView(0.1);

  return (
    <>
      <PageHero
        title="Rental Agreement Guide"
        subtitle="Everything you need to know about creating a legally sound rental agreement in Karnataka."
        breadcrumbs={[{ label: 'Rental Agreement' }]}
      />

      {/* What to include */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeading
                badge="Essential Clauses"
                title="What Your Agreement Must Include"
                highlight="Must Include"
                align="left"
              />
              <div className="space-y-3">
                {mustInclude.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <LuCircleCheckBig className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-[var(--muted)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <GlassCard gradient hover={false} className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <LuCircleAlert className="w-6 h-6 text-[#006194]" />
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                  Important Note
                </h3>
              </div>
              <p className="text-[var(--muted)] leading-relaxed mb-4">
                In Karnataka, rental agreements for periods exceeding 11 months must be registered
                at the sub-registrar office. Unregistered agreements may not be admissible as evidence
                in court disputes.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                JusRental provides standardized, legally vetted agreement templates and guides you
                through the entire registration process.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 md:py-16 bg-surface-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Process"
            title="How We Help You"
            highlight="Help You"
          />
          <motion.div
            ref={stepsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={stepsControls}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {steps.map((step, i) => (
              <motion.div key={step.title} variants={fadeInUp} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#006194] text-white text-xl font-bold flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold font-[family-name:var(--font-heading)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted)]">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="FAQ"
            title="Frequently Asked Questions"
            highlight="Questions"
          />
          <motion.div
            ref={faqRef}
            variants={staggerContainer}
            initial="hidden"
            animate={faqControls}
            className="space-y-4"
          >
            {faqs.map((faq) => (
              <motion.div key={faq.q} variants={fadeInUp}>
                <GlassCard hover={false}>
                  <h3 className="font-semibold font-[family-name:var(--font-heading)] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{faq.a}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#006194] text-white font-semibold shadow-lg shadow-[#006194]/25 hover:shadow-[#006194]/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <LuFileText className="w-4 h-4" />
            Get Agreement Assistance
            <LuArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
