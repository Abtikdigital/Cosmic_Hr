import React, { useState } from "react";
import ServicesImage from "../assets/Contact/ContactImage1.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Swal from "sweetalert2";

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
      transition: { duration: 0.8 },
    },
  };

  // Right section with delay
  const rightSectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.8 },
    },
  };

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [loading, setLoading] = useState(false); // 🔹 loader state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader

    try {
      // API call
      const res = await axios.post("/api/contactApi.js", formData);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for contacting us. We will get back to you soon.",
          confirmButtonColor: "#0B1CC8",
        });
        setFormData({ name: "", email: "", number: "", message: "" }); // reset form
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: res.data.message || "Something went wrong. Please try again.",
          confirmButtonColor: "#0B1CC8",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error.response?.data?.message || "Unable to send message right now.",
        confirmButtonColor: "#0B1CC8",
      });
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="p-6 md:p-10 lg:p-16 scroll-mt-[50px]" id="contact">
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
        ref={ref}
      >
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <img
            src={ServicesImage}
            className="rounded-4xl h-full w-full"
            alt="Contact"
          />
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={rightSectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="heading-1 text-[#0B1CC8]">Contact Us</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                required
                className="w-full p-3 px-4 shadow-xl ring-2 rounded-xl ring-gray-300 focus:outline-[#0B1CC8]"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                required
                className="w-full p-3 px-4 shadow-xl ring-2 rounded-xl ring-gray-300 focus:outline-[#0B1CC8]"
              />
            </div>
            <div>
              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Enter Your Number"
                required
                className="w-full p-3 px-4 shadow-xl ring-2 rounded-xl ring-gray-300 focus:outline-[#0B1CC8]"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter Your Message"
                required
                className="w-full p-3 px-4 shadow-xl rounded-xl ring-2 ring-gray-300 focus:outline-[#0B1CC8]"
                rows={3}
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`primary-button flex items-center justify-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}

export default Contact;
