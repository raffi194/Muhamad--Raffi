import { ArrowLeft, Award, ExternalLink, Star } from "lucide-react";

// Mock Data Sertifikat (Bisa diganti nanti)
const certificatesData = [
  { id: 1, title: "React Developer", issuer: "Udemy", date: "2024" },
  { id: 2, title: "Frontend Master", issuer: "Dicoding", date: "2023" },
  { id: 3, title: "UI/UX Design", issuer: "Coursera", date: "2023" },
  { id: 4, title: "Javascript Basic", issuer: "FreeCodeCamp", date: "2022" },
];

interface CertificatesProps {
  onBack: () => void;
}

const Certificates = ({ onBack }: CertificatesProps) => {

  // --- AUDIO EFFECT FUNCTION ---
  const playWarpSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Setting suara 'Warp/Pipe' (Square wave descending pitch)
      osc.type = "square";
      
      // Pitch turun (efek masuk pipa/kembali)
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);

      // Volume envelope
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  // Wrapper function untuk handle click
  const handleBackClick = () => {
    playWarpSound(); // Mainkan suara
    onBack();        // Jalankan fungsi kembali
  };

  return (
    <div className="relative w-full h-full bg-[#050510] overflow-hidden font-mono text-white selection:bg-[#003ad7] selection:text-white">
      
      {/* --- BACKGROUND DECORATION (Underground Theme) --- */}
      {/* Atap Bata Biru (Inverted) */}
      <div className="absolute top-0 w-full h-8 bg-[repeating-linear-gradient(45deg,#003ad7_0,#003ad7_10px,#000_10px,#000_20px)] opacity-50" />
      
      {/* Lantai Bata Biru */}
      <div className="absolute bottom-0 w-full h-16 bg-[#003ad7] border-t-4 border-white pointer-events-none z-10">
         <div className="absolute inset-0 opacity-40 bg-[linear-gradient(335deg,rgba(0,0,0,0.5)_2px,transparent_2px),linear-gradient(155deg,rgba(0,0,0,0.5)_2px,transparent_2px)] bg-size-[24px_24px]" />
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative z-20 w-full h-full overflow-y-auto nintendo-scroll p-6 pb-24">
        
        {/* HEADER: WORLD 1-2 */}
        <div className="flex items-center justify-between mb-8 border-b-4 border-white pb-4 bg-black/50 p-4 top-0 backdrop-blur-md z-30">
            <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-widest mb-1">WORLD</span>
                <span className="text-2xl font-black text-white leading-none">1-2</span>
            </div>

            {/* TOMBOL BACK (WARP PIPE) */}
            <button 
                onClick={handleBackClick} // Menggunakan handler baru yang ada suaranya
                className="group flex items-center gap-2 bg-[#43b047] hover:bg-[#5cd660] border-4 border-white px-4 py-2 rounded-full transition-transform active:scale-95 shadow-[4px_4px_0px_white] cursor-pointer"
            >
                <ArrowLeft size={20} className="text-white group-hover:-translate-x-1 transition-transform"/>
                <span className="font-bold text-sm uppercase tracking-wider text-white">Warp Back</span>
            </button>
        </div>

        {/* JUDUL HALAMAN */}
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#fbd000] drop-shadow-[4px_4px_0px_#b8860b] uppercase tracking-tighter mb-2">
                Secret Vault
            </h2>
            <p className="text-gray-400 text-xs uppercase tracking-[0.3em]">-- Certificates Collection --</p>
        </div>

        {/* GRID CERTIFICATES (BLOCK STYLE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certificatesData.map((cert) => (
                <div key={cert.id} className="relative group perspective-1000">
                    {/* Style Block Batu Bawah Tanah (Grey/Blue) */}
                    <div className="bg-[#444] border-4 border-[#888] p-6 h-48 flex flex-col justify-between shadow-[6px_6px_0px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 group-hover:bg-[#555] group-hover:border-white transition-all cursor-pointer relative overflow-hidden">
                        
                        {/* Baut di Sudut */}
                        <div className="absolute top-2 left-2 w-2 h-2 bg-black/40 rounded-full"/>
                        <div className="absolute top-2 right-2 w-2 h-2 bg-black/40 rounded-full"/>
                        <div className="absolute bottom-2 left-2 w-2 h-2 bg-black/40 rounded-full"/>
                        <div className="absolute bottom-2 right-2 w-2 h-2 bg-black/40 rounded-full"/>

                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <Award className="text-[#fbd000]" size={32} />
                                <span className="text-[10px] bg-black/50 px-2 py-1 rounded text-white border border-white/20 font-bold">
                                    {cert.date}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white leading-tight uppercase group-hover:text-[#fbd000] transition-colors mt-2">
                                {cert.title}
                            </h3>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-dashed border-gray-500">
                             <div className="flex items-center gap-2">
                                <Star size={12} className="text-yellow-500 animate-spin-slow" />
                                <span className="text-xs text-gray-300 font-bold uppercase">{cert.issuer}</span>
                             </div>
                             <ExternalLink size={16} className="text-gray-400 group-hover:text-white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Coin Decoration */}
        <div className="mt-16 text-center text-white/40 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
            Insert Coin to Continue...
        </div>

      </div>
    </div>
  );
};

export default Certificates;