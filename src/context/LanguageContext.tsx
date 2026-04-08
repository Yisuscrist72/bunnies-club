"use client";

import { en } from "@/locales/en";
import { es } from "@/locales/es";
import type { Translations } from "@/locales/es";
import { createContext, useContext, useSyncExternalStore } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// --- useSyncExternalStore helpers ---
// Server siempre devuelve "es" para evitar hydration mismatch
function getServerSnapshot(): Language {
  return "es";
}

// Cliente lee desde localStorage
function getLanguageSnapshot(): Language {
  const saved = localStorage.getItem("language") as Language;
  return saved === "es" || saved === "en" ? saved : "es";
}

// Suscribe a cambios del storage (también funciona entre pestañas)
function subscribeToLanguage(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // No useState + useEffect = sin errores de hydration ni de linter
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getServerSnapshot,
  );

  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es";
    localStorage.setItem("language", newLang);
    // El evento storage no se dispara en la misma ventana, lo hacemos manualmente
    window.dispatchEvent(new StorageEvent("storage", { key: "language", newValue: newLang }));
  };

  const t = language === "es" ? es : en;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
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
