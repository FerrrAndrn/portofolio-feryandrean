"use client";

import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

const languages = [
  { code: "en", country: "US", label: "English" },
  { code: "id", country: "ID", label: "Indonesia" },
  { code: "ko", country: "KR", label: "한국어" },
  { code: "ja", country: "JP", label: "日本語" },
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState(languages[0]); // default English
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,id,ko,ja",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const changeLang = (lang: { code: string; country: string; label: string }) => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event("change"));
      setCurrentLang(lang); // update label & flag
      setOpen(false); // tutup menu
    }
  };

  return (
    <div className="relative">
      {/* Hidden Google Translate */}
      <div id="google_translate_element" className="hidden"></div>

      {/* Tombol bahasa aktif */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1 rounded-md bg-white shadow hover:bg-gray-100 transition"
      >
        <ReactCountryFlag
          countryCode={currentLang.country}
          svg
          style={{ width: "1.5em", height: "1.5em" }}
        />
        <span className="text-sm">{currentLang.label}</span>
      </button>

      {/* Dropdown bahasa lain */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-50">
          {languages
            .filter((l) => l.code !== currentLang.code)
            .map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLang(lang)}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 transition"
              >
                <ReactCountryFlag
                  countryCode={lang.country}
                  svg
                  style={{ width: "1.5em", height: "1.5em" }}
                />
                {lang.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
