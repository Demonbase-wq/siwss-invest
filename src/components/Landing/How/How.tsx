import { useTranslation } from "@/translations/provider";
import React from "react";

const How = () => {
    const { translations } = useTranslation();
  
  return (
    <div className="bg-[#04062E] text-gray-300 pt-[110px] pr-0 pb-[50px]" id="about">
      <div className="mycontainer">
        <div className="px-4 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-white font-bold text-[25px] leading-[40px] lg:text-[46px] lg:leading-[54px]">
              {translations?.how?.textOne}
            </h2>

            <p className="text-center w-auto lg:w-[480px] my-0 mx-auto">
            {translations?.how?.textTwo}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex flex-1 items-center gap-2 justify-center flex-col text-center z-[1] overflow-hidden transition-all duration-400 p-10 px-7 rounded-lg bg-[#150550]">
              <div className="relative">
                <span className="w-10 h-10 leading-[40px] text-white text-[16px] rounded-full absolute left-[-10px] top-[-10px] bg-[#FC0077]">
                  01
                </span>
                <a href="#">
                  <img src="/h1.png" alt="" className="rounded-full" />
                </a>
              </div>
              <div>
                <h4 className="inline-block text-[24px] mb-0 py-2.5 font-semibold">
                {translations?.how?.textThree}
                </h4>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2 justify-center flex-col text-center z-[1] overflow-hidden transition-all duration-400 p-10 px-7 rounded-lg bg-[#150550]">
              <div className="relative">
                <span className="w-10 h-10 leading-[40px] text-white text-[16px] rounded-full absolute left-[-10px] top-[-10px] bg-[#FC0077]">
                  02
                </span>
                <a href="#">
                  <img src="/h2.png" alt="" className="rounded-full" />
                </a>
              </div>
              <div>
                <h4 className="inline-block text-[24px] mb-0 py-2.5 font-semibold">
                {translations?.how?.textFour}
                </h4>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-2 justify-center flex-col text-center z-[1] overflow-hidden transition-all duration-400 p-10 px-7 rounded-lg bg-[#150550]">
              <div className="relative">
                <span className="w-10 h-10 leading-[40px] text-white text-[16px] rounded-full absolute left-[-10px] top-[-10px] bg-[#FC0077]">
                  03
                </span>
                <a href="#">
                  <img src="/h3.png" alt="" className="rounded-full" />
                </a>
              </div>
              <div>
                <h4 className="inline-block text-[24px] mb-0 py-2.5 font-semibold">
                {translations?.how?.textFive}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default How;
