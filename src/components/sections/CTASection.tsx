'use client';

import { motion } from 'motion/react';
import { LuExternalLink, LuBuilding2, LuTrendingUp, LuUsers, LuGlobe, LuCircleCheckBig } from 'react-icons/lu';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';

const features = [
  'Buy, Sell & Rent Properties',
  'Real-Time Market Insights',
  'Trusted Agent Network',
  'Pan-India Coverage',
];

export function CTASection() {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#006194] via-[#0284C7] to-[#006194] p-8 md:p-12 lg:p-16"
        >
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.span
                variants={fadeInUp}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-sm font-medium mb-4"
              >
                <LuGlobe className="w-3.5 h-3.5" />
                Our Network
              </motion.span>

              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-white mb-4"
              >
                Discover EstateHive.in
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-white/80 max-w-lg mb-6"
              >
                JusRental is powered by EstateHive.in — India&apos;s complete real estate platform
                for buying, selling, and renting properties.
              </motion.p>

              {/* Feature checkmarks */}
              <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {features.map((text) => (
                  <div key={text} className="flex items-center gap-2">
                    <LuCircleCheckBig className="w-4 h-4 text-white/90 shrink-0" />
                    <span className="text-sm text-white/90">{text}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <a
                  href="https://estatehive.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#006194] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <LuExternalLink className="w-4 h-4" />
                  Visit EstateHive.in
                </a>
              </motion.div>
            </div>

            {/* Right — Stats Box */}
            <motion.div
              variants={fadeInUp}
              className="shrink-0 w-full max-w-xs"
            >
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center mb-5 shadow-lg overflow-hidden">
                  <img
                    src="/images/favicon_eh.png"
                    alt="EstateHive"
                    className="w-11 h-11 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)] mb-4">
                  EstateHive.in
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white/80 mb-1">
                      <LuBuilding2 className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold text-white">10K+</p>
                    <p className="text-xs text-white/60">Listings</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white/80 mb-1">
                      <LuUsers className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold text-white">500+</p>
                    <p className="text-xs text-white/60">Agents</p>
                  </div>
                </div>

                <p className="text-xs text-white/50">
                  The parent platform powering JusRental
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
