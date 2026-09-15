'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Maximize2, Calendar, Home, Compass, Users, ArrowLeft,
  Wifi, Dumbbell, Car, Zap, Waves, Shield, Droplets, AirVent, ArrowUpDown,
  School, Hospital, Train, ShoppingBag, TreePine, UtensilsCrossed, MessageCircle,
} from 'lucide-react';
import { getPropertyWhatsAppURL, WHATSAPP_NUMBER } from '@/lib/constants';
import { Badge } from '@/components/ui/Badge';
import { GlassCard } from '@/components/ui/GlassCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { PropertyCard } from '@/components/properties/PropertyCard';
import type { Property } from '@/types';

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi, Gym: Dumbbell, Parking: Car, 'Power Backup': Zap,
  Pool: Waves, Security: Shield, 'Water Purifier': Droplets, AC: AirVent, Lift: ArrowUpDown,
};

const nearbyIcons: Record<string, React.ElementType> = {
  school: School, hospital: Hospital, metro: Train, mall: ShoppingBag,
  park: TreePine, restaurant: UtensilsCrossed,
};

interface PropertyDetailProps {
  property: Property;
  similar: Property[];
}

export function PropertyDetail({ property, similar }: PropertyDetailProps) {
  const whatsappUrl = getPropertyWhatsAppURL(property.title, property.location, property.price);
  const bookVisitUrl = `/book-visit?propertyId=${property.id}&title=${encodeURIComponent(property.title)}`;

  // Track property view (debounced per IP/24hr on server)
  useEffect(() => {
    fetch('/api/properties/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: property.id }),
    }).catch(() => {});
  }, [property.id]);

  return (
    <>
      {/* Hero with image */}
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Properties', href: '/properties' }, { label: property.title }]} />

          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mt-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Link>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden aspect-[21/9] relative">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {property.verified && <Badge variant="success">Verified</Badge>}
              {property.available && <Badge variant="info">Available</Badge>}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column */}
            <div className="flex-1 space-y-8">
              {/* Title & quick info */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-heading)] mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1.5 text-[var(--muted)] mb-4">
                  <MapPin className="w-4 h-4" />
                  {property.location}
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light text-sm">
                    <Home className="w-4 h-4 text-blue-600" />
                    {property.bhk} BHK {property.type}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light text-sm">
                    <Maximize2 className="w-4 h-4 text-blue-600" />
                    {property.sqft} sqft
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light text-sm">
                    <Compass className="w-4 h-4 text-blue-600" />
                    {property.facing} facing
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light text-sm">
                    <ArrowUpDown className="w-4 h-4 text-blue-600" />
                    Floor {property.floor}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light text-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    {property.sharingType}
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-light text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Posted {property.postedDate}
                  </span>
                </div>
              </div>

              {/* Description */}
              <GlassCard hover={false}>
                <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-3">Description</h2>
                <p className="text-[var(--muted)] leading-relaxed">{property.description}</p>
              </GlassCard>

              {/* Amenities */}
              <GlassCard hover={false}>
                <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-surface-light"
                      >
                        {Icon && <Icon className="w-5 h-5 text-blue-600" />}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              {/* Nearby Places */}
              {property.nearbyPlaces.length > 0 && (
                <GlassCard hover={false}>
                  <h2 className="text-xl font-semibold font-[family-name:var(--font-heading)] mb-4">Nearby Places</h2>
                  <div className="space-y-3">
                    {property.nearbyPlaces.map((place) => {
                      const Icon = nearbyIcons[place.type] || MapPin;
                      return (
                        <div key={place.name} className="flex items-center justify-between py-2 border-b border-glass-border last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm">{place.name}</span>
                          </div>
                          <span className="text-sm text-[var(--muted)]">{place.distance}</span>
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              )}
            </div>

            {/* Right sidebar — sticky price card */}
            <div className="w-full lg:w-[360px] shrink-0">
              <div className="sticky top-24 space-y-4">
                <GlassCard gradient hover={false}>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gradient">
                      ₹{property.price.toLocaleString()}
                    </div>
                    <p className="text-sm text-[var(--muted)]">per month</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Security Deposit</span>
                      <span className="font-medium">₹{property.deposit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Furnished</span>
                      <span className="font-medium">{property.furnished}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Brokerage</span>
                      <span className="font-medium text-green-600">₹599 only</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href={bookVisitUrl}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                    >
                      <Calendar className="w-4 h-4" />
                      Book a Visit
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-green-500/50 text-green-600 font-semibold hover:bg-green-500/10 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-6">
                Similar Properties
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
