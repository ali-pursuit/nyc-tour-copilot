import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, deleteDoc, doc as firestoreDoc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import Button from '../components/Button';
import { FaStar, FaCheckCircle, FaHeart, FaRegHeart, FaMapMarkerAlt, FaEdit, FaUser, FaCalendar, FaTrophy } from 'react-icons/fa';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: any;
}

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
    name: "Katz's Delicatessen",
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

const Dashboard: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const db = getFirestore();
  const sectionCards = [
    { id: 'overview', label: 'Overview', icon: FaUser, color: 'text-gray-900', bg: 'bg-yellow-100' },
    { id: 'visited', label: 'Places Visited', icon: FaCheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'favorites', label: 'Favorites', icon: FaHeart, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'totalRating', label: 'Total Rating', icon: FaStar, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 'myPlans', label: 'My Plans', icon: FaCalendar, color: 'text-blue-500', bg: 'bg-blue-50' }
  ];

  const [activeSection, setActiveSection] = useState<'overview' | 'visited' | 'favorites' | 'totalRating' | 'myPlans'>('overview');
  const [userPlans, setUserPlans] = useState<any[]>([]);
  const [userVisited, setUserVisited] = useState<any[]>([]);
  const [userFavorites, setUserFavorites] = useState<any[]>([]);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editProfileData, setEditProfileData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [editProfileStatus, setEditProfileStatus] = useState<string | null>(null);
  const editProfileModalRef = useRef<HTMLDivElement>(null);
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  // Click outside to close edit profile modal
  useEffect(() => {
    if (!showEditProfileModal) return;
    function handleClickOutside(event: MouseEvent) {
      if (editProfileModalRef.current && !editProfileModalRef.current.contains(event.target as Node)) {
        setShowEditProfileModal(false);
        setEditProfileStatus(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEditProfileModal]);

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
      if (!userProfile) fetchUserProfile();
      else setProfileLoading(false);
    } else {
      setProfileLoading(false);
    }
  }, [user, loading, navigate, db, userProfile]);

  useEffect(() => {
    if (user && userPlans.length === 0) {
      const fetchPlans = async () => {
        try {
          const db = getFirestore();
          const plansSnap = await import('firebase/firestore').then(({ getDocs, collection }) =>
            getDocs(collection(db, `users/${user.uid}/plans`))
          );
          setUserPlans(plansSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
          setUserPlans([]);
        }
      };
      fetchPlans();
    }
  }, [user, userPlans.length]);

  useEffect(() => {
    if (user && userVisited.length === 0) {
      const fetchVisited = async () => {
        try {
          const db = getFirestore();
          const visitedSnap = await import('firebase/firestore').then(({ getDocs, collection }) =>
            getDocs(collection(db, `users/${user.uid}/visited`))
          );
          setUserVisited(visitedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
          setUserVisited([]);
        }
      };
      fetchVisited();
    }
  }, [user, userVisited.length]);

  useEffect(() => {
    if (user && userFavorites.length === 0) {
      const fetchFavorites = async () => {
        try {
          const db = getFirestore();
          const favSnap = await import('firebase/firestore').then(({ getDocs, collection }) =>
            getDocs(collection(db, `users/${user.uid}/favorites`))
          );
          setUserFavorites(favSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
          setUserFavorites([]);
        }
      };
      fetchFavorites();
    }
  }, [user, userFavorites.length]);

  // Helper to add a plan to state after adding in Firestore
  const addPlanToState = (plan: any) => {
    setUserPlans((prev) => [...prev, plan]);
  };
  // Helper to update profile in state after editing
  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
  };
  // Helper to check if a place is favorite
  const isFavorite = (placeId: string) => userFavorites.some(fav => fav.id === placeId);
  // Helper to toggle favorite
  const toggleFavorite = async (place: any) => {
    const db = getFirestore();
    if (isFavorite(place.id)) {
      await deleteDoc(firestoreDoc(db, `users/${user.uid}/favorites`, place.id));
      setUserFavorites(prev => prev.filter(fav => fav.id !== place.id));
    } else {
      await setDoc(firestoreDoc(db, `users/${user.uid}/favorites`, place.id), place);
      setUserFavorites(prev => [...prev, place]);
    }
  };

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
              <Button 
                variant="primary" 
                size="md"
                fullWidth
                onClick={() => {
                  setEditProfileData({
                    firstName: userProfile?.firstName || '',
                    lastName: userProfile?.lastName || '',
                    email: user.email || '',
                    password: ''
                  });
                  setShowEditProfileModal(true);
                  setEditProfileStatus(null);
                }}
              >
                Edit Profile
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button 
                  variant="ghost" 
                  size="md"
                  fullWidth
                  className="justify-start"
                >
                  ✏️ Edit Preferences
                </Button>
                <Button 
                  variant="ghost" 
                  size="md"
                  fullWidth
                  className="justify-start"
                >
                  🗺️ Discover New Spots
                </Button>
                <Button 
                  variant="ghost" 
                  size="md"
                  fullWidth
                  className="justify-start"
                >
                  🏙️ Hidden Corners in Queens
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Navigation Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {sectionCards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setActiveSection(card.id as any)}
                  className={`group bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 border-2 ${activeSection === card.id ? 'border-yellow-400' : 'border-transparent'} cursor-pointer`}
                  style={{ outline: 'none' }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 text-xl ${card.bg} ${card.color}`}>
                    <card.icon />
                  </div>
                  <div className="font-bold text-gray-900 text-base mb-1">{card.label}</div>
                  {/* Show value for stats cards except Overview and Days Active */}
                  {card.id === 'visited' && <div className="text-sm text-gray-500">{userVisited.length}</div>}
                  {card.id === 'favorites' && <div className="text-sm text-gray-500">{userFavorites.length}</div>}
                  {card.id === 'totalRating' && <div className="text-sm text-gray-500">4.6</div>}
                  {card.id === 'myPlans' && <div className="text-sm text-gray-500">{userPlans.length}</div>}
                </button>
              ))}
            </div>

            {/* Section Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 min-h-[300px]">
              {activeSection === 'overview' && (
                <div className="space-y-5">
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaTrophy className="text-xl text-gray-900" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">NYC Explorer</h3>
                    <p className="text-gray-600 text-sm">You've visited {userVisited.length} places and have {favorites.length} favorites</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">Recent Activity</h4>
                      <div className="space-y-2">
                        {userVisited.slice(0, 3).map((place) => (
                          <div key={place.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                            <img src={place.image || place.featuredImage} alt={place.name} className="w-10 h-10 rounded-lg object-cover mr-3" />
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
              {activeSection === 'visited' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userVisited.map((place) => (
                    <div key={place.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-200">
                      <img src={place.image || place.featuredImage} alt={place.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                      <div className="flex items-center mb-1">
                        <button className="mr-2 text-red-500 hover:text-red-700 focus:outline-none" onClick={() => toggleFavorite(place)} title={isFavorite(place.id) ? 'Remove from Favorites' : 'Add to Favorites'}>
                          {isFavorite(place.id) ? <FaHeart className="text-sm" /> : <FaRegHeart className="text-sm" />}
                        </button>
                        <h4 className="font-semibold text-gray-900 text-sm">{place.name}</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{place.category?.join ? place.category.join(', ') : place.category}</p>
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
              {activeSection === 'favorites' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userFavorites.length === 0 && <div className="text-gray-500 col-span-full">No favorites yet.</div>}
                  {userFavorites.map((place) => (
                    <div key={place.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-200">
                      <img src={place.image || place.featuredImage} alt={place.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                      <div className="flex items-center mb-1">
                        <button className="mr-2 text-red-500 hover:text-red-700 focus:outline-none" onClick={() => user && toggleFavorite(place)} title="Remove from Favorites">
                          <FaHeart className="text-sm" />
                        </button>
                        <h4 className="font-semibold text-gray-900 text-sm">{place.name}</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{place.category?.join ? place.category.join(', ') : place.category}</p>
                      <div className="flex items-center mb-2">
                        <FaStar className="text-yellow-400 mr-1 text-xs" />
                        <span className="text-xs font-medium">{place.rating}</span>
                      </div>
                      {place.visitedDate && (
                        <p className="text-xs text-gray-500 mt-2">
                          Visited on {new Date(place.visitedDate).toLocaleDateString()}
                        </p>
                      )}
                      {place.description && (
                        <div className="text-xs text-gray-500 italic mt-1">{place.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {activeSection === 'totalRating' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Ratings & Comments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...favorites, ...userVisited].map((place) => (
                      <div key={place.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-200">
                        <img src={place.image || place.featuredImage} alt={place.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm">{place.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{place.category?.join ? place.category.join(', ') : place.category}</p>
                        <div className="flex items-center mb-2">
                          <FaStar className="text-yellow-400 mr-1 text-xs" />
                          <span className="text-xs font-medium">{place.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500 italic">"This is a placeholder for your comment."</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeSection === 'myPlans' && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">My Plans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userPlans.length === 0 && <div className="text-gray-500 col-span-full">No plans saved yet.</div>}
                    {userPlans.map((plan) => (
                      <div key={plan.id} className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors duration-200 relative">
                        <img src={plan.featuredImage} alt={plan.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                        <div className="flex items-center mb-1">
                          <button className="mr-2 text-red-500 hover:text-red-700 focus:outline-none" onClick={() => toggleFavorite(plan)} title={isFavorite(plan.id) ? 'Remove from Favorites' : 'Add to Favorites'}>
                            {isFavorite(plan.id) ? <FaHeart className="text-sm" /> : <FaRegHeart className="text-sm" />}
                          </button>
                          <h4 className="font-semibold text-gray-900 text-sm">{plan.name}</h4>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{plan.category?.join ? plan.category.join(', ') : plan.category}</p>
                        <div className="flex items-center mb-2">
                          <FaStar className="text-yellow-400 mr-1 text-xs" />
                          <span className="text-xs font-medium">{plan.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500 italic">{plan.description}</div>
                                  <div className="flex justify-end mt-4 gap-1">
            <button
              className="bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold px-2 py-1 rounded shadow-sm transition-colors duration-150 cursor-pointer whitespace-nowrap"
              onClick={() => { setSelectedPlan(plan); setShowPlanDetailsModal(true); }}
              title="View Details"
            >
              View
            </button>
            <button
              className="bg-green-600 text-white hover:bg-green-700 text-xs font-bold px-2 py-1 rounded shadow-sm transition-colors duration-150 cursor-pointer whitespace-nowrap"
              onClick={async () => {
                const db = getFirestore();
                const visitedPlace = {
                  ...plan,
                  visitedDate: new Date().toISOString(),
                };
                await setDoc(firestoreDoc(db, `users/${user.uid}/visited`, plan.id), visitedPlace);
                setUserVisited((prev) => [...prev, visitedPlace]);
                // Remove from plans
                await deleteDoc(firestoreDoc(db, `users/${user.uid}/plans`, plan.id));
                setUserPlans((prev) => prev.filter((p) => p.id !== plan.id));
              }}
              title="Mark as Visited"
            >
              Mark Visited
            </button>
            <button
              className="bg-red-600 text-white hover:bg-red-700 text-xs font-bold px-2 py-1 rounded shadow-sm transition-colors duration-150 cursor-pointer whitespace-nowrap"
              onClick={async () => {
                const db = getFirestore();
                await deleteDoc(firestoreDoc(db, `users/${user.uid}/plans`, plan.id));
                setUserPlans((prev) => prev.filter((p) => p.id !== plan.id));
              }}
              title="Remove from My Plans"
            >
              Remove
            </button>
          </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div ref={editProfileModalRef} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-menu-open">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={() => { setShowEditProfileModal(false); setEditProfileStatus(null); }}>&times;</button>
            <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setEditProfileStatus(null);
                try {
                  // Update Firestore profile
                  await setDoc(doc(db, 'users', user.uid), {
                    firstName: editProfileData.firstName,
                    lastName: editProfileData.lastName,
                    email: editProfileData.email,
                  }, { merge: true });
                  // Update Auth email
                  if (user.email !== editProfileData.email) {
                    await updateEmail(auth.currentUser!, editProfileData.email);
                  }
                  // Update Auth password if provided
                  if (editProfileData.password) {
                    await updatePassword(auth.currentUser!, editProfileData.password);
                  }
                  // Update displayName in Auth
                  await updateProfile(auth.currentUser!, {
                    displayName: `${editProfileData.firstName} ${editProfileData.lastName}`
                  });
                  setEditProfileStatus('Profile updated successfully!');
                  setUserProfile((prev) => prev ? { ...prev, ...editProfileData } : prev);
                } catch (err: any) {
                  setEditProfileStatus(err.message || 'Failed to update profile.');
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editProfileData.firstName}
                  onChange={e => setEditProfileData(d => ({ ...d, firstName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editProfileData.lastName}
                  onChange={e => setEditProfileData(d => ({ ...d, lastName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editProfileData.email}
                  onChange={e => setEditProfileData(d => ({ ...d, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-gray-400 text-xs">(leave blank to keep unchanged)</span></label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editProfileData.password}
                  onChange={e => setEditProfileData(d => ({ ...d, password: e.target.value }))}
                  autoComplete="new-password"
                />
              </div>
              {editProfileStatus && (
                <div className={`text-center text-sm font-medium ${editProfileStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{editProfileStatus}</div>
              )}
              <div className="flex gap-2 mt-4">
                <Button type="submit" variant="primary" size="md" className="w-full">Save</Button>
                <Button type="button" variant="outline" size="md" className="w-full" onClick={() => { setShowEditProfileModal(false); setEditProfileStatus(null); }}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Plan Details Modal */}
      {showPlanDetailsModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl" onClick={() => { setShowPlanDetailsModal(false); setSelectedPlan(null); }}>&times;</button>
            <img src={selectedPlan.featuredImage} alt={selectedPlan.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">{selectedPlan.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{selectedPlan.category?.join ? selectedPlan.category.join(', ') : selectedPlan.category}</p>
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-400 mr-1 text-sm" />
              <span className="text-sm font-medium">{selectedPlan.rating}</span>
            </div>
            <div className="text-gray-700 mb-4">{selectedPlan.description}</div>
            {/* Add more plan details here if needed */}
            <button className="mt-2 px-4 py-2 bg-gray-200 cursor-pointer rounded hover:bg-gray-300 w-full" onClick={() => { setShowPlanDetailsModal(false); setSelectedPlan(null); }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 