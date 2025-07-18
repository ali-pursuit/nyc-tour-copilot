import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import ExploreSection from '../components/Home/ExploreSection';

const Home: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#181A1B]">
      <HeroSection />
      <FeaturesSection />
      <ExploreSection />
    </div>
  );
};

export default Home; 