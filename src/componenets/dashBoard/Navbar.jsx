import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const [showDesign, setShowDesign] = useState(false);

  return (
    <header className="bg-gradient-to-br from-gray-100 to-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.15),0_4px_12px_rgba(0,0,0,0.05)] px-8 py-5 flex justify-between items-center relative z-30 border border-gray-200">
      
      {/* Logo */}
      <div className="text-3xl font-extrabold text-blue-600 tracking-tight drop-shadow-md">
        Admin Dashboard
      </div>

      {/* User Info */}
      <div className="flex items-center space-x-5">
        <FaUserCircle className="text-blue-600 text-3xl drop-shadow-sm" />
        <span className="text-gray-800 font-semibold text-base">{user?.name || 'Admin'}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-red-600 transition-all duration-200"
        >
          Logout
        </button>
      </div>

      {/* Embedded Canva Design */}
      {showDesign && (
        <div className="absolute top-full left-0 w-full bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-6 mt-4 z-20 border border-gray-100">
          <div className="relative w-full h-0 pb-[56.2225%] rounded-xl overflow-hidden shadow-inner">
            <iframe
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full border-none"
              src="https://www.canva.com/design/DAG2J2ZSW_w/Zsub4Vf0y4Ytxy-Uwd8kAQ/view?embed"
              allow="fullscreen"
            ></iframe>
          </div>
          <div className="mt-3 text-sm text-gray-600 text-center">
            <a
              href="https://www.canva.com/design/DAG2J2ZSW_w/Zsub4Vf0y4Ytxy-Uwd8kAQ/view?utm_content=DAG2J2ZSW_w&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              View full design by Riya Kumari
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminNavbar;