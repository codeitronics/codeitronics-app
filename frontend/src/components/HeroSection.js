// src/components/HeroSection.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import background1 from '../assets/back1.jpg';
import background2 from '../assets/back2.jpg';
import background3 from '../assets/back3.jpg';

const HeroSection = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    const slideWidth = slider.clientWidth;

    const moveSlide = () => {
      if (slider.scrollLeft >= maxScrollLeft) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
      }
    };

    const interval = setInterval(moveSlide, 3000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div ref={sliderRef} className="h-screen w-full overflow-hidden flex flex-nowrap text-center" id="slider">
      {/* Slide 1 */}
      <div
        style={{
          backgroundImage: `url(${background1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="text-gray-900 space-y-6 flex-none w-full flex flex-col items-center justify-center p-6"
      >
        <h2 className="text-5xl max-w-2xl font-bold">Innovate with Confidence</h2>
        <p className="max-w-2xl text-lg font-medium">
          At CodeITronics, we empower you to bring your boldest ideas to life with tailored technology solutions.
          From consultation to execution, our end-to-end services are designed to help you stay ahead of the curve
          and achieve meaningful results.
        </p>
        <div className="flex gap-4">
          <Link
            to="/services"
            className="bg-indigo-600 text-white rounded-md px-4 py-2 text-lg font-semibold hover:bg-indigo-500"
          >
            Explore Services
          </Link>
          <Link
            to="/blog"
            className="bg-gray-800 text-white rounded-md px-4 py-2 text-lg font-semibold hover:bg-gray-700"
          >
            Visit Blog
          </Link>
        </div>
      </div>

      {/* Slide 2 */}
      <div
        style={{
          backgroundImage: `url(${background2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="text-gray-900 space-y-6 flex-none w-full flex flex-col items-center justify-center p-6"
      >
        <h2 className="text-5xl max-w-2xl font-bold">Flexible & Reliable Solutions</h2>
        <p className="max-w-2xl text-lg font-medium">
          Whether it's a robust web application, a dynamic mobile solution, or a custom machine learning model,
          our team provides flexible, scalable services that adapt to your business’s evolving needs.
        </p>
        <div className="flex gap-4">
          <Link
            to="/services"
            className="bg-indigo-600 text-white rounded-md px-4 py-2 text-lg font-semibold hover:bg-indigo-500"
          >
            Explore Services
          </Link>
          <Link
            to="/blog"
            className="bg-gray-800 text-white rounded-md px-4 py-2 text-lg font-semibold hover:bg-gray-700"
          >
            Visit Blog
          </Link>
        </div>
      </div>

      {/* Slide 3 */}
     {/* <div
        style={{
          backgroundImage: `url(${background3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="text-gray-900 space-y-6 flex-none w-full flex flex-col items-center justify-center p-6"
      >
        <h2 className="text-5xl max-w-2xl font-bold">Empowering Your Digital Journey</h2>
        <p className="max-w-2xl text-lg font-medium">
          With a focus on high-performance, accessible design, we empower you to grow and scale your digital
          footprint. Our experts are here to guide you through each stage of your digital transformation journey.
        </p>
        <div className="flex gap-4">
          <Link
            to="/services"
            className="bg-indigo-600 text-white rounded-md px-4 py-2 text-lg font-semibold hover:bg-indigo-500"
          >
            Explore Services
          </Link>
          <Link
            to="/blog"
            className="bg-gray-800 text-white rounded-md px-4 py-2 text-lg font-semibold hover:bg-gray-700"
          >
            Visit Blog
          </Link>
        </div>
      </div>*/}
    </div>
  );
};

export default HeroSection;
