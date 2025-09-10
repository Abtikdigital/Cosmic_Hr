import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ServicesImage from "../assets/Services/ServiceImage1.jpg";

const teamMembers = [
  {
    name: "Sumitra Parida",
    title: "Authorized Director & Founder",
    img: ServicesImage,
  },
  {
    name: "Swayamsiddhi",
    title: "Director",
    img: ServicesImage,
  },
];

function Team() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      className="p-6 md:p-10 lg:p-16 text-center space-y-6"
      id="team"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="heading-1"
      >
        Solution: <span className="text-[#0B1CC8]">HR Platforms</span>
      </motion.h2>

      {/* Team Members */}
      <div className="flex gap-6 flex-col md:flex-row md:gap-10 items-center justify-center">
        {teamMembers.map((member, i) => (
          <motion.div
            key={i}
            className="space-y-2"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <img
              src={member.img}
              className="rounded-4xl max-h-72"
              alt={member.name}
            />
            <h2 className="text-[#0B1CC8] font-semibold font-1 text-lg">
              {member.name}
            </h2>
            <h3 className="text-[#757575] font-1 font-bold text-base">
              {member.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Team;
