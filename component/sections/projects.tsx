"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Keyboard } from "swiper/modules";
import { createPortal } from "react-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Section from "@/component/section";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectItem {
  name: string;
  image: string;
  year: string;
  description: string;
  details?: {
    overview?: string;
    features?: Record<string, string[]> | string[];
    documentation?: string[];
    license?: {
      text?: string;
      image?: string;
    };
  };
}

export default function Projects() {
  const { t } = useLanguage();
  const projects: ProjectItem[] = (t("projectsSection.items") as ProjectItem[]) || [];

  const [openItem, setOpenItem] = useState<ProjectItem | null>(null);
  const [zoomGallery, setZoomGallery] = useState<{ images: string[]; index: number } | null>(null);

  useEffect(() => {
    if (openItem || zoomGallery) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (zoomGallery) setZoomGallery(null);
          else setOpenItem(null);
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [openItem, zoomGallery]);

  return (
    <Section
      id="projects"
      className="bg-[#ffffff] shadow-[0_7px_7px_rgba(0,0,0,0.4)]"
      title={
        <span className="text-3xl font-bold mb-8 text-center title-gradient drop-shadow-md">
          {t("projectsSection.title")}
        </span>
      }
    >
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
        {projects.map((p, i) => (
          <SwiperSlide key={i} className="!w-[380px] flex justify-center overflow-visible">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative z-10 w-full min-h-[200px] p-6 rounded-xl bg-white/95 backdrop-blur
                flex flex-col justify-between text-center
                shadow-[0_4px_10px_rgba(0,0,0,0.3)]
                transition-all duration-300 ease-out
                hover:-translate-y-3 hover:shadow-[0_8px_20px_rgba(0,0,0,0.45)]
                hover:z-[50]"
            >
              <div className="flex-grow flex items-center justify-center w-full mb-3">
                <img src={p.image} alt={p.name} className="max-h-16 max-w-full object-contain" />
              </div>

              <p className="text-lg text-gray-800 mb-3">{p.year}</p>

              <div className="mb-3">
                <button
                  onClick={() => setOpenItem(p)}
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
          </SwiperSlide>
        ))}
      </Swiper>

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
                  className="bg-white/95 backdrop-blur-lg rounded-xl max-w-4xl w-full p-8 relative overflow-y-auto max-h-[90vh] shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <button
                    onClick={() => setOpenItem(null)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl font-bold"
                  >
                    ✕
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={openItem.image}
                      alt={openItem.name}
                      className="w-20 h-20 object-contain drop-shadow"
                    />
                    <div>
                      <h2 className="text-lg font-bold text-[#001f3f]">{openItem.name}</h2>
                      <p className="text-sm text-gray-600">{openItem.year}</p>
                      {openItem.description && (
                        <p className="text-sm text-gray-600">{openItem.description}</p>
                      )}
                    </div>
                  </div>

                  {openItem.details?.overview && (
                    <div className="border-t border-gray-300 pt-6 mt-6">
                      <h4 className="font-bold text-[#001f3f] mb-4 text-center uppercase">
                        {t("overview")}
                      </h4>
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {openItem.details.overview}
                      </p>
                    </div>
                  )}

                  {openItem.details?.features && (
                    <div className="border-t border-gray-300 pt-6 mt-6">
                      <h4 className="font-bold text-[#001f3f] mb-4 text-center uppercase">
                        {t("features")}
                      </h4>
                      {Object.entries(openItem.details.features).map(([category, list], idx) => (
                        <div key={idx} className="mb-4">
                          <p className="font-semibold text-gray-800">{category}</p>
                          <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {(list as string[]).map((f, i2) => (
                              <li key={i2}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {openItem.details?.documentation &&
                    openItem.details.documentation.length > 0 && (
                      <div className="border-t pt-6 mt-6">
                        <h4 className="font-bold text-[#001f3f] mb-4 text-center uppercase">
                          {t("documentation")}
                        </h4>
                        <Swiper
                          spaceBetween={15}
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
                          {openItem.details.documentation.map((doc, idx) => (
                            <SwiperSlide key={idx}>
                              <img
                                src={doc}
                                alt={`Documentation ${idx + 1}`}
                                className="w-full h-64 object-contain rounded-lg cursor-zoom-in"
                                onClick={() =>
                                  setZoomGallery({
                                    images: openItem.details?.documentation || [],
                                    index: idx,
                                  })
                                }
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    )}

                  {openItem.details?.license && (
                    <div className="border-t border-gray-300 pt-6 mt-6 text-center">
                      <h4 className="font-bold text-[#001f3f] mb-4 text-center uppercase">
                        {t("license")}
                      </h4>

                      {openItem.details.license.text && (
                        <p className="text-gray-700 mb-4">{openItem.details.license.text}</p>
                      )}

                      {openItem.details.license.image && (
                        <motion.img
                          src={openItem.details.license.image}
                          alt="HKI License"
                          className="max-w-xs w-full object-contain cursor-zoom-in mx-auto"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          onClick={() =>
                            setZoomGallery({
                              images: [openItem.details?.license?.image || ""],
                              index: 0,
                            })
                          }
                        />
                      )}
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
