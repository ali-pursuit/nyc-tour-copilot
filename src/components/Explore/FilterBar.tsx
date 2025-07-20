import React from 'react';
import Button from '../Button';

const FilterBar: React.FC = () => {
  return (
    <div className="mb-4 flex gap-2">
      <Button variant="outline" size="sm">All</Button>
      <Button variant="outline" size="sm">Parks</Button>
      <Button variant="outline" size="sm">Museums</Button>
      <Button variant="outline" size="sm">Hidden Gems</Button>
    </div>
  );
};

export default FilterBar; 