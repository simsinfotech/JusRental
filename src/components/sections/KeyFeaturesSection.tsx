'use client';

import { motion } from 'motion/react';
import {
  BadgeIndianRupee,
  ShieldCheck,
  Sparkles,
  UserCheck,
  CreditCard,
  MessageCircle,
  Globe,
  BookOpen,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import type { KeyFeature } from '@/types';

const iconMap: Record<string, React.ElementType> = {
  BadgeIndianRupee,
  ShieldCheck,
  Sparkles,
  UserCheck,
  CreditCard,
  MessageCircle,
  Globe,
  BookOpen,
};

interface KeyFeaturesSectionProps {
  features: KeyFeature[];
}

export function KeyFeaturesSection({ features }: KeyFeaturesSectionProps) {
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            return (
              <motion.div key={feature.title} variants={fadeInUp}>
                <GlassCard
                  className="h-full group text-center"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-colors">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-base font-semibold font-[family-name:var(--font-heading)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
