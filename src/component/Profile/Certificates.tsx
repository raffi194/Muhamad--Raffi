import { useEffect, useState } from "react";
import { ArrowLeft, Award, ExternalLink, Star, X } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

// Interface
interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image_url: string;
  credential_url: string;
}

interface CertificatesProps {
  onBack: () => void;
}

const Certificates = ({ onBack }: CertificatesProps) => {
  const [certificatesData, setCertificatesData] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  
  // STATE UNTUK POPUP
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // FETCH DATA
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('id', { ascending: false });
        
        if (error) throw error;
        if (data) setCertificatesData(data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  // --- AUDIO EFFECTS ---
  const playWarpSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) { console.error(e); }
  };

  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) { console.error(e); }
  };

  const handleBackClick = () => {
    playWarpSound();
    onBack();
  };

  const handleCertClick = (cert: Certificate) => {
    playClickSound();
    setSelectedCert(cert);
  };

  const handleClosePopup = () => {
    setSelectedCert(null);
  };

  return (
    <div className="relative w-full h-full bg-[#050510] overflow-hidden font-mono text-white selection:bg-[#003ad7] selection:text-white">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 w-full h-8 bg-[repeating-linear-gradient(45deg,#003ad7_0,#003ad7_10px,#000_10px,#000_20px)] opacity-50" />
      <div className="absolute bottom-0 w-full h-16 bg-[#003ad7] border-t-4 border-white pointer-events-none z-10">
         <div className="absolute inset-0 opacity-40 bg-[linear-gradient(335deg,rgba(0,0,0,0.5)_2px,transparent_2px),linear-gradient(155deg,rgba(0,0,0,0.5)_2px,transparent_2px)] bg-size-[24px_24px]" />
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative z-20 w-full h-full overflow-y-auto nintendo-scroll p-6 pb-24">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 border-b-4 border-white pb-4 bg-black/50 p-4 top-0 backdrop-blur-md ">
            <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-widest mb-1">WORLD</span>
                <span className="text-2xl font-black text-white leading-none">1-2</span>
            </div>
            <button 
                onClick={handleBackClick}
                className="group flex items-center gap-2 bg-[#43b047] hover:bg-[#5cd660] border-4 border-white px-4 py-2 rounded-full transition-transform active:scale-95 shadow-[4px_4px_0px_white] cursor-pointer"
            >
                <ArrowLeft size={20} className="text-white group-hover:-translate-x-1 transition-transform"/>
                <span className="font-bold text-sm uppercase tracking-wider text-white">Warp Back</span>
            </button>
        </div>

        {/* TITLE */}
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-[#fbd000] drop-shadow-[4px_4px_0px_#b8860b] uppercase tracking-tighter mb-2">
                Secret Vault
            </h2>
            <p className="text-gray-400 text-xs uppercase tracking-[0.3em]">-- Certificates Collection --</p>
        </div>

        {/* GRID CERTIFICATES */}
        {loading ? (
            <div className="text-center text-white animate-pulse">Loading Artifacts...</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {certificatesData.map((cert) => (
                    <div 
                        key={cert.id} 
                        onClick={() => handleCertClick(cert)} // CLICK TRIGGER POPUP
                        className="relative group perspective-1000"
                    >
                        <div className="bg-[#444] border-4 border-[#888] p-6 h-48 flex flex-col justify-between shadow-[6px_6px_0px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 group-hover:bg-[#555] group-hover:border-white transition-all cursor-pointer relative overflow-hidden">
                            {/* Baut Hiasan */}
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
                                <h3 className="text-lg font-bold text-white leading-tight uppercase group-hover:text-[#fbd000] transition-colors mt-2 line-clamp-2">
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
        )}

        <div className="mt-16 text-center text-white/40 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
            Click Card for Details...
        </div>

      </div>

      {/* --- POPUP MODAL (LIGHTBOX) --- */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl bg-[#222] border-4 border-white shadow-[0_0_50px_rgba(251,208,0,0.3)] flex flex-col overflow-hidden">
                
                {/* Header Popup */}
                <div className="flex items-center justify-between bg-[#003ad7] p-3 border-b-4 border-white">
                    <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                        <Award size={16} className="text-[#fbd000]" />
                        Item Acquired!
                    </h3>
                    <button onClick={handleClosePopup} className="p-1 bg-red-600 hover:bg-red-500 border-2 border-white text-white">
                        <X size={16} />
                    </button>
                </div>

                {/* Content Popup */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 bg-[#222]">
                    {/* Image Area */}
                    <div className="w-full md:w-1/2 aspect-video bg-black border-4 border-[#444] relative group">
                         {selectedCert.image_url ? (
                             <img src={selectedCert.image_url} alt={selectedCert.title} className="w-full h-full object-contain" />
                         ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">NO IMAGE</div>
                         )}
                         <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#fbd000]/50 transition-all pointer-events-none"/>
                    </div>

                    {/* Details Area */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-2xl md:text-3xl font-black text-[#fbd000] uppercase leading-none mb-2">
                            {selectedCert.title}
                        </h2>
                        <div className="w-12 h-1 bg-white mb-4"></div>
                        
                        <div className="space-y-3 text-sm">
                            <p className="flex justify-between border-b border-gray-700 pb-1">
                                <span className="text-gray-400 font-bold">ISSUER:</span>
                                <span className="text-white font-bold uppercase">{selectedCert.issuer}</span>
                            </p>
                            <p className="flex justify-between border-b border-gray-700 pb-1">
                                <span className="text-gray-400 font-bold">DATE ACQUIRED:</span>
                                <span className="text-white font-bold uppercase">{selectedCert.date}</span>
                            </p>
                        </div>

                        {/* Action Button */}
                        {selectedCert.credential_url && (
                            <a 
                                href={selectedCert.credential_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="mt-8 block w-full bg-[#43b047] hover:bg-[#5cd660] text-center py-3 border-4 border-black shadow-[4px_4px_0_black] active:translate-y-1 active:shadow-none text-white font-black uppercase tracking-wider transition-all"
                            >
                                Verify Credential
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Certificates;