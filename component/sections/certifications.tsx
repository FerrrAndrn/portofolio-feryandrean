"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Keyboard } from "swiper/modules";
import { createPortal } from "react-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Download, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Certifications() {
  const { t } = useLanguage();
  const [openCert, setOpenCert] = useState<any>(null);
  const [zoomGallery, setZoomGallery] = useState<{ images: string[]; index: number } | null>(null);

  const certs = t("certificationsSection.items");
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
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoomGallery) setZoomGallery(null);
        else setOpenCert(null);
      }
    };
    if (openCert || zoomGallery) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openCert, zoomGallery]);

  const renderCard = (c: any, i: number) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: i * 0.03 }}
      viewport={{ once: false }}
      className="relative z-10 w-full min-h-[230px] p-6 rounded-xl bg-white/95 backdrop-blur flex flex-col justify-between text-center
        transition-all duration-300 ease-out
        shadow-[0_2px_8px_rgba(0,0,0,0.3)] 
        hover:-translate-y-3 hover:shadow-[0_8px_20px_rgba(0,0,0,0.45)]
        hover:z-[50]"
    >
      <div className="flex justify-center items-center gap-3 mb-3">
        {c.logos.map((logo: string, idx: number) => (
          <img key={idx} src={logo} alt={`${c.name} logo`} className="h-10 object-contain" />
        ))}
      </div>

      <h3 className="font-semibold text-[#001f3f]">{c.name}</h3>
      <p className="text-sm text-gray-600">
        {c.issuer} — {c.year}
      </p>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setOpenCert(c)}
          className="px-5 py-2 rounded-lg shadow-md hover:opacity-90 transition"
          style={{
            background:
              "linear-gradient(to right,#001f3f,#003366,#004080,#014f9d,#004080,#003366,#001f3f)",
            color: "#ffffff",
          }}
        >
          {t("viewCertificate")}
        </button>
      </div>
    </motion.div>
  );
  return (
    <section
      id="certifications"
      className="shadow-[0_7px_7px_rgba(0,0,0,0.4)] py-20"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-center">
          <span className="text-3xl font-bold mb-8 title-gradient drop-shadow-md">
            {t("certificationsSection.title")}
          </span>
        </div>
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
          className="my-10 max-w-6xl justify-center !py-4"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {certs.map((c: any, i: number) => (
            <SwiperSlide key={i} className="!w-[380px] flex justify-center overflow-visible">
              {renderCard(c, i)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {openCert && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenCert(null)}
              >
                <motion.div
                  className="bg-white rounded-xl shadow-2xl max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="flex justify-between items-center p-3 border-b text-white"
                    style={{
                      background:
                        "linear-gradient(to right,#001f3f,#003366,#004080,#014f9d,#004080,#003366,#001f3f)",
                    }}
                  >
                    <div className="w-12"></div>
                    <h2 className="font-semibold text-lg text-center flex-1">{openCert.name}</h2>
                    <div className="flex gap-4 items-center justify-end w-12">
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
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center items-center bg-white">
                    <img
                      src={
                        Array.isArray(openCert.previewImg)
                          ? openCert.previewImg[0]
                          : openCert.previewImg
                      }
                      alt="Certificate Preview"
                      className="max-h-[75vh] max-w-[95%] object-contain cursor-zoom-in"
                      onClick={() =>
                        setZoomGallery({
                          images: Array.isArray(openCert.previewImg)
                            ? openCert.previewImg
                            : [openCert.previewImg],
                          index: 0,
                        })
                      }
                    />
                  </div>
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
    </section>
  );
}
