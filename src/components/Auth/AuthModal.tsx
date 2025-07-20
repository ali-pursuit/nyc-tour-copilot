import React, { useState } from 'react';
import { FaSignInAlt, FaUserPlus, FaUserSecret, FaTimes, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { getFirestore, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const db = getFirestore();

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  // Prevent click inside modal from closing it
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email || !password || (mode === 'register' && (!firstName || !lastName))) {
      setError(
        mode === 'register'
          ? 'Please enter your first name, last name, email, and password.'
          : 'Please enter both email and password.'
      );
      setLoading(false);
      return;
    }
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          email: user.email,
          uid: user.uid,
          createdAt: serverTimestamp(),
        });
      }
      onClose();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setError('');
    setLoading(true);
    try {
      await signInAnonymously(auth);
      onClose();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Anonymous sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative animate-fadeIn mx-4"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <FaTimes className="text-lg" />
        </Button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
            {mode === 'login' ? (
              <FaSignInAlt className="text-lg text-white" />
            ) : (
              <FaUserPlus className="text-lg text-white" />
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {mode === 'login' ? 'Welcome Back' : 'Join NYC Tour Copilot'}
          </h2>
          <p className="text-sm text-gray-600">
            {mode === 'login' 
              ? 'Sign in to continue your NYC adventure' 
              : 'Create an account to save your favorite spots'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  disabled={loading}
                  autoComplete="given-name"
                />
              </div>
              <div className="relative">
                <FaUser className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  disabled={loading}
                  autoComplete="family-name"
                />
              </div>
            </div>
          )}
          
          <div className="relative">
            <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              disabled={loading}
              autoComplete="email"
            />
          </div>
          
          <div className="relative">
            <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            loading={loading}
            icon={mode === 'login' ? FaSignInAlt : FaUserPlus}
            iconPosition="left"
            disabled={loading}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Guest Sign In */}
        <Button
          onClick={handleAnonymous}
          variant="outline"
          size="md"
          fullWidth
          icon={FaUserSecret}
          iconPosition="left"
          disabled={loading}
        >
          {loading ? 'Please wait...' : 'Continue as Guest'}
        </Button>

        {/* Toggle Mode */}
        <div className="mt-4 text-center text-xs">
          {mode === 'login' ? (
            <>
              <span className="text-gray-600">Don't have an account? </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-yellow-600 hover:text-yellow-700 font-semibold p-0 h-auto"
                onClick={() => setMode('register')}
                disabled={loading}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              <span className="text-gray-600">Already have an account? </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-yellow-600 hover:text-yellow-700 font-semibold p-0 h-auto"
                onClick={() => setMode('login')}
                disabled={loading}
              >
                Sign in
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 