"use client";

import { createContext, useContext, useState, useEffect } from "react";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [translations, setTranslations] = useState({});
  const [lang, setLang] = useState("en"); // Default language

  // Load saved language preference on initial render
  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage") || "en";
    setLang(savedLang);
  }, []);

  // Load translations dynamically when the language changes
  useEffect(() => {
    import(`../app/i18n/${lang}.json`)
      .then((module) => setTranslations(module.default))
      .catch((error) => {
        console.error("Error loading translations:", error);
        setTranslations({}); // Default to an empty object if loading fails
      });
  }, [lang]);

  const changeLanguage = (newLang) => {
    setLang(newLang); // Update the current language
    localStorage.setItem("selectedLanguage", newLang); // Persist the language
  };

  return (
    <TranslationContext.Provider value={{ translations, lang, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
