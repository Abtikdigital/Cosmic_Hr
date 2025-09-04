import React from "react";
import Logo from "../assets/Logo/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0B1CC8] text-white px-6 py-12 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        {/* Left Section - Logo & Newsletter */}
        <section className="space-y-6">
          <img src={Logo} alt="Logo" className="w-20 h-20" />
          <p className="text-sm text-gray-200 max-w-xs">
            Stay updated with our latest news and offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              className="w-full sm:w-56 bg-white p-2.5 rounded-xl text-black focus:outline-none"
              placeholder="Enter your email"
            />
            <button className="bg-white font-semibold text-base text-[#0B1CC8] py-2.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              Submit
            </button>
          </div>
        </section>

        {/* Middle Section - Company Links (scroll instead of routing) */}
        <section className="flex flex-col items-start md:items-center space-y-4">
          <h2 className="text-gray-300 text-lg font-semibold">Company</h2>
          <ul className="space-y-2">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "services", label: "Services" },
              { id: "blogs", label: "Blogs" },

              { id: "contact", label: "Contact" },
            ].map((link, i) => (
              <li
                key={i}
                onClick={() => scrollToSection(link.id)}
                className="cursor-pointer text-white hover:text-gray-200"
              >
                <span className="relative inline-block group">
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Right Section - Contact */}
        <section className="space-y-4">
          <h2 className="text-gray-300 text-lg font-semibold">Contact</h2>
          <ul className="space-y-3">
            <li>
              <a
                href="tel:+91 70219 97296
"
                className="flex items-center gap-3 text-white hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faPhone} />
                <span className="relative inline-block group">
                  +91 70219 97296
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="mailto:Colaboratehr33@gmail.com"
                className="flex items-center gap-3 text-white hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <span className="relative inline-block group">
                  Colaboratehr33@gmail.com
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </li>
            <li>
              <div className="flex items-center gap-3 text-white hover:text-gray-200 cursor-pointer">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="relative inline-block group">
                Flat B/904, Plot-69, Concept Unnathi, Sector 21, Kharghar, Panvel, Maharashtra, India - 41021
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </div>
            </li>
          </ul>
        </section>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 pt-6 border-t border-gray-500 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} HR Solutions. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
