import React, { useState } from 'react';
import { FaStar, FaMapMarkerAlt, FaFire, FaFilter } from 'react-icons/fa';

interface Destination {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  address: string;
  isTrending: boolean;
  priceRange: string;
}

const destinations: Destination[] = [
  {
    id: '1',
    name: 'Central Park',
    description: '843 acres of urban oasis with lakes, trails, and iconic landmarks',
    category: 'Parks',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.8,
    address: 'Central Park, New York, NY',
    isTrending: true,
    priceRange: 'Free'
  },
  {
    id: '2',
    name: 'Times Square',
    description: 'The iconic crossroads of the world with dazzling lights and energy',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    rating: 4.2,
    address: 'Manhattan, NY 10036',
    isTrending: true,
    priceRange: 'Free'
  },
  {
    id: '3',
    name: 'Katz\'s Delicatessen',
    description: 'Iconic Jewish deli famous for pastrami sandwiches since 1888',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.4,
    address: '205 E Houston St, New York, NY 10002',
    isTrending: false,
    priceRange: '$$'
  },
  {
    id: '4',
    name: 'Metropolitan Museum of Art',
    description: 'World-famous art museum with collections spanning 5,000+ years',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.7,
    address: '1000 5th Ave, New York, NY 10028',
    isTrending: true,
    priceRange: '$$'
  },
  {
    id: '5',
    name: 'High Line Park',
    description: 'Elevated park built on historic freight rail line with art installations',
    category: 'Parks',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.5,
    address: 'High Line, New York, NY 10011',
    isTrending: false,
    priceRange: 'Free'
  },
  {
    id: '6',
    name: 'Brooklyn Bridge',
    description: 'Iconic suspension bridge connecting Manhattan and Brooklyn',
    category: 'History',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    rating: 4.6,
    address: 'Brooklyn Bridge, New York, NY',
    isTrending: true,
    priceRange: 'Free'
  }
];

const categories = ['All', 'Food', 'Parks', 'Culture', 'History', 'Entertainment'];

const PopularDestinationsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDestinations = selectedCategory === 'All' 
    ? destinations 
    : destinations.filter(dest => dest.category === selectedCategory);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Popular Destinations
          </h2>
          <p className="text-base text-gray-600">
            Discover NYC's most beloved spots and trending destinations
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full font-medium transition-all duration-200 text-sm ${
                selectedCategory === category
                  ? 'bg-yellow-400 text-gray-900 shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <FaFilter className="inline mr-1 text-xs" />
              {category}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                
                {/* Trending Badge */}
                {destination.isTrending && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                    <FaFire className="mr-1 text-xs" />
                    Trending
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 text-gray-900 px-2 py-1 rounded-full text-xs">
                  {destination.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {destination.name}
                  </h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1 text-xs" />
                    <span className="text-xs font-medium">{destination.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <FaMapMarkerAlt className="mr-1 text-xs" />
                    <span className="truncate">{destination.address}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {destination.priceRange}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8">
          <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm">
            Explore More Destinations →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinationsSection; 