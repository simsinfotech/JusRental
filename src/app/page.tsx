'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { PropertyShowcase } from '@/components/sections/PropertyShowcase';
import { AreaExplorer } from '@/components/sections/AreaExplorer';
import { AIMatchingSection } from '@/components/sections/AIMatchingSection';
import { OwnerSection } from '@/components/sections/OwnerSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PropertyShowcase />
        <AreaExplorer />
        <AIMatchingSection />
        <OwnerSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
