import React from "react";
import ServicesImage from "../assets/Services/ServiceImage1.jpg";
function Team() {
  return (
    <section className="p-6 md:p-10 lg:p-16 text-center space-y-6">
      <h2 className="heading-1 ">
        Solution: <span className="text-[#0B1CC8]">HR Platforms</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <img src={ServicesImage} className="rounded-4xl" />
          <h2 className="text-[#0B1CC8] font-semibold font-1 text-lg">Name</h2>
          <h3 className="text-[#757575] font-1 font-bold text-base">TITLE</h3>
        </div>
        <div className="space-y-2">
          <img src={ServicesImage} className="rounded-4xl" />
          <h2 className="text-[#0B1CC8] font-semibold font-1 text-lg">Name</h2>
          <h3 className="text-[#757575] font-1 font-bold text-base">TITLE</h3>
        </div>
        <div className="space-y-2">
          <img src={ServicesImage} className="rounded-4xl" />
          <h2 className="text-[#0B1CC8] font-semibold font-1 text-lg">Name</h2>
          <h3 className="text-[#757575] font-1 font-bold text-base">TITLE</h3>
        </div>
        <div className="space-y-2">
          <img src={ServicesImage} className="rounded-4xl" />
          <h2 className="text-[#0B1CC8] font-semibold font-1 text-lg">Name</h2>
          <h3 className="text-[#757575] font-1 font-bold text-base">TITLE</h3>
        </div>
      </div>
    </section>
  );
}

export default Team;
