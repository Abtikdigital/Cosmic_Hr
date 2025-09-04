import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function ClientStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Variants for zig-zag fade-in
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.6 } },
  };

  return (
    <div className="p-6 md:p-10 lg:p-16">
      <section
        ref={ref}
        className="bg-[#0509C3] text-white text-center gap-6 p-10 rounded-3xl grid grid-cols-2 lg:grid-cols-4"
      >
        {/* Years of Experience */}
        <motion.div
          className="space-y-3"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="heading-1">2+</h2>
          <h3 className="text-lg font-medium">Years of Experience</h3>
        </motion.div>

        {/* Women Empowered */}
        <motion.div
          className="space-y-3"
          variants={fadeDown}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="heading-1">1,000+</h2>
          <h3 className="text-lg font-medium">Women Empowered</h3>
        </motion.div>

        {/* Businesses Served */}
        <motion.div
          className="space-y-3"
          variants={fadeLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="heading-1">50+</h2>
          <h3 className="text-lg font-medium">Businesses Served</h3>
        </motion.div>

        {/* Client Satisfaction */}
        <motion.div
          className="space-y-3"
          variants={fadeRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="heading-1">95%</h2>
          <h3 className="text-lg font-medium">Client Satisfaction</h3>
        </motion.div>
      </section>
    </div>
  );
}

export default ClientStats;
