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
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div id="home"
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
      <Link href='#home'>
        <button className="bg-primary fixed bottom-4 right-4 h-[30px] w-[30px] flex items-center justify-center rounded-[5px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg>
        </button>
      </Link>
    </div>
  );
}
