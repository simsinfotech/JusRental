'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { MapPin, Maximize2, Wifi, Dumbbell, Car, Zap, Waves, Shield, Droplets } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ImageGallery } from '@/components/ui/ImageGallery';
import { Button } from '@/components/ui/Button';
import { PROPERTIES, WHATSAPP_URL } from '@/lib/constants';

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

export function PropertyShowcase() {
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
          {PROPERTIES.map((property) => (
            <motion.div key={property.id} variants={fadeInUp}>
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable
                glareMaxOpacity={0.1}
                glarePosition="all"
                scale={1.02}
              >
                <GlassCard className="overflow-hidden p-0">
                  {/* Image */}
                  <div className="relative">
                    <ImageGallery images={property.images} alt={property.title} />
                    {property.verified && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="success">Verified</Badge>
                      </div>
                    )}
                    {property.available && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="info">Available</Badge>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                        {property.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-[var(--muted)] mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      {property.location}
                    </div>

                    <div className="flex items-center gap-4 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-[var(--muted)]" />
                        {property.sqft} sqft
                      </span>
                      <span className="text-[var(--muted)]">|</span>
                      <span>{property.bhk} BHK</span>
                      <span className="text-[var(--muted)]">|</span>
                      <span>{property.furnished}</span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.amenities.slice(0, 4).map((amenity) => {
                        const Icon = amenityIcons[amenity];
                        return (
                          <span
                            key={amenity}
                            className="flex items-center gap-1 px-2 py-1 rounded-md bg-surface-light text-xs text-[var(--muted)]"
                          >
                            {Icon && <Icon className="w-3 h-3" />}
                            {amenity}
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
                      <Button href={WHATSAPP_URL} size="sm">
                        Enquire
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
