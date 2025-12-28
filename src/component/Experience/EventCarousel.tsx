import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- DATA DUMMY EVENT ---
const EVENTS_DATA = [
  {
    id: 1,
    title: "Hackathon 2024",
    role: "Fullstack Dev",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=2562&auto=format&fit=crop",
    desc: "Juara 1 kategori Smart City",
  },
  {
    id: 2,
    title: "Tech Seminar",
    role: "Speaker",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop",
    desc: "Membawakan materi React Three Fiber",
  },
  {
    id: 3,
    title: "Community Meetup",
    role: "Participant",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2670&auto=format&fit=crop",
    desc: "Networking dengan developer lokal",
  },
  {
    id: 4,
    title: "Game Dev Jam",
    role: "Designer",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2670&auto=format&fit=crop",
    desc: "Membuat game 8-bit dalam 48 jam",
  },
  {
    id: 5,
    title: "Open Source Contrib",
    role: "Contributor",
    image: "https://images.unsplash.com/photo-1607799275518-d58665d48862?q=80&w=2670&auto=format&fit=crop",
    desc: "Pull Request merged ke repository besar",
  },
];

interface EventCarouselProps {
  onActiveImageChange: (imageUrl: string) => void;
}

const EventCarousel = ({ onActiveImageChange }: EventCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // State untuk Drag Logic
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // --- AUDIO EFFECT ---
  const playSwitchSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      console.error(e);
    }
  };

  // --- LOGIC SCROLL & ACTIVE CARD ---
  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const currentScrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    // Lebar kartu sekitar 50vw + gap 4rem (64px)
    // Kita estimasi lebar item + gap untuk perhitungan index
    const estimatedItemWidth = (window.innerWidth * 0.5) + 64; 

    const centerPosition = currentScrollLeft + containerWidth / 2;
    // Offset agar perhitungan dimulai dari tengah item pertama
    // Sesuaikan offset ini jika index meleset
    const startOffset = window.innerWidth * 0.25; 

    const rawIndex = (centerPosition - startOffset) / estimatedItemWidth;
    const index = Math.round(rawIndex - 0.5);
    const clampedIndex = Math.max(0, Math.min(index, EVENTS_DATA.length - 1));

    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
      playSwitchSound();
    }
  };

  // --- UPDATE BACKGROUND ---
  useEffect(() => {
    const imageUrl = EVENTS_DATA[activeIndex].image;
    onActiveImageChange(imageUrl);
  }, [activeIndex, onActiveImageChange]);


  // --- DRAG TO SCROLL HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Kecepatan scroll (dikali 2 biar lebih cepat)
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      {/* CSS KHUSUS UNTUK HIDE SCROLLBAR */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="relative w-full h-full flex items-center">
        {/* Container Scroll Snap Horizontal */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          // Drag Events
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          
          className={`
            hide-scrollbar
            flex 
            w-full 
            h-[70%] 
            overflow-x-auto 
            snap-x 
            snap-mandatory 
            items-center
            px-[25vw] /* Padding Kiri-Kanan Besar agar item pertama ditengah */
            
            /* JARAK ANTAR ITEM DIPERBESAR DISINI */
            gap-16 md:gap-24 
            
            ${isDown ? 'cursor-grabbing snap-none' : 'cursor-grab snap-mandatory'}
          `}
          style={{ scrollBehavior: isDown ? 'auto' : 'smooth' }}
        >
          {EVENTS_DATA.map((event, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={event.id}
                className={`
                  relative 
                  shrink-0 
                  w-[50vw] md:w-[40vw] /* Ukuran kartu */
                  aspect-video 
                  rounded-2xl 
                  overflow-hidden 
                  snap-center
                  shadow-2xl
                  select-none /* Agar teks/gambar tidak ke-highlight saat drag */
                  bg-gray-900
                  transition-all duration-300
                  ${isActive ? 'border-4 border-yellow-400 z-10 shadow-yellow-500/50' : 'border-2 border-white/20 z-0 opacity-40 blur-[2px] scale-90 grayscale'}
                `}
                // Animasi Framer Motion untuk Scale yang lebih responsif
                animate={{
                  scale: isActive ? 1.1 : 0.85,
                  rotateY: isActive ? 0 : index < activeIndex ? 15 : -15, // Efek 3D sedikit
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Gambar Event */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover pointer-events-none" // pointer-events-none penting agar drag lancar
                />

                {/* Overlay Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                  transition={{ delay: 0.1 }}
                  className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 via-black/60 to-transparent p-6 text-white text-left"
                >
                  <h3 className="text-2xl md:text-3xl font-bold font-sans text-yellow-400 drop-shadow-md">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-blue-600 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                      {event.role}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-gray-300 mt-2 line-clamp-2">
                    {event.desc}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Indikator Panah Kiri/Kanan (Opsional, untuk memberi tahu user bisa scroll) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none opacity-50">
            <div className="text-white text-4xl animate-pulse">‹</div>
            <div className="text-white text-4xl animate-pulse">›</div>
        </div>
      </div>
    </>
  );
};

export default EventCarousel;