import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserTie,
  FaUserGraduate,
  FaBullhorn,
  FaExclamationCircle,
} from "react-icons/fa";

const AdminSideBar = () => {
  const navItems = [
    { name: "Home", icon: <FaTachometerAlt />, path: "/admin/home" },
    { name: "Classes", icon: <FaChalkboardTeacher />, path: "/admin/classes" },
    { name: "Subjects", icon: <FaBookOpen />, path: "/admin/subjects" },
    { name: "Teachers", icon: <FaUserTie />, path: "/admin/teachers" },
    { name: "Students", icon: <FaUserGraduate />, path: "/admin/students" },
    { name: "Notice", icon: <FaBullhorn />, path: "/admin/notice" },
    { name: "Complains", icon: <FaExclamationCircle />, path: "/admin/complains" },
  ];

  return (
    <aside className="w-72 h-[90vh] bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-[20px_10px_80px_rgba(0,0,0,0.1),-5px_-5px_20px_rgba(255,255,255,0.8)] p-6 flex flex-col items-start">
      {/* Title */}
      <h1 className="text-2xl font-extrabold text-blue-600 mb-6 drop-shadow-sm">
        Admin Panel
      </h1>

      {/* Navigation */}
      <ul className="w-full flex flex-col space-y-3">
        {navItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) => {
                const baseClasses =
                  "flex items-center gap-3 px-5 py-3 text-[15px] font-medium rounded-xl transition-all duration-200 ease-in-out";
                const activeClasses =
                  "bg-blue-500 text-white shadow-[inset_0px_2px_4px_rgba(255,255,255,0.3),0_4px_10px_rgba(0,0,0,0.2)] scale-[1.02]";
                const inactiveClasses =
                  "bg-white text-gray-700 shadow-[inset_2px_2px_50px_rgba(0,0,0,0.05),inset_-2px_-2px_5px_rgba(255,255,255,0.8)] hover:scale-[1.01] hover:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1),inset_-1px_-1px_3px_rgba(255,255,255,0.9)]";
                return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
              }}
            >
              <span className={`text-lg ${item.name === "Home" ? "text-white" : "text-blue-600"}`}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSideBar;