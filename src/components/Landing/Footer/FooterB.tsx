import Link from "next/link";
import React from "react";

const FooterB = () => {
  return (
    <div className="bg-[#161150] py-[25px]">
      <div className="mycontainer">
        <div className="px-4">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-4 lg:gap-0">
            <p className="text-center">
              Copyright © 2024 <Link href="/" className="text-accent">CmProTrading</Link> All Rights Reserved
            </p>
            <div>
                <ul className="flex items-center gap-4">
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/T&C">Terms & Conditions</Link></li>
                    <li><Link href="/privacy-policy">Privacy</Link></li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterB;
