// src/components/ServicesSection.js
import React from 'react';
import { FaLaptopCode, FaRobot, FaMobileAlt, FaCloud, FaServer, FaBrain } from 'react-icons/fa';

const ServicesSection = () => {
  const services = [
    {
      name: "Web Development",
      description:
        "Our team creates dynamic, responsive websites that engage users and drive conversions. We utilize modern frameworks to ensure your website is fast, secure, and visually appealing.",
      icon: <FaLaptopCode size={40} className="text-indigo-600 mb-4" />,
    },
    {
      name: "Machine Learning",
      description:
        "Transform your data into actionable insights. Our machine learning solutions help automate processes, predict outcomes, and support smarter decision-making in real-time.",
      icon: <FaBrain size={40} className="text-indigo-600 mb-4" />,
    },
    {
      name: "Mobile App Development",
      description:
        "We develop highly interactive mobile applications that provide an engaging user experience across both iOS and Android platforms, ensuring smooth functionality and design.",
      icon: <FaMobileAlt size={40} className="text-indigo-600 mb-4" />,
    },
    {
      name: "DevOps",
      description:
        "Implement CI/CD pipelines, automated testing, and infrastructure-as-code to streamline your development and deployment processes, maximizing efficiency and uptime.",
      icon: <FaServer size={40} className="text-indigo-600 mb-4" />,
    },
    {
      name: "Cloud Solutions",
      description:
        "Leverage the power of cloud computing with our scalable and cost-effective solutions, from data storage to advanced cloud-native applications that grow with your business.",
      icon: <FaCloud size={40} className="text-indigo-600 mb-4" />,
    },
    {
      name: "Electronics & Robotics",
      description:
        "Our electronics and robotics expertise covers prototyping, automation, and custom robotic solutions tailored to your industrial and commercial needs.",
      icon: <FaRobot size={40} className="text-indigo-600 mb-4" />,
    },
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center">
                {service.icon}
                <h3 className="text-2xl font-semibold mb-4">{service.name}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;