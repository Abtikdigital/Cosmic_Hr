import React from 'react'
import AboutImage from "../assets/Company/AboutCompany.jpg"
function AboutCompany() {
  return (
     <div className="p-6 md:p-10 lg:p-16 scroll-mt-[50px]" id="about">
           <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-10">
               <h2 className="heading-1">
                 Build your{" "}
                 <span className="text-[#0509C3]">About US minutes</span>{" "}
               </h2>
               <p className="paragraph-1">
                 The night is dark and full of terrors. What is dead may never die.
                 And now his watch is ended. All men must die.
               </p>
               <div>
                 <button className="primary-button">Contact Us</button>
               </div>
             </div>
             <div>
               <img src={AboutImage} className="rounded-4xl" />
             </div>
           </section>
         </div>
  )
}

export default AboutCompany