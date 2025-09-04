import React from 'react';
import ServicesImage from "../assets/Services/ServiceImage1.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Contact() {
  // Intersection Observer for animation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Variants for fade-in animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
      }
    },
  };

  // Add delay for right section
  const rightSectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        delay: 0.8, // Delay right section by 0.3 seconds after left
      }
    },
  };

  return (
    <div className="p-6 md:p-10 lg:p-16 scroll-mt-[50px]" id="contact">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={ref}>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <img src={ServicesImage} className="rounded-4xl h-full" alt="Contact" />
        </motion.div>
        <motion.div
          className="space-y-6"
          variants={rightSectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="heading-1 text-[#0B1CC8]">
            Contact Us
          </h2>
          <form className="space-y-6">
            <div>
              <input
                placeholder="Enter Your Name"
                className="w-full p-3 px-4 shadow-xl ring-2 rounded-xl ring-gray-300 focus:outline-[#0B1CC8]"
              />
            </div>
            <div>
              <input
                placeholder="Enter Your Mail"
                className="w-full p-3 px-4 shadow-xl ring-2 rounded-xl ring-gray-300 focus:outline-[#0B1CC8]"
              />
            </div>
            <div>
              <input
                placeholder="Enter Your Number"
                className="w-full p-3 px-4 shadow-xl ring-2 rounded-xl ring-gray-300 focus:outline-[#0B1CC8]"
              />
            </div>
            <div>
              <textarea
                placeholder="Enter Your Message"
                className="w-full p-3 px-4 shadow-xl rounded-xl ring-2 ring-gray-300 focus:outline-[#0B1CC8]"
                rows={3}
              ></textarea>
            </div>
            <div>
              <button className="primary-button">Submit</button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

export default Contact;