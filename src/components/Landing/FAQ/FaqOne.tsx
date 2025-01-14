"use client";
import React, { useEffect, useState } from "react";

const FaqOne = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [started, setStarted] = useState(false);
  const [how, setHow] = useState(false);
  const [services, setServices] = useState(false);
  const [loans, setLoans] = useState(false);
  const [update, setUpdate] = useState(false);
  const [security, setSecurity] = useState(false);

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
                    Getting started
                  </a>
                  <a
                    href="#how"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                  >
                    How SwissPipsAI Works
                  </a>
                  <a
                    href="#services"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                  >
                    Investment Plans
                  </a>
                  <a
                    href="#update"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                  >
                    Updating Account
                  </a>
                  <a
                    href="#security"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                  >
                    Security
                  </a>
                </div>
              </div>
            </div>
            {/* sidebar */}

            <div className="lg:flex-[2] flex flex-col gap-16">
              <div id="started" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                  Getting Started
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      What services does SwissPipsAI offer?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        SwissPipsAI offers AI-powered investment solutions
                        designed to maximize ROI for users. Our platform
                        provides tailored investment plans, real-time growth
                        tracking, and reliable security to ensure a seamless
                        investment experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="how" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                  How SwissPipsAI Works
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                      What’s special about SwissPipsAI?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        SwissPipsAI uses advanced AI algorithms to deliver
                        precise and consistent returns. Our transparent
                        approach, easy-to-use platform, and commitment to
                        security set us apart from traditional investment
                        platforms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="services" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                  Explore Our Investment Plans
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                      What investment plans does SwissPipsAI offer?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        SwissPipsAI offers flexible investment plans tailored to
                        meet your financial goals. Whether you are looking for
                        short-term gains or long-term growth, our plans provide
                        reliable ROI backed by advanced AI algorithms. Choose
                        any of the plans and watch your investment grow.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      How can I choose the best investment plan?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        Selecting the right investment plan depends on your
                        financial goals, risk tolerance, and desired ROI.
                        SwissPipsAI provides detailed insights into each plan,
                        helping you make informed decisions.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      What is the minimum investment amount?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        Our investment plans are designed to be accessible for
                        everyone, with a minimum investment amount starting as
                        low as $500. This allows you to begin your investment
                        journey with confidence, regardless of your budget.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="update" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                  Updating Account
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                      How can I edit my personal information?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        To update your personal information on SwissPipsAi,
                        follow these steps:
                        <ol className="list-decimal pl-6">
                          <li>
                            <strong>Log In to Your Account:</strong> Access your
                            SwissPipsAi account using your username and
                            password.
                          </li>
                          <li>
                            <strong>Navigate to Profile Settings:</strong> Once
                            logged in, go to your account settings by clicking
                            on the profile icon or menu.
                          </li>
                          <li>
                            <strong>Edit Personal Information:</strong> In the
                            Profile Settings, you'll see options to update your
                            name, email, phone number, and other personal
                            details.
                          </li>
                          <li>
                            <strong>Verify Your Changes:</strong> Double-check
                            all fields to ensure your information is accurate
                            before saving.
                          </li>
                          <li>
                            <strong>Save and Confirm:</strong> Click "Save
                            Changes" to update your information. You’ll receive
                            a confirmation that your details have been
                            successfully updated.
                          </li>
                        </ol>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="security" className="flex flex-col gap-4">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                  Security
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                      How does SwissPipsAI protect my personal and financial
                      information?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        SwissPipsAI employs industry-leading security measures,
                        including encryption, firewalls, and secure socket layer
                        (SSL) technology, to protect your personal and financial
                        information from unauthorized access.
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
