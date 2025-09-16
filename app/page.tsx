"use client";

import Nav from "@/component/nav";
import Hero from "@/component/hero";
import About from "@/component/sections/about";
import Education from "@/component/sections/education";
import Experience from "@/component/sections/experience";
import Projects from "@/component/sections/projects";
import Organization from "@/component/sections/organizations";
import Certification from "@/component/sections/certifications";
import Skills from "@/component/sections/skills";
import Contact from "@/component/sections/contact";
import Footer from "@/component/footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <section className="relative z-90 shadow-[0_7px_7px_rgba(0,0,0,0.4)]">
      <Hero />
      </section>

      <section className="relative z-80 bg-[#f7f7f7] shadow-[0_7px_7px_rgba(0,0,0,0.4)]">
        <About />
      </section>

      <section className="relative z-70 bg-white shadow-[0_7px_7px_rgba(0,0,0,0.4)]">
        <Education />
      </section>

      <section className="relative z-60 bg-[#f7f7f7] shadow-[0_7px_7px_rgba(0,0,0,0.4)]">
        <Experience />
      </section>

      <section className="relative z-50 bg-white shadow-[0_7px_7px_rgba(0,0,0,0.4)]">
        <Projects />
      </section>

      <section className="relative z-40 bg-[#f7f7f7] shadow-[0_7px_7px_rgba(0,0,0,0.4)]">
        <Organization />
      </section>

      <section className="relative z-30 bg-white shadow-[0_7px_7px_rgba(0,0,0,0.4)]">
        <Certification />
      </section>

      <section className="relative z-20 bg-[#f7f7f7] shadow-[0_7px_7px_rgba(0,0,0,0.4)]">
        <Skills />
      </section>

      <section className="relative z-10 bg-white shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
