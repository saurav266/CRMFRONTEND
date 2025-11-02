import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const [showDesign, setShowDesign] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">Admin Dashboard</div>

      {/* Navigation Links */}
      

      {/* User Info */}
      <div className="flex items-center space-x-4">
        <FaUserCircle className="text-blue-600 text-xl" />
        <span className="text-gray-700">{user?.name || 'Admin'}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Embedded Canva Design */}
      {showDesign && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 z-10">
          <div className="relative w-full h-0 pb-[56.2225%] rounded overflow-hidden">
            <iframe
              loading="lazy"
              className="absolute top-0 left-0 w-full h-full border-none"
              src="https://www.canva.com/design/DAG2J2ZSW_w/Zsub4Vf0y4Ytxy-Uwd8kAQ/view?embed"
              allow="fullscreen"
            ></iframe>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            <a
              href="https://www.canva.com/design/DAG2J2ZSW_w/Zsub4Vf0y4Ytxy-Uwd8kAQ/view?utm_content=DAG2J2ZSW_w&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
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