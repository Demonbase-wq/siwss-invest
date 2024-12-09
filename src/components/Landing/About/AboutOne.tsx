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
                A Few Words About Crest Bank
              </p>
              <h2 className="text-primary text-[30px] hero-text font-bold lg:text-[50px] lg:leading-[4.2rem]">
                Who we are.
              </h2>
              <p className="text-primary lg:text-left lg:text-[0.95rem] leading-7 font-medium">
                At CmTradingPro, we pride ourselves on being a dynamic
                force in the trading world, constantly adapting to the evolving
                market to provide unparalleled services to our clients. Much
                like a skilled trader navigating the highs and lows of the
                market, we work tirelessly to give you the best trading
                experience possible. Our platform is designed to empower
                you whether you&apos;re a seasoned investor or just starting your
                trading journey. With easy access to global markets, powerful
                tools, and real-time insights, you&apos;re always in control. Our
                commitment to security is at the core of everything we do. We
                use advanced encryption technology to protect your investments
                and personal information, ensuring your peace of mind with every
                transaction. With CmTradingpro, you can trade with
                confidence, knowing that your funds and data are in safe hands.
                Join us today and discover a new level of trading excellence.
                Whether you&apos;re looking to diversify your portfolio or explore
                new investment opportunities, we&apos;re here to guide you every step
                of the way.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-[1]">
                  <img src="/counter1.png" alt="" />
                </div>

                <div className="flex sm:flex-[3] flex-[2] lg:flex-[2] flex-col gap-1">
                  <Counter end={45} suffix="k" />

                  <h4 className="text-primary font-medium">Total User</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-[1]">
                  <img src="/counter2.png" alt="" />
                </div>

                <div className="flex sm:flex-[3] flex-[2] lg:flex-[2] flex-col gap-1">
                  <Counter end={90} suffix="+" />

                  <h4 className="text-primary font-medium">Countries</h4>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-[1]">
                  <img src="/counter3.png" alt="" />
                </div>

                <div className="flex sm:flex-[3] flex-[2] lg:flex-[2] flex-col gap-1">
                  <Counter end={95} suffix="%" />

                  <h4 className="text-primary font-medium">Satisfaction</h4>
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
