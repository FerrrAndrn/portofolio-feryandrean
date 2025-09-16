"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Keyboard } from "swiper/modules";
import { useLanguage } from "@/context/LanguageContext";
import { Download, X } from "lucide-react";
import { createPortal } from "react-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Education() {
  const { t } = useLanguage();
  const [openCert, setOpenCert] = useState<any>(null);
  const [zoomGallery, setZoomGallery] = useState<{ images: string[]; index: number } | null>(null);

  const edu = t("educationSection");

  useEffect(() => {
    if (openCert || zoomGallery) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openCert, zoomGallery]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomGallery) setZoomGallery(null);
        else setOpenCert(null);
      }
    };
    if (openCert || zoomGallery) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [openCert, zoomGallery]);

  const renderCard = (c: any, i: number) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
      viewport={{ once: false }}
      className="relative w-full h-[190px] min-h-[190px] p-5 rounded-xl bg-white/95 backdrop-blur
                 flex flex-col items-center justify-center gap-4 text-center
                 transition-all duration-500 ease-out
                 shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                 hover:-translate-y-4 hover:shadow-[0_8px_20px_rgba(0,0,0,0.45)]
                 hover:z-[999]"
    >
      <div className="flex justify-center gap-4">
        {(c.logos || ["/logos/untidar.png", "/logos/hmte.png"]).map(
          (logo: string, idx: number) => (
            <img
              key={idx}
              src={logo}
              alt="logo"
              className="h-12 object-contain drop-shadow"
            />
          )
        )}
      </div>

      <h4 className="font-semibold text-base text-[#001f3f]">{c.name}</h4>

      <button
        onClick={() => setOpenCert(c)}
        className="px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition text-sm font-medium"
        style={{
          background:
            "linear-gradient(to right,#001f3f,#003366,#004080,#014f9d,#004080,#003366,#001f3f)",
          color: "#ffffff",
        }}
      >
        {t("viewCertificate")}
      </button>
    </motion.div>
  );

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <span className="text-3xl font-bold mb-8 title-gradient drop-shadow-md">
            {edu.title}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-[#ffffff] shadow-[0_2px_8px_rgba(0,0,0,0.3)] rounded-xl p-6 mb-10 text-center"
        >
          <h3 className="font-semibold text-[#001f3f]">{edu.university}</h3>
          <p className="text-gray-600">{edu.period}</p>
          <p className="mt-2 font-medium">
          <span className="text-[#001f3f]">{edu.gpa}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="pt-4 mt-6"
        >
          <h3 className="text-xl font-semibold text-center mb-3 text-[#001f3f]">
            {t("educationSection.relevantTitle")}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-700">
            {edu.relevant.map((c: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-full shadow-sm"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="border-t border-gray-400 pt-8 mt-8"
        >
          <h3 className="text-xl font-semibold text-center text-[#001f3f] mb-3">
            {t("educationSection.labTitle")}
          </h3>

          {edu.laboratory.length > 3 ? (
            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides
              loop={false}
              spaceBetween={20}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 1,
                slideShadows: false,
              }}
              navigation
              modules={[EffectCoverflow, Navigation]}
              className="max-w-6xl !py-4 !mt-0 overflow-visible"
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {edu.laboratory.map((c: any, i: number) => (
                <SwiperSlide
                  key={i}
                  className="!w-[380px] flex justify-center overflow-visible"
                >
                  {renderCard(c, i)}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[10px]">
              {edu.laboratory.map((c: any, i: number) => renderCard(c, i))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="border-t border-gray-400 pt-10 mt-10"
        >
          <h3 className="text-xl font-semibold text-center mb-6 text-[#001f3f]">
            {t("educationSection.lecTitle")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] justify-items-center">
            {edu.lecturer.map((c: any, i: number) => renderCard(c, i))}
          </div>
        </motion.div>
      </div>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openCert && (
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
                  className="bg-white/95 backdrop-blur-lg rounded-xl max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh] shadow-2xl"
                >

                <div className="flex items-center gap-4 pb-4 border-b border-gray-400">
                  <div className="flex gap-2">
                    <img
                      src="/logos/untidar.png"
                      alt="Untidar Logo"
                      className="w-11 h-11"
                    />
                    <img
                      src="/logos/hmte.png"
                      alt="HMTE Logo"
                      className="w-11 h-11"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="font-semibold text-lg text-[#001f3f]">{openCert.name}</h2>
                    {openCert.date && (
                      <p className="text-sm text-gray-500">{openCert.date}</p>
                    )}
                  </div>

                  <div className="flex gap-3 items-center">
                    {openCert.pdf && (
                      <a
                        href={openCert.pdf}
                        download
                        className="hover:scale-110 hover:opacity-80 transition transform"
                      >
                        <Download size={20} />
                      </a>
                    )}
                    <button
                      className="hover:scale-110 hover:opacity-80 transition transform"
                      onClick={() => setOpenCert(null)}
                    >
                      <X size={22} />
                    </button>
                  </div>
                </div>

                {openCert.jobdesc && (
                  <div className="pt-2 mt-2">
                    <h4 className="font-bold text-[#001f3f] mb-3 text-center uppercase">
                      {t("jobdesc")}
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
                      {openCert.jobdesc.map((d: string, idx: number) => (
                        <li key={idx}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}

                  {openCert.previewImg && (
                    <div className="border-t border-gray-400 pt-4 mt-4 text-center">
                      <h4 className="font-bold text-[#001f3f] mb-4 text-center uppercase">
                        {t("certificate")}
                      </h4>
                      <img
                        src={openCert.previewImg}
                        alt="Certificate Preview"
                        className="mx-auto max-h-[60vh] object-contain cursor-zoom-in rounded shadow"
                        onClick={() =>
                          setZoomGallery({
                            images: [openCert.previewImg],
                            index: 0,
                          })
                        }
                      />
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
    </section>
  );
}
