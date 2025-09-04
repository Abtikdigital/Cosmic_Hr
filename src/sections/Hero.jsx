import React from "react";
import BgImage1 from "../assets/Hero/BgImage3.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Hero(props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.8 },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 1.2 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 1.6 },
    },
  };

  return (
    <section className="p-6 md:p-10 lg:p-16 scroll-mt-[50px]" id="home">
      <div
        ref={ref}
        className="min-h-[60vh] md:min-h-[80vh] rounded-xl flex flex-col justify-center items-center relative overflow-hidden"
      >
        {/* Background image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center rounded-xl"
          style={{ backgroundImage: `url(${BgImage1})` }}
          variants={backgroundVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        />

        {/* Card container */}
        <motion.div
          className="relative bg-white/55 backdrop-blur-md p-8 md:p-16 rounded-xl shadow-lg space-y-6 max-w-xs md:max-w-3xl text-center border border-white/40 mx-4"
          variants={cardVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="space-y-6">
            {/* Heading */}
            <motion.h1
              className="font-2 text-black text-3xl md:text-4xl lg:text-5xl font-bold"
              variants={headingVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Empowering <span className="text-[#0C1DC9]">Women,</span>{" "}
              Transforming Workplaces
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              className="text-base md:text-lg text-[#0C1DC9] font-semibold"
              variants={paragraphVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              Tech-enabled HR solutions that blend innovation with inclusion
            </motion.p>

            {/* Button */}
            <motion.div
              className="flex justify-center"
              variants={buttonVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <button
                onClick={props?.openConsultantDialog}
                className="primary-button bg-[#0C1DC9] text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                Contact Us
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;