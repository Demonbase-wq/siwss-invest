"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@/translations/provider";

const FaqOne = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [started, setStarted] = useState(false);
  const [how, setHow] = useState(false);
  const [services, setServices] = useState(false);
  const [loans, setLoans] = useState(false);
  const [update, setUpdate] = useState(false);
  const [security, setSecurity] = useState(false);

  const { translations } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 330) {
        console.log("window:" + window.scrollY);
        // Change 100 to the scroll position you want
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="py-8">
      <div className="mycontainer">
        <div className="px-4">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* side bar */}
            <div className={`lg:flex-[1] lg:sticky lg:top-24 lg:h-screen `}>
              <div className="bg-primary py-10 px-4 rounded-[10px]">
                <div className="flex flex-col gap-2">
                  <a
                    href="#started"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                    onClick={() => setStarted(!started)}
                  >
                    {translations?.faqOne?.text1}
                  </a>
                  <a
                    href="#how"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                  >
                    {translations?.faqOne?.text2}
                  </a>
                  <a
                    href="#services"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                  >
                    {translations?.faqOne?.text3}
                  </a>
                  <a
                    href="#update"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                  >
                    {translations?.faqOne?.text4}
                  </a>
                  <a
                    href="#security"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                  >
                    {translations?.faqOne?.text5}
                  </a>
                </div>
              </div>
            </div>
            {/* sidebar */}

            <div className="lg:flex-[2] flex flex-col gap-16">
              <div id="started" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                {translations?.faqOne?.text6}
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                    {translations?.faqOne?.text7}
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                      {translations?.faqOne?.text8}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="how" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                {translations?.faqOne?.text9}
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                    {translations?.faqOne?.text10}
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                      {translations?.faqOne?.text11}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="services" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                {translations?.faqOne?.text12}
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                    {translations?.faqOne?.text13}
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                      {translations?.faqOne?.text14}
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                    {translations?.faqOne?.text15}
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                      {translations?.faqOne?.text16}
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                    {translations?.faqOne?.text17}
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                      {translations?.faqOne?.text18}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="update" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                {translations?.faqOne?.text19}
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                    {translations?.faqOne?.text20}
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                      {translations?.faqOne?.text21}
                        <ol className="list-decimal pl-6">
                          <li>
                            <strong>{translations?.faqOne?.text22}</strong> {translations?.faqOne?.text23}
                          </li>
                          <li>
                            <strong>{translations?.faqOne?.text24}</strong> {translations?.faqOne?.text25}
                          </li>
                          <li>
                            <strong>{translations?.faqOne?.text26}</strong> {translations?.faqOne?.text27}
                          </li>
                          <li>
                            <strong>{translations?.faqOne?.text28}</strong> {translations?.faqOne?.text29}
                          </li>
                          <li>
                            <strong>{translations?.faqOne?.tex30}</strong> {translations?.faqOne?.text31}
                          </li>
                        </ol>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="security" className="flex flex-col gap-4">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                {translations?.faqOne?.text32}
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                    {translations?.faqOne?.text33}
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                      {translations?.faqOne?.text34}
                      </p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqOne;
