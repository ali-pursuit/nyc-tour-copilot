import React from 'react';
import { FaHeart, FaMapMarkedAlt, FaUsers } from 'react-icons/fa';

const AboutSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <FaHeart className="text-3xl text-red-500 mx-auto mb-3" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          About This Project
        </h2>
        
        <div className="text-base text-gray-300 leading-relaxed mb-6">
          <p className="mb-3">
            Built by a local enthusiast who knows that NYC is so much more than Times Square and the Empire State Building.
          </p>
          <p className="mb-3">
            After seeing too many friends visit the same tourist traps and miss the real magic of the city, 
            I created this app to help travelers discover the authentic New York experience.
          </p>
          <p>
            From hidden rooftop bars to peaceful neighborhood parks, from legendary delis to secret art installations — 
            this is the NYC that locals love and visitors deserve to experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <FaMapMarkedAlt className="text-2xl text-yellow-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-2">Curated by Locals</h3>
            <p className="text-gray-400 text-sm">
              Every spot is personally vetted and recommended by New Yorkers who actually live here.
            </p>
          </div>
          
          <div className="text-center">
            <FaUsers className="text-2xl text-yellow-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
            <p className="text-gray-400 text-sm">
              Built with feedback from thousands of travelers and locals who share our passion for authentic experiences.
            </p>
          </div>
          
          <div className="text-center">
            <FaHeart className="text-2xl text-yellow-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold mb-2">Made with Love</h3>
            <p className="text-gray-400 text-sm">
              Created by someone who truly loves this city and wants you to love it too.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-400 text-xs">
            Ready to explore the real New York? Let's go beyond the guidebooks together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 