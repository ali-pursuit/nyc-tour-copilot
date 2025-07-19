import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AuthModal from './components/Auth/AuthModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FaMapMarkedAlt, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Header: React.FC = () => {
  const { user, openAuthModal, signOutUser } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <FaMapMarkedAlt className="text-white text-sm" />
            </div>
            <span className="font-bold text-xl text-gray-900">NYC Tour Copilot</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/explore" 
              className="text-gray-600 hover:text-yellow-600 font-medium transition-colors duration-200 text-sm"
            >
              Explore
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className="text-gray-600 hover:text-yellow-600 font-medium transition-colors duration-200 text-sm"
              >
                Dashboard
              </Link>
            )}
            <Link 
              to="/profile" 
              className="text-gray-600 hover:text-yellow-600 font-medium transition-colors duration-200 text-sm"
            >
              Profile
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {!user ? (
              <button
                onClick={openAuthModal}
                className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200 flex items-center space-x-2 text-sm shadow-sm hover:shadow-md"
              >
                <FaSignInAlt className="text-xs" />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-900 text-xs" />
                  </div>
                  <span className="font-medium">{user.email || 'User'}</span>
                </div>
                <button
                  onClick={signOutUser}
                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 flex items-center space-x-1 text-sm"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const AppContent: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
