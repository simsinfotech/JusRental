'use client';

import { motion } from 'motion/react';
import { LuBadgeIndianRupee, LuShieldCheck, LuSparkles, LuUserCheck, LuCreditCard, LuMessageCircle, LuGlobe, LuBookOpen } from 'react-icons/lu';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';

const features = [
  {
    icon: LuBadgeIndianRupee,
    title: 'Zero Brokerage',
    description: 'No hidden fees or commissions. What you see is what you pay.',
    color: 'bg-blue-50 text-[#006194]',
  },
  {
    icon: LuShieldCheck,
    title: 'Verified Listings',
    description: 'Every property is physically verified by our team before listing.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: LuSparkles,
    title: 'AI Property Matching',
    description: 'Our AI analyzes your preferences to find the perfect home match.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: LuUserCheck,
    title: 'Tenant KYC',
    description: 'Background-verified tenants for owner peace of mind.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: LuCreditCard,
    title: 'Online Token Payment',
    description: 'Secure online payments with instant confirmation receipts.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: LuMessageCircle,
    title: 'WhatsApp Notifications',
    description: 'Real-time updates on viewings, bookings, and payments via WhatsApp.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: LuGlobe,
    title: 'NRI Services',
    description: 'End-to-end property management for overseas property owners.',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: LuBookOpen,
    title: 'Blog & Community',
    description: 'Expert area guides, rental tips, and tenant resources.',
    color: 'bg-rose-50 text-rose-600',
  },
];

export function KeyFeaturesSection() {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006194]/10 text-[#006194] text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-[#131b2e] mb-4">
            What Makes JusRental <span className="text-[#006194]">Different</span>
          </h2>
          <p className="text-[#3f4850] max-w-2xl mx-auto">
            We&apos;re not just another listing platform. Here&apos;s what sets us apart.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 group">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold font-[family-name:var(--font-heading)] text-[#131b2e] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#3f4850] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
