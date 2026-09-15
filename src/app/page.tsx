import { HeroSection } from '@/components/sections/HeroSection';
import { KeyFeaturesSection } from '@/components/sections/KeyFeaturesSection';
import { PropertyShowcase } from '@/components/sections/PropertyShowcase';
import { AreaExplorer } from '@/components/sections/AreaExplorer';
import { AIMatchingSection } from '@/components/sections/AIMatchingSection';
import { OwnerSection } from '@/components/sections/OwnerSection';
import { NRIServicesPreview } from '@/components/sections/NRIServicesPreview';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { CTASection } from '@/components/sections/CTASection';
import {
  fetchFeaturedProperties,
  fetchAreas,
  fetchTestimonials,
  fetchKeyFeatures,
  fetchBlogPosts,
} from '@/lib/dal';

export default async function Home() {
  const [properties, areas, testimonials, features, blogPosts] = await Promise.all([
    fetchFeaturedProperties(6),
    fetchAreas(),
    fetchTestimonials(),
    fetchKeyFeatures(),
    fetchBlogPosts(),
  ]);

  return (
    <>
      <HeroSection />
      <KeyFeaturesSection features={features} />
      <PropertyShowcase properties={properties} />
      <AreaExplorer areas={areas} />
      <AIMatchingSection />
      <OwnerSection />
      <NRIServicesPreview />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreview posts={blogPosts.slice(0, 3)} />
      <CTASection />
    </>
  );
}
