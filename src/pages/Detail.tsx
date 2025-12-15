import React, { useRef, useState, useMemo } from "react";
import WorkTable from "../component/WorkTable";

interface DetailProps {
  onBack: () => void;
}

const Detail: React.FC<DetailProps> = ({ onBack }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen bg-neutral-900 overflow-hidden"
    >
      <style>{`
        .animate-appear { animation: appear 1s ease-out forwards; }
        @keyframes appear { from { opacity: 0; } to { opacity: 1; }}

        .anim-breathe { animation: breathe 4s ease-in-out infinite alternate; }
        @keyframes breathe { 0% { transform: scale(1); } 100% { transform: scale(1.03); } }

        .anim-sway { transform-origin: bottom center; animation: sway 3s ease-in-out infinite alternate; }
        @keyframes sway { from { transform: rotate(-3deg); } to { transform: rotate(3deg); }}

        .hover-float:hover { transform: translateY(-5px); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .anim-flicker { animation: flicker 0.1s infinite alternate; opacity: 0.9; }
        @keyframes flicker { from { opacity: 0.9; } to { opacity: 1; }}
      `}</style>

      {/* Tombol Back */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all z-50 cursor-pointer shadow-lg backdrop-blur-sm"
      >
        ← Back
      </button>

      {/* Konten Utama */}
      <div className="w-full h-full animate-appear">
           <WorkstationDetailedSVG mouseX={mousePos.x} mouseY={mousePos.y} containerRef={containerRef} />
      </div>
    </div>
  );
};

// --- KOMPONEN SVG ---
const WorkstationDetailedSVG = ({ 
  mouseX, 
  mouseY, 
  containerRef 
}: { 
  mouseX: number, 
  mouseY: number, 
  containerRef: React.RefObject<HTMLDivElement | null> 
}) => {
  
  // -- LOGIKA GERAKAN --
  const offsets = useMemo(() => {
    if (!containerRef.current) return { eyeL: {x:0, y:0}, eyeR: {x:0, y:0}, head: {x:0, y:0} };
    const rect = containerRef.current.getBoundingClientRect();
    
    const scaleX = 1920 / rect.width;
    const scaleY = 1080 / rect.height;
    const svgMouseX = mouseX * scaleX;
    const svgMouseY = mouseY * scaleY;

    const centerX = 960;
    const centerY = 600;

    const dx = svgMouseX - centerX;
    const dy = svgMouseY - centerY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(15, Math.hypot(dx, dy) / 20);

    const eyeX = Math.cos(angle) * dist;
    const eyeY = Math.sin(angle) * dist;

    const headX = dx / 50;
    const headY = dy / 60;

    return {
      eyeL: { x: eyeX, y: eyeY },
      eyeR: { x: eyeX, y: eyeY },
      head: { x: headX, y: headY }
    };
  }, [mouseX, mouseY, containerRef]);

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1920 1080"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice" 
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="2" dy="4" result="offsetblur" />
          <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow">
           <feGaussianBlur stdDeviation="5" result="coloredBlur" />
           <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c3e50" />
            <stop offset="100%" stopColor="#34495e" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5d4037" />
            <stop offset="100%" stopColor="#3e2723" />
        </linearGradient>
        <linearGradient id="igGrad" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#f09433" offset="0"/><stop stopColor="#dc2743" offset="0.5"/><stop stopColor="#bc1888" offset="1"/></linearGradient>
      </defs>

      {/* === BACKGROUND === */}
      <rect x="0" y="0" width="1920" height="700" fill="url(#wallGrad)" />
      <rect x="0" y="700" width="1920" height="380" fill="url(#floorGrad)" />
      <line x1="0" y1="700" x2="1920" y2="700" stroke="#222" strokeWidth="4" opacity="0.3"/>

      {/* === SISI KIRI: MEJA KERJA === */}
      <g id="left-side" filter="url(#shadow)" transform="translate(0, -50)">
        <path d="M50 750 L650 750 L670 780 L30 780 Z" fill="#8d6e63" /> 
        <rect x="30" y="780" width="640" height="20" fill="#6d4c41" /> 
        <rect x="80" y="800" width="30" height="280" fill="#4e342e" /> 
        <rect x="600" y="800" width="30" height="280" fill="#4e342e" /> 

        <g transform="translate(200, 500)">
            <rect x="0" y="0" width="300" height="190" fill="#222" rx="8" stroke="#444" strokeWidth="4"/>
            <rect x="15" y="15" width="270" height="160" fill="#000" />
            <g filter="url(#glow)" className="anim-flicker">
                <text x="135" y="100" textAnchor="middle" fill="#00ff00" fontFamily="monospace" fontSize="42" fontWeight="bold">WORK</text>
                <rect x="50" y="120" width="170" height="3" fill="#00ff00" opacity="0.6" />
                <rect x="50" y="135" width="100" height="3" fill="#00ff00" opacity="0.6" />
            </g>
            <path d="M110 190 L190 190 L200 250 L100 250 Z" fill="#333" />
            <rect x="80" y="250" width="140" height="10" fill="#222" rx="2" />
        </g>

        <g transform="translate(520, 680)">
             <rect x="0" y="10" width="25" height="70" fill="#e74c3c" transform="rotate(-5)" stroke="#c0392b" strokeWidth="2"/>
             <rect x="30" y="5" width="25" height="80" fill="#3498db" transform="rotate(2)" stroke="#2980b9" strokeWidth="2"/>
             <rect x="60" y="0" width="25" height="85" fill="#f1c40f" stroke="#f39c12" strokeWidth="2"/>
        </g>

        <g transform="translate(100, 790)">
             <rect width="40" height="40" fill="#61dafb" transform="rotate(-3)" />
             <text x="20" y="25" textAnchor="middle" fontSize="12" fontWeight="bold">R</text>
        </g>
        <g transform="translate(150, 790)">
             <rect width="40" height="40" fill="#02569b" transform="rotate(2)" />
             <text x="20" y="25" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">F</text>
        </g>

        <path d="M300 950 Q 350 1000, 320 780" stroke="#222" strokeWidth="5" fill="none" />
        <rect x="280" y="940" width="50" height="30" fill="#eee" rx="4" />
        <circle cx="295" cy="955" r="4" fill="#333" />
        <circle cx="315" cy="955" r="4" fill="#333" />

        <g transform="translate(150, 250)" className="cursor-pointer hover:opacity-80 transition-opacity">
            <rect width="140" height="180" fill="#ecf0f1" stroke="#95a5a6" strokeWidth="6" rx="2" />
            <path d="M20 20 L120 20 L20 120 Z" fill="#bdc3c7" opacity="0.4" />
            <text x="70" y="100" textAnchor="middle" fill="#bdc3c7" fontSize="16" fontFamily="sans-serif">PHOTO</text>
        </g>
      </g>

      {/* === TENGAH: SINGA === */}
      <g id="lion-center" transform="translate(960, 680)">
          <g className="anim-breathe">
            <path d="M-80 120 Q 0 160, 80 120 L 70 300 L -70 300 Z" fill="#f1c40f" stroke="#f39c12" strokeWidth="4"/>
            <path d="M-40 300 L-40 330 M40 300 L40 330" stroke="#f39c12" strokeWidth="12" strokeLinecap="round" />
            <path d="M-60 330 L-20 330 M20 330 L60 330" stroke="#f39c12" strokeWidth="12" strokeLinecap="round" />

            <g style={{ transform: `translate(${offsets.head.x}px, ${offsets.head.y}px)`, transition: 'transform 0.1s ease-out' }}>
                <circle cx="0" cy="0" r="120" fill="#d35400" stroke="#a04000" strokeWidth="5" />
                <circle cx="0" cy="10" r="90" fill="#f1c40f" />
                <circle cx="-80" cy="-70" r="30" fill="#d35400" />
                <circle cx="-80" cy="-70" r="18" fill="#f1c40f" />
                <circle cx="80" cy="-70" r="30" fill="#d35400" />
                <circle cx="80" cy="-70" r="18" fill="#f1c40f" />

                <g id="eyes" transform="translate(0, 10)">
                  <g transform="translate(-35, 0)">
                      <circle cx="0" cy="0" r="25" fill="white" stroke="#bdc3c7" strokeWidth="2"/>
                      <circle cx={offsets.eyeL.x} cy={offsets.eyeL.y} r="12" fill="#2c3e50" />
                      <circle cx={offsets.eyeL.x + 5} cy={offsets.eyeL.y - 5} r="4" fill="white" opacity="0.9"/>
                  </g>
                  <g transform="translate(35, 0)">
                      <circle cx="0" cy="0" r="25" fill="white" stroke="#bdc3c7" strokeWidth="2"/>
                      <circle cx={offsets.eyeR.x} cy={offsets.eyeR.y} r="12" fill="#2c3e50" />
                      <circle cx={offsets.eyeR.x + 5} cy={offsets.eyeR.y - 5} r="4" fill="white" opacity="0.9"/>
                  </g>
                </g>

                <g transform="translate(0, 50)">
                    <path d="M-18 0 Q 0 12, 18 0 L 0 25 Z" fill="#3e2723" />
                    <path d="M0 25 Q -25 50, -50 40" stroke="#3e2723" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    <path d="M0 25 Q 25 50, 50 40" stroke="#3e2723" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </g>
            </g>
          </g>
      </g>


      {/* === SISI KANAN: PERABOTAN & TABLE LOCKER BARU === */}
      {/* Geser perabotan lama lebih ke kanan (X+200) untuk memberi ruang TableLocker */}
      <g id="right-side" filter="url(#shadow)" transform="translate(150, -50)">

        {/* Rak Basket (Digeser ke X=1750) */}
        <g transform="translate(1750, 350)">
            <rect x="0" y="0" width="100" height="450" fill="none" stroke="#555" strokeWidth="8" rx="5" />
            <line x1="0" y1="150" x2="100" y2="150" stroke="#555" strokeWidth="6" />
            <line x1="0" y1="300" x2="100" y2="300" stroke="#555" strokeWidth="6" />
            <circle cx="50" cy="75" r="40" fill="#d35400" stroke="#a04000" strokeWidth="2" />
            <circle cx="50" cy="225" r="40" fill="#d35400" stroke="#a04000" strokeWidth="2" />
            <circle cx="50" cy="375" r="40" fill="#d35400" stroke="#a04000" strokeWidth="2" />
        </g>

        <WorkTable className="scale-40"/>

        {/* Meja Samping Kecil (Digeser ke X=1500) */}
        <g transform="translate(1500, 750)">
            <rect x="0" y="0" width="220" height="20" fill="#5d4037" /> 
            <rect x="20" y="20" width="180" height="260" fill="#4e342e" />
            
            <g transform="translate(60, -60)" className="anim-sway">
                <path d="M0 60 L10 0 Q 25 -10, 40 0 L 50 60 Z" fill="#95a5a6" />
                <line x1="25" y1="0" x2="25" y2="-60" stroke="#27ae60" strokeWidth="4" />
                <circle cx="25" cy="-60" r="18" fill="#e74c3c" />
                <circle cx="25" cy="-60" r="6" fill="#f1c40f" />
            </g>
            <g transform="translate(140, -50)">
                <rect width="60" height="50" fill="#2c3e50" rx="4" />
                <circle cx="30" cy="25" r="15" fill="#34495e" stroke="#1a252f" strokeWidth="2" />
            </g>
        </g>

        {/* Bingkai CV & Resume (Digeser X=1520) */}
        <g transform="translate(1520, 480)">
            <g className="cursor-pointer hover:opacity-80 transition-opacity">
               <rect width="90" height="120" fill="#fff" stroke="#333" strokeWidth="4" />
               <line x1="20" y1="30" x2="70" y2="30" stroke="#bdc3c7" strokeWidth="4" />
               <line x1="20" y1="50" x2="70" y2="50" stroke="#bdc3c7" strokeWidth="2" />
               <text x="45" y="100" textAnchor="middle" fontSize="12" fontWeight="bold">RESUME</text>
            </g>
            <g transform="translate(110, 0)" className="cursor-pointer hover:opacity-80 transition-opacity">
               <rect width="90" height="120" fill="#fff" stroke="#333" strokeWidth="4" />
               <rect x="20" y="20" width="30" height="35" fill="#bdc3c7" />
               <line x1="55" y1="30" x2="75" y2="30" stroke="#bdc3c7" strokeWidth="4" />
               <text x="45" y="100" textAnchor="middle" fontSize="12" fontWeight="bold">CV</text>
            </g>
        </g>

        {/* Rak Sosmed (Digeser X=1480) */}
        <g transform="translate(1480, 250)">
            <rect x="0" y="60" width="340" height="15" fill="#5d4037" rx="2" filter="url(#shadow)" />
            
            <g transform="translate(20, 0)" className="hover-float cursor-pointer">
                <rect width="60" height="60" rx="14" fill="url(#igGrad)" stroke="white" strokeWidth="2"/>
                <rect x="12" y="12" width="36" height="36" rx="8" stroke="white" strokeWidth="4" fill="none"/>
                <circle cx="30" cy="30" r="6" stroke="white" strokeWidth="4" fill="none"/>
                <circle cx="42" cy="18" r="2.5" fill="white"/>
            </g>
            <g transform="translate(100, 0)" className="hover-float cursor-pointer">
                <rect width="60" height="60" rx="10" fill="#0077b5" stroke="white" strokeWidth="2"/>
                <text x="30" y="45" textAnchor="middle" fill="white" fontSize="42" fontFamily="sans-serif" fontWeight="bold">in</text>
            </g>
            <g transform="translate(180, 0)" className="hover-float cursor-pointer">
                <rect width="60" height="60" rx="14" fill="#24292e" stroke="white" strokeWidth="2"/>
                <path d="M30 12 C20 12 12 20 12 30 C12 38 17 44 24 47 L24 41 C19 42 18 39 18 39 C18 39 16 36 16 35 C16 35 14 34 16 34 C18 34 19 36 19 36 C21 39 24 38 25 37 L25 35 C26 34 27 33 28 33 C22 32 16 29 16 18 C16 15 17 13 18 11 C17 11 16 8 18 7 C18 7 20 7 24 10 C26 10 28 9 30 10 C34 6 36 6 36 6 C38 7 37 9 36 9 C37 12 38 15 38 18 C38 27 32 29 26 30 C27 31 28 32 28 34 L28 44 C33 42 38 37 38 30 C38 20 30 12 28 12 Z" fill="white"/>
            </g>
            <g transform="translate(260, 0)" className="hover-float cursor-pointer">
                <rect width="60" height="60" rx="14" fill="#000" stroke="white" strokeWidth="2"/>
                <path d="M30 18 L30 36 C30 42 24 45 20 42 C18 39 18 36 18 33 L21 33 C21 36 24 38 26 36 L26 18 L30 18 C30 21 33 24 37 24 L37 20 C35 20 32 19 31 18 Z" fill="white"/>
                <path d="M30 18 L30 36 C30 42 24 45 20 42 C18 39 18 36 18 33 L21 33 C21 36 24 38 26 36 L26 18 L30 18 C30 21 33 24 37 24 L37 20 C35 20 32 19 31 18 Z" fill="#25f4ee" transform="translate(-2,-2)" opacity="0.6"/>
                <path d="M30 18 L30 36 C30 42 24 45 20 42 C18 39 18 36 18 33 L21 33 C21 36 24 38 26 36 L26 18 L30 18 C30 21 33 24 37 24 L37 20 C35 20 32 19 31 18 Z" fill="#fe2c55" transform="translate(2,2)" opacity="0.6"/>
            </g>
        </g>
      </g>
    </svg>
  );
};

export default Detail;
