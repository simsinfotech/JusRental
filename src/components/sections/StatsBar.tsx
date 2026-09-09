'use client';

import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { STATS } from '@/lib/constants';

export function StatsBar() {
  const { ref, controls } = useAnimateInView();

  return (
    <section className="relative py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="glass-card p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-gradient">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-2 text-sm md:text-base text-[var(--muted)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
