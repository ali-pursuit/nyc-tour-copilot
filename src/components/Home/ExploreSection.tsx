import React from 'react';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import Button from '../Button';

const locations = [
  {
    name: 'Central Park',
    desc: '843 acres of urban oasis with lakes, trails, and iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    category: 'Parks'
  },
  {
    name: 'The High Line',
    desc: 'An elevated park built on a historic freight rail line with art installations.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    category: 'Parks'
  },
  {
    name: 'Brooklyn Bridge',
    desc: 'Iconic suspension bridge connecting Manhattan and Brooklyn with stunning views.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    category: 'Landmarks'
  },
  {
    name: 'Times Square',
    desc: 'The crossroads of the world with dazzling lights and endless energy.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    category: 'Entertainment'
  },
];

const ExploreSection: React.FC = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Start Exploring NYC
        </h2>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          From iconic landmarks to hidden gems, discover the places that make New York special
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {locations.map((location) => (
          <div
            key={location.name}
            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Category Badge */}
              <div className="absolute top-2 right-2 bg-white bg-opacity-90 text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                {location.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-2">
                  <FaMapMarkerAlt className="text-gray-900 text-xs" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {location.name}
                </h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                {location.desc}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">
                  Learn More
                </span>
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform duration-300">
                  <FaArrowRight className="text-xs" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <Button 
          variant="primary" 
          size="md"
        >
          Explore All Locations →
        </Button>
      </div>
    </div>
  </section>
);

export default ExploreSection; 