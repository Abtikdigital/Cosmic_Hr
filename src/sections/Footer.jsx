import React from "react";
import Logo from "../assets/Logo/Logo.png";
function Footer() {
  return (
    <footer className="flex p-16 bg-[#0B1CC8]">
      <section>
        <div>
          <img src={Logo} className="w-20 h-20" />
        </div>
        
      </section>
      <section></section>

      <section></section>
    </footer>
  );
}

export default Footer;
