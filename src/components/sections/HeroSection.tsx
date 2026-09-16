'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  Search,
  ShieldCheck,
  Headphones,
  BadgePercent,
  Lock,
  Home,
  MapPin,
  Building2,
  IndianRupee,
  ChevronDown,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

const propertyTypes = ['Apartment', 'Villa', 'Independent House'];

const locations = [
  'Hennur',
  'Hebbal',
  'Jakkur',
  'Bellary Road (Airport Road)',
  'Yelahanka',
  'Yelahanka New Town',
  'Bagalur',
  'Devanahalli',
  'Narayanapura',
  'Horamavu',
  'Thanisandra',
  'Chikkajhala',
  'Vidya Nagar Cross',
  'Byrathi',
  'Sadahalli',
];

const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];

const budgetOptions = [
  '₹25K - ₹35K',
  '₹35K - ₹45K',
  '₹45K - ₹55K',
  '₹55K - ₹65K',
  '₹65K - ₹75K',
  '₹75K+',
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

const budgetToParams: Record<string, { min: string; max: string }> = {
  '₹25K - ₹35K': { min: '25000', max: '35000' },
  '₹35K - ₹45K': { min: '35000', max: '45000' },
  '₹45K - ₹55K': { min: '45000', max: '55000' },
  '₹55K - ₹65K': { min: '55000', max: '65000' },
  '₹65K - ₹75K': { min: '65000', max: '75000' },
  '₹75K+': { min: '75000', max: '' },
};

export function HeroSection() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedBhk, setSelectedBhk] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const { ref: statsRef, controls: statsControls } = useAnimateInView(0.2);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedType) params.set('type', selectedType);
    if (selectedLocation) params.set('area', selectedLocation);
    if (selectedBhk) params.set('bhk', selectedBhk.replace(' BHK', '').replace('+', ''));
    if (selectedBudget && budgetToParams[selectedBudget]) {
      params.set('budgetMin', budgetToParams[selectedBudget].min);
      if (budgetToParams[selectedBudget].max) params.set('budgetMax', budgetToParams[selectedBudget].max);
    }
    router.push(`/properties${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const selectClasses =
    'w-full pl-10 pr-8 py-3 rounded-xl bg-white border border-slate-200 text-[#131b2e] text-sm focus:outline-none focus:border-[#006194] focus:ring-2 focus:ring-[#006194]/20 transition-all appearance-none cursor-pointer';

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen overflow-hidden bg-[#0F172A]">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.png"
            alt="Luxury living room with sunset city view"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 via-[#0F172A]/40 to-[#0F172A]/80" />
        </div>

        {/* Atmospheric blur elements */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#006194]/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#006194]/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto mb-10"
          >
            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-[family-name:var(--font-heading)] leading-[1.08] text-white mb-6"
            >
              Homes That Feel{' '}
              <span className="bg-gradient-to-r text-white">
                Like Yours
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto"
            >
              Discover verified rental homes in Bangalore. AI-matched to your needs,
              zero brokerage, and hassle-free move-in across 25+ neighborhoods.
            </motion.p>
          </motion.div>

          {/* ─── Search Console ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-5 md:p-6 shadow-2xl shadow-black/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Property Type */}
                <div>
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5 block">
                    Property Type
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className={selectClasses}
                    >
                      <option value="">All types</option>
                      {propertyTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5 block">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className={selectClasses}
                    >
                      <option value="">Select area</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* BHK */}
                <div>
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5 block">
                    BHK Type
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={selectedBhk}
                      onChange={(e) => setSelectedBhk(e.target.value)}
                      className={selectClasses}
                    >
                      <option value="">Any</option>
                      {bhkOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5 block">
                    Budget
                  </label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className={selectClasses}
                    >
                      <option value="">Any range</option>
                      {budgetOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Search Action Strip */}
              <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto flex-1 sm:flex-none px-8 py-3 rounded-xl bg-[#006194] hover:bg-[#005080] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#006194]/25 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  Search Homes
                </button>
                <span className="text-sm text-white/50 hidden sm:inline">
                  or browse <a href="/properties" className="text-[#006194] hover:underline">all properties</a>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Trust Highlights Ribbon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 w-full max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <badge.icon className="w-5 h-5 text-[#006194]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{badge.label}</p>
                    <p className="text-xs text-white/50">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            ref={statsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={statsControls}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-[#006194]">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm md:text-base text-[#3f4850]">
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
