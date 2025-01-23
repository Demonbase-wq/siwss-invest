import React from "react";
import { useTranslation } from "@/translations/provider";

const Plan = () => {
  const { translations } = useTranslation();

  return (
    <div className="bg-[#04062E] pt-[110px] pr-0 pb-[50px]" id="investment">
      <div className="mycontainer">
        <div className="px-4 flex flex-col gap-10">
          <div className="">
            <h2 className="text-center text-white font-bold text-[25px] leading-[40px] lg:text-[46px] lg:leading-[54px]">
              {translations?.plan?.title || "Investment Plan"}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-6 lg:items-center">
            {/* Silver Plan */}
            <div className="flex flex-1 py-[40px] px-[30px] flex-col gap-[15px] justify-center items-center custom group relative shadow-lg p-10 overflow-hidden border border-[#150550] bg-[#150550] mb-7 rounded-md z-[1]">
              <h3 className="text-white text-[28px] lg:text-[32px] leading-[40px] font-bold">
                {translations?.plan?.silver_plan?.title || "Silver Plan"}
              </h3>
              <ol className="list-none m-0 p-0 text-center text-gray-300">
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.silver_plan?.details?.minimum_investment ||
                    "Minimum investment: $500"}
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.silver_plan?.details?.maximum_investment ||
                    "Maximum investment: $1,900"}
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.silver_plan?.details?.roi || "Roi: 40%"}
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.silver_plan?.details?.duration ||
                    "Duration: 6 weeks"}
                </li>
              </ol>
              <a
                href=""
                className="text-white uppercase transition-all duration-300 ease-in-out rounded-sm font-extrabold text-[14px] py-2 px-5 bg-[#FC0077] inline-block border hover:bg-transparent border-[#FC0077]"
              >
                {translations?.plan?.silver_plan?.cta || "Start Investing"}
              </a>
            </div>

            {/* Gold Plan */}
            <div className="flex flex-1 py-[40px] px-[30px] flex-col gap-[15px] justify-center items-center custom group relative shadow-lg p-10 overflow-hidden border border-[#150550] bg-[#150550] mb-7 rounded-md z-[1]">
              <h3 className="text-white text-[28px] lg:text-[32px] leading-[40px] font-bold">
                {translations?.plan?.gold_plan?.title || "Gold Plan"}
              </h3>
              <ol className="list-none m-0 p-0 text-center text-gray-300">
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.gold_plan?.details?.minimum_investment ||
                    "Minimum investment: $1,900"}
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.gold_plan?.details?.maximum_investment ||
                    "Maximum investment: $25,000"}
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.gold_plan?.details?.roi || "Roi: 40%"}
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.gold_plan?.details?.duration ||
                    "Duration: 6 weeks"}
                </li>
              </ol>
              <a
                href=""
                className="text-white uppercase transition-all duration-300 ease-in-out rounded-sm font-extrabold text-[14px] py-2 px-5 bg-[#FC0077] inline-block border hover:bg-transparent border-[#FC0077]"
              >
                {translations?.plan?.gold_plan?.cta || "Start Investing"}
              </a>
            </div>

            {/* Platinum Plan */}
            <div className="flex flex-1 py-[40px] px-[30px] flex-col gap-[15px] justify-center items-center custom group relative shadow-lg p-10 overflow-hidden border border-[#150550] bg-[#150550] mb-7 rounded-md z-[1]">
              <h3 className="text-white text-[28px] lg:text-[32px] leading-[40px] font-bold">
                {translations?.plan?.platinum_plan?.title || "Platinum Plan"}
              </h3>
              <ol className="list-none m-0 p-0 text-center text-gray-300">
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.platinum_plan?.details?.minimum_investment ||
                    "Minimum investment: $25,000"}
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.platinum_plan?.details?.maximum_investment ||
                    "Maximum investment: ∞"}
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.platinum_plan?.details?.roi || "Roi: 55%"}
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  {translations?.plan?.platinum_plan?.details?.duration ||
                    "Duration: 4 weeks"}
                </li>
              </ol>
              <a
                href=""
                className="text-white uppercase transition-all duration-300 ease-in-out rounded-sm font-extrabold text-[14px] py-2 px-5 bg-[#FC0077] inline-block border hover:bg-transparent border-[#FC0077]"
              >
                {translations?.plan?.platinum_plan?.cta || "Start Investing"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
