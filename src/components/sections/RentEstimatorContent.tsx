'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { IndianRupee, MapPin, Home } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface RentEstimatorContentProps {
  rentData: Record<string, Record<string, string>>;
  rentAreas: string[];
  bhkOptions: string[];
}

export function RentEstimatorContent({ rentData, rentAreas, bhkOptions }: RentEstimatorContentProps) {
  const [selectedBHK, setSelectedBHK] = useState(bhkOptions[1] || '2 BHK');
  const [selectedArea, setSelectedArea] = useState(rentAreas[0] || 'Hennur');

  const estimate = rentData[selectedBHK]?.[selectedArea] || 'N/A';

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard gradient hover={false} className="p-8">
          <div className="flex items-center gap-2 mb-6">
            <IndianRupee className="w-6 h-6 text-cyan-500" />
            <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)]">
              Estimate Monthly Rent
            </h2>
          </div>

          {/* BHK Selection */}
          <div className="mb-6">
            <label className="text-sm text-[var(--muted)] mb-3 block flex items-center gap-1.5">
              <Home className="w-4 h-4" />
              Property Type
            </label>
            <div className="flex flex-wrap gap-2">
              {bhkOptions.map((bhk) => (
                <button
                  key={bhk}
                  onClick={() => setSelectedBHK(bhk)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    selectedBHK === bhk
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
                  }`}
                >
                  {bhk}
                </button>
              ))}
            </div>
          </div>

          {/* Area Selection */}
          <div className="mb-8">
            <label className="text-sm text-[var(--muted)] mb-3 block flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <div className="flex flex-wrap gap-2">
              {rentAreas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    selectedArea === area
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-surface-light text-[var(--muted)] hover:bg-surface-lighter'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-center">
            <p className="text-sm text-[var(--muted)] mb-2">Estimated Monthly Rent</p>
            <motion.p
              key={`${selectedBHK}-${selectedArea}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gradient"
            >
              {estimate}
            </motion.p>
            <p className="text-sm text-[var(--muted)] mt-3">
              Based on current 2026 market rates for {selectedBHK} in {selectedArea}
            </p>
          </div>
        </GlassCard>

        {/* Full Comparison Table */}
        <div className="mt-12">
          <SectionHeading
            badge="Market Rates"
            title="Complete Rent Guide — North Bangalore"
            highlight="North Bangalore"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-surface-light">
                  <th className="text-left px-4 py-3 font-semibold border-b border-glass-border">Area</th>
                  {bhkOptions.map((bhk) => (
                    <th key={bhk} className="text-left px-4 py-3 font-semibold border-b border-glass-border">{bhk}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rentAreas.map((area) => (
                  <tr key={area} className="hover:bg-surface-light/50 transition-colors">
                    <td className="px-4 py-3 font-medium border-b border-glass-border">{area}</td>
                    {bhkOptions.map((bhk) => (
                      <td key={bhk} className="px-4 py-3 text-[var(--muted)] border-b border-glass-border">
                        {rentData[bhk]?.[area] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
