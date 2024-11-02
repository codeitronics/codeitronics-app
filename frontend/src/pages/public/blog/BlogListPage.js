// src/pages/BlogListPage.js
import React from 'react';
import BlogList from '../../../components/BlogList';
import Layout from '../../../components/public/common/Layout';

const BlogListPage = () => {
  return (
    <Layout>
      <div className="overflow-x-hidden bg-gray-100">
        <BlogList />
      </div>
    </Layout>
  );
};

export default BlogListPage;
