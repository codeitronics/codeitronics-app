// src/pages/HomePage.js
import React from 'react';
import HeroSection from '../../../components/HeroSection';
import AboutSection from '../../../components/AboutSection';
import ServicesSection from '../../../components/ServicesSection';
import NewsletterSection from '../../../components/NewsletterSection';
import BlogSection from '../../../components/BlogSection';



import Layout from '../../../components/public/common/Layout';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BlogSection />

      <NewsletterSection />

    </Layout>
  );
};

export default HomePage;
