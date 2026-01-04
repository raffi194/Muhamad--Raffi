import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabaseClient";

// --- TIPE DATA DARI DATABASE (Tabel organizations) ---
interface OrganizationData {
  id: number;
  title: string;
  role: string;
  image: string;
  description: string; // Field khusus tabel organizations
}

interface OrganizationsCarouselProps {
  onActiveImageChange: (imageUrl: string) => void;
}

const OrganizationsCarousel = ({ onActiveImageChange }: OrganizationsCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- STATE MANAGEMENT ---
  const [organizations, setOrganizations] = useState<OrganizationData[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [activeIndex, setActiveIndex] = useState(0);

  // State Drag
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  // --- FETCH DATA DARI SUPABASE ---
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('organizations')
          .select('*')
          .order('id', { ascending: false });

        if (error) throw error;

        if (data) {
          setOrganizations(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data organizations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

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
      // ignore
    }
  };

  // --- HELPER: GET CARD WIDTH + GAP ---
  const getItemWidth = () => {
    return (window.innerWidth * 0.30) + 80; 
  };

  // --- SCROLL LOGIC ---
  const scrollToIndex = (index: number) => {
    if (!containerRef.current || organizations.length === 0) return;
    
    const targetIndex = Math.max(0, Math.min(index, organizations.length - 1));
    const itemWidth = getItemWidth();
    
    containerRef.current.scrollTo({
      left: targetIndex * itemWidth,
      behavior: 'smooth'
    });

    if (targetIndex !== activeIndex) {
      setActiveIndex(targetIndex);
      playSwitchSound();
    }
  };

  const scrollContainer = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
    scrollToIndex(newIndex);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 20) { 
        if (e.deltaY > 0) scrollContainer('right');
        else scrollContainer('left');
    }
  };

  // Update Background Image saat activeIndex berubah
  useEffect(() => {
    if (organizations.length > 0 && organizations[activeIndex]) {
        const imageUrl = organizations[activeIndex].image;
        onActiveImageChange(imageUrl);
    }
  }, [activeIndex, onActiveImageChange, organizations]);

  // --- DRAG HANDLERS ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setDragDistance(0); 
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; 
    setDragDistance(walk); 
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDown(false);
    const threshold = 50; 
    if (dragDistance < -threshold) {
        scrollToIndex(activeIndex + 1); 
    } else if (dragDistance > threshold) {
        scrollToIndex(activeIndex - 1); 
    } else {
        scrollToIndex(activeIndex); 
    }
  };

  const handleMouseLeave = () => {
    if (isDown) handleMouseUp();
  };

  // --- LOADING VIEW ---
  if (loading) {
      return (
          <div className="flex h-screen w-full items-center justify-center pointer-events-none">
             <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent"></div>
          </div>
      );
  }

  // Jika data kosong
  if (organizations.length === 0) {
      return (
          <div className="flex h-screen w-full items-center justify-center text-white pointer-events-none">
              <p>Belum ada data organisasi.</p>
          </div>
      );
  }

  // Ambil data aktif
  const activeOrg = organizations[activeIndex];

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* WRAPPER UTAMA */}
      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-auto">
        
        {/* === INFO TEXT PANEL (POJOK KIRI BAWAH) === */}
        {/* Layout dan ukuran font disamakan persis dengan EventCarousel */}
        <div className="absolute bottom-10 left-8 md:bottom-5 md:left-16 z-40 max-w-full md:max-w-full text-left pointer-events-none">
            {activeOrg && (
                <motion.div
                    key={activeOrg.id} 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="flex flex-col items-start space-y-4 pr-20"
                >
                    {/* JUDUL */}
                    <h1 className="text-6xl md:text-8xl font-black font-sans text-yellow-400 drop-shadow-[0_5px_5px_rgba(0,0,0,1)] uppercase leading-none tracking-tighter">
                        {activeOrg.title}
                    </h1>

                    {/* ROLE BADGE */}
                    <div className="px-6 py-2 bg-blue-600/90 backdrop-blur-md rounded-lg border-l-4 border-white shadow-lg">
                        <span className="text-4xl md:text-5xl text-white font-bold tracking-widest uppercase">
                            {activeOrg.role}
                        </span>
                    </div>

                    {/* DESKRIPSI (Menggunakan field 'description') */}
                    <p className="text-2xl md:text-3xl text-gray-100 font-medium bg-black/60 p-4 rounded-xl border border-white/10 backdrop-blur-sm max-w-full shadow-xl">
                        {activeOrg.description}
                    </p>
                </motion.div>
            )}
        </div>

        {/* ARROW LEFT */}
        <button 
            onClick={() => scrollContainer('left')}
            className={`
                absolute left-4 z-50 p-6 rounded-full 
                bg-black/40 hover:bg-yellow-400/90 hover:text-black text-white 
                transition-all backdrop-blur-sm border-2 border-white/20 group cursor-pointer
                ${activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-8 h-8 group-hover:scale-110 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>

        {/* ARROW RIGHT */}
        <button 
            onClick={() => scrollContainer('right')}
            className={`
                absolute right-4 z-50 p-6 rounded-full 
                bg-black/40 hover:bg-yellow-400/90 hover:text-black text-white 
                transition-all backdrop-blur-sm border-2 border-white/20 group cursor-pointer
                ${activeIndex === organizations.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}
            `}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-8 h-8 group-hover:scale-110 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        </button>

        {/* CONTAINER SCROLL */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          
          className={`
            hide-scrollbar
            flex 
            w-full 
            h-full
            overflow-x-auto 
            items-center
            px-[35vw] 
            gap-20
            ${isDown ? 'cursor-grabbing' : 'cursor-grab'}
          `}
          style={{ scrollBehavior: 'auto' }} 
        >
          {organizations.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={item.id}
                className="relative shrink-0 flex flex-col items-center justify-center pointer-events-none"
                animate={{
                  scale: isActive ? 1.05 : 0.85, 
                  opacity: isActive ? 1 : 0.3, 
                  y: isActive ? 50 : 0, 
                  rotateY: isActive ? 0 : index < activeIndex ? 35 : -35,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
              >
                {/* === GAMBAR CARD TOWER === */}
                <div className={`
                    w-[75vw] md:w-[45vw] 
                    h-[105vh] 
                    rounded-[3rem] 
                    overflow-hidden 
                    shadow-[0_25px_60px_rgba(0,0,0,0.6)]
                    border-[6px]
                    bg-gray-900 
                    transition-all duration-300
                    pointer-events-auto 
                    select-none
                    flex items-center justify-center
                    ${isActive ? 'border-yellow-400 shadow-yellow-500/40' : 'border-gray-600 grayscale'}
                `}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain pointer-events-none"
                    // Fallback jika URL gambar rusak
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x800?text=No+Image";
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrganizationsCarousel;