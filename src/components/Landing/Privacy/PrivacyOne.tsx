import React from "react";

const PrivacyOne = () => {
  return (
    <div className="py-8">
      <div className="mycontainer">
        <div className="px-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-8">
            Privacy Policy for CmTradingPro
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-primary">
                1. Introduction
              </h2>
              <p className="text-lg text-gray-700">
                At <strong>CmTradingPro</strong>, we value your privacy. This
                Privacy Policy outlines the types of personal information we
                collect, how we use it, and the steps we take to protect it. By
                using our services, you consent to the collection and use of
                your information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                2. Information We Collect
              </h2>
              <p className="text-lg text-gray-700">
                We collect personal information that you provide to us when you
                register for an account, subscribe to our services, or interact
                with our platform. This information may include:
              </p>
              <ul className="list-disc pl-6 text-lg text-gray-700">
                <li>
                  Name, email address, phone number, and other contact details
                </li>
                <li>
                  Account details such as username, password, and trading
                  preferences
                </li>
                <li>Transaction history and investment details</li>
                <li>
                  Technical data such as IP addresses, browser type, and device
                  details
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                3. How We Use Your Information
              </h2>
              <p className="text-lg text-gray-700">
                The information we collect is used to:
              </p>
              <ul className="list-disc pl-6 text-lg text-gray-700">
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience on our platform</li>
                <li>Process transactions and manage your account</li>
                <li>
                  Communicate with you regarding updates, offers, and support
                </li>
                <li>Monitor and prevent fraudulent activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                4. Data Protection
              </h2>
              <p className="text-lg text-gray-700">
                We are committed to protecting your personal information. We use
                industry-standard encryption and security measures to safeguard
                your data, both during transmission and storage. However, please
                note that no method of data transmission over the internet is
                completely secure. While we strive to protect your personal
                data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                5. Sharing Your Information
              </h2>
              <p className="text-lg text-gray-700">
                We do not sell or rent your personal information to third
                parties. However, we may share your information in the following
                cases:
              </p>
              <ul className="list-disc pl-6 text-lg text-gray-700">
                <li>
                  With trusted service providers who assist in operating our
                  platform
                </li>
                <li>
                  In response to a legal request or requirement, such as a
                  subpoena
                </li>
                <li>
                  If we believe it’s necessary to prevent fraud or protect our
                  rights
                </li>
                <li>
                  In connection with business transactions, such as a merger or
                  acquisition
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                6. Your Rights
              </h2>
              <p className="text-lg text-gray-700">
                You have the right to access, update, or delete your personal
                information. If you wish to exercise these rights or have any
                concerns about your data, please contact us at{" "}
                <strong>support@cmtradingpro.com</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                7. Cookies
              </h2>
              <p className="text-lg text-gray-700">
                We use cookies to enhance your experience on our platform.
                Cookies are small files stored on your device that help us
                remember your preferences and analyze site traffic. You can
                control cookie settings in your browser settings, but please
                note that disabling cookies may affect your user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                8. Changes to This Privacy Policy
              </h2>
              <p className="text-lg text-gray-700">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page, and the revised policy will be
                effective immediately upon posting. We encourage you to review
                this policy periodically to stay informed about how we are
                protecting your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary">
                9. Contact Us
              </h2>
              <p className="text-lg text-gray-700">
                If you have any questions about this Privacy Policy or how we
                handle your personal information, please contact us at{" "}
                <strong>support@cmtradingpro.com</strong> or via the contact
                details provided on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyOne;
