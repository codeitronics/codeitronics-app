// src/components/CategoryList.js
import React from 'react';

const CategoryList = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">Categories</h2>
      <ul className="mt-2 space-y-2">
        <li><a href="#" className="text-blue-500">Category 1 (10)</a></li>
        <li><a href="#" className="text-blue-500">Category 2 (5)</a></li>
      </ul>
    </div>
  );
};

export default CategoryList;
