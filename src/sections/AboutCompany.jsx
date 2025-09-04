import React from "react";
import AboutImage from "../assets/Company/AboutCompany.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AboutCompany() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Container variants for staggering children
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Individual fade animations
  const fadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="p-6 md:p-10 lg:p-16 scroll-mt-[50px] overflow-hidden" id="about">
      <motion.section
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        variants={container}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Text Section */}
        <motion.div className="space-y-8">
          <motion.h2 className="heading-1" variants={fadeLeft}>
            About <span className="text-[#0509C3]">Cosmic HR Solutions</span>
          </motion.h2>

          <motion.p className="paragraph-1" variants={fadeUp}>
            At Cosmic HR Solutions Private Limited, we are redefining HR
            practices with a tech-enabled, socially inclusive approach. Our
            mission is to empower women, especially matured and responsible
            housewives, by creating safer workplaces and offering them
            opportunities for financial independence.
          </motion.p>

          <motion.p className="paragraph-1" variants={fadeUp}>
            We stand apart by blending technology with human touch, delivering HR
            excellence that is ethical, inclusive, and scalable.
          </motion.p>

          <motion.div variants={fadeUp}>
            <button className="primary-button">Contact Us</button>
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div className="overflow-hidden" variants={fadeRight}>
          <img
            src={AboutImage}
            alt="About Company"
            className="rounded-4xl shadow-lg w-full h-auto"
          />
        </motion.div>
      </motion.section>
    </div>
  );
}

export default AboutCompany;
