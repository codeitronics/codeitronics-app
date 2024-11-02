// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img
              className="h-20"
              src="https://aaah0mnbncqtinas.public.blob.vercel-storage.com/FX5ATkass4-no-background-VmcZHSX7xE4ng29ATNphGUdb388fxH.png"
              alt="Company logo"
            />
            <p className="text-sm leading-6 text-gray-600">
              Empowering Innovation through technology solutions that bring your ideas to life.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500" aria-label="Facebook">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-yellow-500 hover:text-gray-500" aria-label="Twitter">
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
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Solutions</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Web Development</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Machine Learning</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">DevOps</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Analytics</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Pricing</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Documentation</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">API Status</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Guides</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link to="/about" className="text-sm leading-6 text-gray-600 hover:text-gray-900">About</Link></li>
                  <li><Link to="/blog" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Blog</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Careers</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Press</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
                  <li><Link to="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Disclaimer</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">&copy; {new Date().getFullYear()} CodeITronics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
