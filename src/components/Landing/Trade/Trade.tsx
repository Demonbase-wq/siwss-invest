import React from "react";
import { useTranslation } from "@/translations/provider";

const Trade = () => {
  const { translations } = useTranslation();

  return (
    <div className="bg-primary pt-[110px] pr-0 pb-[50px]">
      <div className="mycontainer">
        <div className="px-4 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-white font-bold text-[25px] leading-[40px] lg:text-[46px] lg:leading-[54px]">
              {translations?.trade?.title || "Invest with Confidence!"}
            </h2>
            <p className="text-white text-center w-auto lg:w-[480px] my-0 mx-auto">
              {translations?.trade?.description ||
                "With SwissPipsAI, your investments are managed with precision, offering secure and transparent growth opportunities. Harness the power of our cutting-edge AI to achieve the ROI you deserve."}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <img src="/ab.jpg" alt="" />
            </div>

            <div className="flex-1 flex flex-col gap-6 w-full">
              <div className="flex items-center gap-5 py-[30px] px-[10px] flex-1 bg-[#161150] rounded-[8px]">
                <div className="w-[20%] rounded-full">
                  <img
                    src="/ab-icon1.png"
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>

                <div className="w-[70%] flex flex-col gap-2">
                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    {translations?.trade?.features?.instant_cashout?.title ||
                      "Instant Cashout"}
                  </h4>
                  <p className="text-white text-[16px] leading-[26px]">
                    {translations?.trade?.features?.instant_cashout?.description ||
                      "Access your profits anytime with 24/7 instant withdrawals."}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 py-[30px] px-[10px] flex-1 bg-[#161150] rounded-[8px]">
                <div className="w-[20%] rounded-full">
                  <img
                    src="/ab-icon3.png"
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>

                <div className="w-[70%] flex flex-col gap-2">
                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    {translations?.trade?.features?.live_support?.title ||
                      "24/7 Live Support"}
                  </h4>
                  <p className="text-white text-[16px] leading-[26px]">
                    {translations?.trade?.features?.live_support?.description ||
                      "Our expert team is here to assist you at every step."}
                  </p>
                </div>
              </div>
              <div className="flex gap-5 py-[30px] items-center px-[10px] flex-1 bg-[#161150] rounded-[8px]">
                <div className="w-[20%] rounded-full">
                  <img
                    src="/ab-icon4.png"
                    alt=""
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>

                <div className="w-[70%] flex flex-col gap-2">
                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    {translations?.trade?.features?.top_security?.title ||
                      "Top-Notch Security"}
                  </h4>
                  <p className="text-white text-[16px] leading-[26px]">
                    {translations?.trade?.features?.top_security?.description ||
                      "Rest assured, your investments are safeguarded with the best-in-class security measures."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
