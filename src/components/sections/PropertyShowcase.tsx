'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MapPin, Wifi, Dumbbell, Car, Zap, Waves, Shield, Droplets, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { ImageGallery } from '@/components/ui/ImageGallery';
import type { Property } from '@/types';

const Tilt = dynamic(() => import('react-parallax-tilt'), { ssr: false });

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Gym: Dumbbell,
  Parking: Car,
  'Power Backup': Zap,
  Pool: Waves,
  Security: Shield,
  'Water Purifier': Droplets,
};

const sharingTypeColors: Record<string, string> = {
  Family: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Bachelor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Any: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
};

interface PropertyShowcaseProps {
  properties: Property[];
}

export function PropertyShowcase({ properties }: PropertyShowcaseProps) {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section id="properties" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Featured Properties"
          title="Handpicked Homes for You"
          highlight="for You"
          subtitle="Explore our most popular verified listings across Bangalore."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {properties.map((property) => (
            <motion.div key={property.id} variants={fadeInUp}>
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable
                glareMaxOpacity={0.1}
                glarePosition="all"
                scale={1.02}
              >
                <Link href={`/properties/${property.id}`}>
                  <GlassCard className="overflow-hidden p-0 group h-full">
                    {/* Image */}
                    <div className="relative">
                      <ImageGallery images={property.images} alt={property.title} />
                      {property.verified && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="px-2.5 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium">
                            Verified
                          </span>
                        </div>
                      )}
                      {property.available && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-2.5 py-1 rounded-full bg-cyan-500/90 backdrop-blur-sm text-white text-xs font-medium">
                            Available
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {property.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-sm text-[var(--muted)] mb-3">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="line-clamp-1">{property.location}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${sharingTypeColors[property.sharingType] || sharingTypeColors.Any}`}>
                          {property.sharingType}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-blue-500/10 text-blue-600 border-blue-500/20">
                          {property.bhk} BHK
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border bg-surface-light text-[var(--muted)] border-glass-border">
                          {property.furnished}
                        </span>
                      </div>

                      {/* Amenities */}
                      <div className="flex items-center gap-2 mb-4">
                        {property.amenities.slice(0, 4).map((amenity) => {
                          const Icon = amenityIcons[amenity];
                          if (!Icon) return null;
                          return (
                            <span
                              key={amenity}
                              title={amenity}
                              className="w-7 h-7 rounded-md bg-surface-light flex items-center justify-center"
                            >
                              <Icon className="w-3.5 h-3.5 text-[var(--muted)]" />
                            </span>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-glass-border">
                        <div>
                          <span className="text-2xl font-bold text-gradient">
                            ₹{property.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-[var(--muted)]">/month</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600 group-hover:underline flex items-center gap-1">
                          View Details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
