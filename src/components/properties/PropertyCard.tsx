'use client';

import Link from 'next/link';
import { MapPin, Heart, ShieldCheck, ArrowRight, Camera } from 'lucide-react';
import { ImageGallery } from '@/components/ui/ImageGallery';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full border border-slate-100">
        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden">
          <ImageGallery images={property.images} alt={property.title} />
          {property.verified && (
            <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#16A34A] text-white text-[11px] font-bold">
              <ShieldCheck className="w-3 h-3" />
              Verified
            </span>
          )}
          <span className="absolute bottom-2.5 right-2.5 z-10 px-2 py-0.5 rounded bg-[#0F172A]/75 backdrop-blur-sm text-white text-[11px] font-semibold">
            {property.area}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
            aria-label="Save property"
          >
            <Heart className="w-4 h-4 text-slate-500 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 justify-between gap-2">
          <div>
            <h4 className="text-sm font-semibold font-[family-name:var(--font-heading)] text-[#131b2e] truncate group-hover:text-[#006194] transition-colors">
              {property.title}
            </h4>
            <p className="text-xs text-[#3f4850] truncate flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 shrink-0" />
              {property.location}
            </p>
            <div className="flex items-center gap-2 mt-2 text-[#3f4850] text-[11px]">
              <span className="px-1.5 py-0.5 rounded bg-[#F1F5F9] font-medium">{property.bhk} BHK</span>
              <span className="px-1.5 py-0.5 rounded bg-[#F1F5F9] font-medium">{property.sqft} sqft</span>
              <span className="px-1.5 py-0.5 rounded bg-[#F1F5F9] font-medium">{property.furnished}</span>
            </div>
          </div>
          <div className="pt-2 flex items-center justify-between mt-2 border-t border-slate-100">
            <div>
              <span className="text-lg font-extrabold text-[#0369A1] font-[family-name:var(--font-heading)]">
                ₹{property.price.toLocaleString()}
              </span>
              <span className="text-xs text-[#3f4850]">/mo</span>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-[#F1F5F9] hover:bg-[#006194] hover:text-white text-[#131b2e] text-sm font-medium transition-colors">
              Explore
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
