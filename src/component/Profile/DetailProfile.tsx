import { useState } from "react";
import ProfileName from "./ProfileName";
import ButtonsAction from "./ButtonsAction";
import StatusLevel from "./StatusLevel";
import Stats from "./Stats";
import About from "./About";
import Certificates from "./Certificates";
import Directions from "../Directions";

const DetailProfile = () => {
  // 1. STATE UNTUK MENGATUR TAMPILAN (Navigasi)
  // 'main' = Tampilan Profil Biasa
  // 'certificates' = Tampilan Halaman Sertifikat (World 1-2)
  const [currentView, setCurrentView] = useState<"main" | "certificates">(
    "main"
  );

  // 2. LOGIKA PERPINDAHAN HALAMAN
  // Jika state 'currentView' adalah 'certificates', maka tampilkan komponen Certificates
  if (currentView === "certificates") {
    return <Certificates onBack={() => setCurrentView("main")} />;
  }

  // 3. TAMPILAN UTAMA (Profil Overworld)
  return (
    <div className="relative w-full h-full bg-[#6b8cff] overflow-hidden font-mono selection:bg-yellow-400 selection:text-black">
      {/* --- BACKGROUND DECORATION (Awan & Lantai) --- */}
      <div className="absolute top-10 left-10 w-24 h-8 bg-white/80 rounded-full blur-sm opacity-50" />
      <div className="absolute top-20 right-20 w-32 h-10 bg-white/80 rounded-full blur-sm opacity-60" />
      <div className="absolute top-1/2 left-1/4 w-16 h-6 bg-white/80 rounded-full blur-sm opacity-40" />

      {/* Lantai Mario */}
      <div className="absolute bottom-0 w-full h-16 bg-[#c25934] border-t-4 border-black pointer-events-none z-0">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(335deg,rgba(0,0,0,0.3)_2px,transparent_2px),linear-gradient(155deg,rgba(0,0,0,0.3)_2px,transparent_2px)] bg-size-[24px_24px]" />
        <div className="absolute top-0 left-0 w-full h-3 bg-[#43b047] border-b-4 border-black/20" />
      </div>

      {/* --- SCROLLABLE AREA --- */}
      <div className="relative z-10 w-full h-full overflow-y-auto nintendo-scroll">
        <div className="min-h-full w-full flex flex-col items-center justify-start p-4 md:p-8 pb-32">
          {/* FRAME PUTIH RETRO */}
          <div className="w-full max-w-4xl bg-[#f8f9fa] border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,0.4)] rounded-xl relative overflow-hidden shrink-0">
            {/* HEADER MERAH */}
            <div className="bg-[#e52521] p-2 border-b-4 border-black flex justify-between items-center px-4 sticky top-0 z-20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-green-400 border border-black" />
                <div className="w-3 h-3 rounded-full bg-blue-400 border border-black" />
              </div>
              <span className="text-white font-black tracking-widest text-xs md:text-sm uppercase drop-shadow-[2px_2px_0px_black]">
                WORLD 1-1: PROFILE
              </span>
            </div>

            <div className="p-6 flex flex-col gap-10">
              {/* BAGIAN ATAS */}
              <div className="flex flex-row justify-between items-center border-b-4 border-dashed border-gray-300 pb-8">
                <div className="flex flex-row items-center w-fit">
                  <ProfileName />
                </div>

                <div className="flex flex-col items-end gap-4 ">
                  <StatusLevel />
                  <div className="mt-2">
                    {/* PENTING: Di sini kita mengirim fungsi navigasi ke ButtonsAction */}
                    <ButtonsAction
                      onOpenCertificates={() => setCurrentView("certificates")}
                    />
                  </div>
                </div>
              </div>

              {/* STATS */}
              <div className="w-full">
                <h3 className="text-xl font-black uppercase mb-4 text-[#e52521] drop-shadow-[1px_1px_0px_black] flex items-center gap-2">
                  <span className="">⭐</span> Player Stats
                </h3>
                <Stats />
              </div>

              {/* ABOUT */}
              <div className="w-full">
                <About />
              </div>
            </div>

            <div className="absolute -bottom-10 -right-5 w-24 h-24 bg-[#43b047] border-4 border-black rotate-12 pointer-events-none" />
          </div>

          <div className="mt-8 text-white/60 text-xs font-bold uppercase tracking-widest bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm">
            © 2025 Mario Portfolio Edition
          </div>
        </div>
      </div>
      <div className="scale-40 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg p-2 rounded-4xl translate-y-3 pointer-events-none absolute bottom-0 left-1/2 -translate-x-202 z-10">
        <Directions />
      </div>
    </div>
  );
};

export default DetailProfile;
