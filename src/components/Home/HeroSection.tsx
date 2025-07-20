import React, { useState } from 'react';
import { FaPlay, FaTimes, FaCheck } from 'react-icons/fa';
import nightSkyline from '../../assets/night-skyline.jpg';
import Select from 'react-select';
import Button from '../Button';
import { locationService } from '../../utils/locationService';
import type { Location } from '../../data/nycLocations';
import { useAuth } from '../../context/AuthContext';
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { useRef, useEffect } from 'react';

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
  const [results, setResults] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const detailsModalRef = useRef<HTMLDivElement>(null);
  const { user, openAuthModal } = useAuth();
  const db = getFirestore();
  const [alreadySaved, setAlreadySaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Handlers

  const handleClickPick = (loc) => {
    setSelectedLocation(loc);
    setShowModal(true);
    setAlreadySaved(false);
    setStatusMessage('');
    setShowStatusModal(false);
  }

  const handleShowStatusModal = async () => {
    if (!user) {
      setShowModal(() => false);
      openAuthModal();
      return;
    }
    if (selectedLocation) {
      try {
        const planDocRef = doc(db, `users/${user.uid}/plans`, selectedLocation.id);
        const planSnap = await getDoc(planDocRef);
        if (planSnap.exists()) {
          setAlreadySaved(true);
          setStatusMessage(() => 'Plan Already Exits');
          setShowStatusModal(true);
          return;
        }
        setAlreadySaved(false);
        await setDoc(planDocRef, { ...selectedLocation, id: selectedLocation.id }, { merge: true });
        setStatusMessage(() => 'Successfully Added');
        setShowStatusModal(true);
      } catch (err) {
        setStatusMessage('Failed to add the plan.');
        setShowStatusModal(true);
      }
    }
  }


  // Click outside to close details modal
  useEffect(() => {
    if (!showModal) return;
    function handleClickOutside(event: MouseEvent) {
      if (detailsModalRef.current && !detailsModalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  const handleClearDates = () => {
    setStartDate('');
    setEndDate('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
    if (travelVibe.length > 0) {
      const topResults = await locationService.getTopLocationsByCategory(travelVibe[0].value, 3);
      setResults(topResults);
    } else {
      setResults([]);
    }
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
                  className="border border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 text-sm w-full"
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
                  className="border border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 text-sm w-full"
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
              className="border-2 border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 text-sm w-full"
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
              className="border-2 border-yellow-400 bg-white text-gray-900 rounded px-2 py-1 text-sm w-full"
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
            <Button
              type="submit"
              variant="outline"
              size="lg"
              icon={FaPlay}
              iconPosition="left"
              className="w-full md:w-auto"
            >
              Start Planning
            </Button>
          </div>
        </form>
        <h2 className='text-orange-500 text-bold'>{showStatusModal}</h2>
      </div>
      {/* Results Section */}
      {results.length > 0 && (
        <div className="mt-10 max-w-2xl mx-auto w-full">
          <h2 className="text-lg font-bold text-yellow-400 mb-4">Top Picks for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map(loc => (
              <div
                key={loc.id}
                className="bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg transition p-4 flex flex-col items-center"
                onClick={() => handleClickPick(loc)}
              >
                <img src={loc.featuredImage} alt={loc.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                <div className="font-semibold text-gray-900 text-center">{loc.name}</div>
                <div className="text-xs text-gray-500 text-center mt-1">{loc.neighborhood}</div>
                <div className="text-yellow-500 font-bold mt-1">★ {loc.rating}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Modal for location details */}
      {showModal && selectedLocation && (
        <div className="fixed inset-0 z-50 flex justify-center items-start min-h-screen" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div
            ref={detailsModalRef}
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-4 pt-6 relative animate-menu-open mt-20"
            style={{ minWidth: 340 }}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
              style={{ zIndex: 2 }}
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <img src={selectedLocation.featuredImage} alt={selectedLocation.name} className="w-full h-32 object-cover rounded-lg mb-4 mt-2" />
            <h3 className="text-lg font-bold mb-1">{selectedLocation.name}</h3>
            <div className="text-gray-600 mb-1 text-sm">{selectedLocation.address} - {selectedLocation.neighborhood}</div>
            <div className="text-gray-800 mb-2 text-sm">{selectedLocation.description}</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedLocation.tags.map(tag => (
                <span key={tag} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="text-xs text-gray-500 mb-1">Best time: {selectedLocation.bestTimeToVisit}</div>
            <div className="text-xs text-gray-500 mb-2">Price: {selectedLocation.priceRange}</div>
            <ul className="list-disc pl-5 text-xs text-gray-700 mb-3">
              {selectedLocation.tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
            <Button
              variant="primary"
              size="md"
              className="w-full mt-2"
              onClick={() => handleShowStatusModal()}
            >
              Add To Plan
            </Button>
          </div>
          {/* Status Modal */}
          {showStatusModal}
          {showStatusModal && (
            <div className="fixed inset-0 z-60 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.0)' }}>
              <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 rounded-2xl shadow-lg max-w-xs w-full p-6 relative flex flex-col items-center animate-menu-open">
                <div className="flex items-center justify-center mb-2">
                  <FaCheck className="text-green-500 mr-2 text-lg align-middle" />
                  <span className="text-base font-bold text-green-700 align-middle">
                    {statusMessage}
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setShowStatusModal(false);
                      setShowModal(() => false);
                      }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    </section>
  );
};

export default HeroSection; 