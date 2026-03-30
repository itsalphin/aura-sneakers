import HeroSection from '@/components/home/HeroSection';
import FeaturedCollection from '@/components/home/FeaturedCollection';
import CategoryGrid from '@/components/home/CategoryGrid';
import BrandStory from '@/components/home/BrandStory';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedCollection />
      <CategoryGrid />
      <BrandStory />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
