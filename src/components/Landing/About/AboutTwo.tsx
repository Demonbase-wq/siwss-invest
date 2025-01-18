'use client'
import { useTranslation } from '@/translations/provider';
import React from "react";

const AboutTwo = () => {
  const { translations } = useTranslation();
  return (
    <div className="bg-primary pt-10  pb-[28px] flex items-center" id="home">
      <div className="mycontainer">
        <div className="px-4 flex items-center justify-center">
          <div className=" lg:w-[60%] flex flex-col gap-4 lg:items-center">
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-[30px] hero-text font-bold lg:text-[40px] lg:leading-[4.2rem] lg:text-center">
              {translations?.aboutTwo?.text1}
              </h2>
              <p className="text-white lg:text-center lg:px-5 lg:text-[0.95rem] font-medium">
              {translations?.aboutTwo?.text2}
              </p>
            </div>

            <div className="lg:flex-row flex flex-col gap-3 lg:gap-10">
              <div className="flex flex-col gap-2">
                <p className="text-white lg:text-[0.95rem] font-medium">
                {translations?.aboutTwo?.text3}
                </p>
                <p className="text-gray-400 title-span text-[20px] lg:text-[40px] font-bold">
                  7,240,019
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-white lg:text-[0.95rem] font-medium">
                {translations?.aboutTwo?.text4}
                </p>
                <p className="title-span text-green-500 text-[20px] lg:text-[40px] font-bold">
                  300%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTwo;
