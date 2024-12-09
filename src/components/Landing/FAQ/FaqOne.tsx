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
                    How Crest Bank works
                  </a>
                  <a
                    href="#services"
                    className="hover:bg-[#00b3b336] py-2 rounded-[10px] px-2 text-white font-semibold"
                  >
                    Services
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
                      What services does CmTradingPro offer?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        At CmTradingPro, we provide a comprehensive range of
                        trading services to help you navigate global financial
                        markets. Our platform allows you to trade a wide variety
                        of assets, including forex, stocks, commodities, and
                        cryptocurrencies. With advanced trading tools, real-time
                        market analysis, and educational resources, we are here
                        to support traders of all levels in maximizing their
                        potential.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      How can I open an account with CmTradingPro?{" "}
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        Opening an account with CmTradingPro is quick and easy.
                        Simply visit our registration page, fill out the
                        necessary information, and submit the required documents
                        for verification. Once your account is approved, you’ll
                        gain instant access to our trading platform, allowing
                        you to start trading with just a few clicks.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      What are the benefits of trading with CmTradingPro?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        By choosing CmTradingPro as your broker, you get access
                        to a user-friendly platform, fast execution speeds, and
                        secure transactions. Our commitment to transparency,
                        competitive spreads, and customer support sets us apart.
                        Additionally, we offer educational tools, live market
                        insights, and 24/7 support to ensure your trading
                        experience is smooth and profitable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="how" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                  How Crest Bank works
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                      What&apos;s special about CmTradingPro?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        CmTradingPro stands out in the crowded world of online
                        brokers with its commitment to innovation, transparency,
                        and user experience. We provide access to a wide range
                        of financial markets, including forex, commodities,
                        stocks, and cryptocurrencies, all from a single,
                        easy-to-use platform. Our platform is equipped with
                        powerful trading tools, real-time market data, and
                        educational resources, helping traders make informed
                        decisions and achieve their financial goals with
                        confidence.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      What problem does CmTradingPro solve?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        CmTradingPro solves the problem of complicated,
                        inefficient, and high-fee trading platforms. Many
                        traders face challenges in navigating outdated platforms
                        or dealing with hidden fees that eat into their profits.
                        Our solution? A modern, intuitive trading experience
                        with low spreads, fast execution speeds, and no hidden
                        charges. We aim to make trading accessible, efficient,
                        and profitable for all, whether you're a beginner or an
                        experienced trader.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      How does CmTradingPro differ from usual apps?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        Unlike traditional trading apps, CmTradingPro offers a
                        complete, professional trading environment. We combine a
                        user-friendly interface with sophisticated tools and
                        features, giving you everything you need to succeed in
                        the markets. From automated trading strategies to
                        real-time charting and in-depth market analysis,
                        CmTradingPro equips you with the resources and
                        flexibility you need to trade smarter. Plus, our
                        platform is fully secure, providing peace of mind every
                        step of the way.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="services" className="flex flex-col gap-4 lg:pt-24">
                <h1 className="text-primary lg:text-[36px] font-bold text-[20px]">
                  Services
                </h1>

                <div className="flex flex-col gap-3">
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-primary">
                      What types of assets can I trade on CmTradingPro?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        At CmTradingPro, we offer a diverse range of assets for
                        trading, including forex, stocks, commodities, and
                        cryptocurrencies. Whether you're interested in trading
                        major currency pairs, popular global stocks, precious
                        metals, or digital currencies, our platform provides
                        easy access to the world's financial markets. Our
                        platform is designed to cater to both beginners and
                        advanced traders, giving you the flexibility to explore
                        different trading opportunities.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      Can I trade on CmTradingPro using mobile devices?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        Yes, you can! CmTradingPro’s platform is fully
                        responsive, meaning you can access it seamlessly from
                        any mobile device or tablet. While we don't offer a
                        dedicated mobile app, our website is designed to provide
                        an optimal trading experience on the go. Whether you're
                        using iOS or Android, you’ll have access to your
                        account, real-time market data, and all the tools you
                        need, right in the palm of your hand. Stay connected to
                        the markets and manage your trades anywhere, anytime.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      What is our mission?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        At CmTradingPro, we are committed to providing
                        comprehensive financial solutions to individuals,
                        businesses, and communities, backed by exceptional
                        service and expertise.
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
                        To update your personal information on CmTradingPro,
                        follow these steps:
                        <ol className="list-decimal pl-6">
                          <li>
                            <strong>Log In to Your Account:</strong> Access your
                            CmTradingPro account using your username and
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
                      How does CmTradingPro protect my personal and financial
                      information?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                      CmTradingPro employs industry-leading security measures
                        such as encryption, firewalls, multi-factor
                        authentication, and secure socket layer (SSL) technology
                        to safeguard your personal and financial information
                        from unauthorized access.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      Is online trading with CmTradingPro safe?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        Yes, trading with CmTradingPro is safe and secure.
                        Our online trading platform utilizes advanced security
                        protocols to protect your account information and
                        transactions. We also recommend following best practices
                        for online security, such as using strong, unique
                        passwords and keeping your login credentials
                        confidential.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow bg-white">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-primary">
                      Does CmTradingPro offer fraud monitoring services?
                    </div>
                    <div className="collapse-content">
                      <p className="text-primary">
                        Yes, CmTradingPro provides fraud monitoring services to
                        help detect and prevent fraudulent activity on your
                        accounts. Our sophisticated monitoring systems analyze
                        transaction patterns and alert you to any suspicious
                        activity.
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
