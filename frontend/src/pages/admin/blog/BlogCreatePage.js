// src/pages/BlogCreatePage.js
import React from 'react';
import BlogForm from '../../../components/admin/blog/BlogForm';
import { createBlogPost } from '../../../services/blogService';
import AdminLayout from '../../../components/admin/AdminLayout';

const BlogCreatePage = () => {
  const handleSubmit = async (formData) => {
    try {
      await createBlogPost(formData);
      alert('Blog saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save blog.');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-4xl text-center font-bold mb-8">Create a New Blog</h1>
      <BlogForm onSubmit={handleSubmit} isEdit={false} />
    </AdminLayout>
  );
};

export default BlogCreatePage;
