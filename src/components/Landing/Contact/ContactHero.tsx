"use client";
import { useTranslation } from "@/translations/provider";
import React from "react";

const ContactHero = () => {
  const { translations } = useTranslation();

  return (
    <div
      className="pt-32 lg:pt-[170px] lg:pb-[100px] pb-[128px] flex items-center"
      id="home"
    >
      <div className="mycontainer">
        <div className="px-4 flex-col flex items-center justify-center">
          <div className="flex flex-col gap-5 items-center">
            <h2 className="text-white text-[30px] hero-text font-bold lg:text-[60px] lg:leading-[4.2rem]">
              {translations?.contact?.text1}
            </h2>

            <div className="flex items-center gap-2 text-center">
              <p className="text-white">
              {translations?.contact?.text2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
