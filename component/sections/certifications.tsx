"use client";

import { useState } from "react";
import Section from "@/component/section";
import Card from "@/component/card";
import { profile } from "@/data/profile";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export default function Certifications() {
  const [openCert, setOpenCert] = useState<string | null>(null);

  // Pilih bahasa (bisa ganti ke "id")
  const language = "en";

  const translations = {
    en: {
      button: "View Certificate",
      preview: "Certificate Preview",
      close: "Close",
    },
    id: {
      button: "Lihat Sertifikat",
      preview: "Pratinjau Sertifikat",
      close: "Tutup",
    },
  };

  const t = translations[language];

  return (
    <Section
      id="certifications"
      title={
        <span className="bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] bg-clip-text text-transparent">
          Certifications
        </span>
      }
    >
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={false} // mentok kiri/kanan
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 2,
          slideShadows: false,
        }}
        navigation={true}
        modules={[EffectCoverflow, Navigation]}
        className="my-10"
      >
        {profile.certifications.map((c, i) => (
          <SwiperSlide key={i}>
            <Card className="text-center cursor-default hover:scale-105 hover:shadow-xl transition-transform">
              {/* Logos sejajar */}
              {c.logos && (
                <div className="flex justify-center items-center gap-3 mb-3">
                  {c.logos.map((logo, idx) => (
                    <img
                      key={idx}
                      src={logo}
                      alt={`${c.name} by ${c.issuer}`}
                      className="h-10 object-contain"
                    />
                  ))}
                </div>
              )}

              {/* Certification Name */}
              <h3 className="font-semibold text-[#001f3f]">{c.name}</h3>

              {/* Issuer + Year */}
              <p className="text-sm text-gray-600 mt-1">
                {c.issuer} — {c.year}
              </p>

              {/* Tombol gradient */}
              <button
                onClick={() => setOpenCert(c.link)}
                className="mt-3 inline-block rounded-lg bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] px-4 py-2 text-white hover:opacity-90 transition"
              >
                {t.button}
              </button>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal PDF Viewer */}
      {openCert && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full h-[85vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b bg-[#001f3f] text-white">
              <h2 className="font-semibold">{t.preview}</h2>
              <button
                className="text-red-400 hover:text-red-600 font-bold"
                onClick={() => setOpenCert(null)}
              >
                ✕ {t.close}
              </button>
            </div>
            {/* PDF Viewer pakai embed biar gak auto-download */}
            <embed
              src={openCert}
              type="application/pdf"
              className="flex-1 w-full"
            />
          </div>
        </div>
      )}
    </Section>
  );
}
