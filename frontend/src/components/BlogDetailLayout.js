import React from 'react';
import { BsTwitter, BsFacebook, BsLinkedin } from 'react-icons/bs';
import { FaComment } from 'react-icons/fa';
import CommentSection from './CommentSection';
import RelatedPosts from './RelatedPosts';
import AuthorInfo from './AuthorInfo';
import CategoryList from './CategoryList';
import SearchBar from './SearchBar';
import RecentPosts from './RecentPosts';
import PopularPosts from './PopularPosts';
import TagsList from './TagsList';

const BlogDetailLayout = ({ blog }) => {
  return (
    <div className="container mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content Column */}
      <div className="col-span-3 bg-white p-6 rounded-lg shadow-lg">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{blog.title}</h1>

        {/* Byline */}
        <p className="text-sm text-gray-500 mb-4">
          By {blog.authorName} on {new Date(blog.createdAt).toDateString()} in{' '}
          <a href={`/category/${blog.category}`} className="text-blue-500 hover:underline">
            {blog.category}
          </a>{' '}
          <span className="ml-4">
            <FaComment /> {blog.commentCount || 0}
          </span>
        </p>

        {/* Share Icons */}
        <div className="flex space-x-4 mb-4">
          <a href="#" className="text-blue-500">
            <BsTwitter size={24} />
          </a>
          <a href="#" className="text-blue-800">
            <BsFacebook size={24} />
          </a>
          <a href="#" className="text-blue-600">
            <BsLinkedin size={24} />
          </a>
        </div>

        {/* Feature Image */}
        {blog.featureImage && (
          <img
            src={blog.featureImage}
            alt={blog.title}
            className="w-full h-80 object-cover mb-6 rounded-lg"
          />
        )}

        {/* Blog Content */}
        <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />

        {/* Share Icons Again */}
        <div className="flex space-x-4 mt-6">
          <a href="#" className="text-blue-500">
            <BsTwitter size={24} />
          </a>
          <a href="#" className="text-blue-800">
            <BsFacebook size={24} />
          </a>
          <a href="#" className="text-blue-600">
            <BsLinkedin size={24} />
          </a>
        </div>

        {/* Related Posts */}
        <RelatedPosts category={blog.category} />

        {/* About Author */}
        <AuthorInfo author={blog.author} />

        {/* Comment Section */}
        <CommentSection blogId={blog._id} />
      </div>

      {/* Sidebar Column */}
      <div className="col-span-1 space-y-6">
        {/* Search Bar */}
        <SearchBar />

        {/* About/Welcome Section */}
        <div className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">About Us</h2>
          <p className="text-gray-700 mt-2">
            Welcome to our blog! Here you can find articles about various topics written by our expert authors.
          </p>
        </div>

        {/* Categories */}
        <CategoryList />

        {/* Recent Posts */}
        <RecentPosts />

        {/* Most Popular Posts */}
        <PopularPosts />

        {/* Tags */}
        <TagsList />
      </div>
    </div>
  );
};

export default BlogDetailLayout;
