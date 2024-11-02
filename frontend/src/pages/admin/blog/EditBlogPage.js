// src/pages/admin/EditBlogPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from '../../../components/admin/blog/BlogForm';
import { getBlogById, updateBlogPost } from '../../../services/blogService';
import AdminLayout from '../../../components/admin/AdminLayout';

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);
        setInitialData(blog);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await updateBlogPost(id, updatedData);
      alert('Blog updated successfully!');
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Failed to update blog:', error);
      alert('Failed to update blog.');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-4xl text-center font-bold mb-8">Edit Blog</h1>
      {initialData ? (
        <BlogForm initialData={initialData} onSubmit={handleSubmit} isEdit={true} />
      ) : (
        <p className="text-center text-gray-500">Loading blog details...</p>
      )}
    </AdminLayout>
  );
};

export default EditBlogPage;
