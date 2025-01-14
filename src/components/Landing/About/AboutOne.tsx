import React from "react";
import Counter from "./Counter";

const AboutOne = () => {
  return (
    <div
      className="pt-10 lg:pt-[40px] lg:pb-[100px] pb-[28px] flex items-center"
      id="home"
    >
      <div className="mycontainer">
        <div className="px-4 flex-col gap-14 lg:gap-10 flex items-center lg:flex-row-reverse justify-center">
          <div className="lg:flex-1 flex flex-col gap-14">
            <div className="flex flex-col gap-5 lg:items-start">
              <p className="text-accent font-semibold text-[17px] sm:text-[20px] lg:text-[24px]">
                A Few Words About SwissPipsAI
              </p>
              <h2 className="text-primary text-[30px] hero-text font-bold lg:text-[50px] lg:leading-[4.2rem]">
                Who we are.
              </h2>
              <p className="text-primary lg:text-left lg:text-[0.95rem] leading-7 font-medium">
                At SwissPipsAI, we are redefining the investment landscape by
                leveraging advanced AI technology to deliver precise and
                reliable results for our users. Our platform is designed to
                simplify the investment process while ensuring transparency,
                security, and profitability. Whether you're an experienced
                investor or just beginning your journey, SwissPipsAI provides
                the tools and insights you need to make informed decisions and
                achieve your financial goals. Security is at the heart of
                everything we do. We use cutting-edge encryption technologies to
                protect your investments and personal data, giving you peace of
                mind with every transaction. With a global reach and a
                commitment to excellence, SwissPipsAI empowers users to grow
                their wealth seamlessly. Join us today to experience a smarter,
                more efficient way to invest, and let us guide you toward
                achieving the exact ROI you expect.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-[1]">
                  <img src="/counter1.png" alt="" />
                </div>

                <div className="flex sm:flex-[3] flex-[2] lg:flex-[2] flex-col gap-1">
                  <Counter end={45} suffix="k" />

                  <h4 className="text-primary font-medium">Total Investors</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-[1]">
                  <img src="/counter2.png" alt="" />
                </div>

                <div className="flex sm:flex-[3] flex-[2] lg:flex-[2] flex-col gap-1">
                  <Counter end={90} suffix="+" />

                  <h4 className="text-primary font-medium">Countries Served</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-[1]">
                  <img src="/counter3.png" alt="" />
                </div>

                <div className="flex sm:flex-[3] flex-[2] lg:flex-[2] flex-col gap-1">
                  <Counter end={95} suffix="%" />

                  <h4 className="text-primary font-medium">Customer Satisfaction</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex  lg:flex-1">
            <img src="/about.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOne;
