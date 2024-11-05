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
    <div className="container mx-auto py-8">
      {/* Full Width Feature Image with Overlay Title */}
      <div className="relative w-full h-96 mb-8">
        {blog.featureImage && (
          <img
            src={blog.featureImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
          <h1 className="text-5xl font-bold">{blog.title}</h1>
          <p className="text-lg mt-2">By {blog.authorName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Column */}
        <div className="col-span-3 space-y-8">
          {/* Row 1 - Social Icons and Ads */}
          <div className="flex justify-center space-x-4 mb-4">
            <a href={`https://twitter.com/share?url=${window.location.href}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              <BsTwitter size={24} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} className="text-blue-800" target="_blank" rel="noopener noreferrer">
              <BsFacebook size={24} />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?url=${window.location.href}`} className="text-blue-600" target="_blank" rel="noopener noreferrer">
              <BsLinkedin size={24} />
            </a>
          </div>
          <div className="w-full h-32 bg-gray-200 flex items-center justify-center">Ad Space</div>

          {/* Row 2 - Title */}
          <h1 className="text-4xl font-bold text-gray-800">{blog.title}</h1>

          {/* Row 3 - Byline */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <p>
              By {blog.authorName} on {new Date(blog.createdAt).toDateString()}
            </p>
            <div className="flex items-center">
              <FaComment />
              <span className="ml-2">{blog.commentCount || 0}</span>
            </div>
          </div>

          {/* Row 4 - Content */}
          <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />

          {/* Row 5 - Social Icons and Ads */}
          <div className="flex justify-center space-x-4 mt-6">
            <a href={`https://twitter.com/share?url=${window.location.href}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              <BsTwitter size={24} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} className="text-blue-800" target="_blank" rel="noopener noreferrer">
              <BsFacebook size={24} />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?url=${window.location.href}`} className="text-blue-600" target="_blank" rel="noopener noreferrer">
              <BsLinkedin size={24} />
            </a>
          </div>
          <div className="w-full h-32 bg-gray-200 flex items-center justify-center mt-4">Ad Space</div>

          {/* Row 6 - Related Posts Carousel */}
          <RelatedPosts category={blog.category} />

          {/* Row 7 - About Author */}
          <AuthorInfo author={blog.author} />

          {/* Row 8 - Comment Box */}
          <CommentSection blogId={blog._id} />

          {/* Row 9 - Display All Comments */}
          {blog.comments && blog.comments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">All Comments</h3>
              <ul className="space-y-4">
                {blog.comments.map((comment, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-gray-700">{comment.content}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(comment.createdAt).toDateString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="col-span-1 space-y-6">
          {/* Row 1 - Search Bar */}
          <SearchBar />

          {/* Row 2 - About Us */}
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">About Us</h2>
            <p className="text-gray-700 mt-2">
              Welcome to our blog! Here you can find articles about various topics written by our expert authors.
            </p>
          </div>

          {/* Row 3 - Recent Posts */}
          <RecentPosts />

          {/* Row 4 - Most Popular Posts */}
          <PopularPosts />

          {/* Row 5 - Ads Space */}
          <div className="w-full h-32 bg-gray-200 flex items-center justify-center">Ad Space</div>

          {/* Row 6 - Categories */}
          <CategoryList />

          {/* Row 7 - Tags */}
          <TagsList />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailLayout;
