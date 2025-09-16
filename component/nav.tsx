"use client";
import { useState, useEffect } from "react";
import { Menu, HouseIcon } from "lucide-react";
import LanguageSwitcher from "@/component/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const links = [
  { href: "#about", key: "about" },
  { href: "#education", key: "education" },
  { href: "#experience", key: "experience" },
  { href: "#projects", key: "projects" },
  { href: "#organization", key: "organization" },
  { href: "#certifications", key: "certifications" },
  { href: "#skills", key: "skills" },
  { href: "#contact", key: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      const selectors = ["#home", ...links.map((l) => l.href)];
      let current = "#home";

      selectors.forEach((s) => {
        const el = document.querySelector(s);
        if (el instanceof HTMLElement) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = s;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full bg-[#001f3f] shadow-[0_8px_8px_rgba(0,0,0,0.4)] z-[100]">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#home"
          className={`relative flex items-center gap-1 text-base font-semibold transition-all duration-300 ease-in-out
            after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-400 after:transition-all after:duration-300 after:ease-in-out
            ${
              active === "#home"
                ? "text-yellow-400 after:w-full"
                : "text-white hover:text-yellow-400 after:w-0 hover:after:w-full"
            }`}
        >
          <HouseIcon size={18} strokeWidth={2.3} />
          {t("home")}
        </a>

        <nav className="hidden md:flex gap-6 text-base items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative font-semibold transition-all duration-300 ease-in-out
                after:absolute after:h-[2px] after:left-0 after:-bottom-1 after:bg-yellow-400 after:transition-all after:duration-300 after:ease-in-out
                ${
                  active === l.href
                    ? "text-yellow-400 after:w-full"
                    : "text-white hover:text-yellow-400 after:w-0 hover:after:w-full"
                }`}
            >
              {t(l.key)}
            </a>
          ))}
          <LanguageSwitcher />
        </nav>

        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          <Menu />
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4 bg-[#001f3f] shadow-[0_10px_10px_rgba(0,0,0,0.5)] z-[101]">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className={`font-semibold text-base transition-all duration-300 ease-in-out ${
              active === "#home" ? "text-yellow-400 underline" : "text-white"
            } hover:text-yellow-400 hover:underline`}
          >
            {t("home")}
          </a>

          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`font-semibold text-base transition-all duration-300 ease-in-out ${
                active === l.href ? "text-yellow-400 underline" : "text-white"
              } hover:text-yellow-400 hover:underline`}
            >
              {t(l.key)}
            </a>
          ))}

          <LanguageSwitcher />
        </div>
      )}
    </header>
  );
}
