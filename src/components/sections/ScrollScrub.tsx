'use client';

import { useRef, useState, useCallback } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface Scene {
  title: string;
  body: string;
  image: string;
  kicker?: string;
  cta?: { label: string; href: string };
  align: 'left' | 'right';
  weight: number;
}

const scenes: Scene[] = [
  {
    kicker: 'JusRental',
    title: 'Your next home is a conversation away.',
    body: 'Tell JusRental what you need. Our AI parses your budget, area and dealbreakers, then surfaces the homes that genuinely fit.',
    image: '/images/scene-1.png',
    cta: { label: 'Start your search', href: '#homes' },
    align: 'left',
    weight: 1.15,
  },
  {
    title: 'We find homes that actually match.',
    body: 'Live inventory, scored against your brief. You see fit, not noise, with a match score on every home.',
    image: '/images/scene-2.png',
    align: 'right',
    weight: 1.4,
  },
  {
    title: 'Every detail, before you visit.',
    body: 'Rent, deposit, photos, amenities, commute. Everything a renter needs is on the listing, upfront.',
    image: '/images/scene-3.png',
    align: 'left',
    weight: 1.4,
  },
  {
    title: 'Book the visit. We take it from there.',
    body: 'Pick a slot. A ₹599 visit commitment, fully adjusted at closing. A JusRental advisor meets you, negotiates and closes.',
    image: '/images/scene-4.png',
    align: 'right',
    weight: 1.4,
  },
  {
    title: 'Homes made simple.',
    body: 'Keys in hand, zero tenant brokerage. That is the JusRental promise for tenants, and verified screening for owners.',
    image: '/images/scene-5.png',
    cta: { label: 'List your property', href: '#owners' },
    align: 'left',
    weight: 1.4,
  },
];

const totalWeight = scenes.reduce((sum, s) => sum + s.weight, 0);

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function ScrollScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeScene, setActiveScene] = useState(0);

  const [renderState, setRenderState] = useState<{
    opacities: number[];
    scales: number[];
    translateYs: number[];
  }>({
    opacities: scenes.map((_, i) => (i === 0 ? 1 : 0)),
    scales: scenes.map(() => 1),
    translateYs: scenes.map(() => 0),
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const getSceneBounds = useCallback((index: number) => {
    let accumulated = 0;
    for (let i = 0; i < index; i++) accumulated += scenes[i].weight;
    const sceneStart = accumulated / totalWeight;
    const sceneEnd = (accumulated + scenes[index].weight) / totalWeight;
    return { sceneStart, sceneEnd };
  }, []);

  // Image opacity — crossfade between scenes
  const getSceneOpacity = useCallback(
    (index: number, progress: number) => {
      const { sceneStart, sceneEnd } = getSceneBounds(index);
      const tz = 0.04;

      if (progress < sceneStart - tz || progress > sceneEnd + tz) return 0;

      const fadeIn = smoothstep(sceneStart - tz * 0.5, sceneStart + tz, progress);
      const fadeOut = 1 - smoothstep(sceneEnd - tz, sceneEnd + tz * 0.5, progress);

      if (index === 0) return fadeOut;
      if (index === scenes.length - 1) return fadeIn;
      return Math.min(fadeIn, fadeOut);
    },
    [getSceneBounds]
  );

  // Ken Burns zoom — slow scale from 1.0 → 1.18 over the scene's scroll range
  const getSceneScale = useCallback(
    (index: number, progress: number) => {
      const { sceneStart, sceneEnd } = getSceneBounds(index);
      const sceneProgress = Math.max(0, Math.min(1, (progress - sceneStart) / (sceneEnd - sceneStart)));
      return 1 + sceneProgress * 0.18;
    },
    [getSceneBounds]
  );

  // Text Y translation — slides up from +80 → 0 → -80
  const getTextTranslateY = useCallback(
    (index: number, progress: number) => {
      const { sceneStart, sceneEnd } = getSceneBounds(index);
      const tz = 0.04;

      if (progress < sceneStart - tz) return 80;
      if (progress > sceneEnd + tz) return -80;

      const enterProgress = smoothstep(sceneStart - tz * 0.5, sceneStart + tz, progress);
      const exitProgress = smoothstep(sceneEnd - tz, sceneEnd + tz * 0.5, progress);

      if (index === 0) return -80 * exitProgress;
      if (index === scenes.length - 1) return 80 * (1 - enterProgress);
      return 80 * (1 - enterProgress) + (-80 * exitProgress);
    },
    [getSceneBounds]
  );

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    // Find active scene
    let newActive = 0;
    let accumulated = 0;
    for (let i = 0; i < scenes.length; i++) {
      const start = accumulated / totalWeight;
      const end = (accumulated + scenes[i].weight) / totalWeight;
      if (progress >= start && progress < end) {
        newActive = i;
        break;
      }
      accumulated += scenes[i].weight;
    }
    if (progress >= 0.99) newActive = scenes.length - 1;
    setActiveScene(newActive);

    setRenderState({
      opacities: scenes.map((_, i) => getSceneOpacity(i, progress)),
      scales: scenes.map((_, i) => getSceneScale(i, progress)),
      translateYs: scenes.map((_, i) => getTextTranslateY(i, progress)),
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${totalWeight * 100}vh` }}
    >
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Image layers — each room crossfades + Ken Burns zooms */}
        {scenes.map((scene, i) => {
          const opacity = renderState.opacities[i];
          const scale = renderState.scales[i];

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                opacity,
                visibility: opacity > 0.01 ? 'visible' : 'hidden',
                zIndex: activeScene === i ? 2 : 1,
              }}
            >
              <div
                className="absolute inset-0 will-change-transform"
                style={{ transform: `scale(${scale})` }}
              >
                <Image
                  src={scene.image}
                  alt={scene.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
              {/* Gradient overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
            </div>
          );
        })}

        {/* Decorative warm ambient glow — matches the golden hour aesthetic */}
        <div className="absolute inset-0 pointer-events-none z-[3]">
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
              top: '0%',
              right: '-10%',
              filter: 'blur(80px)',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
              bottom: '10%',
              left: '-5%',
              filter: 'blur(80px)',
            }}
          />
        </div>

        {/* Text chapters — slide up through viewport on scroll */}
        <div className="relative z-10 h-full">
          {scenes.map((scene, i) => {
            const opacity = renderState.opacities[i];
            const translateY = renderState.translateYs[i];

            return (
              <div
                key={i}
                className="absolute inset-0 flex items-center"
                style={{
                  opacity,
                  visibility: opacity > 0.01 ? 'visible' : 'hidden',
                  zIndex: activeScene === i ? 5 : 4,
                }}
              >
                <div
                  className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full flex ${
                    scene.align === 'right' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className="max-w-lg will-change-transform"
                    style={{ transform: `translateY(${translateY}px)` }}
                  >
                    {/* Kicker */}
                    {scene.kicker && (
                      <div
                        className="mb-4"
                        style={{
                          transform: `translateY(${translateY * 0.3}px)`,
                          opacity: Math.min(1, opacity * 1.5),
                        }}
                      >
                        <span className="inline-block text-sm font-medium uppercase tracking-[0.2em] text-cyan-300 drop-shadow-lg">
                          {scene.kicker}
                        </span>
                      </div>
                    )}

                    {/* Title — slight stagger offset */}
                    <h2
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold font-[family-name:var(--font-heading)] leading-[1.08] text-white drop-shadow-lg mb-5"
                      style={{ transform: `translateY(${translateY * 0.15}px)` }}
                    >
                      {scene.title}
                    </h2>

                    {/* Body — more stagger */}
                    <p
                      className="text-base sm:text-lg text-white/85 leading-relaxed drop-shadow-md max-w-md mb-6"
                      style={{
                        transform: `translateY(${translateY * 0.25}px)`,
                        opacity: Math.min(1, opacity * 1.2),
                      }}
                    >
                      {scene.body}
                    </p>

                    {/* CTA — most staggered */}
                    {scene.cta && (
                      <div
                        style={{
                          transform: `translateY(${translateY * 0.35}px)`,
                          opacity: Math.min(1, opacity * 1.1),
                        }}
                      >
                        <Button href={scene.cta.href} size="lg">
                          {scene.cta.label}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scene progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-3">
          {scenes.map((_, i) => (
            <div key={i} className="relative">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  activeScene === i
                    ? 'bg-white scale-125 shadow-lg shadow-white/30'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
              {activeScene === i && (
                <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-white/20 animate-ping" />
              )}
            </div>
          ))}
        </div>

        {/* Scroll indicator on first scene */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500"
          style={{ opacity: activeScene === 0 ? 1 : 0 }}
        >
          <span className="text-white/60 text-xs tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>

        {/* Bottom gradient fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-10" />
      </div>
    </section>
  );
}
