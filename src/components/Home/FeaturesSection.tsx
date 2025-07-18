import React from 'react';
import { FaSearch, FaUserCheck, FaStar, FaMapMarkedAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaSearch className="text-yellow-400 text-3xl mb-2" />,
    title: 'Explore',
    desc: 'Browse iconic and hidden NYC spots.'
  },
  {
    icon: <FaUserCheck className="text-yellow-400 text-3xl mb-2" />,
    title: 'Personalize',
    desc: 'Get recommendations based on your interests.'
  },
  {
    icon: <FaStar className="text-yellow-400 text-3xl mb-2" />,
    title: 'Save',
    desc: 'Add places to your favorites or trips.'
  },
  {
    icon: <FaMapMarkedAlt className="text-yellow-400 text-3xl mb-2" />,
    title: 'Track',
    desc: 'Mark places as visited and track your journey.'
  }
];

const FeaturesSection: React.FC = () => (
  <section className="py-12 px-4 max-w-5xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-center mb-10 text-white">Features</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {features.map((f) => (
        <div
          key={f.title}
          className="bg-[#232323] border-2 border-yellow-400 rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
        >
          {f.icon}
          <h3 className="text-lg font-bold uppercase tracking-wide mb-2 text-yellow-400 group-hover:underline">{f.title}</h3>
          <p className="text-gray-300 text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection; 