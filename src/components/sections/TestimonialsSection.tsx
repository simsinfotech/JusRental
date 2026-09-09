'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { fadeInUp } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TESTIMONIALS } from '@/lib/constants';

const SwiperCarousel = dynamic(() => import('./TestimonialCarousel'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] flex items-center justify-center text-[var(--muted)]">
      Loading testimonials...
    </div>
  ),
});

export function TestimonialsSection() {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="Loved by Thousands"
          highlight="Thousands"
          subtitle="Don't just take our word for it. Here's what our tenants say."
        />

        <motion.div
          ref={ref}
          variants={fadeInUp}
          initial="hidden"
          animate={controls}
        >
          <SwiperCarousel />
        </motion.div>
      </div>
    </section>
  );
}
