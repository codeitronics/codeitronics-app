// src/components/admin/blog/BlogEditForm.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import JoditEditor from 'jodit-react';



const BlogEditForm = ({ initialData, onSubmit }) => {
    const navigate = useNavigate();

  const editor = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: '',
    tags: '',
    content: '',
    featureImage: null,
    contentImages: [],
    urlSlug: '',
    authorName: 'CodeItronics',
    ...initialData,
  });
  const [imagePreview, setImagePreview] = useState(formData.featureImage || null);
  const [contentImageUrls, setContentImageUrls] = useState(formData.contentImages || []);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...formData, ...initialData });
      setImagePreview(initialData.featureImage);
      setContentImageUrls(initialData.contentImages || []);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featureImage' && files.length) {
      setFormData({ ...formData, featureImage: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (name === 'contentImages' && files.length) {
      setFormData({ ...formData, contentImages: Array.from(files) });
      setContentImageUrls(Array.from(files).map((file) => URL.createObjectURL(file)));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditorChange = (value) => {
    setFormData((prevData) => ({ ...prevData, content: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 bg-white rounded-lg shadow-md relative">
      {/* Row 1: Title and Status */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          name="title"
          value={formData.title || ''}
          onChange={handleInputChange}
          className="w-3/4 p-2 border rounded-md"
          placeholder="Blog Title"
        />
        <span
          className={`w-1/4 text-right text-sm font-semibold px-2 py-1 rounded-full ${
            formData.status === 'Published'
              ? 'bg-green-200 text-green-700'
              : 'bg-yellow-200 text-yellow-700'
          }`}
        >
          {formData.status || 'Draft'}
        </span>
      </div>

      {/* Row 2: Slug */}
      <div className="mb-4">
        <input
          type="text"
          name="urlSlug"
          value={formData.urlSlug || ''}
          readOnly
          className="w-full bg-gray-100 rounded-md border border-gray-300 p-2"
          placeholder="URL Slug"
        />
      </div>

      {/* Row 3: Feature Image and Content Images */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block font-bold text-sm text-gray-900">Feature Image</label>
          <input type="file" name="featureImage" onChange={handleInputChange} className="mt-2" />
          {imagePreview && (
            <img src={imagePreview} alt="Feature Preview" className="mt-4 h-24 rounded-lg" />
          )}
        </div>
        <div className="w-1/2">
          <label className="block font-bold text-sm text-gray-900">Content Images</label>
          <input type="file" name="contentImages" multiple onChange={handleInputChange} className="mt-2" />
          {contentImageUrls.map((url, index) => (
            <div key={index} className="mt-2 flex items-center space-x-2">
              <img src={url} alt={`Content ${index + 1}`} className="h-16 rounded-lg" />
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
                Full Image URL
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Row 4: Categories, Tags, and Author Name */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block font-bold text-sm text-gray-900">Categories</label>
          <input
            type="text"
            name="categories"
            value={formData.categories || ''}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
            placeholder="Categories (comma-separated)"
          />
        </div>
        <div>
          <label className="block font-bold text-sm text-gray-900">Tags</label>
          <input
            type="text"
            name="tags"
            value={formData.tags || ''}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md"
            placeholder="Tags (comma-separated)"
          />
        </div>
        <div>
          <label className="block font-bold text-sm text-gray-900">Author Name</label>
          <p className="mt-2 text-gray-700">{formData.authorName || 'CodeItronics'}</p>
        </div>
      </div>

      {/* Row 5: Content */}
      <div className="col-span-full mb-4">
        <label className="block font-bold text-sm text-gray-900">Content</label>
        <JoditEditor ref={editor} value={formData.content || ''} tabIndex={1} onBlur={handleEditorChange} />
      </div>

      {/* Row 6: Action Buttons */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300"
        >
          Draft
        </button>
        <button
          type="button"
          className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400"
        >
          Preview
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          Save and Publish
        </button>
        <button
          type="button"
          className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400"
        >
          Save and Schedule
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/blogs')}
          className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogEditForm;
