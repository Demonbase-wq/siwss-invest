
"use client";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
  }
  
  interface Window {
    google: any;
  }
  const google: any;
}

import { useEffect } from "react";

export function GoogleTranslate() {
  useEffect(() => {
    let addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
      },
      "google_translate_element"
    );
  };

  return (
    <div
      id="google_translate_element"
      className="absolute top-2 left-0 lg:pl-2 z-50 scale-75 lg:scale-100"
    />
  );
}