"use client";
import { useTranslation } from "@/translations/provider";
import React from "react";

const ContactTwo = () => {
  const { translations } = useTranslation();

  return (
    <div className="lg:py-8 pt-4 pb-10">
      <div className="mycontainer">
        <div className="px-4">
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-6 lg:gap-10">
              <h3 className="text-center text-primary text-[24px] lg:text-[34px] font-bold">
              {translations?.contact?.text10}
              </h3>

              <div className="flex flex-col gap-7 lg:gap-10 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <img src="/contact1.png" alt="" />

                  <div>
                    <h5 className="text-primary font-bold">{translations?.contact?.text11}</h5>
                    <p className="text-primary font-medium">
                      support@swisspipsai.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/contact2.png" alt="" />

                  <div>
                    <h5 className="text-primary font-bold">{translations?.contact?.text12}</h5>
                    <p className="text-primary font-medium">+1(415)649-9363</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img src="/contact3.png" alt="" />

                  <div>
                    <h5 className="text-primary font-bold">{translations?.contact?.text13}</h5>
                    <p className="text-primary font-medium">Garden City, NY</p>
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

export default ContactTwo;
