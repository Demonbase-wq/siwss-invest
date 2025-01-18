/* eslint-disable @next/next/no-img-element */
import { useTranslation } from "@/translations/provider";
import React from "react";

const Hero = () => {
  const { translations } = useTranslation();

  return (
    <div
      className="pt-32 lg:pt-[170px] lg:pb-[170px] pb-[128px] flex items-center z-20"
      id="home"
    >
      <div className="mycontainer">
        <div className="px-4 flex-col gap-14 lg:gap-6 lg:flex-row flex items-center justify-center text-center lg:text-left">
          <div className="lg:flex-1 flex flex-col gap-5 items-center lg:items-start">
            <p className="text-white font-semibold text-[15px] lg:text-[20px]">
              {translations?.hero?.subtitle || "Experience Reliable Investments with AI Precision"}
            </p>
            <h2 className="text-white text-[20px] hero-text font-bold lg:text-[40px]">
              {translations?.hero?.title || "SwissPipsAI: Your Trusted Partner in Smart Investments"}
            </h2>
            <a href="/login">
              <button className="py-[13px] px-[25px] text-center transition-all duration-300 ease-in-out rounded-[5px] bg-[#ec3f77] hover:bg-transparent border-[2px] border-[#ec3f77] text-white ">
                {translations?.hero?.cta || "Join SwissPipsAI Today."}
              </button>
            </a>
          </div>
          <div className="hidden lg:block  lg:flex-1">
            <img src="/hero-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
