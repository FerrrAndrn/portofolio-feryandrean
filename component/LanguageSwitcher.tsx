"use client";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ReactCountryFlag from "react-country-flag";
import { ChevronDown } from "lucide-react";

const langs = [
  { code: "en", label: "English", flag: "US" },
  { code: "id", label: "Indonesia", flag: "ID" },
  { code: "ko", label: "한국어", flag: "KR" },
  { code: "ja", label: "日本語", flag: "JP" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = langs.find((l) => l.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 px-3 py-2 rounded-md 
                   bg-[#001f3f] text-white text-sm font-medium 
                   hover:bg-[#003366]/80 transition min-w-[120px]"
      >
        <div className="flex items-center gap-2">
          <ReactCountryFlag
            countryCode={current.flag}
            svg
            style={{ width: "1.25em", height: "1.25em" }}
          />
          <span className="whitespace-nowrap">{current.label}</span>
        </div>

        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 bg-[#001f3f] 
                     rounded-md shadow-lg overflow-hidden z-50 min-w-[100px]"
        >
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as any);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 w-full 
                         text-left text-white text-sm 
                         hover:bg-[#003366]/80 transition"
            >
              <ReactCountryFlag
                countryCode={l.flag}
                svg
                style={{ width: "1.25em", height: "1.25em" }}
              />
              <span className="whitespace-nowrap">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
