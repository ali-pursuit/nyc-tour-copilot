import React from 'react';
import { FaSearch, FaUserCheck, FaStar, FaMapMarkedAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaSearch className="text-lg" />,
    title: 'Smart Discovery',
    desc: 'AI-powered recommendations based on your interests and travel style.',
    color: 'from-blue-500 to-purple-600',
    gradient: 'from-blue-500/20 to-purple-600/20'
  },
  {
    icon: <FaUserCheck className="text-lg" />,
    title: 'Personalized Experience',
    desc: 'Get curated itineraries that match your vibe, budget, and group size.',
    color: 'from-green-500 to-teal-600',
    gradient: 'from-green-500/20 to-teal-600/20'
  },
  {
    icon: <FaStar className="text-lg" />,
    title: 'Save & Organize',
    desc: 'Build your perfect NYC bucket list with favorites and custom collections.',
    color: 'from-yellow-500 to-orange-600',
    gradient: 'from-yellow-500/20 to-orange-600/20'
  },
  {
    icon: <FaMapMarkedAlt className="text-lg" />,
    title: 'Track Your Journey',
    desc: 'Mark places as visited and see your NYC adventure unfold over time.',
    color: 'from-pink-500 to-rose-600',
    gradient: 'from-pink-500/20 to-rose-600/20'
  }
];

const FeaturesSection: React.FC = () => (
  <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Why Choose NYC Tour Copilot?
        </h2>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Discover the real New York with smart features designed for modern travelers
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Content */}
            <div className="relative p-5 text-center">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection; 