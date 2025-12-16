import React from "react";
import { FileText, Award, MapPin } from "lucide-react"; // Pastikan install lucide-react

const DetailProfile = () => {
  return (
    // Container utama dengan background semi-transparan agar tulisan terbaca jelas di atas background image
    <div className="w-full min-h-full bg-black/60 backdrop-blur-sm text-white p-6 font-sans">
      {/* === HEADER SECTION === */}
      <div className="flex items-center justify-between border-b border-white/20 pb-6 mb-6">
        {/* BAGIAN KIRI: Foto & Nama */}
        <div className="flex items-center gap-5">
          {/* Lingkaran Foto Profile */}
          <div className="relative w-20 h-20 rounded-full border-2 border-green-400 p-1 shadow-[0_0_15px_rgba(74,222,128,0.5)]">
            <div className="w-full h-full rounded-full bg-neutral-700 overflow-hidden">
              {/* Ganti src dengan foto profil asli Anda */}
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Raffi"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Status Indicator (Hiasan) */}
            <div
              className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-black rounded-full"
              title="Online"
            ></div>
          </div>

          {/* Teks Informasi */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">
              Muhamad Raffi
            </h1>
            <p className="text-sm text-green-300 font-mono mt-1 flex items-center gap-1">
              Information System Student
            </p>
            <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
              <MapPin size={12} /> Malang, ID
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN: Tombol Action */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => alert("Membuka Sertifikat...")}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-white/10 rounded-lg text-sm transition-all hover:scale-105 active:scale-95 shadow-md group"
          >
            <Award
              size={16}
              className="text-yellow-400 group-hover:rotate-12 transition-transform"
            />
            <span>Certificate</span>
          </button>

          <button
            onClick={() => alert("Membuka CV...")}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
          >
            <FileText size={16} />
            <span>Curriculum Vitae</span>
          </button>
        </div>
      </div>

      {/* === CONTENT BODY (Contoh Isi Bawah) === */}
      <div className="grid grid-cols-2 gap-6 animate-appear">
        {/* Kolom Kiri: About */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
          <h3 className="text-lg font-bold text-green-400 mb-2 border-b border-white/10 pb-1">
            About Me
          </h3>
          <p className="text-sm text-white leading-relaxed text-justify">
            I am a second-year Information Systems student at Brawijaya
            University, highly enthusiastic about technology and an avid reader.
            I have a self-motivated and optimistic attitude, and I am capable of
            thriving in challenging and dynamic environments. Currently, I am
            looking to improve my skills and contribute to a professional
            organization. I am very eager to learn new things that interest me
            and can help me grow.
          </p>
        </div>

        {/* Kolom Kanan: Stats / Skills */}
        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
          <h3 className="text-lg font-bold text-blue-400 mb-2 border-b border-white/10 pb-1">
            Current Focus
          </h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li className="flex justify-between">
              <span>Frontend</span>
              <span className="text-white font-mono">React & Tailwind</span>
            </li>
            <li className="flex justify-between">
              <span>Backend</span>
              <span className="text-white font-mono">Laravel & Node</span>
            </li>
            <li className="flex justify-between">
              <span>Mobile</span>
              <span className="text-white font-mono">Kotlin</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;
