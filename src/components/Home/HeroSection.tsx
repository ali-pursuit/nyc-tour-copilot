import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import nightSkyline from '../../assets/night-skyline.jpg';

const vibes = ['Food', 'Culture', 'Shopping', 'Nightlife', 'Outdoors'];
const groupTypes = ['Solo', 'Couple', 'Family', 'Friends'];
const budgets = ['Budget', 'Mid-range', 'Luxury'];
const durations = ['1-2 days', '3-5 days', '1 week', '2+ weeks'];

const HeroSection: React.FC = () => {
  const [tripDuration, setTripDuration] = useState('');
  const [travelVibe, setTravelVibe] = useState<string[]>([]);
  const [groupType, setGroupType] = useState('');
  const [budget, setBudget] = useState('');

  const handleVibeToggle = (vibe: string) => {
    setTravelVibe((prev) =>
      prev.includes(vibe) ? prev.filter((v) => v !== vibe) : [...prev, vibe]
    );
  };

  const handleReset = () => {
    setTripDuration('');
    setTravelVibe([]);
    setGroupType('');
    setBudget('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { tripDuration, travelVibe, groupType, budget };
    localStorage.setItem('nycTourOnboarding', JSON.stringify(data));
    // TODO: Firebase anon auth + plan ID
    // TODO: Redirect to planner or next step
    alert('Onboarding data saved! (MVP)');
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={nightSkyline}
        alt="NYC Skyline"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ minHeight: '80vh' }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black" style={{ opacity: 0.4, zIndex: 1 }} />
      {/* Form and text container */}
      <div className="relative z-10 w-full">
        <h1 className="text-xl md:text-2xl font-extrabold uppercase tracking-wide mb-2 text-yellow-400 text-center drop-shadow-lg">
          Plan Your NYC Adventure
        </h1>
        <p className="text-gray-200 text-center mb-4 text-sm">
          Get a personalized itinerary in seconds. Just tell us a bit about your trip!
        </p>
      {/* Foreground Form */}
        <div className='bg-[rgba(255,255,255,0.7)] border border-gray-300 px-10 py-6 mt-8 md:mt-0 max-w-2xl mx-auto'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-6 w-full">
          <div className="flex flex-col w-full">
            <label className="text-gray-800 font-semibold uppercase text-xs tracking-wide">Trip Duration</label>
            <select
              className="border border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-yellow-400 text-sm w-full"
              value={tripDuration}
              onChange={e => setTripDuration(e.target.value)}
              required
            >
              <option value="" disabled>Select duration</option>
              {durations.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-800 font-semibold uppercase text-xs tracking-wide">Travel Vibe</label>
            <select
              className="border border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-yellow-400 text-sm w-full"
              value={travelVibe}
              onChange={e => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setTravelVibe(selected);
              }}
              required
              style={{ minHeight: '2.5em' }}
            >
              <option value="" disabled>Select vibe(s)</option>
              {vibes.map(vibe => (
                <option key={vibe} value={vibe}>{vibe}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-800 font-semibold uppercase text-xs tracking-wide">Group Type</label>
            <select
              className="border-2 border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm w-full"
              value={groupType}
              onChange={e => setGroupType(e.target.value)}
              required
            >
              <option value="" disabled>Select group type</option>
              {groupTypes.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="text-gray-800 font-semibold uppercase text-xs tracking-wide">Budget Range</label>
            <select
              className="border-2 border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm w-full"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              required
            >
              <option value="" disabled>Select budget</option>
              {budgets.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          {/* Buttons Row - span both columns on desktop */}
          <div className="flex flex-col md:flex-row gap-3 w-full mt-4 md:col-span-2 md:justify-end">
            <button
              type="submit"
              className="h-10 inline-flex items-center justify-center gap-2 border-2 border-yellow-500 text-yellow-700 bg-white rounded-lg font-semibold uppercase tracking-wide px-4 py-2 hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200 shadow-md text-base w-full md:w-auto"
            >
              <FaPlay className="text-base" />
              Start Planning
            </button>
          </div>
        </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 