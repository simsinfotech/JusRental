'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { TrendingUp, CheckCircle2, Users, Shield, IndianRupee, Home } from 'lucide-react';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';

const benefits = [
  'Access to 5,000+ verified tenants',
  'Tenant background verification included',
  'Market-rate rental pricing analysis',
  'Hassle-free agreement & move-in',
];

const bhkRentMap: Record<string, Record<string, string>> = {
  '1 BHK': { Hennur: '₹10,000 - ₹16,000', Hebbal: '₹12,000 - ₹18,000', Yelahanka: '₹8,000 - ₹14,000', Thanisandra: '₹9,000 - ₹15,000', Jakkur: '₹9,000 - ₹15,000', Horamavu: '₹8,000 - ₹14,000' },
  '2 BHK': { Hennur: '₹18,000 - ₹28,000', Hebbal: '₹22,000 - ₹35,000', Yelahanka: '₹15,000 - ₹25,000', Thanisandra: '₹16,000 - ₹26,000', Jakkur: '₹16,000 - ₹25,000', Horamavu: '₹14,000 - ₹22,000' },
  '3 BHK': { Hennur: '₹28,000 - ₹42,000', Hebbal: '₹32,000 - ₹50,000', Yelahanka: '₹22,000 - ₹38,000', Thanisandra: '₹25,000 - ₹40,000', Jakkur: '₹24,000 - ₹38,000', Horamavu: '₹22,000 - ₹35,000' },
};

const areaKeys = Object.keys(bhkRentMap['2 BHK']);

export function OwnerSection() {
  const { ref, controls } = useAnimateInView(0.1);
  const [selectedBHK, setSelectedBHK] = useState('2 BHK');
  const [selectedArea, setSelectedArea] = useState('Hennur');

  const estimate = bhkRentMap[selectedBHK]?.[selectedArea] || '₹15,000 - ₹25,000';

  return (
    <section id="owners" className="py-16 md:py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left — Owner Proposition */}
          <motion.div variants={slideInLeft} className="space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#006194] text-sm font-medium">
              <Home className="w-3.5 h-3.5" />
              For Property Owners
            </span>

            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-white">
              List Your Property,{' '}
              <span className="text-[#006194]">Find Tenants Fast</span>
            </h2>

            <p className="text-white/60 text-lg">
              Join 400+ property owners who trust JusRental to find quality tenants. Zero hassle, maximum returns.
            </p>

            <div className="space-y-3">
              {benefits.map((text) => (
                <div key={text} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#006194] shrink-0" />
                  <span className="text-white/80">{text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/list-property"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#0F172A] font-semibold hover:bg-slate-100 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              List Your Property Free
            </Link>
          </motion.div>

          {/* Right — Rental Estimator */}
          <motion.div variants={slideInRight}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <IndianRupee className="w-5 h-5 text-[#006194]" />
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e]">
                  Rental Estimator
                </h3>
              </div>

              {/* BHK */}
              <div className="mb-5">
                <label className="text-sm text-[#3f4850] mb-2 block font-medium">Property Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(bhkRentMap).map((bhk) => (
                    <button
                      key={bhk}
                      onClick={() => setSelectedBHK(bhk)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer border text-center ${
                        selectedBHK === bhk
                          ? 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-slate-50 text-[#3f4850] border-slate-200 hover:border-[#006194]/30'
                      }`}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area */}
              <div className="mb-6">
                <label className="text-sm text-[#3f4850] mb-2 block font-medium">Location</label>
                <div className="grid grid-cols-3 gap-2">
                  {areaKeys.map((area) => (
                    <button
                      key={area}
                      onClick={() => setSelectedArea(area)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer border text-center ${
                        selectedArea === area
                          ? 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-slate-50 text-[#3f4850] border-slate-200 hover:border-[#006194]/30'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-center mb-5">
                <p className="text-sm text-[#3f4850] mb-2">Estimated Monthly Rent</p>
                <motion.p
                  key={estimate}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-[#006194]"
                >
                  {estimate}
                </motion.p>
                <p className="text-xs text-[#707881] mt-2">
                  Based on current market rates for {selectedBHK} in {selectedArea}
                </p>
              </div>

              <Link
                href="/list-property"
                className="w-full py-3 rounded-xl bg-[#006194] hover:bg-[#005080] text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4" />
                List With This Estimate
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
