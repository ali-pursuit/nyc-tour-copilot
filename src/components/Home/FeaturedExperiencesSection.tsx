import React from 'react';
import { FaStar, FaMapMarkerAlt, FaUsers, FaCamera, FaDollarSign } from 'react-icons/fa';

interface ExperienceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  tag: string;
}

const experiences: ExperienceCard[] = [
  {
    id: 'first-timer',
    title: 'Best First-Timer Spots',
    description: 'Essential NYC experiences for newcomers',
    icon: <FaStar className="text-lg" />,
    color: 'from-blue-500 to-purple-600',
    tag: 'first-timer'
  },
  {
    id: 'local-only',
    title: 'Local-Only Places',
    description: 'Where New Yorkers actually hang out',
    icon: <FaUsers className="text-lg" />,
    color: 'from-green-500 to-teal-600',
    tag: 'local-only'
  },
  {
    id: 'scenic',
    title: 'Chill & Scenic Views',
    description: 'Peaceful spots with amazing city views',
    icon: <FaMapMarkerAlt className="text-lg" />,
    color: 'from-pink-500 to-rose-600',
    tag: 'scenic'
  },
  {
    id: 'budget',
    title: 'Budget-Friendly NYC',
    description: 'Amazing experiences that won\'t break the bank',
    icon: <FaDollarSign className="text-lg" />,
    color: 'from-yellow-500 to-orange-600',
    tag: 'budget-friendly'
  },
  {
    id: 'content-creator',
    title: 'Best for Content Creators',
    description: 'Instagram-worthy spots and photo opportunities',
    icon: <FaCamera className="text-lg" />,
    color: 'from-purple-500 to-indigo-600',
    tag: 'content-creator'
  }
];

const FeaturedExperiencesSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Featured Experiences
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Discover curated collections of NYC's best spots, from iconic landmarks to hidden gems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative p-5">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${experience.color} text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {experience.icon}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {experience.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {experience.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Explore Collection
                  </span>
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${experience.color} flex items-center justify-center text-white text-xs font-bold group-hover:scale-110 transition-transform duration-300`}>
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiencesSection; 