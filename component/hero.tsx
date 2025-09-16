"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Section from "@/component/section";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const { t } = useLanguage();
  const hello: string = String(t("hero.hello"));
  const typing: string = String(t("hero.typing"));
  const typeSpeed = 75;

  const [hashKey, setHashKey] = useState("home");

  useEffect(() => {
    const updateHash = () => {
      setHashKey(window.location.hash || "home");
    };
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <Section
      key={hashKey}
      id="home"
      className="relative flex items-center h-screen text-white bg-[#001f3f] overflow-hidden"
      title=""
    >
      <div className="absolute inset-0 z-0 bg-[#001f3f]" />

      <div className="relative z-10 container mx-auto max-w-7xl px-6">
        <div className="max-w-xl space-y-5 ml-0 md:ml-8">
          <motion.p
            className="text-xl md:text-2xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {hello}
          </motion.p>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <ReactTyped
              key={hashKey}
              strings={[typing]}
              typeSpeed={typeSpeed}
              showCursor={false}
              loop={false}
            />
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            {t("hero.role")}
          </motion.p>

          <motion.p
            className="text-md md:text-lg text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            {t("hero.experience")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center bg-[#FFC107] hover:bg-[#e6a800] 
                         text-[#001f3f] font-extrabold px-6 py-3 rounded-lg 
                         shadow-[0_4px_8px_rgba(0,0,0,0.25),0_12px_20px_rgba(0,0,0,0.3)]
                         hover:shadow-[0_6px_12px_rgba(0,0,0,0.35),0_16px_32px_rgba(0,0,0,0.45)]
                         transition-all transform hover:scale-105"
            >
              {t("hero.button")}
              <ArrowRight
                className="ml-2 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 text-[#001f3f]"
                strokeWidth={3}
              />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute top-0 right-0 bottom-0 w-1/2 md:w-[40%] h-full
                  shadow-[0_16px_36px_rgba(0,0,0,0.5)] overflow-hidden"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/fercr.jpg"
            alt="Profile photo"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-black/70 md:hidden" />
        </div>
      </motion.div>

    </Section>
  );
}
