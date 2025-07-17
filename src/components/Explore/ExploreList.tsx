import React from 'react';
import LocationCard from './LocationCard';

const placeholderLocations = [
  {
    name: 'Central Park',
    description: 'A sprawling urban park in the heart of Manhattan.',
    image: '',
    tags: ['Park', 'Iconic'],
  },
  {
    name: 'The High Line',
    description: 'An elevated linear park built on a historic freight rail line.',
    image: '',
    tags: ['Park', 'Unique'],
  },
];

const ExploreList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {placeholderLocations.map((loc) => (
        <LocationCard key={loc.name} {...loc} />
      ))}
    </div>
  );
};

export default ExploreList; 