import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Logo from "../assets/Logo/Logo.png";

import Contact from "../sections/Contact";
import ClientStats from "../sections/ClientStats";
import AboutCompany from "../sections/AboutCompany";
import OurServices from "../sections/OurServices";
import Team from "../sections/Team";
import Testimonial from "../sections/Testimonial";
import Footer from "../sections/Footer";
import Blog from "../sections/Blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faUpload, faBars } from "@fortawesome/free-solid-svg-icons";
import Hero from "../sections/Hero";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "blog", label: "Blogs" },

  { id: "contact", label: "Contact" },
];

function Home() {
  const [isConsultantOpen, setIsConsultantOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    experience: "",
    location: "",
    employmentStatus: "",
    salary: "",
    notes: "",
  });
  const [resumeFile, setResumeFile] = useState(null);

  // Track scroll to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + 150; // offset
      sections.forEach((section, index) => {
        if (
          section &&
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          setActive(navLinks[index].id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActive(id);
      setMenuOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (resumeFile) {
      data.append("resume", resumeFile);
    }

    try {
      const response = await axios.post(
        "/api/jobApplicationApi.js",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your consultation request has been submitted successfully.",
          confirmButtonColor: "#1E3A8A",
        });
        setIsConsultantOpen(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          jobTitle: "",
          experience: "",
          location: "",
          employmentStatus: "",
          salary: "",
          notes: "",
        });
        setResumeFile(null);
      }
    } catch (error) {
      const status = error.response?.status;
      let message = "An error occurred. Please try again.";
      if (status === 400) {
        message = "Invalid data provided. Please check your inputs.";
      } else if (status === 413) {
        message = "File size too large. Please upload a smaller file.";
      } else if (status === 500) {
        message = "Server error. Please try again later.";
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        confirmButtonColor: "#1E3A8A",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openConsultantDialog = () => {
    setIsConsultantOpen(true);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 left-0 w-full bg-white shadow z-50">
        <div className="flex items-center justify-between px-6 md:px-16 py-4">
          <div>
            <img src={Logo} alt="Logo" className="h-10 md:h-12" />
          </div>
          <ul className="hidden md:flex gap-8 font-1">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`cursor-pointer font-semibold text-base relative hover:text-[#0303C0] transition-colors duration-300
                  ${active === link.id ? "text-[#0303C0]" : "text-gray-800"}
                `}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[3px] rounded-4xl bg-[#0303C0] transition-all duration-300
                    ${active === link.id ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                ></span>
              </li>
            ))}
          </ul>
          <div className="hidden md:block">
            <button onClick={openConsultantDialog} className="primary-button">
              Consultant Now
            </button>
          </div>
          <button
            className="md:hidden text-2xl text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-200 absolute top-full left-0 w-full z-50">
            <ul className="flex flex-col items-center gap-4 py-4 font-1">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`cursor-pointer font-semibold text-base relative hover:text-[#0303C0] transition-colors duration-300
                    ${active === link.id ? "text-[#0303C0]" : "text-gray-800"}
                  `}
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-[3px] rounded-xl bg-[#0303C0] transition-all duration-300
                      ${
                        active === link.id ? "w-full" : "w-0 group-hover:w-full"
                      }
                    `}
                  ></span>
                </li>
              ))}
              <li className="w-full px-6">
                <button
                  onClick={openConsultantDialog}
                  className="primary-button"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero section */}
     <Hero openConsultantDialog={openConsultantDialog}/>

      <ClientStats />
      <AboutCompany />
      <OurServices />
      <Team />
      {/* <Testimonial /> */}
      <Blog />
      <Contact />
      <Footer />

      {isConsultantOpen && (
        <div className="fixed z-[9999999] inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4">
          <section className="bg-white rounded-xl md:rounded-2xl w-full max-w-[600px] relative shadow-2xl border border-blue-200 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-blue-100">
              <h2 className="text-2xl font-bold text-[#1E3A8A]">
                Job Consultation Form
              </h2>
              <button
                onClick={() => setIsConsultantOpen(false)}
                className="p-2.5 rounded-lg bg-[#0302C1] text-white hover:bg-[#3FC0F6] transition-colors duration-300"
              >
                <FontAwesomeIcon fontSize={18} icon={faX} />
              </button>
            </div>

            {/* Form */}
            <form
              className="flex-1 overflow-y-auto p-6"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <input
                    name="fullName"
                    type="text"
                    className="w-full h-12 rounded-lg px-4 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    name="email"
                    type="email"
                    className="w-full h-12 rounded-lg px-4 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full h-12 rounded-lg px-4 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Job Title */}
                <div>
                  <input
                    name="jobTitle"
                    type="text"
                    className="w-full h-12 rounded-lg px-4 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300"
                    placeholder="Job Title / Expertise"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Experience */}
                <div className="relative">
                  <select
                    name="experience"
                    className="appearance-none w-full h-12 rounded-lg px-4 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-300"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Years of Experience
                    </option>
                    <option value="0-1">0 - 1 year</option>
                    <option value="2-4">2 - 4 years</option>
                    <option value="5-7">5 - 7 years</option>
                    <option value="8+">8+ years</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <input
                    name="location"
                    type="text"
                    className="w-full h-12 rounded-lg px-4 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300"
                    placeholder="Preferred Job Location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Employment Status */}
                <div className="relative">
                  <select
                    name="employmentStatus"
                    className="appearance-none w-full h-12 rounded-lg px-4 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-300"
                    value={formData.employmentStatus}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Current Employment Status
                    </option>
                    <option value="employed">Employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="student">Student</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Salary */}
                <div className="relative">
                  <select
                    name="salary"
                    className="appearance-none w-full h-12 rounded-lg px-4 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 transition-all duration-300"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>
                      Expected Salary (INR)
                    </option>
                    <option value="200000-400000">₹2,00,000 - ₹4,00,000</option>
                    <option value="400000-600000">₹4,00,000 - ₹6,00,000</option>
                    <option value="600000-1000000">
                      ₹6,00,000 - ₹10,00,000
                    </option>
                    <option value="1000000+">₹10,00,000+</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block w-full">
                    <div className="relative w-full h-12 rounded-lg bg-blue-50 border border-blue-200 hover:border-blue-300 focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-transparent transition-all duration-300 cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex items-center justify-between h-full px-4">
                        <span
                          className={`text-sm ${
                            resumeFile ? "text-gray-800" : "text-gray-500"
                          }`}
                        >
                          {resumeFile
                            ? resumeFile.name
                            : "Upload Resume (PDF, DOC, DOCX)"}
                        </span>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faUpload}
                            className="text-blue-500"
                          />
                          <span className="text-xs bg-[#0302C1] text-white px-2 py-1 rounded">
                            Browse
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Notes */}
                <div>
                  <textarea
                    name="notes"
                    className="w-full rounded-lg px-4 py-3 bg-blue-50 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 resize-none"
                    placeholder="Additional Notes / Message"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-lg bg-[#1E3A8A] text-white font-semibold hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default Home;
