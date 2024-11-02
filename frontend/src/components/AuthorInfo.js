// src/components/AuthorInfo.js
import React from 'react';

const AuthorInfo = ({ author }) => {
  return (
    <div className="mt-12 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold">About the Author</h2>
      <div className="flex items-center mt-4">
        <img src={author.image || 'https://via.placeholder.com/50'} alt={author.name} className="w-16 h-16 rounded-full" />
        <div className="ml-4">
          <h3 className="font-bold">{author.name}</h3>
          <p className="text-gray-600">{author.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
