"use client";

import { useState, useEffect } from "react";
import Section from "@/component/section";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Skills() {
  const { t } = useLanguage();
  const skills = t("skillsSection.categories") as {
    category: string;
    items: { name: string; icon: string }[];
  }[];

  const [openGroup, setOpenGroup] = useState<any>(null);

  useEffect(() => {
    if (openGroup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openGroup]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    if (openGroup) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [openGroup]);

  return (
    <Section
      id="skills"
      className="bg-[#eff0f1] shadow-[0_7px_7px_rgba(0,0,0,0.4)]"
      title={
        <span className="text-3xl font-bold mb-8 text-center title-gradient drop-shadow-md">
          {t("skillsSection.title")}
        </span>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skillGroup, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: false }}
            onClick={() => setOpenGroup(skillGroup)}
            className="bg-white/95 rounded-xl p-6 backdrop-blur cursor-pointer
              shadow-[0_4px_10px_rgba(0,0,0,0.3)]
              transition-all duration-300 ease-out
              hover:-translate-y-3 hover:shadow-[0_8px_20px_rgba(0,0,0,0.45)]
              flex flex-col h-full"
          >
            <h3 className="font-semibold text-[#001f3f] mb-4 text-center">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {skillGroup.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg 
                             bg-gray-100 hover:bg-gray-200 transition 
                             shadow-sm hover:shadow-md"
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openGroup && (
              <motion.div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenGroup(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/95 backdrop-blur-lg rounded-xl max-w-2xl w-full p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl"
                >
                  <button
                    onClick={() => setOpenGroup(null)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
                  >
                    <X size={24} />
                  </button>

                  <h3 className="text-lg font-bold text-[#001f3f] mb-6 text-center">
                    {openGroup.category}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {openGroup.items.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-100 shadow-sm"
                      >
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="w-10 h-10 object-contain"
                        />
                        <span className="text-sm font-medium text-center">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </Section>
  );
}
