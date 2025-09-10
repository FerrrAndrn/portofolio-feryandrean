export default function About() {
  return (
    <section id="about" className="py-20 bg-[#f4f4f9]">
      <div className="container mx-auto px-6">
        {/* Judul tetap center */}
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001f3f] bg-clip-text text-transparent">
          About Me
        </h2>

        {/* Card isi */}
        <div className="max-w-3xl mx-auto bg-white/80 shadow-lg rounded-xl p-8 backdrop-blur">
          <p className="text-lg text-gray-800 leading-relaxed text-justify">
            Bachelor of Electrical Engineering{" "}
            <span className="font-semibold text-[#004080]">
              (Computer and Information Systems concentration – Universitas Tidar)
            </span>{" "}
            specializing in{" "}
            <span className="font-semibold text-[#004080]">
              Artificial Intelligence, Computer Systems, and Software Development
            </span>. Experienced in designing and implementing{" "}
            <span className="font-semibold text-[#004080]">
              Deep Learning–based systems
            </span>
            , developing{" "}
            <span className="font-semibold text-[#004080]">
              web and mobile applications
            </span>
            , and managing{" "}
            <span className="font-semibold text-[#004080]">databases</span>. Skilled in{" "}
            <span className="font-semibold text-[#004080]">
              problem-solving, teamwork, and adaptability
            </span>{" "}
            to create efficient and innovative solutions.
          </p>
        </div>
      </div>
    </section>
  );
}
