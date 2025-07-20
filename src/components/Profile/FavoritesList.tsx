import React from 'react';

const FavoritesList: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Favorites</h2>
      <ul className="list-disc pl-5">
        <li>Central Park</li>
        <li>The High Line</li>
      </ul>
    </div>
  );
};

export default FavoritesList; 