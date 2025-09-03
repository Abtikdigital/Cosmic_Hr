import { useState, useEffect } from "react";
import Logo from "../assets/Logo/Logo.png";
import BgImage1 from "../assets/Hero/BgImage1.jpg"
import Contact from "../sections/Contact";
import ClientStats from "../sections/ClientStats";
import AboutCompany from "../sections/AboutCompany";
import OurServices from "../sections/OurServices";
import Team from "../sections/Team";
import Testimonial from "../sections/Testimonial";
import Footer from "../sections/Footer";
const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

function Home() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 left-0 w-full bg-white shadow z-50">
        <div className="flex items-center justify-between px-6 md:px-16 py-4">
          {/* Logo */}
          <div>
            <img src={Logo} alt="Logo" className="h-10 md:h-12" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 font-1">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`cursor-pointer font-semibold text-base relative 
                hover:text-[#0303C0] transition-colors duration-300
                ${active === link.id ? "text-[#0303C0]" : "text-gray-800"}
              `}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
                {/* underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[3px] rounded-xl bg-[#0303C0] transition-all duration-300
                  ${active === link.id ? "w-full" : "w-0 group-hover:w-full"}
                `}
                ></span>
              </li>
            ))}
          </ul>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="primary-button px-4 py-2 rounded"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col gap-4 px-6 py-4 bg-white shadow font-1">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`cursor-pointer font-semibold text-base relative 
                hover:text-[#0303C0] transition-colors duration-300
                ${active === link.id ? "text-[#0303C0]" : "text-gray-800"}
              `}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </li>
            ))}
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className="primary-button w-full py-2 rounded"
              >
                Contact Us
              </button>
            </li>
          </ul>
        )}
      </nav>
      {/* Hero section */}
      <section className="p-6 md:p-10 lg:p-16  " id="home">
        <div className="bg-[#E6E6E6] space-y-6   p-16 min-h-[70vh] rounded-xl flex flex-col justify-center"
        
        >
          <h1 className="font-2 text-black heading-1  text-center">
            Build <span className="text-[#0C1DC9]">your landings</span> in
            minutes
          </h1>
          <p className="paragraph-1 text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem,
            similique?
          </p>
          <div className="flex justify-center items-center">
            <button className="primary-button">Contact Us</button>
          </div>
        </div>
      </section>

      {/* Client Stats */}
      <ClientStats />

      {/* About Company  */}
      <AboutCompany />

      {/* Our Services */}
      <OurServices />

      {/* About Section */}
      <Team />
      {/* Testimonial */}
      <Testimonial />

      {/* Contact  */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
