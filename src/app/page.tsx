'use client'
import Choose from "@/components/Landing/Choose/Choose";
import Counter from "@/components/Landing/Counter/Counter";
import FooterB from "@/components/Landing/Footer/FooterB";
import FooterTop from "@/components/Landing/Footer/FooterTop";
import Hero from "@/components/Landing/Hero/Hero";
import How from "@/components/Landing/How/How";
import Navbar from "@/components/Landing/Navbar/Navbar";
import Plan from "@/components/Landing/Plan/Plan";
import Testimonials from "@/components/Landing/Testimonials/Testimonials";
import Trade from "@/components/Landing/Trade/Trade";

export default function Home() {
  return (
    <div>
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url(/bg4.jpg)" }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80 z-0"></div>

        {/* Content Wrapper */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>
      </div>
      <Counter />
      <Trade />
      <Plan />
      <Choose />
      <How />
      <Testimonials />
      <FooterTop />
      <FooterB />
    </div>
  );
}
