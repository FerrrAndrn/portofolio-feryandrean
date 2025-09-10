"use client";

import Nav from "@/component/nav";
import Hero from "@/component/hero";
import About from "@/component/sections/about";
import Experience from "@/component/sections/experience";
import Projects from "@/component/sections/projects";
import Certification from "@/component/sections/certifications";
import Skills from "@/component/sections/skills";
import Contact from "@/component/sections/contact";
import Footer from "@/component/footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certification /> {/* 🔥 render Certification di sini */}
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
