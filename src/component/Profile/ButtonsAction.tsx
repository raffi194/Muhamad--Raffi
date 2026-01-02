import { useState } from "react";
import { createPortal } from "react-dom";
import { Award, FileUser, Download, X } from "lucide-react";
import CvFile from "../../assets/CV.pdf";

// Definisikan Props agar parent bisa mengoper fungsi
interface ButtonsActionProps {
  onOpenCertificates?: () => void;
}

const ButtonsAction = ({ onOpenCertificates }: ButtonsActionProps) => {
  const [showCV, setShowCV] = useState(false);

  // --- AUDIO EFFECT 1: COIN SOUND (Untuk Tombol Certificates) ---
  const playCoinSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Nada Tinggi (Cling!)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine"; // Gelombang sinus murni untuk koin
      osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6 (Cepat naik)

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  // --- AUDIO EFFECT 2: FIREBALL SOUND (Untuk Tombol CV) ---
  const playFireballSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth"; // Gelombang lebih tajam
      // Pitch turun drastis (Bloop!)
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  // --- HANDLER BUTTON CLICK ---
  const handleCertClick = () => {
    playCoinSound();
    if (onOpenCertificates) onOpenCertificates();
    else alert("Feature coming soon!");
  };

  const handleCVClick = () => {
    playFireballSound();
    setShowCV(true);
  };

  // Style untuk tombol 8-bit (Merah)
  const btnStyle = "flex items-center gap-2 bg-[#e52521] hover:bg-[#ff4444] text-white border-b-4 border-r-4 border-black active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 transition-all px-4 py-2 font-bold uppercase tracking-wider text-xs shadow-[2px_2px_0px_rgba(0,0,0,0.5)] cursor-pointer group";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Button Certificate (COIN SOUND) */}
      <button
        className={btnStyle}
        onClick={handleCertClick}
      >
        <Award size={16} className="text-[#fbd000] group-hover:rotate-12 transition-transform" />
        <span>Certificates</span>
      </button>

      {/* Button CV (FIREBALL SOUND) */}
      <button
        className={btnStyle}
        onClick={handleCVClick}
      >
        <FileUser size={16} className="text-[#fbd000] group-hover:rotate-12 transition-transform" />
        <span>My CV</span>
      </button>

      {/* --- MODAL PORTAL (CV) --- */}
      {showCV &&
        createPortal(
          <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200 font-mono"
            onClick={() => setShowCV(false)}
          >
            <div
              className="relative w-full max-w-5xl h-[85vh] bg-[#222] border-4 border-white shadow-[10px_10px_0px_black] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#e52521] border-b-4 border-white">
                <h3 className="text-white font-black text-sm uppercase tracking-widest flex items-center gap-2 drop-shadow-md">
                  <FileUser size={18} className="text-white" />
                  PLAYER_DATA: CV
                </h3>

                <div className="flex items-center gap-2">
                  <a
                    href={CvFile}
                    download="CV_Muhamad_Raffi.pdf"
                    className="p-2 bg-black hover:bg-gray-800 text-white border-2 border-white transition-colors cursor-pointer"
                    title="Download"
                    onClick={playCoinSound} // Sound effect saat download
                  >
                    <Download size={16} />
                  </a>

                  <button
                    onClick={() => setShowCV(false)}
                    className="p-2 bg-black hover:bg-red-600 text-white border-2 border-white transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 w-full h-full bg-[#333] relative p-2">
                <iframe
                  src={CvFile}
                  className="w-full h-full border-2 border-white/20"
                  title="CV Viewer"
                />
                <div className="absolute inset-0 -z-10 flex items-center justify-center text-white text-sm animate-pulse">
                  LOADING DATA...
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ButtonsAction;