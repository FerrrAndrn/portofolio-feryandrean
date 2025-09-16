"use client";
import { useLanguage } from "@/context/LanguageContext";
import Section from "@/component/section";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useLanguage();

  return (
    <Section
      id="about"
      className="bg-[#eff0f1] shadow-[0_7px_7px_rgba(0,0,0,0.4)]"
      title={
        <div className="flex justify-center">
          <span className="text-3xl font-bold mb-5 title-gradient drop-shadow-md">
            {t("aboutSection.title")}
          </span>
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-3xl mx-auto bg-white/95 rounded-xl p-4 backdrop-blur
          shadow-[0_4px_10px_rgba(0,0,0,0.3)]
          transition-all duration-300 ease-out
          hover:-translate-y-3 hover:shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
      >
        <p className="text-lg text-gray-800 leading-relaxed text-justify">
          {t("aboutSection.content")}
        </p>
      </motion.div>
    </Section>
  );
}
