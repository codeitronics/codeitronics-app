// src/components/admin/BlogCreateForm.js
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';

const BlogCreateForm = ({ initialData = {}, handleSubmit }) => {
  console.log('### initialData = ' + JSON.stringify(initialData));
  const editor = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    action: 'Save and Publish',
    featureImage: null,
    contentImages: [], // Multiple content images
    url: '',
    categories: '',
    tags: '',
    authorName: 'CodeItronics',
    ...initialData, // Prefill form if initialData is provided
  });
  const [imagePreview, setImagePreview] = useState(
    initialData.featureImage ? `${initialData.featureImage}` : null
  );
  const [contentImageUrls, setContentImageUrls] = useState(
    initialData.contentImages ? initialData.contentImages : []
  ); // URLs of uploaded content images

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...initialData,
    }));
    setImagePreview(initialData.featureImage ? `${initialData.featureImage}` : null);
    setContentImageUrls(initialData.contentImages ? initialData.contentImages : []);
  }, [initialData]);

  // Automatically generate blog URL slug based on title
  useEffect(() => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prevData) => ({ ...prevData, url: slug }));
  }, [formData.title]);

  // Handle input changes for title, description, etc., and image previews
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'featureImage' && files.length) {
      setFormData({ ...formData, featureImage: files[0] });
      setImagePreview(URL.createObjectURL(files[0])); // Set preview URL for feature image
    } else if (name === 'contentImages' && files.length) {
      setFormData({ ...formData, contentImages: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'contentImages') {
        formData.contentImages.forEach((file) => data.append('contentImages', file));
      } else {
        data.append(key, formData[key]);
      }
    });

    const savedData = await handleSubmit(data);

    /*if (savedData.contentImageUrls) {
      setContentImageUrls(savedData.contentImageUrls);
    }*/
  };

  // Jodit editor configuration for image uploading
  const editorConfig = {
    enableDragAndDropFileToEditor: true,
    uploader: {
      url: 'http://localhost:3000/api/blogs/upload', // Image upload endpoint
      insertImageAsBase64URI: false,
      filesVariableName: 'image', // Name the file field as "image" for the backend to handle
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
    events: {
      afterInsertImage: (imgElement) => {
        setFormData((prev) => ({
          ...prev,
          content: `${prev.content}<img src="${imgElement.src}" alt="Embedded content" />`,
        }));
      },
    },
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <form onSubmit={onSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="text-xl text-gray-600">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 w-full"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="text-xl text-gray-600">Description</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2 w-full"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="(Optional)"
                />
              </div>

              {/* Content Editor */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="col-span-3">
                  <label className="text-xl text-gray-600">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <JoditEditor
                    ref={editor}
                    value={formData.content}
                    config={editorConfig}
                    tabIndex={1}
                    onBlur={(newContent) => setFormData({ ...formData, content: newContent })}
                    onChange={() => {}}
                  />
                </div>

                {/* Feature Image, Content Images, URL, Categories, Tags, and Author */}
                <div className="col-span-1 space-y-4">
                  {/* Feature Image */}
                  <div>
                    <label className="text-xl text-gray-600">Feature Image</label>
                    <input
                      type="file"
                      name="featureImage"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 p-2 w-full"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Feature Preview"
                        className="mt-4 w-full h-auto rounded-lg shadow-md"
                      />
                    )}
                  </div>

                  {/* Additional Content Images */}
                  <div>
                    <label className="text-xl text-gray-600">Content Images</label>
                    <input
                      type="file"
                      name="contentImages"
                      accept="image/*"
                      multiple
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 p-2 w-full"
                    />
                  </div>

                  {/* Auto-Generated Blog URL */}
                  <div>
                    <label className="text-xl text-gray-600">Blog URL</label>
                    <input
                      type="text"
                      name="url"
                      value={formData.url}
                      className="border-2 border-gray-300 p-2 w-full"
                      readOnly
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="text-xl text-gray-600">Categories</label>
                    <input
                      type="text"
                      name="categories"
                      value={formData.categories}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 p-2 w-full"
                      placeholder="e.g., Web Development"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="text-xl text-gray-600">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 p-2 w-full"
                      placeholder="e.g., React, MongoDB"
                    />
                  </div>

                  {/* Author */}
                  <div>
                    <label className="text-xl text-gray-600">Author</label>
                    <input
                      type="text"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 p-2 w-full"
                      
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex p-1">
                <select
                  className="border-2 border-gray-300 border-r p-2"
                  name="action"
                  value={formData.action}
                  onChange={handleInputChange}
                >
                  <option>Save and Publish</option>
                  <option>Save Draft</option>
                </select>

                <button
                  type="submit"
                  className="p-3 bg-blue-500 text-white hover:bg-blue-400 ml-4"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Display saved content image URLs for embedding */}
            {contentImageUrls.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Embed Content Images</h3>
                {contentImageUrls.map((url, idx) => (
                  <div key={idx} className="text-sm text-blue-500">
                    <img
                        src={url}
                        alt="Feature Preview"
                        className="mt-4 w-full h-auto rounded-lg shadow-md"
                      />
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCreateForm;
