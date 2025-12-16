import React from "react";
import { useNavigate } from "react-router-dom";
import Nintendo from "../component/Profile/Nintendo"; // Pastikan path ini benar sesuai struktur folder Anda

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen bg-neutral-900 overflow-hidden flex items-center justify-center">
      {/* Definisi Animasi (Optional, agar munculnya halus) */}
      <style>{`
        .animate-pop { animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes pop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; }}
      `}</style>

      {/* Tombol Back */}
      <button
        onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
        className="absolute top-8 left-8 text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all z-50 cursor-pointer shadow-lg backdrop-blur-sm"
      >
        ← Back
      </button>

      {/* Container Nintendo */}
      {/* Menggunakan scaling responsif agar pas di berbagai layar */}
      <div className="animate-pop transform transition-transform duration-500 ease-out scale-[0.4] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 xl:scale-125">
        <Nintendo />
      </div>
    </div>
  );
};

export default Profile;