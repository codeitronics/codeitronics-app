// src/components/RecentPosts.js
import React from 'react';
import { Link } from 'react-router-dom';

const RecentPosts = () => {
  // Placeholder recent posts, replace with data fetching logic
  const recentPosts = [
    { id: 1, title: 'Recent Post 1', slug: 'recent-post-1' },
    { id: 2, title: 'Recent Post 2', slug: 'recent-post-2' },
    { id: 3, title: 'Recent Post 3', slug: 'recent-post-3' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">Recent Posts</h2>
      <ul className="mt-2 space-y-2">
        {recentPosts.map((post) => (
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

export default RecentPosts;
