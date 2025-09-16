"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
import ko from "@/locales/ko.json";
import ja from "@/locales/ja.json";

type Locale = "en" | "id" | "ko" | "ja";
const translations = { en, id, ko, ja };

type LanguageContextType = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: string) => any;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Locale>("en");

  const t = (key: string): any => {
    const parts = key.replace(/\[(\d+)\]/g, ".$1").split(".");
    let value: any = translations[lang];

    for (const part of parts) {
      if (value == null) return key;
      value = value[part];
    }

    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
