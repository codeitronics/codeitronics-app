// src/components/Navbar.js
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking for token and username
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser(username); // Set the username if found
    }
  }, []);

  const handleLogout = () => {
    // Clear the token and username from localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    navigate('/'); // Redirect to homepage
  };

  return (
    <nav className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg rounded-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link to="/" className="text-2xl font-bold">
          CodeITronics
        </Link>

        {/* Links for Large Screens */}
        <div className="hidden md:flex space-x-4 font-semibold">
          <Link to="/" className="hover:text-indigo-500">Home</Link>
          <Link to="/about" className="hover:text-indigo-500">About</Link>
          <Link to="/services" className="hover:text-indigo-500">Services</Link>
          <Link to="/blog" className="hover:text-indigo-500">Blog</Link>
          <Link to="/contact" className="hover:text-indigo-500">Contact</Link>
        </div>

        {/* Right-aligned Login/Register or User Greeting */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            // If user is logged in, show greeting and logout button
            <>
              <span className="hover:text-indigo-500">Hi, {user}</span>
              <button onClick={handleLogout} className="hover:text-indigo-500">Logout</button>
            </>
          ) : (
            // Show Login and Register links if no user is logged in
            <>
              <Link to="/login" className="hover:text-indigo-500">Login</Link>
              <Link to="/register" className="hover:text-indigo-500">Register</Link>
            </>
          )}
          {/* Theme Toggle Button with Icon */}
          <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none ml-4">
            {theme === 'dark' ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-blue-500" />
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="text-gray-500 w-10 h-10 focus:outline-none bg-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="block w-5 relative">
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                isOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                isOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col items-center space-y-2 font-semibold">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-indigo-500">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-indigo-500">About</Link>
          <Link to="/services" onClick={() => setIsOpen(false)} className="hover:text-indigo-500">Services</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="hover:text-indigo-500">Blog</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-indigo-500">Contact</Link>

          {user ? (
            <>
              <span className="hover:text-indigo-500">Hi, {user}</span>
              <button onClick={() => { setIsOpen(false); handleLogout(); }} className="hover:text-indigo-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-indigo-500">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="hover:text-indigo-500">Register</Link>
            </>
          )}
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none">
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
