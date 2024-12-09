import React from "react";

const Trade = () => {
  return (
    <div className="bg-primary pt-[110px] pr-0 pb-[50px]">
      <div className="mycontainer">
        <div className="px-4 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-white font-bold text-[30px] leading-[40px] lg:text-[46px] lg:leading-[54px]">
              Trade like a pro!
            </h2>
            <p className="text-white text-center w-auto lg:w-[480px] my-0 mx-auto">
              Trade CFDs on a wide range of instruments, including popular FX
              pairs, Futures, Indices, Metals, Energies and Shares and
              experience the global markets at your fingertips.
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
                  <h4 className="text-white font-bold text-[24px] lg:text-[22px] leading-[28px]">
                    Instant Cashout
                  </h4>
                  <p className="text-white text-[16px] leading-[26px]">
                    24/7 Access to your money · Get paid out instantly.
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
                  <h4 className="text-white font-bold text-[24px] lg:text-[22px] leading-[28px]">
                    Live support
                  </h4>
                  <p className="text-white text-[16px] leading-[26px]">
                    We&apos;re here whenever you need us.
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
                  <h4 className="text-white font-bold text-[24px] lg:text-[22px] leading-[28px]">
                    Super Security
                  </h4>
                  <p className="text-white  text-[16px] leading-[26px]">
                    Your safety is our priority.
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
