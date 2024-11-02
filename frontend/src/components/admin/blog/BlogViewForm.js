// src/components/admin/blog/BlogViewForm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogViewForm = ({ blogData }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md relative">
      

      {/* Row 1: Title and Status */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold w-3/4">{blogData.title}</h1>
        <span
          className={`w-1/4 text-right text-sm font-semibold px-2 py-1 rounded-full ${
            blogData.status === 'Published'
              ? 'bg-green-200 text-green-700'
              : 'bg-yellow-200 text-yellow-700'
          }`}
        >
          {blogData.status}
        </span>
      </div>

      {/* Row 2: Slug */}
      <div className="mb-4">
        <input
          type="text"
          value={blogData.urlSlug}
          readOnly
          className="w-full bg-gray-100 rounded-md border border-gray-300 p-2"
          placeholder="URL Slug"
          readOnly
        />
      </div>

      {/* Row 3: Feature Image and Content Images */}
      <div className="flex gap-4 mb-4">
        {/* Feature Image */}
        <div className="w-1/2">
          <label className="block font-bold text-sm text-gray-900">Feature Image</label>
          {blogData.featureImage && (
            <div className="mt-2">
              <img src={blogData.featureImage} alt="Feature Preview" className="h-24 rounded-lg" />
            </div>
          )}
        </div>

        {/* Content Images */}
        <div className="w-1/2">
          <label className="block font-bold text-sm text-gray-900">Content Images</label>
          {blogData.contentImages && blogData.contentImages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {blogData.contentImages.map((url, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <img src={url} alt={`Content ${index + 1}`} className="h-16 rounded-lg" />
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs"
                  >
                    Full Image URL
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Row 4: Categories, Tags, and Author Name */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {/* Categories */}
        <div>
          <label className="block font-bold text-sm text-gray-900">Category</label>
          <p className="mt-2 text-gray-700">{blogData.categories}</p>
        </div>

        {/* Tags */}
        <div>
          <label className="block font-bold text-sm text-gray-900">Tags</label>
          <p className="mt-2 text-gray-700">{blogData.tags}</p>
        </div>

        {/* Author Name */}
        <div>
          <label className="block font-bold text-sm text-gray-900">Author Name</label>
          <p className="mt-2 text-gray-700">{blogData.authorName || 'CodeItronics'}</p>
        </div>
      </div>

      {/* Row 5: Content */}
      <div className="col-span-full mb-4">
        <label className="block font-bold text-sm text-gray-900">Content</label>
        <div
          className="mt-2 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        ></div>
      </div>

      {/* Row 6: Action Buttons */}
      <div className="flex justify-end gap-x-4">
        <button
          type="button"
          onClick={() => navigate('/admin/blogs')}
          className="rounded-md bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BlogViewForm;
