import React from 'react';
import FilterBar from '../components/Explore/FilterBar';
import SuggestionsBar from '../components/Suggestions/SuggestionsBar';
import ExploreList from '../components/Explore/ExploreList';

const Explore: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore NYC</h1>
      <FilterBar />
      <SuggestionsBar />
      <ExploreList />
    </div>
  );
};

export default Explore; 