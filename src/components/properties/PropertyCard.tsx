'use client';

import Link from 'next/link';
import { MapPin, Heart, Wifi, Dumbbell, Car, Zap, Waves, Shield, Droplets, AirVent, ArrowUpDown, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ImageGallery } from '@/components/ui/ImageGallery';
import type { Property } from '@/types';

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Gym: Dumbbell,
  Parking: Car,
  'Power Backup': Zap,
  Pool: Waves,
  Security: Shield,
  'Water Purifier': Droplets,
  AC: AirVent,
  Lift: ArrowUpDown,
};

const sharingTypeColors: Record<string, string> = {
  Family: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Bachelor: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  Any: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
};

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <GlassCard className="overflow-hidden p-0 group" hover>
        <div className="flex flex-col md:flex-row">
          {/* Image section */}
          <div className="relative md:w-[320px] lg:w-[360px] flex-shrink-0">
            <ImageGallery images={property.images} alt={property.title} />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
              aria-label="Save property"
            >
              <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
            {property.verified && (
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium">
                  Verified
                </span>
              </div>
            )}
          </div>

          {/* Content section */}
          <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
            {/* Top area */}
            <div>
              <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1">
                {property.title}
              </h3>

              <div className="flex items-center gap-1.5 text-sm text-[var(--muted)] mb-3">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="line-clamp-1">{property.location}</span>
              </div>

              {/* Tags row */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${sharingTypeColors[property.sharingType] || sharingTypeColors.Any}`}>
                  {property.sharingType}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-500/10 text-blue-600 border-blue-500/20">
                  {property.bhk} BHK
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-surface-light text-[var(--muted)] border-glass-border">
                  {property.furnished}
                </span>
              </div>

              {/* Details row */}
              <div className="flex items-center gap-3 text-sm text-[var(--foreground)] mb-3">
                <span>{property.sqft} sqft</span>
                <span className="text-[var(--muted)]">&middot;</span>
                <span>{property.floor} Floor</span>
                <span className="text-[var(--muted)]">&middot;</span>
                <span>{property.facing} Facing</span>
              </div>

              {/* Amenity icons */}
              <div className="flex items-center gap-3 mb-4">
                {property.amenities.slice(0, 5).map((amenity) => {
                  const Icon = amenityIcons[amenity];
                  if (!Icon) return null;
                  return (
                    <span
                      key={amenity}
                      title={amenity}
                      className="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center"
                    >
                      <Icon className="w-4 h-4 text-[var(--muted)]" />
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bottom area - price + CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-glass-border">
              <div>
                <span className="text-2xl font-bold text-gradient">
                  ₹{property.price.toLocaleString()}
                </span>
                <span className="text-sm text-[var(--muted)]">/month</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
                Explore
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
