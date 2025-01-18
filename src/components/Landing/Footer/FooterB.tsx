'use client'
import { useTranslation } from "@/translations/provider";
import Link from "next/link";
import React from "react";

const FooterB = () => {
      const { translations } = useTranslation();
  

  return (
    <div className="bg-[#161150] text-gray-300 py-[25px]">
      <div className="mycontainer">
        <div className="px-4">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-4 lg:gap-0">
            <p className="text-center">
              Copyright © 2025 <Link href="/" className="text-accent">SwissPipsAi</Link> All Rights Reserved
            </p>
            <div>
                <ul className="flex items-center gap-4">
                    <li><Link href="/about">{translations?.footerBottom?.text1}</Link></li>
                    <li><Link href="/T&C">{translations?.footerBottom?.text2}</Link></li>
                    <li><Link href="/privacy-policy">{translations?.footerBottom?.text3}</Link></li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterB;
