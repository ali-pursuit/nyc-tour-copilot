import React, { useState } from 'react';
import { FaStar, FaCheckCircle, FaHeart, FaMapMarkerAlt, FaEdit, FaUser, FaCalendar, FaTrophy } from 'react-icons/fa';

interface Place {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  visitedDate?: string;
}

const favorites: Place[] = [
  {
    id: '1',
    name: 'Central Park',
    category: 'Parks',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.8
  },
  {
    id: '2',
    name: 'The High Line',
    category: 'Parks',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    rating: 4.5
  },
  {
    id: '3',
    name: 'Katz\'s Delicatessen',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    rating: 4.4
  }
];

const visited: Place[] = [
  {
    id: '4',
    name: 'Times Square',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    rating: 4.2,
    visitedDate: '2024-01-15'
  },
  {
    id: '5',
    name: 'Brooklyn Bridge',
    category: 'Landmarks',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    rating: 4.6,
    visitedDate: '2024-01-10'
  }
];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'visited'>('overview');

  const stats = [
    { label: 'Places Visited', value: visited.length, icon: FaCheckCircle, color: 'text-green-500' },
    { label: 'Favorites', value: favorites.length, icon: FaHeart, color: 'text-red-500' },
    { label: 'Total Rating', value: '4.6', icon: FaStar, color: 'text-yellow-500' },
    { label: 'Days Active', value: '45', icon: FaCalendar, color: 'text-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Your Profile
              </h1>
              <p className="text-base text-gray-600">
                Track your NYC adventures and discover your travel patterns
              </p>
            </div>
            <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 flex items-center text-sm">
              <FaEdit className="mr-2 text-xs" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                  <stat.icon className="text-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-6 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: FaUser },
                { id: 'favorites', label: 'Favorites', icon: FaHeart },
                { id: 'visited', label: 'Visited', icon: FaCheckCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-yellow-400 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="mr-2 text-xs" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-5">
            {activeTab === 'overview' && (
              <div className="space-y-5">
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaTrophy className="text-xl text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    NYC Explorer
                  </h3>
                  <p className="text-gray-600 text-sm">
                    You've visited {visited.length} places and have {favorites.length} favorites
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Recent Activity</h4>
                    <div className="space-y-2">
                      {visited.slice(0, 3).map((place) => (
                        <div key={place.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                          <img src={place.image} alt={place.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{place.name}</p>
                            <p className="text-xs text-gray-600">Visited {place.visitedDate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">Top Categories</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="font-medium text-sm">Parks</span>
                        <span className="text-yellow-600 font-semibold text-sm">2 places</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="font-medium text-sm">Food</span>
                        <span className="text-yellow-600 font-semibold text-sm">1 place</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((place) => (
                  <div key={place.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-200">
                    <img src={place.image} alt={place.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">{place.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{place.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1 text-xs" />
                        <span className="text-xs font-medium">{place.rating}</span>
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        <FaHeart className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'visited' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visited.map((place) => (
                  <div key={place.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-200">
                    <img src={place.image} alt={place.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">{place.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{place.category}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1 text-xs" />
                        <span className="text-xs font-medium">{place.rating}</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <FaCheckCircle className="mr-1 text-xs" />
                        <span className="text-xs">Visited</span>
                      </div>
                    </div>
                    {place.visitedDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        Visited on {new Date(place.visitedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 