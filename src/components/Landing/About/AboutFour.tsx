'use client'
import { useTranslation } from '@/translations/provider';
import React from "react";

const AboutFour = () => {
  const { translations } = useTranslation();
  return (
    <div
      className="pt-10 lg:pt-[40px] lg:pb-[100px] pb-[28px] flex items-center"
      id="home"
    >
      <div className="mycontainer">
        <div className="px-4 flex-col gap-7 lg:gap-0 lg:flex-row flex lg:items-center">
          <div className="lg:flex-1 flex flex-col gap-5 lg:items-start">
            <p className="text-accent font-semibold text-[16px] sm:text-[20px] lg:text-[24px]">
            {translations?.aboutThree?.text1}
            </p>
            <h2 className="text-primary text-[30px] hero-text font-bold lg:text-[50px] lg:leading-[4.2rem]">
            {translations?.aboutThree?.text2}
            </h2>
            <p className="text-primary lg:text-left lg:text-[0.95rem] font-medium">
            {translations?.aboutThree?.text3}
            </p>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center lg:justify-end gap-1">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ffc103"
                    className=" w-[20px]"
                  >
                    <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ffc103"
                    className=" w-[20px]"
                  >
                    <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ffc103"
                    className=" w-[20px]"
                  >
                    <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ffc103"
                    className=" w-[20px]"
                  >
                    <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ffc103"
                    className=" w-[20px]"
                  >
                    <path d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z"></path>
                  </svg>
                </div>
                <p className="font-bold text-primary">4.9/5.0</p>
              </div>

              <div className="flex items-center lg:justify-end">
                <p className="amount lg:text-[54px] text-accent text-[24px] font-bold">
                  312,921+
                </p>
              </div>

              <div className="flex items-center lg:justify-end">
                <p className="font-medium text-primary">{translations?.aboutThree?.text4}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFour;
