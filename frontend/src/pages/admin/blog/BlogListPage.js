// src/pages/admin/BlogListPage.js
import React, { useEffect, useState } from 'react';
import { fetchAllBlogs, deleteBlogPost } from '../../../services/blogService';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/AdminLayout';
import BlogList from '../../../components/admin/blog/BlogList';

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlogPost(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blogs</h1>
        <button
          onClick={() => navigate('/admin/blog/create')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create New Blog
        </button>
      </div>
      {/* Render the BlogList component with edit and delete handlers */}
      <BlogList blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />
    </AdminLayout>
  );
};

export default BlogListPage;
