"use client";

import Section from "@/component/section";
import Card from "@/component/card";
import Image from "next/image";
import { profile } from "@/data/profile";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

export default function Projects() {
  return (
    <Section
      id="projects"
      title={
        <span className="bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] bg-clip-text text-transparent">
          Projects
        </span>
      }
    >
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // tampil 3 slide
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
        {profile.projects.map((p, i) => (
          <SwiperSlide key={i}>
            <Card className="p-4 text-center">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={600}
                  height={300}
                  className="rounded-xl mb-3"
                />
              )}
              <h3 className="font-semibold text-[#001f3f]">{p.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}
