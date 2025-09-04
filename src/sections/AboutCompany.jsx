import React from "react";
import AboutImage from "../assets/Company/AboutCompany.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function AboutCompany() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Variants
  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
  };

  return (
    <div className="p-6 md:p-10 lg:p-16 scroll-mt-[50px]" id="about">
      <section
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
      >
        {/* Text Section */}
        <div className="space-y-10">
          <motion.h2
            className="heading-1"
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            About <span className="text-[#0509C3]">Cosmic HR Solutions</span>
          </motion.h2>

          <motion.p
            className="paragraph-1"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            At Cosmic HR Solutions Private Limited, we are redefining HR
            practices with a tech-enabled, socially inclusive approach. Our
            mission is to empower women, especially matured and responsible
            housewives, by creating safer workplaces and offering them
            opportunities for financial independence.
          </motion.p>

          <motion.p
            className="paragraph-1"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            We stand apart by blending technology with human touch, delivering HR
            excellence that is ethical, inclusive, and scalable.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
          >
            <button className="primary-button">Contact Us</button>
          </motion.div>
        </div>

        {/* Image Section */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <img src={AboutImage} alt="About Company" className="rounded-4xl shadow-lg" />
        </motion.div>
      </section>
    </div>
  );
}

export default AboutCompany;
