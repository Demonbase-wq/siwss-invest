import React from "react";

const FooterB = () => {
  return (
    <div className="bg-[#161150] py-[25px]">
      <div className="mycontainer">
        <div className="px-4">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-4 lg:gap-0">
            <p className="text-center">
              Copyright © 2024 <a href="/" className="text-accent">CmProTrading</a> All Rights Reserved
            </p>
            <div>
                <ul className="flex items-center gap-4">
                    <li><a href="/about">About</a></li>
                    <li><a href="/T&C">Terms & Conditions</a></li>
                    <li><a href="/privacy-policy">Privacy</a></li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterB;
