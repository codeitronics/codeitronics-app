// src/components/admin/BlogCreateNew.js
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

const BlogCreateNew = ({ onSubmit }) => {
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    featureImage: null,
    contentImages: [],
    categories: '',
    tags: '',
    authorName: 'CodeItronics',
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featureImage' && files.length) {
      setFormData({ ...formData, featureImage: files[0] });
    } else if (name === 'contentImages' && files.length) {
      setFormData({ ...formData, contentImages: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditorChange = (value) => {
    setFormData((prevData) => ({ ...prevData, content: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-6 bg-white rounded-lg shadow-md">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        className="w-full p-2 mt-1 border rounded-md"
        placeholder="Blog Title"
      />

      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        className="w-full p-2 mt-1 border rounded-md"
        placeholder="Blog Description"
      />

      <input
        type="text"
        name="categories"
        value={formData.categories}
        onChange={handleInputChange}
        className="w-full p-2 mt-1 border rounded-md"
        placeholder="Categories (comma-separated)"
      />

      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleInputChange}
        className="w-full p-2 mt-1 border rounded-md"
        placeholder="Tags (comma-separated)"
      />

      <JoditEditor
        ref={editor}
        value={formData.content}
        tabIndex={1}
        onBlur={handleEditorChange}
        placeholder="Write the blog content here..."
      />

      <div>
        <label className="block font-bold text-sm text-gray-900">Feature Image</label>
        <input type="file" name="featureImage" onChange={handleInputChange} className="mt-2" />
      </div>

      <div>
        <label className="block font-bold text-sm text-gray-900">Content Images</label>
        <input type="file" name="contentImages" multiple onChange={handleInputChange} className="mt-2" />
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
        Create Blog Post
      </button>
    </form>
  );
};

export default BlogCreateNew;
