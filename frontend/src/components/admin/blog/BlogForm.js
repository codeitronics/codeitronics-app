// src/components/admin/BlogForm.js
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';

const BlogForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const editor = useRef(null);
  const [isEditMode, setIsEditMode] = useState(isEdit);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    featureImage: initialData?.featureImage || null,
    contentImages: initialData?.contentImages || [],
    url: initialData?.url || '',
    categories: initialData?.categories || '',
    tags: initialData?.tags || '',
    authorName: initialData?.authorName || 'CodeItronics',
  });

  const [imagePreview, setImagePreview] = useState(
    initialData?.featureImage ? `${initialData.featureImage}` : null
  );
  const [contentImageUrls, setContentImageUrls] = useState(initialData.contentImages || []);

  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prevData) => ({ ...prevData, url: slug }));
  }, [formData.title]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    console.log('#### name',name);
    console.log('#### value',value);
    console.log('#### files',files);
    if (name === 'featureImage' && files.length) {
      setFormData({ ...formData, featureImage: files[0] });
      console.log('#### featureImage',formData.featureImage);
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
    console.log('#### formData',formData);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'contentImages') {
        formData.contentImages.forEach((file) => data.append('contentImages', file));
      } else {
        data.append(key, formData[key]);
      }
    });
    console.log('#### formData2',formData);
    onSubmit(formData);
    setIsEditMode(false);
  };

  return (
    <div className="relative">
      {!isEditMode && (
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-blue-600 hover:underline"
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </button>
      )}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div className="sm:col-span-full">
          <label className="block font-bold text-sm text-gray-900">Title</label>
          {isEditMode ? (
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              placeholder="Enter blog title"
            />
          ) : (
            <p className="mt-2 text-gray-700">{formData.title}</p>
          )}
        </div>

        {/* Slug */}
        <div className="sm:col-span-full">
          <label className="block font-bold text-sm text-gray-900">URL Slug</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            readOnly
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100"
          />
        </div>

        {/* Feature Image and Content Images */}
        <div className="sm:col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-bold text-sm text-gray-900">Feature Image</label>
            {isEditMode ? (
              <>
                <input
                  type="file"
                  name="featureImage"
                  onChange={handleInputChange}
                  className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Feature Preview" className="mt-4 h-24 rounded-lg" />
                )}
              </>
            ) : (
              imagePreview && <img src={imagePreview} alt="Feature Image" className="mt-4 h-24 rounded-lg" />
            )}
          </div>
          <div>
            <label className="block font-bold text-sm text-gray-900">Content Images</label>
            {isEditMode ? (
              <>
                <input
                  type="file"
                  name="contentImages"
                  onChange={handleInputChange}
                  multiple
                  className="mt-2 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
                {contentImageUrls.map((url, index) => (
                  <div key={index} className="mt-2 flex items-center space-x-2">
                    <img src={url} alt="Content" className="h-16 inline-block mr-2 rounded-lg" />
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                      Full Image URL
                    </a>
                  </div>
                ))}
              </>
            ) : (
              contentImageUrls.map((url, index) => (
                <div key={index} className="mt-2 flex items-center space-x-2">
                  <img src={url} alt="Content" className="h-16 inline-block mr-2 rounded-lg" />
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                    Full Image URL
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Category, Tags, and Author */}
        <div className="sm:col-span-full grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block font-bold text-sm text-gray-900">Category</label>
            {isEditMode ? (
              <input
                type="text"
                name="categories"
                value={formData.categories}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                placeholder="e.g., Web Development"
              />
            ) : (
              <p className="mt-2 text-gray-700">{formData.categories}</p>
            )}
          </div>
          <div>
            <label className="block font-bold text-sm text-gray-900">Tags</label>
            {isEditMode ? (
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                placeholder="e.g., JavaScript, React"
              />
            ) : (
              <p className="mt-2 text-gray-700">{formData.tags}</p>
            )}
          </div>
          <div>
            <label className="block font-bold text-sm text-gray-900">Author Name</label>
            {isEditMode ? (
              <input
                type="text"
                name="authorName"
                value={formData.authorName}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                placeholder="Author name"
              />
            ) : (
              <p className="mt-2 text-gray-700">{formData.authorName}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="col-span-full">
          <label className="block font-bold text-sm text-gray-900">Content</label>
          {isEditMode ? (
            <JoditEditor
              ref={editor}
              value={formData.content}
              tabIndex={1}
              onBlur={handleEditorChange}
            />
          ) : (
            <div
              className="mt-2 text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formData.content }}
            ></div>
          )}
        </div>

        {/* Action Buttons */}
        {isEditMode && (
          <div className="mt-6 flex justify-end gap-x-4">
            <button
              type="button"
              className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400"
            >
              Preview
            </button>
            <button
              type="submit"
              className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400"
            >
              Draft
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Save and Publish
            </button>
            <button
              type="submit"
              className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
