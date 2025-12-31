import { GraduationCap } from "lucide-react";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Icon Nintendo Pixelated Sederhana
const NintendoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="24" height="24">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="4" y="8" width="16" height="8" fill="currentColor" opacity="0.2"/>
    <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);

const Stats = () => {
  // Style Block Dasar (Parent sudah flex center justify center)
  const blockStyle = "relative h-32 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center transition-transform hover:-translate-y-2 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none cursor-pointer group overflow-hidden";
  
  // Style Question Block (Kuning)
  const questionBlock = `${blockStyle} bg-[#fbd000]`;
  // Style Brick Block (Coklat/Merah Bata)
  const brickBlock = `${blockStyle} bg-[#c25934]`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
      
      {/* Item 1: GPA (Question Block Style) */}
      <div className={questionBlock}>
        {/* Paku di 4 sudut */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        
        {/* Content Centered (Mengikuti struktur Item 2) */}
        <div className="z-10 flex flex-col items-center justify-center text-black">
            {/* mb-2 disamakan dengan Item 2 */}
            <GraduationCap className="mb-2" size={28} /> 
            <div className="text-3xl font-black leading-none">3.5+</div>
            {/* Label dimasukkan ke flow flex, bukan absolute */}
            <div className="text-[10px] uppercase tracking-widest mt-1 opacity-90 font-bold">GPA Score</div>
        </div>
      </div>

      {/* Item 2: Projects (Brick Block Style) - Reference Center */}
      <div className={brickBlock}>
         {/* Pola Bata CSS */}
         <div className="absolute inset-0 opacity-20 bg-[linear-gradient(335deg,rgba(0,0,0,0.3)_2px,transparent_2px),linear-gradient(155deg,rgba(0,0,0,0.3)_2px,transparent_2px),linear-gradient(335deg,rgba(0,0,0,0.3)_2px,transparent_2px),linear-gradient(155deg,rgba(0,0,0,0.3)_2px,transparent_2px)] bg-size-[20px_20px]" />
         
         {/* Content Centered */}
         <div className="z-10 flex flex-col items-center justify-center text-white">
            <FontAwesomeIcon icon={faPlaystation} className="text-2xl mb-2 drop-shadow-md" />
            <div className="text-3xl font-black leading-none drop-shadow-md">1+</div>
            <div className="text-[10px] uppercase tracking-widest mt-1 opacity-90">Projects</div>
         </div>
      </div>

      {/* Item 3: Experience (Question Block Style) */}
      <div className={questionBlock}>
        {/* Paku di 4 sudut */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-black/30 rounded-full" />

        {/* Content Centered (Mengikuti struktur Item 2) */}
        <div className="z-10 flex flex-col items-center justify-center text-black">
            <NintendoIcon className="mb-2" />
            <div className="text-3xl font-black leading-none">01+</div>
            <div className="text-[10px] uppercase tracking-widest mt-1 opacity-90 font-bold">Month Exp</div>
        </div>
      </div>

    </div>
  );
};

export default Stats;