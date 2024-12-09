import React from "react";
import CountUp from "react-countup";

const Counter = () => {
  return (
    <div className="bg-primary pt-[110px] pr-0 pb-[50px]">
      <div className="mycontainer">
        <div className="px-4 flex flex-col lg:flex-row gap-8">
          <div className="flex gap-5 py-[30px] px-[15px] flex-1 bg-[#161150] rounded-[8px]">
            <div className="bg-accent w-[30%] rounded-md flex items-center justify-center">
              <img src="/stars.svg" alt="" className="w-[40px]" />
            </div>

            <div className="w-[70%]">
              <h2 className="text-white font-bold text-[40px] lg:text-[42px] leading-[46px]">
                <CountUp end={22382} start={0} suffix="+" />
              </h2>
              <h4 className="text-white font-medium text-[22px] lg:text-[24px] leading-[32px]">
                All Members
              </h4>
            </div>
          </div>
          <div className="flex gap-5 py-[30px] px-[15px] flex-1 bg-[#161150] rounded-[8px]">
            <div className="bg-accent w-[30%] rounded-md flex items-center justify-center">
              <img src="/investment.svg" alt="" className="w-[40px]" />
            </div>

            <div className="w-[70%]">
              <h2 className="text-white font-bold text-[40px] lg:text-[42px] leading-[46px]">
                <CountUp end={500} start={0} suffix="k" prefix="$" />
              </h2>
              <h4 className="text-white font-medium text-[22px] lg:text-[24px] leading-[32px]">
                Total Deposits
              </h4>
            </div>
          </div>
          <div className="flex gap-5 py-[30px] px-[15px] flex-1 bg-[#161150] rounded-[8px]">
            <div className="bg-accent w-[30%] rounded-md flex items-center justify-center">
              <img src="/global.svg" alt="" className="w-[40px]" />
            </div>

            <div className="w-[70%]">
              <h2 className="text-white font-bold text-[40px] lg:text-[42px] leading-[46px]">
                <CountUp end={80} start={0} suffix="+" />
              </h2>
              <h4 className="text-white font-medium text-[22px] lg:text-[24px] leading-[32px]">
                All Members
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
