import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import heroImg from '../../assets/hero-image.png';

const HeroSection: React.FC = () => (
  <section className="flex flex-col md:flex-row items-center justify-between min-h-[60vh] p-8 bg-[#181A1B]">
    {/* Left: Text */}
    <div className="flex-1 max-w-xl text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide mb-4 text-white">
        Explore NYC Your Way
      </h1>
      <p className="text-lg md:text-xl mb-8 text-gray-300">
        Discover hidden gems, top attractions, and local events personalized just for you.
      </p>
      <Link
        to="/explore"
        className="inline-flex items-center gap-2 px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-lg font-semibold uppercase tracking-wide hover:bg-yellow-400 hover:text-[#181A1B] transition-colors duration-200 shadow-md"
      >
        <FaMapMarkerAlt className="text-xl" />
        Start Exploring
      </Link>
    </div>
    {/* Right: Image */}
    <div className="flex-1 flex justify-center mt-8 md:mt-0">
      <img
        src={heroImg}
        alt="NYC Tour Copilot Hero"
        className="w-full max-w-md h-auto object-contain drop-shadow-xl rounded-xl border-4 border-[#2C2C2C]"
      />
    </div>
  </section>
);

export default HeroSection; 