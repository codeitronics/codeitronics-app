// src/components/BlogSection.js
import React from 'react';

const BlogSection = () => {
  const blogs = [
    {
      title: "How Machine Learning is Transforming Industries",
      description:
        "Discover how machine learning is revolutionizing industries, driving efficiency, and enabling data-driven decision-making.",
      date: "October 15, 2024",
      image: "https://source.unsplash.com/random/400x300?technology",
    },
    {
      title: "Top 10 Web Development Trends for 2024",
      description:
        "Stay ahead of the curve with these top web development trends that will shape the industry in the coming year.",
      date: "September 30, 2024",
      image: "https://source.unsplash.com/random/400x300?coding",
    },
    {
      title: "Building Scalable Cloud Solutions",
      description:
        "Learn the essentials of building scalable, cost-effective cloud solutions that grow with your business needs.",
      date: "August 22, 2024",
      image: "https://source.unsplash.com/random/400x300?cloud",
    },
  ];

  return (
    <section id="blog" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <h2 className="text-4xl font-bold mb-8 text-gray-900">Our Latest Blog Posts</h2>
        <p className="text-lg text-gray-600 mb-12">
          Stay updated with the latest insights, trends, and guides in technology, development, and innovation. Explore our recent articles below.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-gray-500">{blog.date}</p>
                <h3 className="text-2xl font-semibold mt-2 text-gray-900">{blog.title}</h3>
                <p className="text-gray-600 mt-4">{blog.description}</p>
                <a
                  href="#"
                  className="text-indigo-600 font-semibold inline-block mt-4 hover:text-indigo-500"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
