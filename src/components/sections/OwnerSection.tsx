'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { TrendingUp, CheckCircle2, Users, Shield, IndianRupee } from 'lucide-react';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { WHATSAPP_URL } from '@/lib/constants';

const benefits = [
  { icon: Users, text: 'Access to 5,000+ verified tenants' },
  { icon: Shield, text: 'Tenant background verification' },
  { icon: TrendingUp, text: 'Market-rate rental pricing' },
  { icon: CheckCircle2, text: 'Hassle-free agreement & move-in' },
];

const bhkRentMap: Record<string, Record<string, string>> = {
  '1 BHK': { Koramangala: '₹14,000 - ₹20,000', Indiranagar: '₹16,000 - ₹24,000', 'HSR Layout': '₹12,000 - ₹18,000', Whitefield: '₹10,000 - ₹16,000' },
  '2 BHK': { Koramangala: '₹22,000 - ₹35,000', Indiranagar: '₹28,000 - ₹45,000', 'HSR Layout': '₹18,000 - ₹30,000', Whitefield: '₹16,000 - ₹28,000' },
  '3 BHK': { Koramangala: '₹35,000 - ₹55,000', Indiranagar: '₹40,000 - ₹65,000', 'HSR Layout': '₹30,000 - ₹48,000', Whitefield: '₹25,000 - ₹42,000' },
};

export function OwnerSection() {
  const { ref, controls } = useAnimateInView(0.1);
  const [selectedBHK, setSelectedBHK] = useState('2 BHK');
  const [selectedArea, setSelectedArea] = useState('Koramangala');
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const estimate = bhkRentMap[selectedBHK]?.[selectedArea] || '₹15,000 - ₹25,000';

  return (
    <section id="owners" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.07]"
        style={{ y: imgY }}
      >
        <Image
          src="/images/building-dusk.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="For Property Owners"
          title="List Your Property, Find Tenants Fast"
          highlight="Fast"
          subtitle="Join 400+ property owners who trust JusRental to find quality tenants."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Benefits + building image */}
          <motion.div variants={slideInLeft} className="space-y-6">
            {/* Building image card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-8 group">
              <Image
                src="/images/building-dusk.jpg"
                alt="Modern Bengaluru apartment building at dusk"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold font-[family-name:var(--font-heading)] text-lg">
                  Your property deserves the best tenants
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
              Why owners love <span className="text-gradient">JusRental</span>
            </h3>
            <div className="space-y-4">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.text}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-[var(--muted)]">{b.text}</span>
                </motion.div>
              ))}
            </div>
            <Button href={WHATSAPP_URL} size="lg">
              List Your Property
            </Button>
          </motion.div>

          {/* Rental Estimator */}
          <motion.div variants={slideInRight}>
            <GlassCard gradient>
              <div className="flex items-center gap-2 mb-6">
                <IndianRupee className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                  Rental Estimator
                </h3>
              </div>

              {/* BHK */}
              <div className="mb-4">
                <label className="text-sm text-[var(--muted)] mb-2 block">Property Type</label>
                <div className="flex gap-2">
                  {Object.keys(bhkRentMap).map((bhk) => (
                    <button
                      key={bhk}
                      onClick={() => setSelectedBHK(bhk)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        selectedBHK === bhk
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                          : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
                      }`}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area */}
              <div className="mb-6">
                <label className="text-sm text-[var(--muted)] mb-2 block">Location</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(bhkRentMap['2 BHK']).map((area) => (
                    <button
                      key={area}
                      onClick={() => setSelectedArea(area)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        selectedArea === area
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                          : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-center">
                <p className="text-sm text-[var(--muted)] mb-2">Estimated Monthly Rent</p>
                <motion.p
                  key={estimate}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-gradient"
                >
                  {estimate}
                </motion.p>
                <p className="text-xs text-[var(--muted)] mt-2">
                  Based on current market rates for {selectedBHK} in {selectedArea}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
