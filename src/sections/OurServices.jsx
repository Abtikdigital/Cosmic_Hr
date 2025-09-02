import React, { useState, useEffect } from "react";

const crewMembers = [
  {
    name: "Alex Carter",
    role: "CEO",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Sofia Lee",
    role: "Design Lead",
    img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Ryan Mitchell",
    role: "Full Stack Developer",
    img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Chloe Morgan",
    role: "Marketing Head",
    img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=900&auto=format&fit=crop&q=60",
  },
  {
    name: "Daniel Smith",
    role: "Project Manager",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?fm=jpg&q=60&w=900",
  },
  {
    name: "Mia Johnson",
    role: "Content Strategist",
    img: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-4.0.3&q=80&w=900&fit=crop",
  },
];

function OurServices() {
  const [crewIndex, setCrewIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const updateCrewCarousel = (newIndex) => {
    if (animating) return;
    setAnimating(true);
    const total = crewMembers.length;
    const normalizedIndex = (newIndex + total) % total;
    setCrewIndex(normalizedIndex);
    setTimeout(() => setAnimating(false), 600);
  };

  // 🔹 Auto-rotate (continuous, not restarting every index change)
  useEffect(() => {
    const interval = setInterval(() => {
      setCrewIndex((prev) => (prev + 1) % crewMembers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") updateCrewCarousel(crewIndex - 1);
      if (e.key === "ArrowRight") updateCrewCarousel(crewIndex + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [crewIndex]);

  // 🔹 Touch support
  const handleTouchStart = (e) => setTouchStart(e.changedTouches[0].screenX);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].screenX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) updateCrewCarousel(crewIndex + 1);
      else updateCrewCarousel(crewIndex - 1);
    }
  };

  return (
    <section
      className="px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16 text-center space-y-6"
      id="services"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Solution: <span className="text-[#0B1CC8]">HR Services</span>
      </h2>
      <p className="text-base sm:text-lg max-w-2xl mx-auto">
        The night is dark and full of terrors. What is dead may never die. And
        now his watch is ended. All men must die.
      </p>

      {/* Carousel */}
      <div className="w-full max-w-5xl h-[320px] sm:h-[380px] md:h-[420px] relative mx-auto overflow-hidden">
        {/* Left Button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-5 bg-[#0509C3]/70  flex justify-center  text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xl sm:text-2xl hover:bg-[#0509C3] cursor-pointer z-20"
          onClick={() => updateCrewCarousel(crewIndex - 1)}
        >
          ‹
        </button>

        {/* Slides */}
        <div
          className="w-full h-full flex items-center justify-center relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {crewMembers.map((member, i) => {
            const offset = (i - crewIndex + crewMembers.length) % crewMembers.length;

            let className =
              "absolute w-[160px] sm:w-[200px] md:w-[240px] h-[240px] sm:h-[300px] md:h-[340px] rounded-xl overflow-hidden bg-white shadow-xl transition-all duration-700 ease-in-out";

            if (offset === 0) {
              className += " z-20 scale-110";
            } else if (offset === 1) {
              className +=
                " translate-x-[130px] sm:translate-x-[160px] md:translate-x-[200px] scale-90 opacity-80";
            } else if (offset === 2) {
              className +=
                " translate-x-[250px] sm:translate-x-[320px] md:translate-x-[400px] scale-75 opacity-50";
            } else if (offset === crewMembers.length - 1) {
              className +=
                " -translate-x-[130px] sm:-translate-x-[160px] md:-translate-x-[200px] scale-90 opacity-80";
            } else if (offset === crewMembers.length - 2) {
              className +=
                " -translate-x-[250px] sm:-translate-x-[320px] md:-translate-x-[400px] scale-75 opacity-50";
            } else {
              className += " opacity-0 pointer-events-none";
            }

            return (
              <div
                key={i}
                className={className}
                onClick={() => updateCrewCarousel(i)}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Right Button */}
        <button
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-5 bg-[#0509C3]/70 cursor-pointer flex justify-center text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full text-xl sm:text-2xl hover:bg-[#0509C3] z-20"
          onClick={() => updateCrewCarousel(crewIndex + 1)}
        >
          ›
        </button>
      </div>

      {/* Info */}
      <div className="mt-6 md:mt-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-[#0509C3] font-bold">
          {crewMembers[crewIndex].name}
        </h2>
        <p className="text-sm sm:text-base md:text-lg uppercase text-[#0509C3] tracking-wider">
          {crewMembers[crewIndex].role}
        </p>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {crewMembers.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
              i === crewIndex ? "bg-[#0509C3]" : "bg-[#0509C3]/20"
            }`}
            onClick={() => updateCrewCarousel(i)}
          />
        ))}
      </div>
    </section>
  );
}

export default OurServices;
