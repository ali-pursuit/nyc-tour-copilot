import React from 'react';
import FavoritesList from '../components/Profile/FavoritesList';
import VisitedList from '../components/Profile/VisitedList';

const Profile: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FavoritesList />
        <VisitedList />
      </div>
    </div>
  );
};

export default Profile; 