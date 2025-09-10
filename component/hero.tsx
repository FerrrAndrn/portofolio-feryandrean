"use client";
import Snowfall from "./Snowfall";
import { motion } from "framer-motion";

export default function Hero() {
  const name = "Fery Andrean";

  // Subtitle dipisah per baris
  const subtitle = [
    "Electrical Engineering | AI & Deep Learning Enthusiast | Web & Mobile Developer",
    "Ex-Intern PT. Telekomunikasi Indonesia",
  ];

  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen text-center text-white"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] z-0" />

      {/* Snow effect */}
      <Snowfall />

      <div className="relative z-10 container mx-auto px-6">
        {/* Nama */}
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold mb-6 tracking-wide"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {name.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="inline-block w-2" />
            ) : (
              <motion.span
                key={i}
                className="inline-block animated-text"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {ch}
              </motion.span>
            )
          )}
        </motion.h1>

        {/* Subtitle multi-line */}
        <div className="space-y-2">
          {subtitle.map((line, lineIdx) => {
            // Hitung offset delay berdasarkan panjang line sebelumnya
            const prevChars = subtitle
              .slice(0, lineIdx)
              .reduce((acc, l) => acc + l.length, 0);

            return (
              <motion.p
                key={lineIdx}
                className="text-lg md:text-xl font-medium leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {line.split("").map((ch, i) =>
                  ch === " " ? (
                    <span key={i} className="inline-block w-2" />
                  ) : (
                    <motion.span
                      key={i}
                      className="inline-block animated-text"
                      style={{ animationDelay: `${(prevChars + i) * 0.03}s` }}
                    >
                      {ch}
                    </motion.span>
                  )
                )}
              </motion.p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
