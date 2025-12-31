import { useEffect, useState } from "react";

// --- INTERACTIVE MASCOT (TETAP SAMA LOGIKANYA, HANYA CONTAINERNYA BEDA) ---
const InteractiveMascot = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (event.clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const eyeMoveX = mousePos.x * 10;
  const eyeMoveY = mousePos.y * 8;
  const headMoveX = mousePos.x * 5;
  const headMoveY = mousePos.y * 4;
  const headRotate = mousePos.x * 8;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full bg-[#87CEEB]"> {/* Langit di dalam pipa */}
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

      <g transform={`translate(${headMoveX}, ${headMoveY}) rotate(${headRotate}, 100, 150)`}>
         {/* ... (SVG PATH MASKOT RUBAH TETAP SAMA SEPERTI FILE SEBELUMNYA) ... */}
         {/* Gunakan kode path mascot yang kamu punya sebelumnya di sini */}
         <path d="M100 195 C 50 195, 30 150, 35 100 C 40 60, 70 45, 100 45 C 130 45, 160 60, 165 100 C 170 150, 150 195, 100 195 Z" fill="url(#furGrad)" filter="drop-shadow(0px 5px 10px rgba(0,0,0,0.5))" />
         <g>
          <path d="M40 80 L20 20 Q60 30 80 70 Z" fill="url(#furGrad)" stroke="#8C430D" strokeWidth="1" />
          <path d="M38 75 L28 35 Q55 45 70 70 Z" fill="url(#innerEarGrad)" />
          <path d="M160 80 L180 20 Q140 30 120 70 Z" fill="url(#furGrad)" stroke="#8C430D" strokeWidth="1" />
          <path d="M162 75 L172 35 Q145 45 130 70 Z" fill="url(#innerEarGrad)" />
        </g>
        <path d="M100 185 C 70 185, 45 160, 50 120 Q 52 100, 85 135 L 100 145 L 115 135 Q 148 100, 150 120 C 155 160, 130 185, 100 185 Z" fill="url(#whiteFurGrad)" />
        <g stroke="white" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" fill="none">
           {/* Kumis */}
           <path d="M 85 148 Q 60 145, 30 135" /><path d="M 86 152 Q 60 155, 35 160" /><path d="M 82 145 Q 65 135, 40 120" />
           <path d="M 115 148 Q 140 145, 170 135" /><path d="M 114 152 Q 140 155, 165 160" /><path d="M 118 145 Q 135 135, 160 120" />
        </g>
        <path d="M100 155 Q 90 145, 110 145 Q 105 160, 100 155" fill="#2D1A12" />
        <ellipse cx="103" cy="148" rx="2" ry="1" fill="white" opacity="0.6" />
        <path d="M90 165 Q 100 175, 110 165" stroke="#2D1A12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <g>
          <ellipse cx="75" cy="115" rx="16" ry="14" fill="#FFF" stroke="#A65312" strokeWidth="0.5" />
          <ellipse cx="125" cy="115" rx="16" ry="14" fill="#FFF" stroke="#A65312" strokeWidth="0.5" />
          <g transform={`translate(${eyeMoveX}, ${eyeMoveY})`}>
            <circle cx="75" cy="115" r="9" fill="url(#eyeIrisGrad)" />
            <circle cx="125" cy="115" r="9" fill="url(#eyeIrisGrad)" />
            <circle cx="75" cy="115" r="5" fill="#1A1A1A" />
            <circle cx="125" cy="115" r="5" fill="#1A1A1A" />
            <circle cx="78" cy="112" r="2.5" fill="white" opacity="0.9" />
            <circle cx="128" cy="112" r="2.5" fill="white" opacity="0.9" />
          </g>
          <path d="M60 100 Q 75 92, 90 102" stroke="#8C430D" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M110 102 Q 125 92, 140 100" stroke="#8C430D" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
};

// --- COMPONENT NAME (MARIO STYLE) ---
const ProfileName = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      {/* WARP PIPE CONTAINER */}
      <div className="relative group">
        <div className="w-28 h-28 rounded-full border-[6px] border-green-700 bg-green-600 overflow-hidden shadow- relative z-10">
           {/* Highlight Pipa */}
           <div className="absolute inset-0 border-4 border-green-600 rounded-full pointer-events-none z-20"></div>
           <InteractiveMascot />
        </div>
        {/* Bayangan Pipa di bawah */}
        <div className="absolute -bottom-2 -right-2 w-28 h-28 bg-black rounded-full -z-10" />
      </div>

      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#222] uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]" style={{fontFamily: 'monospace'}}>
          Muhamad Raffi
        </h1>
        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
          {/* Badge Role ala Jamur */}
          <span className="bg-[#e52521] text-white text-xs font-bold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_black] uppercase tracking-wide flex items-center gap-2">
            Information Systems
          </span>
          <span className="bg-[#fbd000] text-black text-xs font-bold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_black] uppercase">
            Student
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileName;