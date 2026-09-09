'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';

const features = [
  {
    title: 'Verified homes',
    description: 'Every listing is physically checked before it goes live.',
    icon: '/images/icon-shield.png',
  },
  {
    title: 'Real availability',
    description: 'No bait. The date a home says available is the date it is.',
    icon: '/images/icon-calendar.png',
  },
  {
    title: '0 tenant brokerage',
    description: 'No fees from tenants, ever. Owners pay us when a lease closes.',
    icon: '/images/icon-key.png',
  },
];

export function FeaturesSection() {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why Choose Us"
          title="What Makes JusRental Different"
          highlight="Different"
          subtitle="We're not just another listing platform. Here's what sets us apart."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeInUp}>
              <GlassCard
                gradient
                className="h-full group text-center"
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-6 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={feature.icon}
                    alt=""
                    width={44}
                    height={44}
                    className="drop-shadow-lg"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--muted)] leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
