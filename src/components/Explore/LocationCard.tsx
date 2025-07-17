import React from 'react';

type LocationCardProps = {
  name: string;
  description: string;
  image?: string;
  tags?: string[];
};

const LocationCard: React.FC<LocationCardProps> = ({ name, description, image, tags }) => {
  return (
    <div className="border rounded-lg p-4 shadow bg-white transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
      {image && <img src={image} alt={name} className="w-full h-40 object-cover rounded mb-2" />}
      <h2 className="text-xl font-semibold mb-1">{name}</h2>
      <p className="text-gray-700 mb-2">{description}</p>
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="bg-gray-200 text-xs px-2 py-1 rounded transition-colors duration-200 hover:bg-blue-200 hover:text-blue-800 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationCard; 