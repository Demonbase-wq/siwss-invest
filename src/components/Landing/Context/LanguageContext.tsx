'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, languages } from "@/lib/utils";
import { useTranslation } from "@/translations/provider";

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (lang: Language, code: "en" | "es" | "de" | "fr" | "it") => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const { changeLanguage: changeTranslation } = useTranslation();

  const changeLanguage = (lang: Language, code: "en" | "es" | "de" | "fr" | "it") => {
    setCurrentLanguage(lang);
    changeTranslation(code);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

