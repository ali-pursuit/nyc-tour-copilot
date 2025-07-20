import React, { useRef, useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaMapMarkedAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const UserMenu: React.FC = () => {
  const { user, signOutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="w-10 h-10 rounded-full border-2 border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer overflow-hidden bg-gray-100"
        onClick={e => {
          e.stopPropagation();
          setMenuOpen(v => !v);
        }}
        aria-label="User menu"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUser className="w-full h-full text-gray-400" />
        )}
      </button>
      {menuOpen && (
        <div
          className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-2xl min-w-[200px] z-50 origin-top-right animate-menu-open"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 41, 55, 0.18)' }}
        >
          {/* Welcome note */}
          <div className="px-4 pt-3 pb-2 border-b border-gray-100 text-xs text-gray-500 font-medium">
            { user ? `Welcome, ${user.displayName}!` : 'Welcome User'}
          </div>
          <button
            className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-yellow-50 text-gray-800 font-medium text-sm cursor-pointer transition-colors duration-150"
            onClick={() => {
              setMenuOpen(false);
              navigate('/dashboard');
            }}
          >
            <span className="inline-block w-4 text-yellow-500"><FaMapMarkedAlt /></span>
            Dashboard
          </button>
          <button
            className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-yellow-50 text-gray-800 font-medium text-sm cursor-pointer transition-colors duration-150"
            onClick={() => {
              setMenuOpen(false);
              navigate('/profile');
            }}
          >
            <span className="inline-block w-4 text-yellow-500"><FaUser /></span>
            Edit Profile
          </button>
          <button
            className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-red-50 text-red-600 font-medium text-sm cursor-pointer rounded-b-xl transition-colors duration-150"
            onClick={() => {
              setMenuOpen(false);
              signOutUser();
            }}
          >
            <span className="inline-block w-4"><FaSignOutAlt /></span>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 