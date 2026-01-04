import React from "react";

const OrientationGuard: React.FC = () => {
  return (
    <div 
      className="
        fixed inset-0 z-9999 bg-[#1a1a1a] text-white 
        flex-col items-center justify-center p-8 text-center
        /* LOGIKA TAMPILAN: */
        /* 1. Default: Hidden (Sembunyi di Desktop/Landscape) */
        hidden 
        /* 2. Mobile Portrait: TAMPILKAN (Flex) */
        portrait:flex 
        /* 3. Kecuali layar besar (Desktop Portrait): Sembunyikan lagi */
        lg:hidden
      "
    >
      {/* Icon Animasi Rotasi HP */}
      <div className="mb-8 relative w-24 h-24 animate-pulse">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-full h-full text-merah" // Warna Merah Neon
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M17 1H7C5.89543 1 5 1.89543 5 3V21C5 22.1046 5.89543 23 7 23H17C18.1046 23 19 22.1046 19 21V3C19 1.89543 18.1046 1 17 1Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="animate-[spin_3s_ease-in-out_infinite]" 
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          <path 
            d="M12 18H12.01" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* Teks Peringatan Keras */}
      <h1 className="text-3xl font-black uppercase tracking-widest text-merah mb-4">
        Akses Ditolak
      </h1>
      
      <p className="text-lg font-bold text-gray-300 mb-2">
        PORTRAIT MODE DETECTED
      </p>

      <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
        Sistem ini dirancang khusus untuk pengalaman sinematik Nintendo Switch.
        <br/><br/>
        <span className="text-white font-semibold bg-red-600/20 px-3 py-1 rounded border border-red-600">
          PUTAR PERANGKAT ANDA KE LANDSCAPE
        </span>
      </p>

      {/* Dekorasi Garis Ala System Error */}
      <div className="absolute bottom-10 left-0 w-full h-1 bg-merah/50"></div>
      <div className="absolute top-10 left-0 w-full h-1 bg-merah/50"></div>
    </div>
  );
};

export default OrientationGuard;