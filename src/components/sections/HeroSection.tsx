'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Play,
  MapPin,
  Home,
  Building2,
  IndianRupee,
  CalendarDays,
  Search,
  ShieldCheck,
  Headphones,
  BadgePercent,
  Lock,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { WHATSAPP_URL } from '@/lib/constants';

const propertyTypes = ['Apartment', 'Villa', 'Independent House'];

const locations = [
  'Koramangala',
  'Indiranagar',
  'HSR Layout',
  'Whitefield',
  'Electronic City',
  'Marathahalli',
  'Jayanagar',
  'BTM Layout',
];

const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];

const budgetOptions = [
  '₹5K - ₹10K',
  '₹10K - ₹20K',
  '₹20K - ₹35K',
  '₹35K - ₹50K',
  '₹50K+',
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Verified Homes', description: 'Every listing checked' },
  { icon: Headphones, label: '24/7 Support', description: 'Always here to help' },
  { icon: BadgePercent, label: 'Zero Brokerage', description: 'No hidden fees' },
  { icon: Lock, label: 'Secure Payments', description: 'Safe transactions' },
];

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Tenants' },
  { value: 1200, suffix: '+', label: 'Verified Properties' },
  { value: 25, suffix: '+', label: 'Bangalore Areas' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

export function HeroSection() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBhk, setSelectedBhk] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const { ref: trustRef, controls: trustControls } = useAnimateInView(0.2);
  const { ref: statsRef, controls: statsControls } = useAnimateInView(0.2);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt="Luxury living room with sunset city view"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/70 via-[#0f172a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 md:pt-36 lg:pt-44 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
            {/* Left — Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6 max-w-xl shrink-0"
            >
              {/* Kicker */}
              <motion.div variants={fadeInUp}>
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
                  Your Home Awaits
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold font-[family-name:var(--font-heading)] leading-[1.08] text-white"
              >
                Homes That Feel{' '}
                <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Like Yours
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeInUp}
                className="text-lg text-white/70 leading-relaxed max-w-lg"
              >
                Discover verified rental homes in Bangalore. AI-matched to your
                needs, zero brokerage, and hassle-free move-in across 25+
                neighborhoods.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={WHATSAPP_URL}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Find Your Home
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-white/80 hover:text-white font-medium transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/50 transition-colors">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  How It Works
                </a>
              </motion.div>
            </motion.div>

            {/* Right — Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm mx-auto lg:mx-0 shrink-0"
            >
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-5 shadow-2xl shadow-black/20">
                {/* Form Fields */}
                <div className="space-y-3">
                  {/* Property Type */}
                  <div>
                    <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 block">
                      Property Type
                    </label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/8 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-800">All types</option>
                        {propertyTypes.map((t) => (
                          <option key={t} value={t} className="bg-slate-800">{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 block">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/8 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-800">Select area</option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc} className="bg-slate-800">{loc}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* BHK + Budget Row */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 block">
                        BHK Type
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <select
                          value={selectedBhk}
                          onChange={(e) => setSelectedBhk(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/8 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-slate-800">Any</option>
                          {bhkOptions.map((b) => (
                            <option key={b} value={b} className="bg-slate-800">{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 block">
                        Budget
                      </label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <select
                          value={selectedBudget}
                          onChange={(e) => setSelectedBudget(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/8 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-slate-800">Any range</option>
                          {budgetOptions.map((b) => (
                            <option key={b} value={b} className="bg-slate-800">{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Move-in Date */}
                  <div>
                    <label className="text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5 block">
                      Move-in Date
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/8 border border-white/10 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all cursor-pointer [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                    <Search className="w-4 h-4" />
                    Search Homes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-10" />
      </section>

      {/* ─── TRUST BADGES ─── */}
      <section className="py-8 border-y border-glass-border bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={trustRef}
            variants={staggerContainer}
            initial="hidden"
            animate={trustControls}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {trustBadges.map((badge) => (
              <motion.div
                key={badge.label}
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center shrink-0">
                  <badge.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{badge.label}</p>
                  <p className="text-xs text-[var(--muted)]">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={statsControls}
            className="glass-card p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-gradient">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm md:text-base text-[var(--muted)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
