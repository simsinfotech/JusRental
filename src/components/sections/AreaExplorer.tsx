'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { LuMapPin, LuArrowRight, LuFlame, LuTrendingUp } from 'react-icons/lu';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import type { Area } from '@/types';

interface AreaExplorerProps {
  areas: Area[];
}

export function AreaExplorer({ areas }: AreaExplorerProps) {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section id="areas" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006194]/10 text-[#006194] text-sm font-medium mb-4">
            Explore Neighborhoods
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-[#131b2e] mb-4">
            Popular Areas in <span className="text-[#006194]">Bangalore</span>
          </h2>
          <p className="text-[#3f4850] max-w-2xl mx-auto">
            Discover rentals in the most sought-after neighborhoods across the city.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {areas.map((area, index) => (
            <Link
              key={area.id}
              href={`/properties?area=${encodeURIComponent(area.name)}`}
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  {/* Badge */}
                  {area.popular && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-semibold uppercase tracking-wide">
                        {index % 2 === 0 ? (
                          <><LuFlame className="w-2.5 h-2.5" /> Hotspot</>
                        ) : (
                          <><LuTrendingUp className="w-2.5 h-2.5" /> Popular</>
                        )}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold font-[family-name:var(--font-heading)] text-[#131b2e] mb-1 line-clamp-1">
                    {area.name}
                  </h3>
                  <p className="text-xs text-[#3f4850] flex items-center gap-1 mb-0.5">
                    <LuMapPin className="w-3 h-3" />
                    {area.properties} properties
                  </p>
                  <p className="text-xs text-[#707881]">{area.priceRange}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
