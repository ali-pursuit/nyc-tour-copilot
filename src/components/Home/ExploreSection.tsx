import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const locations = [
  {
    name: 'Central Park',
    desc: 'A sprawling urban park in the heart of Manhattan.',
    image: '',
  },
  {
    name: 'The High Line',
    desc: 'An elevated park built on a historic rail line.',
    image: '',
  },
  {
    name: 'Brooklyn Bridge',
    desc: 'A historic bridge connecting Manhattan and Brooklyn.',
    image: '',
  },
  {
    name: 'Statue of Liberty',
    desc: 'The iconic symbol of freedom on Liberty Island.',
    image: '',
  },
];

const ExploreSection: React.FC = () => (
  <section className="py-12 px-4 max-w-5xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-center mb-10 text-white">Explore NYC</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {locations.map((loc) => (
        <div
          key={loc.name}
          className="bg-[#232323] border-2 border-yellow-400 rounded-xl p-6 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
        >
          <div className="w-16 h-16 flex items-center justify-center bg-[#181A1B] rounded-full mb-3 border-2 border-yellow-400">
            <FaMapMarkerAlt className="text-yellow-400 text-2xl" />
          </div>
          <h3 className="text-lg font-bold uppercase tracking-wide mb-2 text-yellow-400 group-hover:underline">{loc.name}</h3>
          <p className="text-gray-300 text-sm">{loc.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ExploreSection; 