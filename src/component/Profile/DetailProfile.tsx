import React from "react";
import { FileText, Award, Code } from "lucide-react"; // Plus icon dihapus
import ProfileBgImg from "../../assets/Profilebg.png";

// Data Skills diletakkan di luar komponen
const SKILLS_DATA = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "PHP", icon: "https://cdn.simpleicons.org/php/777BB4" },
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Supabase", icon: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
];

const DetailProfile = () => {
  return (
    <div className="relative w-full h-full">
      {/* 1. LAYER BACKGROUND IMAGE */}
      <img
        src={ProfileBgImg}
        alt="Profile Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 2. LAYER KONTEN (SCROLLABLE) */}
      <div className="relative z-10 w-full h-full overflow-y-auto nintendo-scroll bg-black/70 text-putih p-6 font-sans">
        
        {/* === HEADER SECTION === */}
        <div className="flex items-center justify-between border-b border-white/20 pb-6 mb-6">
          {/* BAGIAN KIRI: Foto & Nama */}
          <div className="flex items-center gap-5">
            {/* Lingkaran Foto Profile */}
            <div className="relative w-20 h-20 rounded-full border-2 border-white/30 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-neutral-800">
              <img
                src="https://api.dicebear.com/9.x/notionists/svg?seed=Felix"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-wide bg-clip-text bg-gradient-to-r text-blue-300 drop-shadow-sm">
                Muhamad Raffi
              </h1>
              <div className="flex items-center gap-2 text-neutral-300 mt-1">
                <span className="bg-red-500/20 text-red-300 text-xs px-2 pt-0.5 pb-1 rounded-full border border-red-500/30">
                  Fullstack Web & Mobile Developer
                </span>
                <span className="bg-red-500/20 text-red-300 text-xs px-2 pt-0.5 pb-1 rounded-full border border-red-500/30">
                  UI/UX Designer
                </span>
              </div>
            </div>
          </div>

          {/* BAGIAN KANAN: Status / Level */}
          <div className="text-right hidden sm:block">
            <div className="text-xs text-neutral-400 uppercase tracking-widest mb-1">
              Age
            </div>
            <div className="text-2xl font-black text-yellow-400 font-mono">
              21
            </div>
          </div>
        </div>

        {/* === CONTENT GRID === */}
        <div className="w-full space-y-6">
          
          {/* Card 1: Character Info */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex items-center gap-2 mb-3 text-biru-muda">
              <FileText size={18} />
              <h2 className="font-bold tracking-wide text-sm uppercase">
                Character Info
              </h2>
            </div>
            <p className="text-sm text-abu-muda leading-relaxed">
              I am a second-year Information Systems student at Brawijaya
              University, highly enthusiastic about technology and an avid
              reader. I have a self-motivated and optimistic attitude, and I am
              capable of thriving in challenging and dynamic environments.
              Currently, I am looking to improve my skills and contribute to a
              professional organization. I am very eager to learn new things
              that interest me and can help me grow.
            </p>
          </div>

          {/* Card 2: Skills (Horizontal Scroll Badges) */}
          <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/20 transition-colors relative overflow-hidden">
            {/* Header Skills */}
            <div className="flex items-center gap-2 mb-4 text-hijau">
              <Code size={18} />
              <h2 className="font-bold tracking-wide text-sm uppercase">
                Skills
              </h2>
            </div>

            {/* Scrollable Container */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 w-full [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              
              {/* === MAPPING SKILLS === */}
              {/* Tombol 'Add' sudah dihapus. Semua item di sini di-render dari data SKILLS_DATA */}
              {SKILLS_DATA.map((skill) => (
                <div key={skill.name} className="flex-shrink-0 group flex flex-col items-center p-2">
                  {/* Circle Badge Container */}
                  <div className="w-14 h-14 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center p-3 shadow-lg group-hover:scale-110 group-hover:border-blue-400/50 transition-all duration-300 relative overflow-hidden">
                     
                     {/* GLOW EFFECT: 
                         Diterapkan ke SEMUA item tanpa terkecuali.
                         Muncul saat parent (.group) di-hover. 
                     */}
                     <div className="absolute inset-0 z-0 bg-blue-500/60 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     
                     {/* Icon Skill */}
                     <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-full h-full object-contain relative z-10" 
                     />
                  </div>
                  
                  {/* Label Nama Skill */}
                  <p className="text-[10px] text-center mt-2 text-abu-muda font-mono opacity-80 group-hover:opacity-100 group-hover:text-white transition-all">
                    {skill.name}
                  </p>
                </div>
              ))}
              
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailProfile;