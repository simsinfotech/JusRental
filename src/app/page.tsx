import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/HeroSection';
import {
  fetchFeaturedProperties,
  fetchAreas,
  fetchTestimonials,
  fetchBlogPosts,
} from '@/lib/dal';

// Lazy-load below-the-fold sections — not needed for initial paint
const KeyFeaturesSection = dynamic(() =>
  import('@/components/sections/KeyFeaturesSection').then((m) => m.KeyFeaturesSection)
);
const PropertyShowcase = dynamic(() =>
  import('@/components/sections/PropertyShowcase').then((m) => m.PropertyShowcase)
);
const AreaExplorer = dynamic(() =>
  import('@/components/sections/AreaExplorer').then((m) => m.AreaExplorer)
);
const AIMatchingSection = dynamic(() =>
  import('@/components/sections/AIMatchingSection').then((m) => m.AIMatchingSection)
);
const OwnerSection = dynamic(() =>
  import('@/components/sections/OwnerSection').then((m) => m.OwnerSection)
);
const NRIServicesPreview = dynamic(() =>
  import('@/components/sections/NRIServicesPreview').then((m) => m.NRIServicesPreview)
);
const TestimonialsSection = dynamic(() =>
  import('@/components/sections/TestimonialsSection').then((m) => m.TestimonialsSection)
);
const BlogPreview = dynamic(() =>
  import('@/components/sections/BlogPreview').then((m) => m.BlogPreview)
);
const CTASection = dynamic(() =>
  import('@/components/sections/CTASection').then((m) => m.CTASection)
);

// ISR: regenerate page at most once every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const [properties, areas, testimonials, blogPosts] = await Promise.all([
    fetchFeaturedProperties(6),
    fetchAreas(),
    fetchTestimonials(),
    fetchBlogPosts(),
  ]);

  return (
    <>
      <HeroSection />
      <KeyFeaturesSection />
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
