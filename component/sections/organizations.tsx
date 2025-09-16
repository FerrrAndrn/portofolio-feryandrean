"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Section from "@/component/section";
import Card from "@/component/card";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface OrganizationItem {
  role: string;
  org: string;
  period: string;
  logos: string[];
  cabinet?: string;
  bullets: string[];
  documentation?: string[];
  certificate?: string[];
}

export default function Organization() {
  const { t } = useLanguage();
  const organizations: OrganizationItem[] =
    (t("organizationSection.items") as OrganizationItem[]) || [];

  const [openItem, setOpenItem] = useState<OrganizationItem | null>(null);
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
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomGallery) setZoomGallery(null);
        else setOpenItem(null);
      }
    };
    if (openItem || zoomGallery) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openItem, zoomGallery]);

  return (
    <Section
      id="organization"
      className="bg-[#eff0f1] shadow-[0_7px_7px_rgba(0,0,0,0.4)]"
      title={
        <span className="text-3xl font-bold mb-8 text-center title-gradient drop-shadow-md">
          {t("organizationSection.title")}
        </span>
      }
    >

     <div className="grid gap-6 md:grid-cols-2 text-justify">
        {organizations.map((org, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: false }} // animasi aktif terus
            className="bg-white/95 rounded-xl p-4 backdrop-blur
              shadow-[0_4px_10px_rgba(0,0,0,0.3)]
              transition-all duration-300 ease-out
              hover:-translate-y-3 hover:shadow-[0_8px_20px_rgba(0,0,0,0.45)]
              flex flex-col justify-between text-center h-full"
          >
            <p className="text-sm font-bold text-[#001f3f] mb-1">{org.org}</p>

            <div className="flex flex-col items-center mb-3 leading-snug">
              <h3 className="text-sm font-semibold text-gray-700">{org.role}</h3>
              <p className="text-xs font-semibold text-gray-700">{org.period}</p>
            </div>

            <div className="flex items-center justify-center gap-6 mb-3">
              {org.logos.map((logo, idx) => (
                <img
                  key={idx}
                  src={logo}
                  alt={`logo ${idx + 1}`}
                  className={`${
                    idx === 0 ? "w-20 h-20" : "w-24 h-24"
                  } object-contain drop-shadow`}
                />
              ))}
            </div>

            {org.cabinet && (
              <p className="text-sm font-bold text-gray-800 mb-3">{org.cabinet}</p>
            )}

            <div>
              <button
                onClick={() => setOpenItem(org)}
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
          </motion.div>
        ))}
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openItem && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenItem(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white/95 backdrop-blur-lg rounded-xl max-w-4xl w-full p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setOpenItem(null)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
                  >
                    <X size={24} />
                  </button>

                  <div className="text-center mb-6">
                    <p className="text-base font-bold text-[#001f3f]">
                      {openItem.org}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-700">
                      {openItem.role}
                    </h3>
                    <p className="text-sm font-semibold text-gray-700">
                      {openItem.period}
                    </p>

                    <div className="flex items-center justify-center gap-6 mb-3">
                      {openItem.logos.map((logo, idx) => (
                        <img
                          key={idx}
                          src={logo}
                          alt={`logo ${idx + 1}`}
                          className={`${
                            idx === 0 ? "w-24 h-24" : "w-36 h-36"
                          } object-contain drop-shadow`}
                        />
                      ))}
                    </div>

                    {openItem.cabinet && (
                      <p className="text-sm font-bold text-gray-800">
                        {openItem.cabinet}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-gray-300 pt-6 mt-6">
                    <h4 className="font-bold text-[#001f3f] mb-4 text-center uppercase">
                      {t("jobdesc")}
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 text-left">
                      {openItem.bullets?.length ? (
                        openItem.bullets.map((b, idx) => <li key={idx}>{b}</li>)
                      ) : (
                        <li className="italic text-gray-500">
                          {t("noDetailsAvailable") || "Detail belum tersedia"}
                        </li>
                      )}
                    </ul>
                  </div>

                  {openItem.documentation?.length > 0 && (
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

                  {openItem.certificate?.length > 0 && (
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
                <div className="relative w-full max-w-6xl h-[90vh]">
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
