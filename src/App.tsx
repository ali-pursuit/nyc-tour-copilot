import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AuthModal from './components/Auth/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import { FaMapMarkedAlt, FaSignInAlt } from 'react-icons/fa';
import Button from './components/Button';
import { useRef, useState, useEffect } from 'react';
import UserMenu from './components/UserMenu';

const Header: React.FC = () => {
  const { user, openAuthModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <FaMapMarkedAlt className="text-white text-sm" />
            </div>
            <span className="font-bold text-xl text-gray-900">NYC Tour Copilot</span>
          </Link>

          {/* Auth Buttons or User Avatar */}
          <div className="flex items-center space-x-3 relative">
            {!user ? (
              <Button
                onClick={openAuthModal}
                variant="primary"
                size="md"
                icon={FaSignInAlt}
                iconPosition="left"
                className="cursor-pointer"
              >
                Sign In
              </Button>
            ) : (
              <UserMenu />
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
