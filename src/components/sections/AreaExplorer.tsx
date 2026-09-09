'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { MapPin, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { AREAS, WHATSAPP_URL } from '@/lib/constants';

export function AreaExplorer() {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section id="areas" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Explore Neighborhoods"
          title="Popular Areas in Bangalore"
          highlight="Bangalore"
          subtitle="Discover rentals in the most sought-after neighborhoods across the city."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {AREAS.map((area) => (
            <motion.a
              key={area.id}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
            >
              {/* Background image with zoom on hover */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/40 transition-all duration-500" />

              {/* Popular badge */}
              {area.popular && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="warning">Popular</Badge>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10">
                <h3 className="text-lg md:text-xl font-semibold font-[family-name:var(--font-heading)] text-white mb-1">
                  {area.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {area.properties} properties
                    </p>
                    <p className="text-sm text-white/70">{area.priceRange}</p>
                  </div>
                  <motion.div
                    className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1 }}
                    animate={{}}
                  >
                    <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
