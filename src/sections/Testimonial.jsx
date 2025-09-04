import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Testimonial() {
  const testimonials = [
    { message: "lorem ipsum lorem ipsum", name: "Lorem Ipsum" },
    { message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum", name: "John Doe" },
    { message: "Clients love working with us, great experience!", name: "Jane Doe" },
    { message: "Highly recommend this company!", name: "Alex Carter" },
  ];

  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // Determine slides per view based on screen width
  useEffect(() => {
    const updateSlides = () => {
      setSlidesPerView(window.innerWidth >= 768 ? 2 : 1); // md breakpoint
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const totalPages = Math.ceil(testimonials.length / slidesPerView);

  const goToSlide = (index) => {
    if (!containerRef.current) return;
    setCurrent(index);
    containerRef.current.scrollTo({
      left: index * containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    const newIndex = (current + 1) % totalPages;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = current === 0 ? totalPages - 1 : current - 1;
    goToSlide(newIndex);
  };

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  });

  return (
    <section ref={ref} className="text-center space-y-6 px-4 md:px-16 py-10" id="testimonials">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="heading-1"
      >
        Client Review <span className="text-[#0B1CC8]">Testimonials</span>
      </motion.h2>

      {/* Slider container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative overflow-hidden"
      >
        <div ref={containerRef} className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar">
          {testimonials.map((data, index) => (
            <motion.div
              key={index}
              className={`min-w-full md:min-w-[50%] p-4 snap-center`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="bg-[#0B1CC8] p-6 md:p-10 flex rounded-xl gap-6 md:gap-10 items-start shadow-lg h-full">
                <div className="flex-shrink-0">
                  <div className="bg-gray-400 text-white h-12 w-12 flex justify-center items-center rounded-full font-bold">
                    {data?.name?.split(" ")?.map((n) => n.charAt(0).toUpperCase()).join("")}
                  </div>
                </div>
                <div className="text-left">
                  <p className="paragraph-1 text-white font-1 font-medium mb-4">{data?.message}</p>
                  <h2 className="text-[#f0f0f0] font-bold font-1 tracking-[2px]">{data?.name}</h2>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-2 -translate-y-1/2 bg-white/80 w-10 h-10 text-[#0B1CC8] rounded-full p-2 shadow-md"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-2 -translate-y-1/2 bg-white/80 w-10 h-10 text-[#0B1CC8] rounded-full p-2 shadow-md"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </motion.div>

      {/* Dots */}
      <motion.div
        className="flex justify-center gap-2 mt-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer ${current === index ? "bg-[#0B1CC8]" : "bg-gray-300"}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </motion.div>
    </section>
  );
}

export default Testimonial;
