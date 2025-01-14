import React from "react";

const Plan = () => {
  return (
    <div className="bg-[#04062E] pt-[110px] pr-0 pb-[50px]" id="investment">
      <div className="mycontainer">
        <div className="px-4 flex flex-col gap-10">
          <div className="">
            <h2 className="text-center text-white font-bold text-[25px] leading-[40px] lg:text-[46px] lg:leading-[54px]">
              Investment Plan
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-6 lg:items-center">
            <div className="flex flex-1 py-[40px] px-[30px] flex-col gap-[15px] justify-center items-center custom group relative shadow-lg p-10 overflow-hidden border border-[#150550] bg-[#150550] mb-7 rounded-md z-[1]">
              <h3 className="text-white text-[28px] lg:text-[32px] leading-[40px] font-bold">
                Silver Plan
              </h3>
              <ol className="list-none m-0 p-0 text-center">
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Minimum investment: $500
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Maximum investment: $1,900
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Roi: 30%
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Duration: 6 weeks
                </li>
              </ol>
              <a
                href=""
                className="text-white uppercase transition-all duration-300 ease-in-out rounded-sm font-extrabold text-[14px] py-2 px-5 bg-[#FC0077] inline-block border hover:bg-transparent border-[#FC0077]"
              >
                Start Investing
              </a>
            </div>
            <div className="flex flex-1 py-[40px] px-[30px] flex-col gap-[15px] justify-center items-center custom group relative shadow-lg p-10  overflow-hidden border border-[#150550] bg-[#150550] mb-7 rounded-md z-[1]">
              <h3 className="text-white text-[28px] lg:text-[32px] leading-[40px] font-bold">
                Gold Plan
              </h3>
              <ol className="list-none m-0 p-0 text-center">
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Minimum investment: $1,900
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Maximum investment: $25,000
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Roi: 30%
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Duration: 6 weeks
                </li>
              </ol>
              <a
                href=""
                className="text-white uppercase transition-all duration-300 ease-in-out rounded-sm font-extrabold text-[14px] py-2 px-5 bg-[#FC0077] inline-block border hover:bg-transparent border-[#FC0077]"
              >
                Start Investing
              </a>
            </div>
            <div className="flex flex-1 py-[40px] px-[30px] flex-col gap-[15px] justify-center items-center custom group relative shadow-lg p-10  overflow-hidden border border-[#150550] bg-[#150550] mb-7 rounded-md z-[1]">
              <h3 className="text-white text-[28px] lg:text-[32px] leading-[40px] font-bold">
                Platinum Plan
              </h3>
              <ol className="list-none m-0 p-0 text-center">
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Minimum investment: $25,000
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Maximum investment: ∞
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Roi: 20%
                </li>
                <li className="p-[14px_5px] text-[17px] font-semibold border-dotted border-[#666] border-[1px]">
                  Duration: 4 weeks
                </li>
              </ol>
              <a
                href=""
                className="text-white uppercase transition-all duration-300 ease-in-out rounded-sm font-extrabold text-[14px] py-2 px-5 bg-[#FC0077] inline-block border hover:bg-transparent border-[#FC0077]"
              >
                Start Investing
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plan;
