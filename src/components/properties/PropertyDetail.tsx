'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LuMapPin, LuCalendar, LuHouse, LuCompass, LuUsers, LuChevronRight, LuShare2, LuHeart, LuWifi, LuDumbbell, LuCar, LuZap, LuWaves, LuShield, LuDroplets, LuAirVent, LuArrowUpDown, LuSchool, LuHospital, LuTrainFront, LuShoppingBag, LuTreePine, LuUtensilsCrossed, LuMessageCircle, LuShieldCheck, LuCamera, LuExternalLink, LuPhone, LuCircleCheckBig, LuSparkles, LuMaximize2, LuBuilding2, LuClock } from 'react-icons/lu';
import { getPropertyWhatsAppURL, WHATSAPP_NUMBER } from '@/lib/constants';
import { PropertyCard } from '@/components/properties/PropertyCard';
import type { Property } from '@/types';

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: LuWifi, Gym: LuDumbbell, Parking: LuCar, 'Power Backup': LuZap,
  Pool: LuWaves, Security: LuShield, 'Water Purifier': LuDroplets, AC: LuAirVent, Lift: LuArrowUpDown,
};

const nearbyIcons: Record<string, React.ElementType> = {
  school: LuSchool, hospital: LuHospital, metro: LuTrainFront, mall: LuShoppingBag,
  park: LuTreePine, restaurant: LuUtensilsCrossed,
};

interface PropertyDetailProps {
  property: Property;
  similar: Property[];
}

export function PropertyDetail({ property, similar }: PropertyDetailProps) {
  const whatsappUrl = getPropertyWhatsAppURL(property.title, property.location, property.price);
  const bookVisitUrl = `/book-visit?propertyId=${property.id}&title=${encodeURIComponent(property.title)}`;
  const [isSaved, setIsSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState('2 PM - 5 PM');
  const [visitState, setVisitState] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    fetch('/api/properties/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId: property.id }),
    }).catch(() => {});
  }, [property.id]);

  const handleScheduleVisit = () => {
    setVisitState('loading');
    setTimeout(() => setVisitState('done'), 800);
  };

  const dateOptions = ['Today', 'Tomorrow', 'Weekend'];
  const slotOptions = ['10 AM - 1 PM', '2 PM - 5 PM', '5 PM - 8 PM'];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-[1180px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* ─── Breadcrumb & Top Bar Actions ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <nav className="flex items-center gap-1.5 text-sm text-[#3f4850] flex-wrap">
            <Link href="/" className="hover:text-[#006194] transition-colors">Home</Link>
            <LuChevronRight className="w-3.5 h-3.5 text-[#707881]" />
            <Link href="/properties" className="hover:text-[#006194] transition-colors">Properties</Link>
            <LuChevronRight className="w-3.5 h-3.5 text-[#707881]" />
            <span className="text-[#3f4850]">Bangalore</span>
            <LuChevronRight className="w-3.5 h-3.5 text-[#707881]" />
            <span className="text-[#3f4850]">{property.area}</span>
            <LuChevronRight className="w-3.5 h-3.5 text-[#707881]" />
            <span className="text-[#131b2e] font-semibold truncate max-w-xs">{property.title}</span>
          </nav>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#3f4850] text-sm font-medium shadow-sm transition-all cursor-pointer"
              type="button"
            >
              <LuShare2 className="w-4 h-4" />
              Share
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-sm font-medium shadow-sm transition-all cursor-pointer ${isSaved ? 'text-red-500' : 'text-[#131b2e]'}`}
              type="button"
            >
              <LuHeart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
            {similar.length > 0 && (
              <a
                href="#similar-properties-section"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#cce5ff] text-[#004b73] text-sm font-medium hover:bg-[#93ccff] transition-colors"
              >
                <LuSparkles className="w-4 h-4" />
                Similar Homes
              </a>
            )}
          </div>
        </div>

        {/* ─── Title & Location Header ─── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5">
          <div className="flex flex-col gap-1.5">
            {/* Badges */}
            <div className="flex items-center flex-wrap gap-2 mb-1">
              {property.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold uppercase tracking-wider">
                  <LuShieldCheck className="w-3.5 h-3.5" />
                  Verified by JusRental
                </span>
              )}
              {property.available && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c9e6ff] text-[#004c6e] text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#007bb9] animate-pulse" />
                  Available Now
                </span>
              )}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#3f4850] text-[11px] font-semibold">
                Zero Brokerage Guaranteed
              </span>
              <span className="text-[#3f4850] text-[11px]">Property ID: {property.id.slice(0, 8).toUpperCase()}</span>
            </div>
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] text-[#131b2e] tracking-tight">
              {property.title}
            </h1>
            {/* Location */}
            <div className="flex items-center gap-1.5 text-[#3f4850] text-sm">
              <LuMapPin className="w-4 h-4 text-[#006194]" />
              <span>{property.location}</span>
            </div>
          </div>
          {/* Price */}
          <div className="text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#3f4850]">All-Inclusive Rent</div>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-[#0369A1] font-[family-name:var(--font-heading)]">
                ₹{property.price.toLocaleString()}
              </span>
              <span className="text-sm text-[#3f4850]">/ month</span>
            </div>
          </div>
        </div>

        {/* ─── Image Gallery Grid ─── */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-white mb-7">
          <div className={`grid grid-cols-1 ${property.images.length > 1 ? 'md:grid-cols-4' : ''} gap-2 p-2 bg-[#F8FAFC]`}
            style={{ height: property.images.length > 1 ? '460px' : '400px' }}>
            {/* Main Large Photo */}
            <div className={`relative ${property.images.length > 1 ? 'md:col-span-2' : 'col-span-full'} h-full rounded-xl overflow-hidden group cursor-pointer`}>
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent pointer-events-none" />
              {property.verified && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16A34A] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                  <LuShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </div>
              )}
            </div>

            {/* Supporting Gallery Photos (2x2) */}
            {property.images.length > 1 && (
              <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
                {property.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden group cursor-pointer h-full">
                    <Image
                      src={img}
                      alt={`${property.title} - ${i + 2}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-[#0F172A]/20 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Gallery floating buttons */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
            <button
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#131b2e] text-sm font-medium hover:bg-slate-50 transition-all shadow-lg cursor-pointer"
              type="button"
            >
              <LuCamera className="w-4 h-4" />
              View all {property.images.length} Photos
            </button>
          </div>
        </div>

        {/* ─── Main Content & Sticky Sidebar ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-7 min-w-0">
            {/* 1. Key Property Specs */}
            <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
              <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e] mb-4 flex items-center justify-between">
                <span>Apartment Key Specifications</span>
                {property.available && (
                  <span className="text-[11px] font-bold text-[#006194] uppercase tracking-wider">Ready to Occupy</span>
                )}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <SpecCard icon={<LuBuilding2 className="w-5 h-5" />} label="Configuration" value={`${property.bhk} BHK ${property.type}`} />
                <SpecCard icon={<LuMaximize2 className="w-5 h-5" />} label="Super Built-up" value={`${property.sqft} sq.ft`} />
                <SpecCard icon={<LuCompass className="w-5 h-5" />} label="Facing" value={`${property.facing} Facing`} />
                <SpecCard icon={<LuArrowUpDown className="w-5 h-5" />} label="Floor Level" value={`Floor ${property.floor}`} />
                <SpecCard icon={<LuUsers className="w-5 h-5" />} label="Tenant Preference" value={property.sharingType} sub="Corporate Leases OK" />
                <SpecCard icon={<LuCalendar className="w-5 h-5" />} label="Listed Date" value={property.postedDate} sub={property.available ? 'Immediate Handover' : undefined} subColor="text-[#16A34A]" />
              </div>
            </section>

            {/* 2. Description & Features */}
            <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e]">About This Property</h2>
                <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#3f4850] text-[11px] font-semibold">{property.furnished}</span>
              </div>
              <p className="text-[#3f4850] leading-relaxed mb-5">{property.description}</p>

              {/* Feature Tags */}
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#3f4850] mb-2 font-bold">Key In-Unit Features</div>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <span key={amenity} className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] text-[#131b2e] text-sm flex items-center gap-1.5">
                        {Icon && <Icon className="w-4 h-4 text-[#006194]" />}
                        {amenity}
                      </span>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 3. Building Amenities */}
            <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e]">Community & Building Amenities</h2>
                  <p className="text-sm text-[#3f4850]">Lifestyle infrastructure included with this property</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity];
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC]">
                      <div className="w-9 h-9 rounded-lg bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                        {Icon ? <Icon className="w-5 h-5" /> : <LuHouse className="w-5 h-5" />}
                      </div>
                      <span className="text-sm font-semibold text-[#131b2e]">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 4. Commute & Nearby Places */}
            {property.nearbyPlaces.length > 0 && (
              <section className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e]">Commute & Location Context</h2>
                    <p className="text-sm text-[#3f4850]">Neighborhood landmarks near {property.area}</p>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(property.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#006194] text-sm font-medium hover:underline"
                  >
                    Open in Maps
                    <LuExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Nearby Landmarks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {property.nearbyPlaces.map((place) => {
                    const Icon = nearbyIcons[place.type] || LuMapPin;
                    return (
                      <div key={place.name} className="p-2.5 rounded-lg bg-[#F8FAFC] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#006194]" />
                          <span className="text-sm text-[#131b2e]">{place.name}</span>
                        </div>
                        <span className="text-[11px] font-bold text-[#3f4850]">{place.distance}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 5. Trust & Zero Brokerage Guarantee */}
            <section className="bg-gradient-to-br from-white via-white to-[#DCFCE7]/40 rounded-2xl p-5 md:p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] shrink-0">
                  <LuShieldCheck className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#16A34A] font-bold">Peace of Mind Assured</span>
                    <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e]">The JusRental Zero Brokerage Guarantee</h3>
                  </div>
                  <p className="text-sm text-[#3f4850]">
                    Every listed property in our network undergoes multi-point physical verification. No fake photos, no undisclosed charges, and no agent pressure.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    <GuaranteeItem text="100% Refundable visit token" />
                    <GuaranteeItem text={`Zero month brokerage fee (Save ₹${property.price.toLocaleString()})`} />
                    <GuaranteeItem text="Free digital rental agreement" />
                    <GuaranteeItem text="Dedicated JusRental Move-in Concierge" />
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Similar Properties */}
            {similar.length > 0 && (
              <section className="flex flex-col gap-4" id="similar-properties-section">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#131b2e]">Similar Verified Homes in {property.area}</h2>
                    <p className="text-sm text-[#3f4850]">Comparable zero-brokerage homes nearby</p>
                  </div>
                  <Link
                    href={`/properties?area=${encodeURIComponent(property.area)}`}
                    className="text-[#006194] text-sm font-medium hover:underline inline-flex items-center gap-0.5"
                  >
                    View All
                    <LuChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similar.slice(0, 3).map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ─── Right Sidebar (4 cols) ─── */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-4">
              {/* Primary Booking Card */}
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden">
                {/* Savings Ribbon */}
                <div className="bg-[#DCFCE7] text-[#16A34A] px-3.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1.5">
                    <LuCircleCheckBig className="w-4 h-4" />
                    You save ₹{property.price.toLocaleString()} Brokerage
                  </span>
                  <span className="uppercase tracking-wider">Zero Broker</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-2xl font-extrabold text-[#0369A1] font-[family-name:var(--font-heading)]">
                      ₹{property.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-[#3f4850]"> / month</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#3f4850] text-[11px] font-semibold">
                    {property.furnished}
                  </span>
                </div>

                {/* Financial Breakdown */}
                <div className="bg-[#F8FAFC] rounded-xl p-3 flex flex-col gap-2 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#3f4850]">Security Deposit</span>
                    <span className="font-semibold text-[#131b2e]">₹{property.deposit.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#3f4850]">Furnishing Grade</span>
                    <span className="font-semibold text-[#131b2e]">{property.furnished}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="text-[#3f4850]">JusRental Verification Fee</span>
                    <span className="font-bold text-[#0369A1]">₹599 only</span>
                  </div>
                </div>

                {/* Token Refund Note */}
                <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#f2f3ff] text-[#3f4850] text-sm mb-4">
                  <LuShieldCheck className="w-4 h-4 text-[#006194] shrink-0 mt-0.5" />
                  <span>100% money-back token refund if this apartment is not precisely as pictured when you visit.</span>
                </div>

                {/* Visit Slot Picker */}
                <div className="flex flex-col gap-3 mb-4">
                  <div>
                    <label className="text-[11px] font-bold text-[#131b2e] uppercase tracking-wider mb-1.5 block">
                      Select Preferred Visit Day
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {dateOptions.map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`py-2 rounded-lg text-center text-sm font-medium transition-colors cursor-pointer ${
                            selectedDate === d
                              ? 'bg-[#006194] text-white'
                              : 'bg-[#F1F5F9] text-[#131b2e] hover:bg-slate-200'
                          }`}
                          type="button"
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#131b2e] uppercase tracking-wider mb-1.5 block">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {slotOptions.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSlot(s)}
                          className={`py-1.5 rounded-lg text-center text-[11px] font-medium transition-colors cursor-pointer ${
                            selectedSlot === s
                              ? 'bg-[#006194] text-white'
                              : 'bg-[#F1F5F9] text-[#131b2e] hover:bg-slate-200'
                          }`}
                          type="button"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleScheduleVisit}
                  disabled={visitState === 'loading'}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer mb-2.5 ${
                    visitState === 'done'
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-gradient-to-r from-[#006194] to-[#0369A1] text-white hover:opacity-95'
                  }`}
                  type="button"
                >
                  {visitState === 'loading' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Confirming Slot...
                    </>
                  ) : visitState === 'done' ? (
                    <>
                      <LuCircleCheckBig className="w-5 h-5" />
                      Visit Requested!
                    </>
                  ) : (
                    <>
                      <LuCalendar className="w-5 h-5" />
                      Schedule a Free Physical Visit
                    </>
                  )}
                </button>

                {/* WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#DCFCE7] text-[#16A34A] font-semibold flex items-center justify-center gap-2 hover:bg-[#bbf7d0] transition-colors"
                >
                  <LuMessageCircle className="w-5 h-5" />
                  Chat with Property Concierge
                </a>

                {/* Confirmation Banner */}
                {visitState === 'done' && (
                  <div className="mt-3 p-3 rounded-xl bg-[#DCFCE7] text-[#16A34A] text-sm">
                    <div className="flex items-center gap-1.5 font-bold">
                      <LuCircleCheckBig className="w-4 h-4" />
                      Visit request scheduled!
                    </div>
                    <p className="text-[#3f4850] mt-1 text-xs">
                      Our local partner will call you within 15 minutes to confirm keys and gate access.
                    </p>
                  </div>
                )}
              </div>

              {/* Concierge Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#eaedff] flex items-center justify-center text-[#006194] font-semibold text-sm">
                    JR
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#16A34A] ring-2 ring-white" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-[11px] text-[#3f4850] uppercase font-semibold">Assigned Concierge</span>
                  <span className="text-sm font-semibold text-[#131b2e] truncate">JusRental Team</span>
                  <span className="text-xs text-[#16A34A] flex items-center gap-1">
                    <LuShieldCheck className="w-3 h-3" />
                    Verified Partner
                  </span>
                </div>
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="w-10 h-10 rounded-xl bg-[#F1F5F9] hover:bg-slate-200 flex items-center justify-center text-[#006194] transition-colors"
                >
                  <LuPhone className="w-5 h-5" />
                </a>
              </div>

              {/* Safety Capsule */}
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between text-[#3f4850] text-sm">
                <div className="flex items-center gap-2">
                  <LuShieldCheck className="w-4 h-4 text-[#006194]" />
                  <span>100% Verified Ownership Papers</span>
                </div>
                <Link href="/contact" className="text-[11px] text-[#006194] font-bold hover:underline">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function SpecCard({ icon, label, value, sub, subColor }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
      <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] text-[#3f4850] font-semibold uppercase tracking-wider">{label}</span>
        <span className="text-sm font-semibold text-[#131b2e] truncate">{value}</span>
        {sub && <span className={`text-[11px] font-semibold ${subColor || 'text-[#3f4850]'}`}>{sub}</span>}
      </div>
    </div>
  );
}

function GuaranteeItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#131b2e]">
      <LuCircleCheckBig className="w-4 h-4 text-[#16A34A] shrink-0" />
      <span>{text}</span>
    </div>
  );
}
