import React from "react";

const FooterTop = () => {
  return (
    <div className="bg-[#02012B] pt-[110px] pb-[50px]">
      <div className="mycontainer relative bg-no-repeat bg-cover bg-top-right bg-fixed z-[1]">
        <div className="px-4 flex flex-col lg:flex-row gap-10">
          <div className="flex flex-1 flex-col">
            <div className="">
              <h4 className="footer-h4 text-[22px] mb-7 capitalize relative pb-4 lg:text-[24px] font-bold leading-[32px]">
              About SwissPipsAI
              </h4>
              <p className="text-[16px] font-normal leading-[28px] lg:leading-[26px] mb-4">
              SwissPipsAI is a cutting-edge AI-powered investment platform designed to help you grow your wealth with precision and reliability. By leveraging advanced algorithms, we ensure your investments achieve the promised ROI, providing a seamless and transparent experience for every investor.

              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="">
              <h4 className="footer-h4 text-[22px] mb-7 capitalize relative pb-4 lg:text-[24px] font-bold leading-[32px]">
                Investment Plan
              </h4>
            </div>

            <div>
              <ul className="list-disc px-[20px] flex flex-col gap-2.5">
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">Silver Plan</li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">Gold Plan</li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">Platinum Plan</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="">
              <h4 className="footer-h4 text-[22px] mb-7 capitalize relative pb-4 lg:text-[24px] font-bold leading-[32px]">
                Payment Options
              </h4>
            </div>

            <div>
              <ul className="list-disc px-[20px] flex flex-col gap-2.5">
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]"><a href="/signup">BTC</a></li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]"><a href="/signup">ETH</a></li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]"><a href="/signup">USDC</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="">
              <h4 className="footer-h4 text-[22px] mb-7 capitalize relative pb-4 lg:text-[24px] font-bold leading-[32px]">
                Accounts
              </h4>
            </div>

            <div>
              <ul className="list-disc px-[20px] flex flex-col gap-2.5">
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]"><a href="/signup">Signup</a></li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]"><a href="/login">Login</a></li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]"><a href="/privacy">Privacy</a></li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]"><a href="/faq">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
