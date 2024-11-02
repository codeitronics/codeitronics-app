// src/components/AboutSection.js
import React from 'react';
import { FaLaptopCode, FaRobot, FaBrain, FaMobileAlt, FaCloud, FaCogs } from 'react-icons/fa';

const AboutSection = () => {
  const values = [
    {
      icon: <FaLaptopCode size={30} className="text-indigo-500" />,
      title: "Innovative Web Development",
      description:
        "Delivering cutting-edge, responsive websites that help your business stand out online. Our web development solutions are fast, scalable, and tailored to meet your unique needs.",
    },
    {
      icon: <FaBrain size={30} className="text-indigo-500" />,
      title: "AI & Machine Learning",
      description:
        "Transforming data into actionable insights with custom AI solutions, enabling smarter decisions and automation that drive efficiency and growth.",
    },
    {
      icon: <FaMobileAlt size={30} className="text-indigo-500" />,
      title: "Mobile App Development",
      description:
        "Creating engaging mobile applications that deliver exceptional user experiences across Android and iOS platforms, ensuring seamless connectivity on the go.",
    },
    {
      icon: <FaCloud size={30} className="text-indigo-500" />,
      title: "Cloud Solutions",
      description:
        "Leveraging cloud technology to enable scalable and secure infrastructure, ensuring your data is accessible and safe from anywhere in the world.",
    },
    {
      icon: <FaRobot size={30} className="text-indigo-500" />,
      title: "Electronics & Robotics",
      description:
        "From prototyping to production, we provide custom electronic and robotic solutions tailored to industrial and commercial applications.",
    },
    {
      icon: <FaCogs size={30} className="text-indigo-500" />,
      title: "DevOps & Automation",
      description:
        "Implementing CI/CD, automation, and infrastructure as code to streamline your development process, ensuring efficient and error-free deployment.",
    },
  ];

  return (
    <section id="about" className="py-16 bg-gray-900">
      <div className="container mx-auto text-center px-4 max-w-5xl">
        <h2 className="text-4xl font-bold text-white mb-8">Who We Are</h2>
        <p className="text-lg text-gray-300 mb-12">
          CodeITronics is dedicated to harnessing the latest technology to transform your ideas into innovative solutions.
          Here’s a glimpse of what we do and the values that drive us:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {values.map((value, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div>{value.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-white">{value.title}</h3>
                <p className="text-gray-400 mt-2">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
