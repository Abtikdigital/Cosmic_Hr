import React, { useState } from "react";
import Image1 from "../assets/blog/Image1.png";
import Image2 from "../assets/blog/Image2.png";
import Image3 from "../assets/blog/Image3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Blog = () => {
  const blogs = [
    {
      heading: "Web Development Trends 2025",
      img: Image1,
      description: "Discover the latest web development technologies shaping 2025.",
      details: [
        {
          subHeading: "Frontend",
          description: "Modern frontend frameworks are evolving rapidly.",
          points: ["React 19", "Vue 4", "Svelte 5"],
        },
        {
          subHeading: "Backend",
          description: "Serverless and edge computing are gaining traction.",
          points: ["Node.js 22", "Deno 3", "Bun"],
        },
      ],
    },
    {
      heading: "Digital Marketing Strategies",
      img: Image2,
      description: "Effective strategies to boost your online business.",
      details: [
        {
          subHeading: "SEO",
          description: "Search Engine Optimization remains critical.",
          points: ["AI-driven SEO", "Core Web Vitals", "Voice Search"],
        },
        {
          subHeading: "Social Media",
          description: "Platforms are shifting towards short-form content.",
          points: ["Instagram Reels", "TikTok Ads", "YouTube Shorts"],
        },
      ],
    },
    {
      heading: "Digital Marketing Strategies",
      img: Image3,
      description: "Effective strategies to boost your online business.",
      details: [
        {
          subHeading: "SEO",
          description: "Search Engine Optimization remains critical.",
          points: ["AI-driven SEO", "Core Web Vitals", "Voice Search"],
        },
        {
          subHeading: "Social Media",
          description: "Platforms are shifting towards short-form content.",
          points: ["Instagram Reels", "TikTok Ads", "YouTube Shorts"],
        },
      ],
    },
  ];

  const [selectedBlog, setSelectedBlog] = useState(null);

  // Intersection Observer for animation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger each child by 0.3 seconds
      },
    },
  };

  // Child variants for fade-in from bottom
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="p-6 md:p-12 bg-gray-50 dark:bg-[#0f0f0f] scroll-mt-[50px]" id="blog" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
      >
        Our Blogs
      </motion.h2>

      {/* Blog Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-[#1a1a1a] rounded-xl space-y-3 transition cursor-pointer"
            onClick={() => setSelectedBlog(blog)}
            variants={cardVariants}
          >
            <img
              src={blog.img}
              alt={blog.heading}
              className="rounded-4xl hover:-translate-y-1 transition-all duration-200"
            />
            <h3 className="text-xl font-semibold mb-2">{blog.heading}</h3>
            <p className="text-gray-700 dark:text-gray-300">{blog.description}</p>
            <button onClick={() => setSelectedBlog(blog)} className="primary-button">
              Read More
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Blog Details Dialog */}
      {selectedBlog && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-[#1a1a1a] shadow-lg flex flex-col w-full h-full rounded-none md:rounded-2xl md:max-w-5xl md:h-[90vh]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Sticky Rounded Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-[#1a1a1a] z-10 rounded-t-2xl shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold">{selectedBlog.heading}</h2>
              <button
                className="p-1.5 bg-[#0302C1] cursor-pointer text-white rounded-lg shadow-md transition"
                onClick={() => setSelectedBlog(null)}
              >
                <FontAwesomeIcon icon={faX} fontSize={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto">
              <motion.img
                src={selectedBlog.img}
                alt={selectedBlog.heading}
                className="rounded-2xl w-full mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.p
                className="text-gray-700 dark:text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {selectedBlog.description}
              </motion.p>

              {selectedBlog.details.map((section, i) => (
                <motion.div
                  key={i}
                  className="mb-6 space-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                >
                  <h3 className="text-xl md:text-2xl font-semibold">{section.subHeading}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{section.description}</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                    {section.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Blog;