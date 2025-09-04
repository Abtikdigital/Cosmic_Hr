import React from "react";

function ClientStats() {
  return (
    <div className="p-6 md:p-10 lg:p-16">
      <section className="bg-[#0509C3] text-white text-center gap-6 p-10 rounded-3xl grid grid-cols-2 lg:grid-cols-4">
        
        {/* Years of Experience */}
        <div className="space-y-3">
          <h2 className="heading-1">2+</h2>
          <h3 className="text-lg font-medium">Years of Experience</h3>
        </div>

        {/* Women Empowered */}
        <div className="space-y-3">
          <h2 className="heading-1">1,000+</h2>
          <h3 className="text-lg font-medium">Women Empowered</h3>
        </div>

        {/* Businesses Served */}
        <div className="space-y-3">
          <h2 className="heading-1">50+</h2>
          <h3 className="text-lg font-medium">Businesses Served</h3>
        </div>

        {/* Client Satisfaction */}
        <div className="space-y-3">
          <h2 className="heading-1">95%</h2>
          <h3 className="text-lg font-medium">Client Satisfaction</h3>
        </div>

      </section>
    </div>
  );
}

export default ClientStats;
