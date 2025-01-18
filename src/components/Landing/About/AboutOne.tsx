'use client'
import { useTranslation } from '@/translations/provider';
import React from "react";
import Counter from "./Counter";

const AboutOne = () => {
   const { translations } = useTranslation();

  return (
    <div
      className="pt-10 lg:pt-[40px] lg:pb-[100px] pb-[28px] flex items-center"
      id="home"
    >
      <div className="mycontainer">
        <div className="px-4 flex-col gap-14 lg:gap-10 flex items-center lg:flex-row-reverse justify-center">
          <div className="lg:flex-1 flex flex-col gap-14">
            <div className="flex flex-col gap-5 lg:items-start">
              <p className="text-accent font-semibold text-[17px] sm:text-[20px] lg:text-[24px]">
              {translations?.aboutOne?.text1}
              </p>
              <h2 className="text-primary text-[30px] hero-text font-bold lg:text-[50px] lg:leading-[4.2rem]">
              {translations?.aboutOne?.text2}
              </h2>
              <p className="text-primary lg:text-left lg:text-[0.95rem] leading-7 font-medium">
              {translations?.aboutOne?.text3}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-[1]">
                  <img src="/counter1.png" alt="" />
                </div>

                <div className="flex sm:flex-[3] flex-[2] lg:flex-[2] flex-col gap-1">
                  <Counter end={45} suffix="k" />

                  <h4 className="text-primary font-medium">{translations?.aboutOne?.text4}</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-[1]">
                  <img src="/counter2.png" alt="" />
                </div>

                <div className="flex sm:flex-[3] flex-[2] lg:flex-[2] flex-col gap-1">
                  <Counter end={90} suffix="+" />

                  <h4 className="text-primary font-medium">{translations?.aboutOne?.text5}</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-[1]">
                  <img src="/counter3.png" alt="" />
                </div>

                <div className="flex sm:flex-[3] flex-[2] lg:flex-[2] flex-col gap-1">
                  <Counter end={95} suffix="%" />

                  <h4 className="text-primary font-medium">{translations?.aboutOne?.text6}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex  lg:flex-1">
            <img src="/about.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOne;
