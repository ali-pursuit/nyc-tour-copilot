import React, { useState } from 'react';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import ExploreSection from '../components/Home/ExploreSection';
import FeaturedExperiencesSection from '../components/Home/FeaturedExperiencesSection';
import TestimonialsSection from '../components/Home/TestimonialsSection';
import PopularDestinationsSection from '../components/Home/PopularDestinationsSection';
import HiddenGemsSection from '../components/Home/HiddenGemsSection';
import AboutSection from '../components/Home/AboutSection';
import type { Location } from '../data/nycLocations';
import Button from '../components/Button';
import { FaTimes } from 'react-icons/fa';

const Home: React.FC = () => {
  const [results] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full min-h-screen">
      <HeroSection />

      {/* Results Section below Hero */}
      {results.length > 0 && (
        <section className="mt-10 max-w-2xl mx-auto w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Top Picks for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map(loc => (
              <div
                key={loc.id}
                className="bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg transition p-4 flex flex-col items-center"
                onClick={() => { setSelectedLocation(loc); setShowModal(true); }}
              >
                <img src={loc.featuredImage} alt={loc.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                <div className="font-semibold text-gray-900 text-center">{loc.name}</div>
                <div className="text-xs text-gray-500 text-center mt-1">{loc.neighborhood}</div>
                <div className="text-yellow-500 font-bold mt-1">★ {loc.rating}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Modal for location details */}
      {showModal && selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative animate-menu-open">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowModal(false)}><FaTimes /></button>
            <img src={selectedLocation.featuredImage} alt={selectedLocation.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">{selectedLocation.name}</h3>
            <div className="text-gray-600 mb-2">{selectedLocation.address} - {selectedLocation.neighborhood}</div>
            <div className="text-gray-800 mb-2">{selectedLocation.description}</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedLocation.tags.map(tag => (
                <span key={tag} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="text-sm text-gray-500 mb-2">Best time: {selectedLocation.bestTimeToVisit}</div>
            <div className="text-sm text-gray-500 mb-2">Price: {selectedLocation.priceRange}</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 mb-4">
              {selectedLocation.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
            <Button
              variant="primary"
              size="md"
              className="w-full mt-2"
              onClick={() => {
                // TODO: Add To Plan logic (auth/modal)
                setShowModal(false);
                alert('Add To Plan clicked!');
              }}
            >
              Add To Plan
            </Button>
          </div>
        </div>
      )}

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