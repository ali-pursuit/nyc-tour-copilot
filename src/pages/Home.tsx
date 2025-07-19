import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import ExploreSection from '../components/Home/ExploreSection';
import FeaturedExperiencesSection from '../components/Home/FeaturedExperiencesSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import PopularDestinationsSection from '../components/Home/PopularDestinationsSection';
import HiddenGemsSection from '../components/Home/HiddenGemsSection';
import AboutSection from '../components/Home/AboutSection';

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ExploreSection />
      <FeaturedExperiencesSection />
      <PopularDestinationsSection />
      <HiddenGemsSection />
      <TestimonialsSection />
      <AboutSection />
    </div>
  );
};

export default Home; 