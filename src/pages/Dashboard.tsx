import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { uploadLocationsToFirebase } from '../scripts/uploadLocations';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: any;
}

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const db = getFirestore();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user && !user.isAnonymous) {
      const fetchUserProfile = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setProfileLoading(false);
        }
      };
      fetchUserProfile();
    } else {
      setProfileLoading(false);
    }
  }, [user, loading, navigate, db]);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to homepage
  }

  const displayName = userProfile 
    ? `${userProfile.firstName} ${userProfile.lastName}`
    : user.isAnonymous 
    ? 'Guest User' 
    : user.email;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userProfile?.firstName || 'there'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Ready to explore more of NYC?
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Profile</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Name</span>
                  <p className="font-medium">{displayName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Email</span>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Member Since</span>
                  <p className="font-medium">
                    {userProfile?.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                  </p>
                </div>
              </div>
              <button className="mt-4 w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Edit Profile
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  ✏️ Edit Preferences
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  🗺️ Discover New Spots
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  🏙️ Hidden Corners in Queens
                </button>
                <button 
                  className="w-full text-left p-3 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors text-red-700"
                  onClick={uploadLocationsToFirebase}
                >
                  🔥 Upload Sample Data (Temporary)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Saved Trips */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Saved Trips</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No saved trips yet</p>
                <button className="mt-2 text-yellow-600 hover:text-yellow-700 font-medium">
                  Start planning your first trip →
                </button>
              </div>
            </div>

            {/* Recently Viewed Places */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recently Viewed Places</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No recently viewed places</p>
                <button className="mt-2 text-yellow-600 hover:text-yellow-700 font-medium">
                  Explore some places →
                </button>
              </div>
            </div>

            {/* Visited Places */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Places You've Visited</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No visited places yet</p>
                <button className="mt-2 text-yellow-600 hover:text-yellow-700 font-medium">
                  Mark places as visited →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 