import React from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import AdminDashbar from '../componenets/dashBoard/AdminSideBar.jsx';
import AdminNavbar from '../componenets/dashBoard/Navbar.jsx';
import AdminHome from '../componenets/admin/home/Home.jsx';
import { Outlet, useLocation } from 'react-router-dom';
const AdminDash = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/admin' || location.pathname === '/admin/home';

  return (
  <div><AdminNavbar />
    
    <div className="flex h-screen bg-gray-100">
      
      
      {/* Sidebar */}
      <AdminDashbar />
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome, {user?.name || 'Admin'}</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Report</button>
        </div>

        {isDashboard && <AdminHome />}
        <Outlet />
       </main>
    </div>
    </div>
  );
};

export default AdminDash;