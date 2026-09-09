'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, SlidersHorizontal, MapPin, IndianRupee } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { WHATSAPP_URL } from '@/lib/constants';

const bhkOptions = ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
const budgetOptions = ['Under ₹15K', '₹15K - ₹30K', '₹30K - ₹50K', '₹50K+'];
const amenityOptions = ['WiFi', 'Gym', 'Parking', 'Pool', 'Furnished', 'Pet Friendly'];

const mockResults = [
  { title: 'Sunny 2BHK in Koramangala', price: '₹22,000/mo', match: 95 },
  { title: 'Modern Flat in HSR Layout', price: '₹18,500/mo', match: 91 },
  { title: 'Spacious Home in Indiranagar', price: '₹27,000/mo', match: 87 },
];

export function AIMatchingSection() {
  const { ref, controls } = useAnimateInView(0.1);
  const [selectedBHK, setSelectedBHK] = useState('2 BHK');
  const [selectedBudget, setSelectedBudget] = useState('₹15K - ₹30K');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['WiFi', 'Parking']);
  const [showResults, setShowResults] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="AI-Powered"
          title="Smart Property Matching"
          highlight="Smart"
          subtitle="Tell us what you want. Our AI finds the perfect match in seconds."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Filter panel */}
          <motion.div variants={fadeInUp}>
            <GlassCard className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                  Your Preferences
                </h3>
              </div>

              {/* BHK selector */}
              <div>
                <label className="text-sm text-[var(--muted)] mb-2 block">Apartment Size</label>
                <div className="flex flex-wrap gap-2">
                  {bhkOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedBHK(opt)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        selectedBHK === opt
                          ? 'bg-gradient-to-r from-primary to-accent text-white'
                          : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget selector */}
              <div>
                <label className="text-sm text-[var(--muted)] mb-2 block">
                  <IndianRupee className="w-3.5 h-3.5 inline" /> Monthly Budget
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedBudget(opt)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        selectedBudget === opt
                          ? 'bg-gradient-to-r from-primary to-accent text-white'
                          : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="text-sm text-[var(--muted)] mb-2 block">Must-Have Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {amenityOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleAmenity(opt)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                        selectedAmenities.includes(opt)
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter border border-transparent'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => setShowResults(true)}
              >
                <Sparkles className="w-4 h-4" />
                Find Matches
              </Button>
            </GlassCard>
          </motion.div>

          {/* Results panel */}
          <motion.div variants={fadeInUp}>
            <GlassCard className="h-full flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                  AI Matches
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {showResults ? (
                  <motion.div
                    key="results"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4 flex-1"
                  >
                    {mockResults.map((result, i) => (
                      <motion.div
                        key={i}
                        variants={scaleIn}
                        className="flex items-center justify-between p-4 rounded-xl bg-surface-light hover:bg-surface-lighter transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{result.title}</p>
                            <p className="text-sm text-[var(--muted)]">{result.price}</p>
                          </div>
                        </div>
                        <Badge variant="success">{result.match}% match</Badge>
                      </motion.div>
                    ))}
                    <div className="pt-4">
                      <Button href={WHATSAPP_URL} variant="outline" className="w-full">
                        View All Matches on WhatsApp
                      </Button>
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
                      <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-pulse">
                        <Sparkles className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-[var(--muted)]">
                        Set your preferences and click &ldquo;Find Matches&rdquo; to see AI-curated results
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
