// src/components/Footer.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaYoutube, FaTwitter, FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../../../ThemeContext';

const Footer = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`} aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-6 py-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Company Name and Description */}
          <div className="space-y-8">
            <h1 className="text-2xl font-bold">CodeITronics</h1>
            <p className="text-sm leading-6">
              Empowering Innovation through technology solutions that bring your ideas to life.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="Facebook">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="Twitter">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="GitHub">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="YouTube">
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Solutions</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Web Development</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Machine Learning</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">DevOps</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Analytics</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Pricing</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Documentation</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">API Status</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Guides</Link></li>
                </ul>
              </div>
            </div>
            <div className="space-y-6 md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="/about" className="text-sm leading-6 hover:text-indigo-500">About</Link></li>
                  <li><Link to="/blog" className="text-sm leading-6 hover:text-indigo-500">Blog</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Careers</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Press</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Privacy Policy</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Terms of Service</Link></li>
                  <li><Link to="#" className="text-sm leading-6 hover:text-indigo-500">Disclaimer</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Theme Toggle */}
        <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-500 mb-4 sm:mb-0">&copy; {new Date().getFullYear()} CodeITronics. All rights reserved.</p>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-sm font-medium text-gray-500 focus:outline-none"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-500" />}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
