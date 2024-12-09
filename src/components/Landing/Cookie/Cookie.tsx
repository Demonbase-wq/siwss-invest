'use client'
import React, { useState, useEffect } from "react";

const Cookie = () => {
  const [showModal, setShowModal] = useState(false);

  // Check if user has already accepted cookies
  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (cookieConsent !== "accepted") {
      setShowModal(true);
    }
  }, []);

  // Handle the cookie consent action
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              We Use Cookies
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              We use cookies to improve your experience, analyze site traffic,
              and offer personalized content. By clicking "Accept", you consent
              to our use of cookies.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md px-4 py-2"
                onClick={() => setShowModal(false)}
              >
                Decline
              </button>
              <button
                className="bg-primary text-white hover:bg-blue-600 rounded-md px-6 py-2"
                onClick={handleAccept}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cookie;
