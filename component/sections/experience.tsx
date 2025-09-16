"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { X } from "lucide-react";
import Section from "@/component/section";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface ExperienceItem {
  role: string;
  org: string;
  orgKey?: string;
  period: string;
  bullets: string[];
  documentation?: string[];
  certificate?: string[];
}

export default function Experience() {
  const { t } = useLanguage();
  const experiences: ExperienceItem[] =
    (t("experienceSection.items") as ExperienceItem[]) || [];

  const logoMap: Record<string, string> = {
    telkom: "/logos/telkom.png",
    pemkot: "/logos/pemkot.png",
  };

  const [openItem, setOpenItem] = useState<ExperienceItem | null>(null);
  const [zoomGallery, setZoomGallery] = useState<{
    images: string[];
    index: number;
  } | null>(null);

  useEffect(() => {
    if (openItem || zoomGallery) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openItem, zoomGallery]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomGallery) setZoomGallery(null);
        else setOpenItem(null);
      }
    };
    if (openItem || zoomGallery) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [openItem, zoomGallery]);

  return (
    <Section
      id="experience"
      className="bg-[#eff0f1] shadow-[0_7px_7px_rgba(0,0,0,0.4)]"
      title={
        <div className="flex justify-center">
          <span className="text-3xl font-bold mb-8 title-gradient drop-shadow-md">
            {t("experienceSection.title")}
          </span>
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 text-justify">
        {experiences.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: false }}
          >
            <div
              className="bg-white/95 rounded-xl p-4 backdrop-blur
                shadow-[0_4px_10px_rgba(0,0,0,0.3)]
                transition-all duration-300 ease-out
                hover:-translate-y-3 hover:shadow-[0_8px_20px_rgba(0,0,0,0.45)]
                flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={logoMap[e.orgKey || ""] || "/images/default.png"}
                    alt={e.org}
                    className="w-12 h-12 object-contain drop-shadow"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#001f3f]">
                      {e.org}
                    </p>
                    <h3 className="text-sm text-gray-500">{e.role}</h3>
                    <p className="text-sm text-gray-500">{e.period}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex justify-center">
                <button
                  onClick={() => setOpenItem(e)}
                  className="px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition"
                  style={{
                    background:
                      "linear-gradient(to right,#001f3f,#003366,#004080,#014f9d,#004080,#003366,#001f3f)",
                    color: "#ffffff",
                  }}
                >
                  {t("viewDetails")}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openItem && (
              <motion.div
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/95 backdrop-blur-lg rounded-xl max-w-4xl w-full p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl"
                >
                  <button
                    onClick={() => setOpenItem(null)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={logoMap[openItem.orgKey || ""] || "/images/default.png"}
                      alt={openItem.org}
                      className="w-20 h-20 object-contain drop-shadow"
                    />
                    <div>
                      <p className="text-base font-semibold text-[#001f3f]">
                        {openItem.org}
                      </p>
                      <h3 className="text-sm text-gray-500">{openItem.role}</h3>
                      <p className="text-sm text-gray-500">{openItem.period}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-6 mt-6">
                    <h4 className="font-bold text-[#001f3f] mb-4 text-center uppercase">
                      {t("jobdesc")}
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {openItem.bullets && openItem.bullets.length > 0 ? (
                        openItem.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))
                      ) : (
                        <li className="italic text-gray-500">
                          {t("noDetailsAvailable") || "Detail belum tersedia"}
                        </li>
                      )}
                    </ul>
                  </div>

                  {openItem.documentation &&
                    openItem.documentation.length > 0 && (
                      <div className="border-t border-gray-300 pt-6 mt-6">
                        <h4 className="font-bold text-[#001f3f] mb-4 text-center uppercase">
                          {t("documentation")}
                        </h4>
                        <Swiper
                          spaceBetween={20}
                          slidesPerView={3}
                          navigation
                          pagination={{ clickable: true }}
                          modules={[Navigation, Pagination]}
                          breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                          }}
                          className="rounded-lg"
                        >
                          {openItem.documentation.map((doc, idx) => (
                            <SwiperSlide key={idx}>
                              <img
                                src={doc}
                                alt={`Documentation ${idx + 1}`}
                                className="w-full h-64 object-contain rounded-lg cursor-zoom-in"
                                onClick={() =>
                                  setZoomGallery({
                                    images: openItem.documentation || [],
                                    index: idx,
                                  })
                                }
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    )}

                  {openItem.certificate && openItem.certificate.length > 0 && (
                    <div className="border-t border-gray-300 pt-6 mt-6 text-center">
                      <h4 className="font-bold text-[#001f3f] mb-4 text-center uppercase">
                        {t("certificate")}
                      </h4>
                      <div className="flex flex-col items-center gap-4">
                        {openItem.certificate.map((cert, idx) => (
                          <img
                            key={idx}
                            src={cert}
                            alt={`Certificate ${idx + 1}`}
                            className="max-w-sm w-full rounded-lg shadow-md cursor-zoom-in"
                            onClick={() =>
                              setZoomGallery({
                                images: openItem.certificate || [],
                                index: idx,
                              })
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {zoomGallery && (
              <motion.div
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-[10000]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="relative max-w-6xl w-full">
                  <button
                    onClick={() => setZoomGallery(null)}
                     className="absolute -top-1 right-4 z-50 flex items-center justify-center gap-2
                              px-3 py-1 rounded-full bg-white text-black font-semibold text-sm
                              shadow-lg shadow-black/40
                              transition-all duration-300 ease-in-out
                              hover:brightness-90 hover:scale-110 hover:shadow-xl active:scale-95"
                              >
                  {t("close")}
                  <span className="font-extrabold text-base">✕</span>
                  </button>
                  <Swiper
                    initialSlide={zoomGallery.index}
                    navigation
                    pagination={{ clickable: true }}
                    keyboard={{ enabled: true }}
                    modules={[Navigation, Pagination, Keyboard]}
                    className="h-full w-full"
                  >
                    {zoomGallery.images.map((img, idx) => (
                      <SwiperSlide
                        key={idx}
                        className="!flex !items-center !justify-center h-full w-full"
                      >
                        <img
                          src={img}
                          alt={`Zoomed ${idx + 1}`}
                          className="max-h-[85vh] max-w-full object-contain shadow-lg"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </Section>
  );
}
