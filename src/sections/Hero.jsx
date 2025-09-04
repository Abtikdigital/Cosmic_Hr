import React from "react";
import BgImage1 from 

function Hero(props) {
  return (
    <section className="p-6 md:p-10 lg:p-16 scroll-mt-[50px]" id="home">
      <div className="bg-[#E6E6E6] space-y-6 p-8 md:p-16 min-h-[70vh] rounded-xl flex flex-col justify-center items-center">
        <h1 className="font-2 text-black text-3xl md:text-4xl lg:text-5xl font-bold text-center ">
          Empowering <span className="text-[#0C1DC9]">Women,</span> Transforming
          Workplaces
        </h1>
        <p className="text-base md:text-lg text-gray-600 text-center max-w-2xl">
          Tech-enabled HR solutions that blend innovation with inclusion
        </p>
        <div className="flex justify-center items-center">
          <button onClick={props?.openConsultantDialog} className="primary-button">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
