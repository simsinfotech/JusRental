'use client';

import { motion } from 'motion/react';
import { ExternalLink, Building2, TrendingUp, Users, Globe } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';

const highlights = [
  { icon: Building2, text: 'Buy, Sell & Rent Properties' },
  { icon: TrendingUp, text: 'Real-Time Market Insights' },
  { icon: Users, text: 'Trusted Agent Network' },
  { icon: Globe, text: 'Pan-India Coverage' },
];

export function CTASection() {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="relative rounded-3xl overflow-hidden p-8 md:p-16"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600" />

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Floating decorations */}
          <motion.div
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-white mb-4"
              >
                Discover EstateHive.in
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-white/85 max-w-lg mb-6"
              >
                JusRental is powered by EstateHive.in — India&apos;s complete real estate platform
                for buying, selling, and renting properties. From verified listings to trusted
                agents, EstateHive is the backbone behind everything we do.
              </motion.p>

              {/* Highlights grid */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3 mb-8">
                {highlights.map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-white/90 font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <a
                  href="https://estatehive.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  Learn More
                </a>
              </motion.div>
            </div>

            {/* Right — logo / branding card */}
            <motion.div
              variants={fadeInUp}
              className="shrink-0 w-full max-w-xs"
            >
              <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 text-center">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-white flex items-center justify-center mb-5 shadow-lg overflow-hidden">
                  <img
                    src="/images/favicon_eh.png"
                    alt="EstateHive"
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-heading)] mb-2">
                  EstateHive.in
                </h3>
                <p className="text-sm text-white/70 mb-5">
                  The parent platform powering JusRental &amp; more.
                </p>
                <div className="flex items-center justify-center gap-4 text-white/60 text-xs">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    10K+ Listings
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    500+ Agents
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
