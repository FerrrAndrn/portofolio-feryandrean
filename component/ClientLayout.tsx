"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import LanguageSwitcher from "@/component/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

function HtmlWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      {children}
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <HtmlWrapper>{children}</HtmlWrapper>
    </LanguageProvider>
  );
}
