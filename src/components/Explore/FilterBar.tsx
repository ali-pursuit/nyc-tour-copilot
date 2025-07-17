import React from 'react';

const FilterBar: React.FC = () => {
  return (
    <div className="mb-4 flex gap-2">
      <button className="px-3 py-1 bg-gray-200 rounded">All</button>
      <button className="px-3 py-1 bg-gray-200 rounded">Parks</button>
      <button className="px-3 py-1 bg-gray-200 rounded">Museums</button>
      <button className="px-3 py-1 bg-gray-200 rounded">Hidden Gems</button>
    </div>
  );
};

export default FilterBar; 