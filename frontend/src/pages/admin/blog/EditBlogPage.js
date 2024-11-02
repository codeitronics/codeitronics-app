// src/pages/admin/EditBlogPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogEditForm from '../../../components/admin/blog/BlogEditForm';
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
        // Prepopulate image URLs if present
        const formattedData = {
          ...blog,
          featureImage: blog.featureImage ? `${blog.featureImage}` : null,
          contentImages: blog.contentImages || []
        };
        setInitialData(formattedData);
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
      navigate(`/admin/edit-blog/${id}`);
    } catch (error) {
      console.error('Failed to update blog:', error);
      alert('Failed to update blog.');
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl text-center font-bold mb-8">Edit Blog</h1>
        {initialData ? (
          <BlogEditForm initialData={initialData} handleSubmit={handleSubmit} />
        ) : (
          <p className="text-center text-gray-500">Loading blog details...</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default EditBlogPage;
