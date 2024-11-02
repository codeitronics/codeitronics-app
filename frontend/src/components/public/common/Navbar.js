import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../ThemeContext';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isDesktopUserMenuOpen, setIsDesktopUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('role');
    if (token && username) {
      setUser(username);
      setIsAdmin(userRole === 'admin' || userRole === 'super-admin');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setUser(null);
    setIsAdmin(false);
    setIsDesktopUserMenuOpen(false);
    setIsMobileUserMenuOpen(false);
    navigate('/');
  };

  const navBgClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const menuBgClass = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800';
  const hoverTextClass = theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-indigo-500';

  return (
    <nav className={`p-4 ${navBgClass} shadow-lg rounded-lg`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Hamburger Menu for Main Navigation (Mobile Only) */}
        <button
          className="text-black w-10 h-10 focus:outline-none md:hidden"
          onClick={() => setIsMainMenuOpen(!isMainMenuOpen)}
        >
          <FaBars />
        </button>

        {/* Brand Name */}
        <Link to="/" className="text-2xl font-bold mx-4">
          CodeITronics
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 font-semibold items-center">
          <Link to="/" className={hoverTextClass}>Home</Link>
          <Link to="/about" className={hoverTextClass}>About Us</Link>
          
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className={`${hoverTextClass} focus:outline-none`}
            >
              Services ▼
            </button>
            {servicesDropdownOpen && (
              <div className={`${menuBgClass} absolute border rounded-md shadow-lg mt-2 w-48 z-10`}>
                <Link to="/services/web-development" className={`block px-4 py-2 text-sm ${hoverTextClass}`}>Web Development</Link>
                <Link to="/services/machine-learning" className={`block px-4 py-2 text-sm ${hoverTextClass}`}>Machine Learning & AI</Link>
                <Link to="/services/mobile-app-development" className={`block px-4 py-2 text-sm ${hoverTextClass}`}>Mobile App Development</Link>
                <Link to="/services/devops-cloud" className={`block px-4 py-2 text-sm ${hoverTextClass}`}>DevOps & Cloud Solutions</Link>
                <Link to="/services/electronics-robotics" className={`block px-4 py-2 text-sm ${hoverTextClass}`}>Electronics & Robotics</Link>
              </div>
            )}
          </div>

          <Link to="/blog" className={hoverTextClass}>Blog</Link>
          <Link to="/forum" className={hoverTextClass}>Forum</Link>
          <Link to="/projects" className={hoverTextClass}>Projects</Link>
          <Link to="/contact" className={hoverTextClass}>Contact</Link>

          {/* CTA Button for Get a Quote */}
          <Link to="/get-a-quote" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
            Get a Quote
          </Link>
        </div>

        {/* Right Hamburger Menu for User Account Options (Mobile Only) */}
        <button
          className="text-black w-10 h-10 focus:outline-none md:hidden"
          onClick={() => setIsMobileUserMenuOpen(!isMobileUserMenuOpen)}
        >
          <FaBars />
        </button>

        {/* Right-aligned Login/Register or User Greeting (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none ml-4">
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
          </button>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDesktopUserMenuOpen(!isDesktopUserMenuOpen)}
                className={`${hoverTextClass} focus:outline-none font-medium`}
              >
                Hi, {user}
              </button>

              {isDesktopUserMenuOpen && (
                <div className={`${menuBgClass} absolute right-0 mt-2 w-48 border rounded-md shadow-lg z-10 font-normal text-sm`}>
                  <Link to="/my-profile" className={`block px-4 py-2 ${hoverTextClass}`}>My Profile</Link>
                  <Link to="/my-blogs" className={`block px-4 py-2 ${hoverTextClass}`}>My Blogs</Link>
                  <Link to="/my-discussions" className={`block px-4 py-2 ${hoverTextClass}`}>My Discussions</Link>
                  <Link to="/my-rewards" className={`block px-4 py-2 ${hoverTextClass}`}>My Rewards</Link>
                  <Link to="/my-settings" className={`block px-4 py-2 ${hoverTextClass}`}>My Settings</Link>
                  <div className="border-t my-2"></div>
                  {isAdmin && (
                    <Link to="/admin/dashboard" className={`block px-4 py-2 ${hoverTextClass}`}>Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className={`w-full text-left px-4 py-2 ${hoverTextClass}`}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className={hoverTextClass}>Login</Link>
              <Link to="/register" className={hoverTextClass}>Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Main Navigation Menu */}
      {isMainMenuOpen && (
        <div className={`${menuBgClass} fixed inset-0 bg-opacity-90 z-20 flex flex-col items-start p-6 space-y-4`}>
          <button onClick={() => setIsMainMenuOpen(false)} className="self-end text-xl mb-4">✕</button>
          <Link to="/" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>Home 🏠</Link>
          <Link to="/about" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>About Us 📘</Link>
          
          {/* Services Dropdown for Mobile */}
          <button onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)} className={`${hoverTextClass} focus:outline-none`}>
            Services 🛠️ ▼
          </button>
          {servicesDropdownOpen && (
            <div className="ml-4 space-y-2">
              <Link to="/services/web-development" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>Web Development</Link>
              <Link to="/services/machine-learning" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>Machine Learning & AI</Link>
              <Link to="/services/mobile-app-development" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>Mobile App Development</Link>
              <Link to="/services/devops-cloud" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>DevOps & Cloud Solutions</Link>
              <Link to="/services/electronics-robotics" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>Electronics & Robotics</Link>
            </div>
          )}

          <Link to="/blog" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>Blogs 📝</Link>
          <Link to="/discussions" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>Discussions 🔍</Link>
          <Link to="/projects" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>Projects 🔍</Link>
          <Link to="/contact" onClick={() => setIsMainMenuOpen(false)} className={hoverTextClass}>Contact ✉️</Link>
          <Link to="/get-a-quote" onClick={() => setIsMainMenuOpen(false)} className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
            Get a Quote 💬
          </Link>
        </div>
      )}

      {/* Mobile User Account Menu */}
      {isMobileUserMenuOpen && (
        <div className={`${menuBgClass} fixed inset-0 bg-opacity-90 z-20 flex flex-col items-start p-6 space-y-4`}>
          <button onClick={() => setIsMobileUserMenuOpen(false)} className="self-end text-xl mb-4">✕</button>
          {user ? (
            <>
              <span className="text-lg font-semibold">Hi, {user}</span>
              <Link to="/my-profile" onClick={() => setIsMobileUserMenuOpen(false)} className={hoverTextClass}>My Profile</Link>
              <Link to="/my-blogs" onClick={() => setIsMobileUserMenuOpen(false)} className={hoverTextClass}>My Blogs</Link>
              <Link to="/my-discussions" onClick={() => setIsMobileUserMenuOpen(false)} className={hoverTextClass}>My Discussions</Link>
              <Link to="/my-rewards" onClick={() => setIsMobileUserMenuOpen(false)} className={hoverTextClass}>My Rewards</Link>
              <Link to="/my-settings" onClick={() => setIsMobileUserMenuOpen(false)} className={hoverTextClass}>My Settings</Link>
              <div className="border-t my-2"></div>
              {isAdmin && (
                <Link to="/admin/dashboard" onClick={() => setIsMobileUserMenuOpen(false)} className={hoverTextClass}>Admin Dashboard</Link>
              )}
              <button onClick={handleLogout} className={hoverTextClass}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMobileUserMenuOpen(false)} className={hoverTextClass}>Login</Link>
              <Link to="/register" onClick={() => setIsMobileUserMenuOpen(false)} className={hoverTextClass}>Register</Link>
            </>
          )}
          <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none">
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
