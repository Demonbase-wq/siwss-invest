'use client'
import { useTranslation } from "@/translations/provider";
import React from "react";
import { LanguageSelector } from "../LanguageSelector/LanguageSelector";

const FooterTop = () => {
    const { translations, changeLanguage } = useTranslation();
  
  return (
    <div className="bg-[#02012B] text-gray-300 pt-[110px] pb-[50px]">
      <div className="mycontainer relative bg-no-repeat bg-cover bg-top-right bg-fixed z-[1]">
        <div className="px-4 flex flex-col lg:flex-row gap-10">
          <div className="flex flex-1 flex-col">
            <div className="">
              <h4 className="footer-h4 text-[22px] mb-7 capitalize relative pb-4 lg:text-[24px] font-bold leading-[32px]">
                {translations?.footerTop?.text1}
              </h4>
              <p className="text-[16px] font-normal leading-[28px] lg:leading-[26px] mb-4">
              {translations?.footerTop?.text2}

              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="">
              <h4 className="footer-h4 text-[22px] mb-7 capitalize relative pb-4 lg:text-[24px] font-bold leading-[32px]">
              {translations?.footerTop?.text3}
              </h4>
            </div>

            <div>
              <ul className="list-disc px-[20px] flex flex-col gap-2.5">
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                {translations?.footerTop?.text4}
                </li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                {translations?.footerTop?.text5}
                </li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                {translations?.footerTop?.text6}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="">
              <h4 className="footer-h4 text-[22px] mb-7 capitalize relative pb-4 lg:text-[24px] font-bold leading-[32px]">
              {translations?.footerTop?.text7}
              </h4>
            </div>

            <div>
              <ul className="list-disc px-[20px] flex flex-col gap-2.5">
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                  <a href="/signup">{translations?.footerTop?.text8}</a>
                </li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                  <a href="/signup">{translations?.footerTop?.text9}</a>
                </li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                  <a href="/signup">{translations?.footerTop?.text10}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="">
              <h4 className="footer-h4 text-[22px] mb-7 capitalize relative pb-4 lg:text-[24px] font-bold leading-[32px]">
              {translations?.footerTop?.text11}
              </h4>
            </div>

            <div>
              <ul className="list-disc px-[20px] flex flex-col gap-2.5">
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                  <a href="/signup">{translations?.footerTop?.text12}</a>
                </li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                  <a href="/login">{translations?.footerTop?.text13}</a>
                </li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                  <a href="/privacy">{translations?.footerTop?.text14}</a>
                </li>
                <li className="hover:text-accent cursor-pointer transition-all ease-in-out duration-[0.2s]">
                  <a href="/faq">{translations?.footerTop?.text15}</a>
                </li>
              </ul>
            </div>
            <div className="mt-5">
            <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
