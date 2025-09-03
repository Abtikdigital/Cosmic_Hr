import React from "react";
import Logo from "../assets/Logo/Logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocation,
  faLocationPin,
  faLocationPinLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
function Footer() {
  return (
    <footer className="flex flex-col md:flex-row p-16 bg-[#0B1CC8] ">
      <section className="">
        <div className="space-y-6">
          <img src={Logo} className="w-20 h-20" />
          <div className="flex gap-3">
            <input
              className="w-56 bg-white p-2.5 rounded-xl"
              placeholder="Enter Your Mail"
            />
            <button
              className="bg-white font-semibold
 text-base text-[#0B1CC8]  py-2.5  transition-all duration-300 cursor-pointer px-6 rounded-xl shadow-2xl"
            >
              Submit
            </button>
          </div>
        </div>
      </section>
      <section className="flex-1 flex flex-col  items-center space-y-3">
        <h2 className="text-[#757575] heading-3 font-1">Company</h2>
        <ul className="space-y-2">
          <Link
            className="block w-fit  text-white font-1  relative group"
            to={"/"}
          >
            Home
            <div className="absolute w-0 transition-all bg-white rounded-xl duration-300 h-1 group-hover:w-full"></div>
          </Link>
          <Link
            className="block w-fit text-white  font-1 relative group"
            to={"/"}
          >
            About
            <div className="absolute w-0 transition-all bg-white rounded-xl duration-300 h-1 group-hover:w-full"></div>
          </Link>
          <Link
            className="block w-fit text-white font-1  relative group"
            to={"/"}
          >
            Contact
            <div className="absolute w-0 transition-all bg-white rounded-xl duration-300 h-1 group-hover:w-full"></div>
          </Link>
          <Link
            className="block w-fit text-white  font-1 relative group"
            to={"/"}
          >
            Services
            <div className="absolute w-0 transition-all bg-white rounded-xl duration-300 h-1 group-hover:w-full"></div>
          </Link>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-[#757575] heading-3 font-1 text-center">Contact</h2>
        <ul className="space-y-2">
          <a className="font-1 block text-white   group relative space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faPhone} className="" />
            +91 92 456 789 00
            <div className="absolute w-0  transition-all rounded-xl duration-300 group-hover:w-full bg-white h-1 "></div>
          </a>
          <a className="font-1 text-white block  group relative space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faEnvelope} className="" />
            info@hrsolutions.com
            <div className="absolute w-0 transition-all  duration-300 group-hover:w-full bg-white h-1 "></div>
          </a>
          <a className="font-1 text-white block  group relative space-x-2 cursor-pointer">
            <FontAwesomeIcon icon={faLocationPin} className="" />
            info@hrsolutions.com
            <div className="absolute w-0 transition-all  duration-300 group-hover:w-full bg-white h-1 "></div>
          </a>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
