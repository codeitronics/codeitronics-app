// src/components/admin/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center text-white relative">
      <h1 className="text-lg font-bold">Admin Dashboard</h1>
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="focus:outline-none flex items-center"
        >
          <img
            className="h-8 w-8 rounded-full"
            src="https://randomuser.me/api/portraits/men/11.jpg"
            alt="Profile"
          />
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5">
            <Link
              to="/admin/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <Link
              to="/admin/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Settings
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('token'); // Clear token for logout
                window.location.href = '/login'; // Redirect to login page
              }}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
