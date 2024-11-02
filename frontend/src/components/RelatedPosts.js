// src/components/RelatedPosts.js
import React from 'react';

const RelatedPosts = ({ category }) => {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold">More on {category}</h2>
      <div className="mt-4 space-y-4">
        <p>No related posts yet.</p>
      </div>
    </div>
  );
};

export default RelatedPosts;
