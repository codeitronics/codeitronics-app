// src/components/BlogListLayout.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import RecentPosts from './RecentPosts';
import PopularPosts from './PopularPosts';
import TagsList from './TagsList';
import CategoryList from './CategoryList';

const BlogListLayout = ({ blogs }) => {
  return (
    <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content Column */}
      <div className="col-span-3 space-y-8">
        <h1 className="text-2xl font-bold text-gray-700">Posts</h1>
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-6 rounded-lg shadow-lg">
            {blog.featureImage && (
              <img
                src={blog.featureImage}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="font-light text-gray-600">{new Date(blog.createdAt).toDateString()}</span>
                <span className="px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded">
                  {blog.category}
                </span>
              </div>
              <div className="mt-2">
                <Link to={`/blog/${blog.urlSlug}`} className="text-2xl font-bold text-gray-700 hover:underline">
                  {blog.title}
                </Link>
                <p className="mt-2 text-gray-600">{blog.description}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <Link to={`/blog/${blog.urlSlug}`} className="text-blue-500 hover:underline">Read more</Link>
                <div className="flex items-center">
                  <img
                    src={blog.authorAvatar || 'https://via.placeholder.com/50'}
                    alt="avatar"
                    className="w-10 h-10 mx-4 rounded-full hidden sm:block"
                  />
                  <h1 className="font-bold text-gray-700 hover:underline">{blog.authorName}</h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Column */}
      <div className="col-span-1 space-y-6">
        <SearchBar />
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">About Us</h2>
          <p className="text-gray-700 mt-2">
            Welcome to our blog! Here you can find articles about various topics written by our expert authors.
          </p>
        </div>
        <CategoryList />
        <RecentPosts />
        <PopularPosts />
        <TagsList />
      </div>
    </div>
  );
};

export default BlogListLayout;
