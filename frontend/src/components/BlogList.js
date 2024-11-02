// src/components/BlogList.js
import React, { useEffect, useState } from 'react';
import BlogListLayout from './BlogListLayout';
import { fetchAllBlogs } from '../services/blogService';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <BlogListLayout blogs={blogs} />;
};

export default BlogList;
