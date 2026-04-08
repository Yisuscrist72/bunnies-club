"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { es } from "@/locales/es";
import type { Translations } from "@/locales/es";
import { en } from "@/locales/en";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("es");
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang === "es" || savedLang === "en") {
      setLanguage(savedLang);
    }
    setIsHydrated(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const t = language === "es" ? es : en;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      <div style={{ visibility: isHydrated ? "visible" : "hidden" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
