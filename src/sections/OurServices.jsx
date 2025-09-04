import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const services = [
  {
    name: "End-to-End HR Services",
    description: "Streamlined HR for recruitment, payroll, and compliance.",
    highlight: "Saves time, boosts business growth.",
    img: "https://images.unsplash.com/photo-1516321310765-79e5e2055a17?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "HRMS Software (SaaS)",
    description: "Cloud-based platform for payroll and performance tracking.",
    highlight: "Flexible subscription plans.",
    img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Workforce Empowerment",
    description: "Employs women for inclusive, stable workplaces.",
    highlight: "Bridges India’s gender gap.",
    img: "https://images.unsplash.com/photo-1573164574511-73c773193279?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Learning & Development",
    description: "Training for skills and employee engagement.",
    highlight: "Enhances workforce productivity.",
    img: "https://images.unsplash.com/photo-1516321165247-7d868bd47e26?w=900&auto=format&fit=crop&q=60",
  },
];

function OurServices() {
  const [serviceIndex, setServiceIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const updateServiceCarousel = (newIndex) => {
    if (animating) return;
    setAnimating(true);
    const total = services.length;
    const normalizedIndex = (newIndex + total) % total;
    setServiceIndex(normalizedIndex);
    setTimeout(() => setAnimating(false), 600);
  };

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") updateServiceCarousel(serviceIndex - 1);
      if (e.key === "ArrowRight") updateServiceCarousel(serviceIndex + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [serviceIndex]);

  // Touch support
  const handleTouchStart = (e) => setTouchStart(e.changedTouches[0].screenX);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].screenX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) updateServiceCarousel(serviceIndex + 1);
      else updateServiceCarousel(serviceIndex - 1);
    }
  };

  return (
    <section
      ref={ref}
      className="px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16 text-center space-y-6 scroll-mt-[50px]"
      id="services"
    >
      {/* Heading + Subtext */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold"
      >
        Solution: <span className="text-[#0B1CC8]">HR Services</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-base sm:text-lg max-w-2xl mx-auto"
      >
        Empowering businesses with innovative HR solutions.
      </motion.p>

      {/* Carousel */}
      <div className="w-full max-w-7xl h-[450px] relative mx-auto overflow-hidden">
        {/* Left Button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-5 bg-[#0509C3]/70 flex justify-center text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xl sm:text-2xl hover:bg-[#0509C3] cursor-pointer z-20"
          onClick={() => updateServiceCarousel(serviceIndex - 1)}
        >
          ‹
        </button>

        {/* Slides */}
        <div
          className="w-full h-full flex items-center justify-center relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {services.map((service, i) => {
            const offset =
              (i - serviceIndex + services.length) % services.length;

            let className =
              "absolute w-[280px] sm:w-[340px] md:w-[400px] h-[400px] rounded-xl overflow-hidden bg-white shadow-xl transition-all duration-700 ease-in-out flex flex-col";

            if (offset === 0) {
              className += " z-20 scale-110";
            } else if (offset === 1) {
              className +=
                " translate-x-[300px] sm:translate-x-[360px] md:translate-x-[420px] scale-90 opacity-80";
            } else if (offset === services.length - 1) {
              className +=
                " -translate-x-[300px] sm:-translate-x-[360px] md:-translate-x-[420px] scale-90 opacity-80";
            } else {
              className += " opacity-0 pointer-events-none";
            }

            return (
              <motion.div
                key={i}
                className={className}
                onClick={() => updateServiceCarousel(i)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-[55%] object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0509C3] mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3">
                    {service.description}
                  </p>
                  <ul className="text-sm sm:text-base text-[#0509C3] list-disc list-inside">
                    <li>{service.highlight}</li>
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-5 bg-[#0509C3]/70 cursor-pointer flex justify-center text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xl sm:text-2xl hover:bg-[#0509C3] z-20"
          onClick={() => updateServiceCarousel(serviceIndex + 1)}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <motion.div
        className="flex justify-center gap-2 mt-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {services.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
              i === serviceIndex ? "bg-[#0509C3]" : "bg-[#0509C3]/20"
            }`}
            onClick={() => updateServiceCarousel(i)}
          />
        ))}
      </motion.div>
    </section>
  );
}

export default OurServices;
