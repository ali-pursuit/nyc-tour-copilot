import React from 'react';
import { Link } from 'react-router-dom';

const CallToActionSection: React.FC = () => (
  <section className="py-12 flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold mb-4 text-blue-800">Ready to start your NYC adventure?</h2>
    <Link
      to="/explore"
      className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-lg font-semibold"
    >
      Get Started
    </Link>
  </section>
);

export default CallToActionSection; 