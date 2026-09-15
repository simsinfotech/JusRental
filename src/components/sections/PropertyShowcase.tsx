'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Camera, ShieldCheck } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { useAnimateInView } from '@/hooks/useAnimateInView';
import { ImageGallery } from '@/components/ui/ImageGallery';
import type { Property } from '@/types';

const Tilt = dynamic(() => import('react-parallax-tilt'), { ssr: false });

interface PropertyShowcaseProps {
  properties: Property[];
}

export function PropertyShowcase({ properties }: PropertyShowcaseProps) {
  const { ref, controls } = useAnimateInView(0.1);

  return (
    <section id="properties" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006194]/10 text-[#006194] text-sm font-medium mb-4">
            Featured Properties
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-[#131b2e] mb-4">
            Handpicked Homes <span className="text-[#006194]">for You</span>
          </h2>
          <p className="text-[#3f4850] max-w-2xl mx-auto">
            Explore our most popular verified listings across Bangalore.
          </p>
        </div>

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
                glareMaxOpacity={0.08}
                glarePosition="all"
                scale={1.02}
              >
                <Link href={`/properties/${property.id}`}>
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group h-full border border-slate-100">
                    {/* Image */}
                    <div className="relative">
                      <ImageGallery images={property.images} alt={property.title} />
                      {/* Verified Badge */}
                      {property.verified && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#16A34A] text-white text-xs font-medium">
                            <ShieldCheck className="w-3 h-3" />
                            Verified
                          </span>
                        </div>
                      )}
                      {/* Available Now */}
                      {property.available && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#006194] text-xs font-medium shadow-sm">
                            Available Now
                          </span>
                        </div>
                      )}
                      {/* Photo Count */}
                      <div className="absolute bottom-3 right-3 z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs">
                          <Camera className="w-3 h-3" />
                          {property.images.length}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Price + Zero Brokerage */}
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-2xl font-bold text-[#0369A1]">
                            ₹{property.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-[#3f4850]">/month</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">
                          Zero Brokerage
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e] mb-1.5 group-hover:text-[#006194] transition-colors line-clamp-1">
                        {property.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-sm text-[#3f4850] mb-3">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-[#707881]" />
                        <span className="line-clamp-1">{property.location}</span>
                      </div>

                      {/* Specs Pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 rounded-md bg-slate-100 text-[#131b2e] text-sm font-medium">
                          {property.bhk} BHK
                        </span>
                        <span className="px-3 py-1 rounded-md bg-slate-100 text-[#131b2e] text-sm font-medium">
                          {property.sqft} sqft
                        </span>
                        <span className="px-3 py-1 rounded-md bg-slate-100 text-[#131b2e] text-sm font-medium">
                          {property.furnished}
                        </span>
                      </div>

                      {/* Bottom: Deposit + CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="text-sm text-[#3f4850]">
                          Deposit: <span className="font-medium text-[#131b2e]">₹{property.deposit.toLocaleString()}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-[#006194] text-white text-sm font-medium group-hover:bg-[#005080] transition-colors">
                          View Details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#006194] hover:bg-[#005080] text-white font-semibold shadow-lg shadow-[#006194]/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
