import React from "react";
import { useTranslation } from "@/translations/provider";

const Choose = () => {
  const { translations } = useTranslation();

  return (
    <div className="bg-primary pt-[110px] pr-0 pb-[50px]">
      <div className="mycontainer">
        <div className="px-4 flex flex-col gap-10">
          {/* Section Title */}
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-white font-bold text-[25px] leading-[40px] lg:text-[46px] lg:leading-[54px]">
              {translations?.choose?.title}
            </h2>
            <p className="text-white text-center w-auto lg:w-[480px] my-0 mx-auto">
              {translations?.choose?.description}
            </p>
          </div>

          {/* Features One */}
          <div className="flex flex-col lg:flex-row items-center gap-5">
            {translations?.choose?.featuresOne?.map((feature: any, index: any) => (
              <div
                key={index}
                className="py-[30px] px-[20px] flex-1 bg-[#161150] rounded-[8px] flex flex-col gap-[20px]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md w-[40px] h-[40px]">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    {feature.title}
                  </h4>
                </div>
                <div>
                  <p className="text-[#ddd] text-[16px] leading-[26px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Features Two */}
          <div className="flex flex-col lg:flex-row items-center gap-5">
            {translations?.choose?.featuresTwo?.map((feature: any, index: any) => (
              <div
                key={index}
                className="py-[30px] px-[20px] flex-1 bg-[#161150] rounded-[8px] flex flex-col gap-[20px]"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md w-[40px] h-[40px]">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    {feature.title}
                  </h4>
                </div>
                <div>
                  <p className="text-[#ddd] text-[16px] leading-[26px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
