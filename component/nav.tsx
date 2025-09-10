"use client";
import { useState } from "react";
import { Menu } from "lucide-react";
import LanguageSwitcher from "@/component/LanguageSwitcher"; // ✅ tambahin

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-[#001f3f] shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="text-white font-bold text-lg hover:text-yellow-400 transition"
        >
          Fery Andrean
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white hover:text-yellow-400 transition relative after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-yellow-400 hover:after:w-full after:transition-all"
            >
              {l.label}
            </a>
          ))}
          {/* ✅ Tambahin LanguageSwitcher di nav kanan */}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          <Menu />
        </button>
      </div>

      {/* Drawer Mobile */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4 bg-[#001f3f]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white hover:text-yellow-400"
            >
              {l.label}
            </a>
          ))}
          {/* ✅ Tambahin juga LanguageSwitcher biar bisa diakses di mobile */}
          <LanguageSwitcher />
        </div>
      )}
    </header>
  );
}
