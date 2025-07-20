import React from 'react';

const VisitedList: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Visited Places</h2>
      <ul className="list-disc pl-5">
        <li>Statue of Liberty</li>
        <li>Empire State Building</li>
      </ul>
    </div>
  );
};

export default VisitedList; 