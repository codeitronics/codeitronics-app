// src/pages/BlogPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/admin/BlogList';
import axios from 'axios';
import Layout from '../../../components/public/common/Layout';


const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs'); // Fetch blogs from backend
        setBlogs(response.data.blogs); // Assuming { blogs: [...] }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
      <BlogList blogs={blogs} />
      <div className="text-center mt-8">
        <Link to="/create-blog">
          <button className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-400">
            Create New Blog
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default BlogPage;
