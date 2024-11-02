// src/components/PopularPosts.js
import React from 'react';
import { Link } from 'react-router-dom';

const PopularPosts = () => {
  // Placeholder popular posts, replace with data fetching logic
  const popularPosts = [
    { id: 1, title: 'Popular Post 1', slug: 'popular-post-1' },
    { id: 2, title: 'Popular Post 2', slug: 'popular-post-2' },
    { id: 3, title: 'Popular Post 3', slug: 'popular-post-3' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">Most Popular Posts</h2>
      <ul className="mt-2 space-y-2">
        {popularPosts.map((post) => (
          <li key={post.id}>
            <Link to={`/blog/${post.slug}`} className="text-blue-500 hover:underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularPosts;
