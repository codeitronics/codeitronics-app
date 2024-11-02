// src/components/admin/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-center text-gray-400">
      <p>&copy; {new Date().getFullYear()} CodeITronics. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
