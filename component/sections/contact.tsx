import Section from "@/component/section";

export default function Contact() {
  return (
    <Section
      id="contact"
      title={
        <span className="bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] bg-clip-text text-transparent">
          Contact
        </span>
      }
    >
      <div className="max-w-lg mx-auto bg-gradient-to-r from-[#001f3f] via-[#004080] to-[#003366] text-white rounded-lg shadow-lg p-8 hover:scale-[1.05] hover:shadow-2xl transition">
        <h3 className="text-lg font-bold mb-6 text-center">
          Get in Touch with Me
        </h3>
        <ul className="space-y-4">
          {/* WhatsApp */}
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-500/70 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
              alt="WhatsApp"
              className="w-6 h-6"
            />
            <a
              href="https://wa.me/6289606366195"
              target="_blank"
              rel="noreferrer"
              className="text-white"
            >
              089606366195
            </a>
          </li>

          {/* Email */}
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/70 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
              alt="Email"
              className="w-6 h-6"
            />
            <a href="mailto:feryandrn@gmail.com" className="text-white">
              feryandrn@gmail.com
            </a>
          </li>

          {/* LinkedIn */}
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-600/70 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="w-6 h-6"
            />
            <a
              href="https://id.linkedin.com/in/fery-andrean-5a03252bb"
              target="_blank"
              rel="noreferrer"
              className="text-white"
            >
              feryandrn
            </a>
          </li>

          {/* GitHub */}
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/70 transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
              alt="GitHub"
              className="w-6 h-6"
            />
            <a
              href="https://github.com/FerrrAndrn"
              target="_blank"
              rel="noreferrer"
              className="text-white"
            >
              github.com/FerrAndrn
            </a>
          </li>

          {/* Instagram (gradient transparan 70%) */}
          <li
            className="flex items-center gap-3 p-3 rounded-lg transition"
            style={{ transition: "background 0.3s ease" }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              alt="Instagram"
              className="w-6 h-6"
            />
            <a
              href="https://www.instagram.com/feryandrn"
              target="_blank"
              rel="noreferrer"
              className="text-white"
            >
              @feryandrn
            </a>
            <style jsx>{`
              li:hover {
                background: linear-gradient(
                  to right,
                  #9c27b0b3,
                  #e91e63b3,
                  #ff9800b3,
                  #ffeb3bb3
                ); /* b3 = 70% opacity */
              }
            `}</style>
          </li>
        </ul>
      </div>
    </Section>
  );
}
