import React, { useEffect, useState } from 'react';
import { getBlogBySlug } from '../services/blogService';
import BlogDetailLayout from './BlogDetailLayout';

const BlogDetail = ({ urlSlug }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogBySlug(urlSlug);
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      }
    };
    fetchBlog();
  }, [urlSlug]);

  if (loading) return <div>Loading...</div>;

  return <BlogDetailLayout blog={blog} />;
};

export default BlogDetail;
