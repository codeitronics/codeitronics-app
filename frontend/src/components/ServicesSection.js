import React, { useContext } from 'react';
import { FaLaptopCode, FaRobot, FaMobileAlt, FaCloud, FaServer, FaBrain } from 'react-icons/fa';
import { ThemeContext } from '../ThemeContext';

const ServicesSection = () => {
  const { theme } = useContext(ThemeContext);

  const services = [
    {
      name: "Web Development",
      description:
        "Our team creates dynamic, responsive websites that engage users and drive conversions. We utilize modern frameworks to ensure your website is fast, secure, and visually appealing.",
      icon: <FaLaptopCode size={40} className="mb-4" />,
    },
    {
      name: "Machine Learning",
      description:
        "Transform your data into actionable insights. Our machine learning solutions help automate processes, predict outcomes, and support smarter decision-making in real-time.",
      icon: <FaBrain size={40} className="mb-4" />,
    },
    {
      name: "Mobile App Development",
      description:
        "We develop highly interactive mobile applications that provide an engaging user experience across both iOS and Android platforms, ensuring smooth functionality and design.",
      icon: <FaMobileAlt size={40} className="mb-4" />,
    },
    {
      name: "DevOps",
      description:
        "Implement CI/CD pipelines, automated testing, and infrastructure-as-code to streamline your development and deployment processes, maximizing efficiency and uptime.",
      icon: <FaServer size={40} className="mb-4" />,
    },
    {
      name: "Cloud Solutions",
      description:
        "Leverage the power of cloud computing with our scalable and cost-effective solutions, from data storage to advanced cloud-native applications that grow with your business.",
      icon: <FaCloud size={40} className="mb-4" />,
    },
    {
      name: "Electronics & Robotics",
      description:
        "Our electronics and robotics expertise covers prototyping, automation, and custom robotic solutions tailored to your industrial and commercial needs.",
      icon: <FaRobot size={40} className="mb-4" />,
    },
    {
      name: "Salesforce Development",
      description:
        "Optimize your customer relationships and streamline your sales processes with our tailored Salesforce development solutions, designed to help your business grow.",
      icon: <FaLaptopCode size={40} className="mb-4" />,
    },
    {
      name: "Data Analytics",
      description:
        "Unlock the power of data to drive business insights. Our analytics services help you visualize data patterns, understand market trends, and make data-driven decisions.",
      icon: <FaBrain size={40} className="mb-4" />, // or choose a different icon if available
    },
    {
      name: "Cybersecurity",
      description:
        "Protect your digital assets with our comprehensive cybersecurity solutions, offering vulnerability assessments, secure network architecture, and proactive threat monitoring.",
      icon: <FaServer size={40} className="mb-4" />, // or choose a different icon if available
    },
  ];
  

  const sectionBgClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800';
  const cardBgClass = theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-600';
  const iconColorClass = theme === 'dark' ? 'text-yellow-400' : 'text-indigo-600';

  return (
    <section id="services" className={`py-16 ${sectionBgClass}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={`${cardBgClass} p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}>
              <div className="flex flex-col items-center">
                <div className={iconColorClass}>{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{service.name}</h3>
                <p className="text-center">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
