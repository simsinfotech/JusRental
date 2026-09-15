'use client';

import { useState, useActionState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Home, Users, Shield, TrendingUp, CheckCircle2, ArrowRight,
  MessageCircle, Zap, Crown,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { PageHero } from '@/components/layout/PageHero';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WHATSAPP_NUMBER, WHATSAPP_URL } from '@/lib/constants';
import { submitListProperty, type ListPropertyFormState } from '@/lib/actions/list-property';

const benefits = [
  { icon: Users, title: '5,000+ Verified Tenants', desc: 'Access our large pool of pre-screened, KYC-verified tenants.' },
  { icon: Shield, title: 'Tenant Background Check', desc: 'We verify employment, ID, and previous rental history.' },
  { icon: TrendingUp, title: 'Market-Rate Pricing', desc: 'Our rent estimator ensures you get the best market rate.' },
  { icon: MessageCircle, title: 'WhatsApp Alerts', desc: 'Get instant notifications when tenants view or enquire about your property.' },
  { icon: CheckCircle2, title: 'Agreement Support', desc: 'Complete rental agreement drafting and registration assistance.' },
  { icon: Zap, title: 'Fast Closure', desc: 'Average time to find a tenant: just 7 days.' },
];

const plans = [
  {
    name: 'Free Listing',
    price: 'Free',
    icon: Home,
    features: [
      'Basic property listing',
      'Listed on our platform',
      'Standard visibility',
      'WhatsApp enquiry support',
    ],
    cta: 'List for Free',
    highlighted: false,
    planValue: 'free',
  },
  {
    name: 'Verified Listing',
    price: '₹599',
    icon: Crown,
    features: [
      'Professional photo shoot',
      'Verified badge on listing',
      'Priority placement in search',
      'Tenant KYC & background check',
      'Rental agreement support',
      'Dedicated property advisor',
      'WhatsApp instant alerts',
    ],
    cta: 'Get Verified',
    highlighted: true,
    planValue: 'verified',
  },
];

const initialState: ListPropertyFormState = { success: false };

export default function ListPropertyPage() {
  const { ref: benefitsRef, controls: benefitsControls } = useAnimateInView(0.1);
  const { ref: plansRef, controls: plansControls } = useAnimateInView(0.1);

  const [state, formAction, isPending] = useActionState(submitListProperty, initialState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (state.success) {
      setSubmitted(true);
      // Also open WhatsApp
      const form = document.getElementById('list-property-form') as HTMLFormElement;
      if (form) {
        const formData = new FormData(form);
        const message = [
          `*List Property Request*`,
          `Name: ${formData.get('name')}`,
          `Phone: ${formData.get('phone')}`,
          `Type: ${formData.get('propertyType')}`,
          `BHK: ${formData.get('bhk')}`,
          `Area: ${formData.get('area')}`,
        ].join('\n');

        window.open(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
          '_blank'
        );
      }
    }
  }, [state]);

  return (
    <>
      <PageHero
        title="List Your Property"
        subtitle="Find quality tenants for your property in North Bangalore. Free listing, verified tenants, hassle-free management."
        breadcrumbs={[{ label: 'List Property' }]}
      />

      {/* Benefits */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why List With Us"
            title="Benefits for Property Owners"
            highlight="Property Owners"
          />

          <motion.div
            ref={benefitsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={benefitsControls}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeInUp}>
                <GlassCard className="h-full" whileHover={{ y: -4 }}>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center shrink-0">
                      <b.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-[family-name:var(--font-heading)] mb-1">{b.title}</h3>
                      <p className="text-sm text-[var(--muted)]">{b.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-12 md:py-16 bg-surface-light/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Plans"
            title="Choose Your Listing Plan"
            highlight="Listing Plan"
          />

          <motion.div
            ref={plansRef}
            variants={staggerContainer}
            initial="hidden"
            animate={plansControls}
            className="grid md:grid-cols-2 gap-6"
          >
            {plans.map((plan) => (
              <motion.div key={plan.name} variants={fadeInUp}>
                <GlassCard
                  gradient={plan.highlighted}
                  hover={false}
                  className={`h-full ${plan.highlighted ? 'ring-2 ring-blue-500/30' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'bg-surface-light'
                    }`}>
                      <plan.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-[family-name:var(--font-heading)]">{plan.name}</h3>
                      <p className="text-2xl font-bold text-gradient">{plan.price}</p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-blue-500' : 'text-green-500'}`} />
                        <span className="text-[var(--muted)]">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
                        : 'border border-glass-border hover:bg-surface-lighter text-[var(--foreground)]'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Form */}
      <section className="py-12 md:py-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Quick Listing"
            title="List Your Property Now"
            highlight="Now"
          />

          {submitted ? (
            <GlassCard hover={false} className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-2">
                Request Submitted!
              </h2>
              <p className="text-[var(--muted)] mb-6">
                Your listing request has been saved. Our team will contact you shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl border border-blue-500/50 text-blue-600 font-medium hover:bg-blue-500/10 transition-all cursor-pointer"
              >
                Submit Another
              </button>
            </GlassCard>
          ) : (
            <GlassCard hover={false}>
              {state.error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm">
                  {state.error}
                </div>
              )}
              <form id="list-property-form" action={formAction} className="space-y-4">
                <input type="hidden" name="plan" value="free" />
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Property Type</label>
                    <select
                      name="propertyType"
                      className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Independent House">Independent House</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">BHK</label>
                    <select
                      name="bhk"
                      className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4+">4+ BHK</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Area</label>
                  <input
                    type="text"
                    name="area"
                    placeholder="e.g. Hennur, Hebbal"
                    className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-surface-light focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                >
                  {isPending ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </GlassCard>
          )}
        </div>
      </section>
    </>
  );
}
