import React, { useState } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';
import nightSkyline from '../../assets/night-skyline.jpg';
import Select from 'react-select';

const vibes = ['Food', 'Culture', 'Shopping', 'Nightlife', 'Outdoors'];
const groupTypes = ['Solo', 'Couple', 'Family', 'Friends'];
const budgets = ['Budget', 'Mid-range', 'Luxury'];

const vibeOptions = vibes.map(v => ({ value: v, label: v }));

type VibeOption = { value: string; label: string };

const HeroSection: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [travelVibe, setTravelVibe] = useState<VibeOption[]>([]);
  const [groupType, setGroupType] = useState('');
  const [budget, setBudget] = useState('');

  const handleClearDates = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      tripDuration: {
        startDate: startDate || null,
        endDate: endDate || null,
      },
      travelVibe: travelVibe.map(v => v.value),
      groupType,
      budget
    };
    localStorage.setItem('nycTourOnboarding', JSON.stringify(data));
    alert('Onboarding data saved! (MVP)');
    // Clear all fields after submission
    setStartDate('');
    setEndDate('');
    setTravelVibe([]);
    setGroupType('');
    setBudget('');
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6 w-full">
          <div className="flex flex-col w-full relative min-w-0">
            <label className="text-gray-800 font-semibold uppercase text-xs tracking-wide mb-1">Trip Duration</label>
            <div className="flex flex-col gap-2 md:flex-row md:gap-2 items-stretch w-full">
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs text-gray-600 mb-0.5">Start Date</span>
                <input
                  type="date"
                  className="border border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-yellow-400 text-sm w-full"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  max={endDate || undefined}
                />
              </div>
              <span className="hidden md:inline mx-1 text-gray-700 font-bold self-center">→</span>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-xs text-gray-600 mb-0.5">End Date</span>
                <input
                  type="date"
                  className="border border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-yellow-400 text-sm w-full"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  min={startDate || undefined}
                  disabled={!startDate}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full min-w-0">
            <label className="text-gray-800 font-semibold uppercase text-xs tracking-wide mb-1">Travel Vibe</label>
            <Select
              isMulti
              options={vibeOptions}
              value={travelVibe}
              onChange={selected => setTravelVibe(selected as VibeOption[])}
              classNamePrefix="react-select"
              placeholder="Select vibe(s)"
              styles={{
                control: (base) => ({ ...base, minHeight: '2.5em', borderColor: '#facc15', boxShadow: 'none' }),
                multiValue: (base) => ({ ...base, backgroundColor: '#fde68a', color: '#181A1B' }),
                multiValueLabel: (base) => ({ ...base, color: '#181A1B', fontWeight: 600 }),
                multiValueRemove: (base) => ({ ...base, color: '#b45309', ':hover': { backgroundColor: '#fbbf24', color: '#181A1B' } }),
                option: (base, state) => ({ ...base, color: state.isSelected ? '#181A1B' : '#92400e', backgroundColor: state.isSelected ? '#fde68a' : 'white' }),
              }}
              required
            />
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