import React, { useEffect, useState } from "react";
import { FileText, GraduationCap, Award, FileUser } from "lucide-react";
import ProfileBgImg from "../../assets/Profilebg.png";

// --- IMPORT FONTAWESOME ---
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";

// ==========================================
// 1. KOMPONEN AVATAR MASKOT INTERAKTIF (RUBAH)
// ==========================================
const InteractiveMascot = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (event.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ 
        x: Math.max(-1, Math.min(1, x)), 
        y: Math.max(-1, Math.min(1, y)) 
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // -- Konfigurasi Gerakan (Physics) --
  // Mata bergerak lebih aktif
  const eyeMoveX = mousePos.x * 10;
  const eyeMoveY = mousePos.y * 8;
  
  // Kepala bergerak sedang (Telinga sekarang ikut variabel ini karena satu grup)
  const headMoveX = mousePos.x * 5;
  const headMoveY = mousePos.y * 4;
  const headRotate = mousePos.x * 8; // Rotasi kepala mengikuti mouse

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full bg-gradient-to-b from-blue-900 to-black">
      <defs>
        <radialGradient id="furGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#D97B29" />
          <stop offset="85%" stopColor="#A65312" />
          <stop offset="100%" stopColor="#8C430D" />
        </radialGradient>
        <linearGradient id="whiteFurGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E7" />
          <stop offset="100%" stopColor="#E6DABF" />
        </linearGradient>
        <linearGradient id="innerEarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6D4C41" />
          <stop offset="100%" stopColor="#3E2723" />
        </linearGradient>
        <radialGradient id="eyeIrisGrad" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8F00" />
        </radialGradient>
      </defs>

      {/* --- GRUP UTAMA KEPALA --- 
         Sekarang Telinga ada DI DALAM grup ini, sehingga transformasinya (rotate/move)
         akan selalu sinkron dengan kepala.
      */}
      <g transform={`translate(${headMoveX}, ${headMoveY}) rotate(${headRotate}, 100, 150)`}>
        

        {/* A. BENTUK DASAR WAJAH */}
        <path 
          d="M100 195 C 50 195, 30 150, 35 100 C 40 60, 70 45, 100 45 C 130 45, 160 60, 165 100 C 170 150, 150 195, 100 195 Z"
          fill="url(#furGrad)"
          filter="drop-shadow(0px 5px 10px rgba(0,0,0,0.5))"
          />

        {/* A. TELINGA (Render duluan supaya ada di layer belakang kepala) */}
        <g>
           {/* Telinga Kiri */}
          <path d="M40 80 L20 20 Q60 30 80 70 Z" fill="url(#furGrad)" stroke="#8C430D" strokeWidth="1"/>
          <path d="M38 75 L28 35 Q55 45 70 70 Z" fill="url(#innerEarGrad)"/>
           {/* Telinga Kanan */}
          <path d="M160 80 L180 20 Q140 30 120 70 Z" fill="url(#furGrad)" stroke="#8C430D" strokeWidth="1"/>
          <path d="M162 75 L172 35 Q145 45 130 70 Z" fill="url(#innerEarGrad)"/>
        </g>

        {/* C. DETAIL BULU PUTIH (Pipi & Moncong) */}
        <path 
          d="M100 185 C 70 185, 45 160, 50 120 Q 52 100, 85 135 L 100 145 L 115 135 Q 148 100, 150 120 C 155 160, 130 185, 100 185 Z"
          fill="url(#whiteFurGrad)"
        />

        <g stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" fill="none">
           {/* Kumis Kiri */}
           <path d="M 85 148 Q 60 145, 30 135" />
           <path d="M 86 152 Q 60 155, 35 160" />
           <path d="M 82 145 Q 65 135, 40 120" />
           
           {/* Kumis Kanan */}
           <path d="M 115 148 Q 140 145, 170 135" />
           <path d="M 114 152 Q 140 155, 165 160" />
           <path d="M 118 145 Q 135 135, 160 120" />
        </g>
        
        {/* D. HIDUNG & MULUT */}
        <path d="M100 155 Q 90 145, 110 145 Q 105 160, 100 155" fill="#2D1A12" />
        <ellipse cx="103" cy="148" rx="2" ry="1" fill="white" opacity="0.6" /> {/* Kilau Hidung */}
        <path d="M90 165 Q 100 175, 110 165" stroke="#2D1A12" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* E. MATA (Ada grup kecil lagi di sini untuk gerakan pupil) */}
        <g>
          {/* Sclera (Putih Mata) */}
          <ellipse cx="75" cy="115" rx="16" ry="14" fill="#FFF" stroke="#A65312" strokeWidth="0.5"/>
          <ellipse cx="125" cy="115" rx="16" ry="14" fill="#FFF" stroke="#A65312" strokeWidth="0.5"/>
          
          {/* Bola Mata (Iris + Pupil) bergerak independen relatif terhadap kepala */}
          <g transform={`translate(${eyeMoveX}, ${eyeMoveY})`}>
            <circle cx="75" cy="115" r="9" fill="url(#eyeIrisGrad)" />
            <circle cx="125" cy="115" r="9" fill="url(#eyeIrisGrad)" />
            <circle cx="75" cy="115" r="5" fill="#1A1A1A" />
            <circle cx="125" cy="115" r="5" fill="#1A1A1A" />
            
            {/* Highlight Mata (Tetap diam relatif iris agar terlihat 'hidup') */}
            <circle cx="78" cy="112" r="2.5" fill="white" opacity="0.9" />
            <circle cx="128" cy="112" r="2.5" fill="white" opacity="0.9" />
          </g>

           {/* Alis / Kelopak */}
           <path d="M60 100 Q 75 92, 90 102" stroke="#8C430D" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
           <path d="M110 102 Q 125 92, 140 100" stroke="#8C430D" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
};

// ==========================================
// 2. KOMPONEN UTAMA (DETAIL PROFILE)
// ==========================================

// Komponen Icon Nintendo Custom
const NintendoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="24" height="24">
    <path d="M5 6C5 4.89543 5.89543 4 7 4H10V20H7C5.89543 20 5 19.1046 5 18V6Z" />
    <path d="M14 4H17C18.1046 4 19 4.89543 19 6V18C19 19.1046 18.1046 20 17 20H14V4Z" />
    <circle cx="7.5" cy="8.5" r="1.5" fill="black" fillOpacity="0.5" />
    <circle cx="16.5" cy="14.5" r="1.5" fill="black" fillOpacity="0.5" />
  </svg>
);

const DetailProfile = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <div className="relative w-full h-full">
      {/* 1. LAYER BACKGROUND IMAGE */}
      <img
        src={ProfileBgImg}
        alt="Profile Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 2. LAYER KONTEN (SCROLLABLE) */}
      <div className="relative z-10 w-full h-full overflow-y-auto nintendo-scroll bg-black/70 text-white p-6 font-sans">
        
        {/* === HEADER SECTION === */}
        <div className="flex items-center justify-between border-b border-white/20 pb-6 mb-6">
          {/* BAGIAN KIRI: Foto & Nama */}
          <div className="flex items-center gap-5">
            
            {/* --- AVATAR MASKOT RUBAH (FIXED EARS) --- */}
            <div className="relative w-24 h-24 rounded-full border-[3px] border-white/30 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] bg-neutral-900 shrink-0">
              <InteractiveMascot />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-wide bg-clip-text bg-gradient-to-r text-blue-300 drop-shadow-sm">
                Muhamad Raffi
              </h1>
              <div className="flex items-center gap-2 text-neutral-300 mt-1">
                <span className="bg-red-500/20 text-red-300 text-xs px-2 pt-0.5 pb-1 rounded-full border border-red-500/30">
                  Information System Student
                </span>
              </div>
            </div>
          </div>

          {/* BAGIAN KANAN: Buttons & Status */}
          <div className="flex flex-col items-end justify-center gap-3">
            
            {/* Status Level (Hidden di Mobile) */}
            <div className="text-right hidden sm:block">
              <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">
                Level / Age
              </div>
              <div className="text-2xl font-black text-yellow-400 font-mono leading-none">
                21
              </div>
            </div>

            {/* BUTTONS ACTION (CV & Certificate) */}
            <div className="flex items-center gap-2">
              {/* Button Certificate */}
              <button 
                className="flex items-center gap-2 bg-white/5 hover:bg-yellow-500/20 border border-white/10 hover:border-yellow-500/50 px-3 py-1.5 rounded-lg transition-all active:scale-95 group"
                onClick={() => alert("Open Certificate Link")}
              >
                <Award size={14} className="text-neutral-300 group-hover:text-yellow-400 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white">Certificate</span>
              </button>

              {/* Button CV */}
              <button 
                className="flex items-center gap-2 bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 px-3 py-1.5 rounded-lg transition-all active:scale-95 group"
                onClick={() => alert("Open CV Link")}
              >
                <FileUser size={14} className="text-neutral-300 group-hover:text-blue-400 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 group-hover:text-white">CV</span>
              </button>
            </div>

          </div>
        </div>

        {/* === STATS GRID === */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Item 1: GPA */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-yellow-400/50 transition-all group">
            <div className="bg-yellow-500/20 p-2 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <GraduationCap className="text-yellow-400" size={24} />
            </div>
            <div className="text-xl font-bold text-white font-mono">3.5+</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Aggregate GPA</div>
          </div>

          {/* Item 2: Projects (PlayStation) */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-blue-400/50 transition-all group">
            <div className="bg-blue-500/20 w-10 h-10 flex items-center justify-center rounded-full mb-2 group-hover:scale-110 transition-transform">
               <FontAwesomeIcon icon={faPlaystation} className="text-blue-400 text-xl" />
            </div>
            <div className="text-xl font-bold text-white font-mono">1+</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Project</div>
          </div>

          {/* Item 3: Experience (Nintendo) */}
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-red-500/50 transition-all group">
            <div className="bg-red-500/20 p-2 rounded-full mb-2 group-hover:scale-110 transition-transform">
              <NintendoIcon className="text-red-500" />
            </div>
            <div className="text-xl font-bold text-white font-mono">01+</div>
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Months Exp</div>
          </div>
        </div>

        {/* === CONTENT GRID === */}
        <div className="w-full space-y-6">
          
          {/* Card 1: Character Info */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-3 text-blue-300">
              <FileText size={18} />
              <h2 className="font-bold tracking-wide text-sm uppercase">
                Character Info
              </h2>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed">
              I am a second-year Information Systems student at Brawijaya
              University, highly enthusiastic about technology and an avid
              reader. I have a self-motivated and optimistic attitude, and I am
              capable of thriving in challenging and dynamic environments.
              Currently, I am looking to improve my skills and contribute to a
              professional organization. I am very eager to learn new things
              that interest me and can help me grow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;