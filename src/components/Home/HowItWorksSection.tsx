import React from 'react';

const HowItWorksSection: React.FC = () => (
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
);

export default HowItWorksSection; 