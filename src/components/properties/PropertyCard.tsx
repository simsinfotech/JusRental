'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { MapPin, Maximize2, Wifi, Dumbbell, Car, Zap, Waves, Shield, Droplets, AirVent, ArrowUpDown } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
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

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <GlassCard className="overflow-hidden p-0 h-full group">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
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
          <div className="absolute bottom-3 left-3">
            <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
              {property.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
            {property.title}
          </h3>

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
            <span className="text-sm font-medium text-blue-600 group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
