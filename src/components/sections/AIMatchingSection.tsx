'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, SlidersHorizontal, IndianRupee, CheckCircle2, Loader2 } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';

const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
const budgetOptions = ['₹25K - ₹35K', '₹35K - ₹45K', '₹45K - ₹55K', '₹55K - ₹75K', '₹75K+'];
const amenityOptions = ['WiFi', 'Gym', 'Parking', 'Pool', 'Furnished', 'Pet Friendly'];

export function AIMatchingSection() {
  const { ref, controls } = useAnimateInView(0.1);
  const [selectedBHK, setSelectedBHK] = useState('2 BHK');
  const [selectedBudget, setSelectedBudget] = useState('₹35K - ₹45K');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['WiFi', 'Parking']);
  const [matchState, setMatchState] = useState<'idle' | 'loading' | 'found'>('idle');

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleFindMatches = () => {
    setMatchState('loading');
    setTimeout(() => {
      setMatchState('found');
      setTimeout(() => setMatchState('idle'), 5000);
    }, 2000);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-[#131b2e] mb-4">
            <span className="text-[#006194]">Smart</span> Property Matching
          </h2>
          <p className="text-[#3f4850] max-w-2xl mx-auto">
            Tell us what you want. We find the perfect match in seconds.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="bg-[#F8FAFC] rounded-2xl p-6 md:p-10"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left — Preferences */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <SlidersHorizontal className="w-5 h-5 text-[#006194]" />
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e]">
                  Your Preferences
                </h3>
              </div>

              {/* BHK selector */}
              <div>
                <label className="text-sm text-[#3f4850] mb-2 block font-medium">Apartment Size</label>
                <div className="flex flex-wrap gap-2">
                  {bhkOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedBHK(opt)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer border ${
                        selectedBHK === opt
                          ? 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-white text-[#3f4850] border-slate-200 hover:border-[#006194]/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget selector */}
              <div>
                <label className="text-sm text-[#3f4850] mb-2 block font-medium">
                  <IndianRupee className="w-3.5 h-3.5 inline" /> Monthly Budget
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedBudget(opt)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer border ${
                        selectedBudget === opt
                          ? 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-white text-[#3f4850] border-slate-200 hover:border-[#006194]/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="text-sm text-[#3f4850] mb-2 block font-medium">Must-Have Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {amenityOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleAmenity(opt)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer border ${
                        selectedAmenities.includes(opt)
                          ? 'bg-[#006194]/10 text-[#006194] border-[#006194]/30 font-medium'
                          : 'bg-white text-[#3f4850] border-slate-200 hover:border-[#006194]/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleFindMatches}
                disabled={matchState === 'loading'}
                className="w-full py-3 rounded-xl bg-[#006194] hover:bg-[#005080] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#006194]/20 transition-all duration-300 cursor-pointer disabled:opacity-70"
              >
                {matchState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Matching...
                  </>
                ) : matchState === 'found' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Match Found!
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Find Matches Now
                  </>
                )}
              </button>
            </motion.div>

            {/* Right — AI Top Recommendation */}
            <motion.div variants={fadeInUp}>
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e]">
                    AI Top Recommendation
                  </h3>
                </div>

                <AnimatePresence mode="wait">
                  {matchState === 'found' ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex-1"
                    >
                      {/* Property Preview Card */}
                      <div className="rounded-xl overflow-hidden border border-slate-100 mb-4">
                        <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                          <span className="text-sm text-slate-500">Property Image</span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-[#131b2e] mb-1">Modern 2BHK in Hennur</h4>
                          <p className="text-lg font-bold text-[#0369A1]">₹35,000<span className="text-sm font-normal text-[#3f4850]">/month</span></p>
                        </div>
                      </div>

                      {/* Match Score */}
                      <div className="bg-emerald-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#131b2e]">Match Score</span>
                          <span className="text-lg font-bold text-emerald-700">95%</span>
                        </div>
                        <div className="w-full bg-emerald-100 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '95%' }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="bg-emerald-500 h-2 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Breakdown */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-[#3f4850]">Budget Alignment</span>
                            <span className="font-medium text-[#131b2e]">92%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '92%' }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-[#006194] h-1.5 rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-[#3f4850]">Amenities Match</span>
                            <span className="font-medium text-[#131b2e]">88%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '88%' }}
                              transition={{ duration: 1, delay: 0.7 }}
                              className="bg-purple-500 h-1.5 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex items-center justify-center text-center"
                    >
                      <div>
                        <div className="w-20 h-20 mx-auto rounded-full bg-purple-50 flex items-center justify-center mb-4">
                          <Sparkles className="w-8 h-8 text-purple-400" />
                        </div>
                        <p className="text-[#3f4850] text-sm max-w-xs mx-auto">
                          Set your preferences and click &ldquo;Find Matches Now&rdquo; to see AI-curated results
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
