import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaFilter, FaStar, FaHeart } from 'react-icons/fa';

interface Location {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  address: string;
  priceRange: string;
  tags: string[];
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Central Park',
    description: '843 acres of urban oasis with lakes, trails, and iconic landmarks.',
    category: 'Parks',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.8,
    address: 'Central Park, New York, NY',
    priceRange: 'Free',
    tags: ['first-timer', 'scenic', 'budget-friendly']
  },
  {
    id: '2',
    name: 'Times Square',
    description: 'The iconic crossroads of the world with dazzling lights and energy.',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    rating: 4.2,
    address: 'Manhattan, NY 10036',
    priceRange: 'Free',
    tags: ['first-timer', 'trending']
  },
  {
    id: '3',
    name: 'Katz\'s Delicatessen',
    description: 'Iconic Jewish deli famous for pastrami sandwiches since 1888.',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.4,
    address: '205 E Houston St, New York, NY 10002',
    priceRange: '$$',
    tags: ['trending', 'local-favorite']
  },
  {
    id: '4',
    name: 'Metropolitan Museum of Art',
    description: 'World-famous art museum with collections spanning 5,000+ years.',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.7,
    address: '1000 5th Ave, New York, NY 10028',
    priceRange: '$$',
    tags: ['first-timer', 'trending']
  },
  {
    id: '5',
    name: 'High Line Park',
    description: 'Elevated park built on historic freight rail line with art installations.',
    category: 'Parks',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.5,
    address: 'High Line, New York, NY 10011',
    priceRange: 'Free',
    tags: ['scenic', 'budget-friendly']
  },
  {
    id: '6',
    name: 'Brooklyn Bridge',
    description: 'Iconic suspension bridge connecting Manhattan and Brooklyn.',
    category: 'Landmarks',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    rating: 4.6,
    address: 'Brooklyn Bridge, New York, NY',
    priceRange: 'Free',
    tags: ['first-timer', 'scenic']
  }
];

const categories = ['All', 'Parks', 'Entertainment', 'Food', 'Culture', 'Landmarks'];

const Explore: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = locations.filter(location => {
    const matchesCategory = selectedCategory === 'All' || location.category === selectedCategory;
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Explore NYC
          </h1>
          <p className="text-base text-gray-600">
            Discover amazing places in the city that never sleeps
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            Showing {filteredLocations.length} of {locations.length} locations
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-2 right-2 bg-white bg-opacity-90 text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                  {location.category}
                </div>
                
                {/* Favorite Button */}
                <button className="absolute top-2 left-2 bg-white bg-opacity-90 text-gray-600 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-200">
                  <FaHeart className="text-xs" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {location.name}
                  </h3>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1 text-xs" />
                    <span className="text-xs font-medium">{location.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {location.description}
                </p>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <FaMapMarkerAlt className="mr-1 text-xs" />
                    <span className="truncate">{location.address}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {location.priceRange}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {location.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredLocations.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-base">No locations found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 text-sm"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore; 