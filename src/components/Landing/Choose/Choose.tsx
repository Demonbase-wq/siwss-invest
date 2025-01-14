import React from "react";

const Choose = () => {
  return (
    <div className="bg-primary pt-[110px] pr-0 pb-[50px]">
      <div className="mycontainer">
        <div className="px-4 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-white font-bold text-[25px] leading-[40px] lg:text-[46px] lg:leading-[54px]">
            Why SwissPipsAI
            </h2>
            <p className="text-white text-center w-auto lg:w-[480px] my-0 mx-auto">
            Discover how SwissPipsAI revolutionizes investments with cutting-edge AI, unmatched reliability, and secure transactions.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col lg:flex-row items-center gap-5">
              <div className="py-[30px] px-[20px] flex-1 bg-[#161150] rounded-[8px] flex flex-col gap-[20px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-md w-[40px] h-[40px]]">
                    <img
                      src="/lock.svg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    Security
                  </h4>
                </div>

                <div>
                  <p className="text-[#ddd] text-[16px] leading-[26px]">
                  Your investment’s safety is our top priority. SwissPipsAI employs advanced encryption and state-of-the-art protocols to secure your funds and data.

                  </p>
                </div>
              </div>
              <div className="py-[30px] px-[20px] flex-1 bg-[#161150] rounded-[8px] flex flex-col gap-[20px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-md w-[40px] h-[40px]]">
                    <img
                      src="/safe-investment.svg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    Secure investment
                  </h4>
                </div>

                <div>
                  <p className="text-[#ddd] text-[16px] leading-[26px]">
                  Our AI-driven platform ensures that your investments are safeguarded and yield the promised returns at the end of each period.

                  </p>
                </div>
              </div>
              <div className="py-[30px] px-[20px] flex-1 bg-[#161150] rounded-[8px] flex flex-col gap-[20px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-md w-[40px] h-[40px]]">
                    <img
                      src="/edit.svg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    Registered company
                  </h4>
                </div>

                <div>
                  <p className="text-[#ddd] text-[16px] leading-[26px]">
                  SwissPipsAI is a fully licensed and regulated company, adhering to global financial and ethical standards for peace of mind.

                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-5">
              <div className="py-[30px] px-[20px] flex-1 bg-[#161150] rounded-[8px] flex flex-col gap-[20px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-md w-[40px] h-[40px]]">
                    <img
                      src="/withdraw.svg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    Instant withdrawal
                  </h4>
                </div>

                <div>
                  <p className="text-[#ddd] text-[16px] leading-[26px]">
                  Enjoy hassle-free, instant access to your funds anytime you need them, with no delays or unnecessary procedures.

                  </p>
                </div>
              </div>
              <div className="py-[30px] px-[20px] flex-1 bg-[#161150] rounded-[8px] flex flex-col gap-[20px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-md w-[40px] h-[40px]]">
                    <img
                      src="/web-security.svg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    SSL Secured
                  </h4>
                </div>

                <div>
                  <p className="text-[#ddd] text-[16px] leading-[26px]">
                  We utilize SSL encryption technology to protect your transactions and ensure your sensitive data is safe at all times.

                  </p>
                </div>
              </div>
              <div className="py-[30px] px-[20px] flex-1 bg-[#161150] rounded-[8px] flex flex-col gap-[20px]">
                <div className="flex items-center gap-3">
                  <div className="rounded-md w-[40px] h-[40px]]">
                    <img
                      src="/fix.svg"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4 className="text-white font-bold text-[20px] lg:text-[22px] leading-[28px]">
                    24/7 support
                  </h4>
                </div>

                <div>
                  <p className="text-[#ddd] text-[16px] leading-[26px]">
                  Our dedicated support team is available around the clock to assist you with any questions or concerns you may have.

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

export default Choose;
