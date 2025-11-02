import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserTie,
  FaUserGraduate,
  FaBullhorn,
  FaExclamationCircle,
} from 'react-icons/fa';

const AdminSideBar = () => {
  const navItems = [
    { name: 'Home', icon: <FaTachometerAlt />, path: '/admin/home' },
    { name: 'Classes', icon: <FaChalkboardTeacher />, path: '/admin/classes' },
    { name: 'Subjects', icon: <FaBookOpen />, path: '/admin/subjects' },
    { name: 'Teachers', icon: <FaUserTie />, path: '/admin/teachers' },
    { name: 'Students', icon: <FaUserGraduate />, path: '/admin/students' },
    { name: 'Notice', icon: <FaBullhorn />, path: '/admin/notice' },
    { name: 'Complains', icon: <FaExclamationCircle />, path: '/admin/complains' },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen">
      <div className="p-6 text-xl font-bold text-blue-600">Admin Panel</div>
      <nav className="mt-6">
        <ul className="space-y-2">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 space-x-3 text-left w-full hover:bg-blue-100 ${
                    isActive ? 'bg-blue-200 font-semibold' : ''
                  }`
                }
                end
              >
                <span className="text-blue-600">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSideBar;