import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import Home from './pages/Home';
import AuthModal from './components/Auth/AuthModal';

const App: React.FC = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex gap-4 items-center">
        <Link to="/" className="font-bold text-lg mr-6 hover:text-blue-400 transition-colors duration-200 cursor-pointer">NYC Tour Copilot</Link>
        <Link to="/explore" className="hover:underline hover:text-blue-400 transition-colors duration-200 cursor-pointer">Explore</Link>
        <Link to="/profile" className="hover:underline hover:text-blue-400 transition-colors duration-200 cursor-pointer">Profile</Link>
        <button
          className="hover:underline hover:text-blue-400 transition-colors duration-200 cursor-pointer ml-auto"
          onClick={() => openAuth('login')}
        >
          Login
        </button>
        <button
          className="hover:underline hover:text-blue-400 transition-colors duration-200 cursor-pointer"
          onClick={() => openAuth('register')}
        >
          Register
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </Router>
  );
};

export default App;
