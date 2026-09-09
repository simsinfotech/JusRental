'use client';

import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const { ref, controls } = useAnimateInView();

  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={controls}
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {badge && (
        <motion.span
          variants={fadeInUp}
          className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-600 border border-blue-500/20"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={fadeInUp}
        className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] leading-tight"
      >
        {highlight
          ? titleParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < titleParts.length - 1 && (
                  <span className="text-gradient">{highlight}</span>
                )}
              </span>
            ))
          : title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
