'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { TESTIMONIALS } from '@/lib/constants';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function TestimonialCarousel() {
  return (
    <Swiper
      modules={[EffectCoverflow, Autoplay, Pagination]}
      effect="coverflow"
      grabCursor
      centeredSlides
      slidesPerView="auto"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false,
      }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="pb-12"
      breakpoints={{
        0: { slidesPerView: 1, spaceBetween: 20 },
        640: { slidesPerView: 1.5, spaceBetween: 20 },
        1024: { slidesPerView: 2.5, spaceBetween: 30 },
      }}
    >
      {TESTIMONIALS.map((t) => (
        <SwiperSlide key={t.id} className="py-4">
          <GlassCard className="h-full">
            <Quote className="w-8 h-8 text-amber-500/30 mb-4" />
            <p className="text-[var(--foreground)] leading-relaxed mb-6">
              &ldquo;{t.content}&rdquo;
            </p>
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-[var(--muted)]">{t.role}</p>
              </div>
            </div>
          </GlassCard>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
