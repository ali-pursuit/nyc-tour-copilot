import React, { useState, useEffect } from 'react';
import { FaStar, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

interface HiddenGem {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  rating: number;
  tip: string;
  category: string;
}

const hiddenGems: HiddenGem[] = [
  {
    id: '1',
    name: 'Roosevelt Island Tram',
    description: 'A hidden aerial tramway offering stunning Manhattan skyline views without the tourist crowds.',
    location: 'Roosevelt Island',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.7,
    tip: 'Best views during golden hour',
    category: 'Transportation'
  },
  {
    id: '2',
    name: 'Green-Wood Cemetery',
    description: 'A historic cemetery with beautiful architecture, rolling hills, and panoramic city views.',
    location: 'Brooklyn',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.5,
    tip: 'Visit the chapel for stunning architecture',
    category: 'History'
  },
  {
    id: '3',
    name: 'The Cloisters',
    description: 'Medieval art museum in a castle-like building overlooking the Hudson River.',
    location: 'Washington Heights',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    rating: 4.6,
    tip: 'Free with Metropolitan Museum membership',
    category: 'Culture'
  }
];

const HiddenGemsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hiddenGems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentGem = hiddenGems[currentIndex];

  return (
    <section className="py-12 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            Today's Underrated Spots
          </h2>
          <p className="text-base text-purple-200">
            Hidden gems that locals love and tourists often miss
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20 shadow-2xl">
            {/* Image */}
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <img
                src={currentGem.image}
                alt={currentGem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                {currentGem.category}
              </div>
              
              {/* Rating */}
              <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center">
                <FaStar className="text-yellow-400 mr-1 text-xs" />
                {currentGem.rating}
              </div>
            </div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                {currentGem.name}
              </h3>
              
              <div className="flex items-center justify-center mb-3 text-purple-200 text-sm">
                <FaMapMarkerAlt className="mr-2 text-xs" />
                <span>{currentGem.location}</span>
              </div>
              
              <p className="text-purple-100 mb-4 text-sm leading-relaxed">
                {currentGem.description}
              </p>
              
              <div className="bg-yellow-400 bg-opacity-20 border border-yellow-400 border-opacity-30 rounded-lg p-3 mb-4">
                <p className="text-yellow-200 font-medium text-sm">
                  💡 Pro Tip: {currentGem.tip}
                </p>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 text-sm">
                  Learn More
                </button>
                <button className="bg-transparent border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 text-sm">
                  <FaHeart className="inline mr-2 text-xs" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {hiddenGems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-yellow-400 scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-purple-200 mb-3 text-sm">
            Discover more hidden gems in NYC
          </p>
          <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg text-sm">
            Explore Hidden Gems →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HiddenGemsSection; 