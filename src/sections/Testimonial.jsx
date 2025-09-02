import { faArrowLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect } from "react";

function Testimonial() {
  const testimonials = [
    {
      message: "lorem ipsum lorem ipsum",
      name: "Lorem Ipsum",
    },
    {
      message: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
      name: "John Doe",
    },
    {
      message: "Clients love working with us, great experience!",
      name: "Jane Doe",
    },
    {
      message: "Highly recommend this company!",
      name: "Alex Carter",
    },
  ];

  const containerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  // Go to specific slide
  const goToSlide = (index) => {
    if (!containerRef.current) return;
    setCurrent(index);
    containerRef.current.scrollTo({
      left: index * containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  // Next slide
  const nextSlide = () => {
    const newIndex = (current + 1) % testimonials.length;
    goToSlide(newIndex);
  };

  // Prev slide
  const prevSlide = () => {
    const newIndex =
      current === 0 ? testimonials.length - 1 : current - 1;
    goToSlide(newIndex);
  };

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  });

  return (
    <section className="text-center space-y-6 px-4 md:px-16 py-10">
      <h2 className="heading-1">
        Client Review <span className="text-[#0B1CC8]">Testimonials</span>
      </h2>

      {/* Slider container */}
      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {testimonials.map((data, index) => (
            <div
              key={index}
              className="min-w-full md:min-w-[50%] p-4 snap-center"
            >
              <div className="bg-[#0B1CC8] p-6 md:p-10 flex rounded-xl gap-6 items-start shadow-lg h-full">
                {/* Avatar initials */}
                <div className="flex-shrink-0">
                  <div className="bg-gray-400 text-white h-12 w-12 flex justify-center items-center rounded-full font-bold">
                    {data?.name
                      ?.split(" ")
                      ?.map((n) => n.charAt(0).toUpperCase())
                      .join("")}
                  </div>
                </div>
                {/* Text */}
                <div className="text-left">
                  <p className="paragraph-1 text-white font-1 font-medium mb-4">
                    {data?.message}
                  </p>
                  <h2 className="text-[#f0f0f0] font-bold font-1 tracking-[2px]">
                    {data?.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -left-2 -translate-y-1/2 bg-white/80 w-10 h-10  text-[#0B1CC8] rounded-full p-2 shadow-md"
        >
          <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 -right-2 -translate-y-1/2 bg-white/80 w-10 h-10 text-[#0B1CC8] rounded-full p-2 shadow-md"
        >
       <FontAwesomeIcon icon={faChevronRight}/>
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              current === index ? "bg-[#0B1CC8]" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </section>
  );
}

export default Testimonial;
