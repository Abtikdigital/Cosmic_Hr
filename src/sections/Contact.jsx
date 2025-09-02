import React from 'react'
import ServicesImage from "../assets/Services/ServiceImage1.jpg"
function Contact() {
  return (
  <div className="p-6 md:p-10 lg:p-16 scroll-mt-10" id="contact">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <div>
            <img src={ServicesImage} className="rounded-4xl h-full" />
          </div>
          <div className="space-y-6">
            <h2 className="heading-1 text-[#0B1CC8]">Contact Us</h2>
            <form className="space-y-6">
              <div>
                <input
                  placeholder="Enter Your Name"
                  className="w-full p-3  px-4 shadow-xl ring-2 rounded-xl ring-gray-300 focus:outline-[#0B1CC8]"
                />
              </div>
              <div>
                <input
                  placeholder="Enter Your Mail"
                  className="w-full p-3  px-4 shadow-xl ring-2 rounded-xl ring-gray-300 focus:outline-[#0B1CC8]"
                />
              </div>
              <div>
                <input
                  placeholder="Enter Your Number"
                  className="w-full p-3 px-4 shadow-xl ring-2 rounded-xl ring-gray-300 focus:outline-[#0B1CC8]"
                />
              </div>
              <div>
                <textarea
                  placeholder="Enter Your Message"
                  className="w-full p-3  px-4  shadow-xl rounded-xl ring-2 ring-gray-300 focus:outline-[#0B1CC8]"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <button className="primary-button">Submit</button>
              </div>
            </form>
          </div>
        </section>
      </div>
  )
}

export default Contact