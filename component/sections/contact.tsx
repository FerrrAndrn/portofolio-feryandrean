"use client";

import { motion } from "framer-motion";
import Section from "@/component/section";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const contactSection = t("contactSection");
  const contacts = contactSection.contacts || [];

  return (
    <Section id="contact">
      <div className="text-center -mt-10">
        <h2 className="text-3xl font-bold text-[#001f3f]">
          {contactSection.title}
        </h2>
        <p className="text-lg font-bold text-[#001f3f] mt-3">
          {contactSection.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-26 text-[#001f3f] mt-6 px-6 md:px-12">
        <motion.div
          className="text-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h3 className="font-bold text-xl text-center mb-6">
            {contactSection.addressTitle}
          </h3>
          <div className="flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              alt="Location Icon"
              className="w-6 h-6"
            />
            <p className="text-lg leading-relaxed font-medium text-justify">
              {contactSection.address}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="text-left"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h3 className="font-bold text-xl text-center mb-6">
            {contactSection.mediaTitle}
          </h3>
          <div className="flex flex-col gap-2 pl-4">
            {contacts.map((c: any, i: number) => (
              <motion.a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{ scale: 1.03, x: 2 }}
                className={`flex items-center gap-3 px-3 py-1.5 rounded-lg transition text-lg font-medium ${c.hover} bg-transparent`}
              >
                <motion.img
                  src={c.icon}
                  alt={c.name}
                  className="w-7 h-7 bg-transparent"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <span>{c.text}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
