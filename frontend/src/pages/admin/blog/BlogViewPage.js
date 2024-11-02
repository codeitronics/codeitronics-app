// src/pages/admin/blog/BlogViewPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogViewForm from '../../../components/admin/blog/BlogViewForm';
import { getBlogById } from '../../../services/blogService';  // Assumes a service to fetch blog data
import AdminLayout from '../../../components/admin/AdminLayout';

const BlogViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);  // Replace with the actual API call
        setBlogData(blog);
      } catch (err) {
        setError('Failed to load blog post.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blog Details</h1>
        <button
          onClick={() => navigate(`/admin/blog/edit/${id}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Edit Blog
        </button>
      </div>
      {blogData && <BlogViewForm blogData={blogData} />}
    </AdminLayout>
  );
};

export default BlogViewPage;
