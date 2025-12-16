import React, { useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

interface DetailProps {
  onBack: () => void;
}

const Detail: React.FC<DetailProps> = ({ onBack }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // 2. Inisialisasi hook navigasi
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 3. Fungsi untuk pindah ke halaman Profile
  const handlePhotoClick = () => {
    navigate("/profile"); // Pastikan route ini sudah diatur di App.tsx Anda
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
        <WorkstationDetailedSVG
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          containerRef={containerRef}
          // 4. Oper fungsi navigasi ke SVG
          onPhotoClick={handlePhotoClick}
        />
      </div>
    </div>
  );
};

// --- KOMPONEN SVG ---
const WorkstationDetailedSVG = ({
  mouseX,
  mouseY,
  containerRef,
  onPhotoClick, // Terima props
}: {
  mouseX: number;
  mouseY: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onPhotoClick: () => void;
}) => {
  // -- LOGIKA GERAKAN --
  const offsets = useMemo(() => {
    if (!containerRef.current)
      return {
        eyeL: { x: 0, y: 0 },
        eyeR: { x: 0, y: 0 },
        head: { x: 0, y: 0 },
      };
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
      head: { x: headX, y: headY },
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
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c3e50" />
          <stop offset="100%" stopColor="#34495e" />
        </linearGradient>
        <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5d4037" />
          <stop offset="100%" stopColor="#3e2723" />
        </linearGradient>
        <linearGradient id="igGrad" x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#f09433" offset="0" />
          <stop stopColor="#dc2743" offset="0.5" />
          <stop stopColor="#bc1888" offset="1" />
        </linearGradient>
        <linearGradient id="deskGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8d6e63" />
          <stop offset="50%" stopColor="#a1887f" />
          <stop offset="100%" stopColor="#8d6e63" />
        </linearGradient>
        <linearGradient id="deskLegGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4e342e" />
          <stop offset="100%" stopColor="#6d4c41" />
        </linearGradient>
        <linearGradient id="drawerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8d6e63" />
          <stop offset="100%" stopColor="#6d4c41" />
        </linearGradient>
      </defs>

      {/* === BACKGROUND === */}
      <rect x="0" y="0" width="1920" height="700" fill="url(#wallGrad)" />
      <rect x="0" y="700" width="1920" height="380" fill="url(#floorGrad)" />
      <line
        x1="0"
        y1="700"
        x2="1920"
        y2="700"
        stroke="#222"
        strokeWidth="4"
        opacity="0.3"
      />

      {/* === SISI KIRI: MEJA KERJA === */}
      <g id="left-side" filter="url(#shadow)" transform="translate(0, -150)">
        {/* Meja dengan perspektif */}
        <path d="M50 750 L650 750 L680 790 L20 790 Z" fill="url(#deskGrad)" />
        <rect x="20" y="790" width="660" height="20" fill="#6d4c41" />

        {/* Laci Kecil */}
        <g transform="translate(430, 810)" className="z-10">
          <rect
            width="150"
            height="50"
            fill="url(#drawerGrad)"
            stroke="#4e342e"
            strokeWidth="2"
          />
          <circle cx="75" cy="25" r="5" fill="#3e2723" />
        </g>
        <g transform="translate(430, 860)">
          <rect
            width="150"
            height="50"
            fill="url(#drawerGrad)"
            stroke="#4e342e"
            strokeWidth="2"
          />
          <circle cx="75" cy="25" r="5" fill="#3e2723" />
        </g>

        {/* Kaki Meja */}
        <rect x="80" y="810" width="30" height="270" fill="url(#deskLegGrad)" />
        <rect
          x="600"
          y="810"
          width="30"
          height="270"
          fill="url(#deskLegGrad)"
        />
        {/* Detail Kaki Meja */}
        <rect x="75" y="1075" width="40" height="5" fill="#3e2723" />
        <rect x="595" y="1075" width="40" height="5" fill="#3e2723" />

        <g transform="translate(200, 500)">
          <rect
            x="0"
            y="0"
            width="300"
            height="190"
            fill="#222"
            rx="8"
            stroke="#444"
            strokeWidth="4"
          />
          <rect x="15" y="15" width="270" height="160" fill="#000" />
          <g filter="url(#glow)" className="anim-flicker">
            <text
              x="135"
              y="100"
              textAnchor="middle"
              fill="#00ff00"
              fontFamily="monospace"
              fontSize="42"
              fontWeight="bold"
            >
              WORK
            </text>
            <rect
              x="50"
              y="120"
              width="170"
              height="3"
              fill="#00ff00"
              opacity="0.6"
            />
            <rect
              x="50"
              y="135"
              width="100"
              height="3"
              fill="#00ff00"
              opacity="0.6"
            />
          </g>
          <path d="M110 190 L190 190 L200 250 L100 250 Z" fill="#333" />
          <rect x="80" y="250" width="140" height="10" fill="#222" rx="2" />
        </g>

        <g transform="translate(520, 680)">
          <rect
            x="0"
            y="10"
            width="25"
            height="70"
            fill="#e74c3c"
            transform="rotate(-5)"
            stroke="#c0392b"
            strokeWidth="2"
          />
          <rect
            x="30"
            y="5"
            width="25"
            height="80"
            fill="#3498db"
            transform="rotate(2)"
            stroke="#2980b9"
            strokeWidth="2"
          />
          <rect
            x="60"
            y="0"
            width="25"
            height="85"
            fill="#f1c40f"
            stroke="#f39c12"
            strokeWidth="2"
          />
        </g>

        <g transform="translate(100, 790)">
          <rect width="40" height="40" fill="#61dafb" transform="rotate(-3)" />
          <text
            x="20"
            y="25"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
          >
            R
          </text>
        </g>
        <g transform="translate(150, 790)">
          <rect width="40" height="40" fill="#02569b" transform="rotate(2)" />
          <text
            x="20"
            y="25"
            textAnchor="middle"
            fontSize="12"
            fill="white"
            fontWeight="bold"
          >
            F
          </text>
        </g>

        <path
          d="M300 950 Q 350 1000, 320 780"
          stroke="#222"
          strokeWidth="5"
          fill="none"
        />
        <rect x="280" y="940" width="50" height="30" fill="#eee" rx="4" />
        <circle cx="295" cy="955" r="4" fill="#333" />
        <circle cx="315" cy="955" r="4" fill="#333" />

        {/* --- TOMBOL FOTO (LINK KE PROFILE) --- */}
        <g
          transform="translate(30, 350)"
          // 5. Trigger navigasi saat diklik
          onClick={(e) => {
             e.stopPropagation();
             onPhotoClick();
          }}
          // Penting: pointer-events-auto agar bisa diklik, hover:brightness agar ada feedback visual
          className="cursor-pointer hover:brightness-110 transition-all pointer-events-auto"
        >
          {/* Rect transparan untuk memperluas area klik */}
          <rect width="140" height="180" fill="transparent" />
          
          <rect
            width="140"
            height="180"
            fill="#ecf0f1"
            stroke="#95a5a6"
            strokeWidth="6"
            rx="2"
          />
          <path d="M20 20 L120 20 L20 120 Z" fill="#bdc3c7" opacity="0.4" />
          <text
            x="70"
            y="100"
            textAnchor="middle"
            fill="#bdc3c7"
            fontSize="16"
            fontFamily="sans-serif"
          >
            PHOTO
          </text>
        </g>
      </g>
    </svg>
  );
};

export default Detail;