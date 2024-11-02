// src/components/admin/AdminLayout.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaCalendar,
  FaChartBar,
  FaNewspaper,
  FaBuilding // New icon for Company Settings
} from 'react-icons/fa';
import Navbar from './Navbar'; // Admin Navbar
import Footer from './Footer'; // Admin Footer

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-gray-800 text-white transition-all duration-300`}>
        <div className="p-4 flex justify-between items-center">
          <h2 className={`text-xl font-semibold ${isSidebarOpen ? 'block' : 'hidden'}`}>Admin</h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <FaBars size={20} />
          </button>
        </div>
        <nav className="space-y-4">
          <Link to="/admin/dashboard" className="flex items-center p-4 hover:bg-gray-700">
            <FaTachometerAlt />
            <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'}`}>Dashboard</span>
          </Link>
          <Link to="/admin/users" className="flex items-center p-4 hover:bg-gray-700">
            <FaUsers />
            <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'}`}>Users</span>
          </Link>
          {/* Blog Section */}
          <Link to="/admin/blogs" className="flex items-center p-4 hover:bg-gray-700">
            <FaNewspaper />
            <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'}`}>Blogs</span>
          </Link>
          <Link to="/admin/projects" className="flex items-center p-4 hover:bg-gray-700">
            <FaProjectDiagram />
            <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'}`}>Projects</span>
          </Link>
          <Link to="/admin/calendar" className="flex items-center p-4 hover:bg-gray-700">
            <FaCalendar />
            <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'}`}>Calendar</span>
          </Link>
          <Link to="/admin/reports" className="flex items-center p-4 hover:bg-gray-700">
            <FaChartBar />
            <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'}`}>Reports</span>
          </Link>
          
          {/* Company Settings Section */}
          <Link to="/admin/company-settings" className="flex items-center p-4 hover:bg-gray-700">
            <FaBuilding />
            <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'}`}>Company Settings</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 bg-white">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
