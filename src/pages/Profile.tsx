import React from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

const favorites = [
  'Central Park',
  'The High Line',
];

const visited = [
  'Statue of Liberty',
  'Empire State Building',
];

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#181A1B] py-12 px-4">
      <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-center mb-10 text-white">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Favorites */}
        <div className="bg-[#232323] border-2 border-yellow-400 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <FaStar className="text-yellow-400 text-2xl" />
            <h2 className="text-lg font-bold uppercase tracking-wide text-yellow-400">Favorites</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-300">
            {favorites.map((fav) => (
              <li key={fav} className="mb-2">{fav}</li>
            ))}
          </ul>
        </div>
        {/* Visited */}
        <div className="bg-[#232323] border-2 border-yellow-400 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <FaCheckCircle className="text-yellow-400 text-2xl" />
            <h2 className="text-lg font-bold uppercase tracking-wide text-yellow-400">Visited Places</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-300">
            {visited.map((place) => (
              <li key={place} className="mb-2">{place}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile; 