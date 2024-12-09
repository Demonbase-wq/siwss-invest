import React from "react";

const Choose = () => {
  return (
    <div className="bg-primary pt-[110px] pr-0 pb-[50px]">
      <div className="mycontainer">
        <div className="px-4 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-white font-bold text-[30px] leading-[40px] lg:text-[46px] lg:leading-[54px]">
              Why Choose Us
            </h2>
            <p className="text-white text-center w-auto lg:w-[480px] my-0 mx-auto">
              Discover the Key Benefits that Set Us Apart in the Industry.
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
                    Ensuring top-level security for all transactions is our
                    priority. We implement cutting-edge measures to keep your
                    information safe.
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
                    With a focus on safeguarding your investments, we ensure
                    every transaction is protected by the highest standards of
                    security.
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
                    As a fully registered and regulated company, we adhere to
                    strict industry standards, providing you with confidence in
                    our operations.
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
                    Experience fast and seamless withdrawals, allowing you to
                    access your funds instantly without any delays or
                    unnecessary hurdles.
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
                    Our platform is equipped with SSL encryption to ensure all
                    your personal data and transactions are fully secure and
                    protected.
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
                    Access our expert support team anytime. We're available
                    around the clock to resolve any issues, ensuring you’re
                    never alone.
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
