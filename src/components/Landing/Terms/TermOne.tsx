import React from "react";

const TermOne = () => {
  return (
    <div className="py-8">
      <div className="mycontainer">
        <div className="px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-8">
            Terms & Conditions for CmTradingPro
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-primary">
                1. Introduction
              </h2>
              <p className="text-lg text-gray-700">
                Welcome to <strong>CmTradingPro</strong>. By accessing or using
                our website, services, or any related applications provided by{" "}
                <strong>CmTradingPro</strong>, you agree to comply with and be
                bound by the following terms and conditions. These terms and
                conditions outline your obligations when using the CmTradingPro
                platform. If you do not agree with these terms, please refrain
                from using our services.
              </p>
              <p className="text-lg text-gray-700">
                <strong>CmTradingPro</strong> reserves the right to update,
                modify, or change these terms at any time. The most current
                version of the terms will be available on this page. By
                continuing to use our services after any updates, you agree to
                be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                2. Use of Our Services
              </h2>
              <p className="text-lg text-gray-700">
                You agree to use the <strong>CmTradingPro</strong> platform and
                services in a lawful manner and in compliance with all relevant
                regulations and laws. You may not use our services for any
                illegal activity, fraud, or misconduct. The platform is intended
                for legitimate trading activities, and we reserve the right to
                suspend or terminate your account if we detect any suspicious or
                unlawful activities.
              </p>
              <h3 className="text-xl font-semibold text-primary mt-4">
                Account Registration and Security
              </h3>
              <ul className="list-disc pl-6 text-lg text-gray-700">
                <li>
                  To use our services, you must create an account by providing
                  accurate and complete personal information.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account details, including your password, and for all
                  activities that occur under your account.
                </li>
                <li>
                  You must notify <strong>CmTradingPro</strong> immediately if
                  you suspect unauthorized access to your account.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                3. Trading and Investment
              </h2>
              <p className="text-lg text-gray-700">
                By using <strong>CmTradingPro</strong>, you acknowledge and
                agree to the following:
              </p>
              <ul className="list-disc pl-6 text-lg text-gray-700">
                <li>
                  <strong>Investment Risk:</strong> Trading involves substantial
                  risk, and you may lose part or all of your invested capital.
                  You should only trade with funds you can afford to lose.
                </li>
                <li>
                  <strong>Market Volatility:</strong> The markets you trade in
                  can be highly volatile, and prices may fluctuate rapidly. We
                  do not guarantee any returns or profits.
                </li>
                <li>
                  <strong>Compliance:</strong> You are responsible for ensuring
                  that your use of the platform complies with all local, state,
                  and national laws, including tax laws.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                4. Limitation of Liability
              </h2>
              <p className="text-lg text-gray-700">
                <strong>CmTradingPro</strong> will not be liable for any damages
                arising from the use of our services, including any direct,
                indirect, incidental, special, or consequential damages. This
                includes loss of profits, loss of data, or any other damages
                incurred from the use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                5. Account Termination
              </h2>
              <p className="text-lg text-gray-700">
                <strong>CmTradingPro</strong> reserves the right to suspend or
                terminate your account at any time for any reason, including but
                not limited to violations of our terms, fraud, or suspicious
                activity. In the event of account termination, any funds
                remaining in your account will be subject to applicable
                withdrawal policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                6. Privacy and Data Protection
              </h2>
              <p className="text-lg text-gray-700">
                Your privacy is important to us. We will collect, store, and
                process your personal data in accordance with our privacy
                policy. By using our services, you consent to the collection and
                processing of your data as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                7. Governing Law
              </h2>
              <p className="text-lg text-gray-700">
                These terms and conditions are governed by the laws of [Your
                Country/State]. Any disputes arising from the use of our
                services will be subject to the jurisdiction of the courts in
                [Your Location].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                8. Contact Us
              </h2>
              <p className="text-lg text-gray-700">
                If you have any questions regarding these Terms & Conditions,
                please contact us at:
              </p>
              <ul className="text-lg text-gray-700">
                <li>Email: support@cmtradingpro.com</li>
                <li>Phone: +123 456 7890</li>
                <li>Address: 123 Trading St., Financial City, XYZ</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermOne;
