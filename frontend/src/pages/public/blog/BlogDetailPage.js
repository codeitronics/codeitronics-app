// src/pages/BlogDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import BlogDetail from '../../../components/BlogDetail';
import Layout from '../../../components/public/common/Layout';

const BlogDetailPage = () => {
  const { urlSlug } = useParams();

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 bg-gray-100">
        <BlogDetail urlSlug={urlSlug} />
      </div>
    </Layout>
  );
};

export default BlogDetailPage;
