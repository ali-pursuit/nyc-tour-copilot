import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaStar, FaUserCheck, FaCompass } from 'react-icons/fa';

const features = [
  {
    icon: <FaMapMarkedAlt className="text-blue-600 text-3xl mb-2" />,
    title: 'Explore NYC',
    desc: 'Discover iconic landmarks and hidden gems across the city.'
  },
  {
    icon: <FaCompass className="text-blue-600 text-3xl mb-2" />,
    title: 'Personalized Suggestions',
    desc: 'Get recommendations based on your interests and activity.'
  },
  {
    icon: <FaStar className="text-blue-600 text-3xl mb-2" />,
    title: 'Save Favorites & Trips',
    desc: 'Add places to your favorites or custom trips for easy planning.'
  },
  {
    icon: <FaUserCheck className="text-blue-600 text-3xl mb-2" />,
    title: 'Track Visited Spots',
    desc: 'Mark places as visited and see your NYC journey unfold.'
  }
];

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-gradient-to-br from-blue-50 to-blue-100">
        <h1 className="text-5xl font-extrabold mb-4 text-blue-800 drop-shadow">NYC Tour Copilot</h1>
        <p className="text-xl mb-6 max-w-2xl text-gray-700">
          Your personalized companion for exploring New York City. Plan, discover, and track your adventures with ease!
        </p>
        <Link
          to="/explore"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-lg font-semibold"
        >
          Start Exploring
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Why Use NYC Tour Copilot?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-200 cursor-pointer group"
            >
              {f.icon}
              <h3 className="text-lg font-semibold mb-2 text-blue-700 group-hover:underline">{f.title}</h3>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 bg-blue-50">
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-800">How It Works</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <span className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-2">1</span>
            <span className="font-semibold text-blue-700">Sign Up</span>
            <span className="text-gray-600 text-sm text-center">Create your free account to get started.</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-2">2</span>
            <span className="font-semibold text-blue-700">Explore</span>
            <span className="text-gray-600 text-sm text-center">Browse and filter NYC locations tailored to you.</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold mb-2">3</span>
            <span className="font-semibold text-blue-700">Track & Save</span>
            <span className="text-gray-600 text-sm text-center">Add favorites, mark visited, and plan your trips.</span>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Ready to start your NYC adventure?</h2>
        <Link
          to="/explore"
          className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-lg font-semibold"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home; 