import React, { useState } from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Prevent click inside modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // Placeholder for auth logic
    alert(`${mode === 'login' ? 'Logging in' : 'Registering'} with ${email}`);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(26,26,26,0.85)' }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="bg-[#232323] border-2 border-yellow-400 rounded-xl shadow-lg p-8 w-full max-w-md relative animate-fadeIn"
        onClick={handleModalClick}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-yellow-400 hover:text-yellow-300 text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-extrabold uppercase tracking-wide mb-6 text-yellow-400 text-center">
          {mode === 'login' ? 'Sign In' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-yellow-400 bg-[#181A1B] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-yellow-400 bg-[#181A1B] text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-yellow-400 text-sm">{error}</div>}
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 border-2 border-yellow-400 text-yellow-400 rounded-lg font-semibold uppercase tracking-wide px-6 py-2 mt-2 hover:bg-yellow-400 hover:text-[#181A1B] transition-colors duration-200 shadow-md"
          >
            {mode === 'login' ? <FaSignInAlt className="text-lg" /> : <FaUserPlus className="text-lg" />}
            {mode === 'login' ? 'Sign In' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                className="text-yellow-400 hover:underline cursor-pointer font-bold"
                onClick={() => setMode('register')}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-yellow-400 hover:underline cursor-pointer font-bold"
                onClick={() => setMode('login')}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 