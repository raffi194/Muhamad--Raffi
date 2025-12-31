import { useState } from "react";
import { createPortal } from "react-dom";
import { Award, FileUser, Download, X } from "lucide-react";
import CvFile from "../../assets/CV.pdf";

const ButtonsAction = () => {
  const [showCV, setShowCV] = useState(false);

  // Style untuk tombol 8-bit (Merah)
  const btnStyle = "flex items-center gap-2 bg-[#e52521] hover:bg-[#ff4444] text-white border-b-4 border-r-4 border-black active:border-b-0 active:border-r-0 active:translate-y-1 active:translate-x-1 transition-all px-4 py-2 font-bold uppercase tracking-wider text-xs shadow-[2px_2px_0px_rgba(0,0,0,0.5)]";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Button Certificate */}
      <button
        className={btnStyle}
        onClick={() => alert("Open Certificate Link")}
      >
        <Award size={16} className="text-[#fbd000]" />
        <span>Certificates</span>
      </button>

      {/* Button CV */}
      <button
        className={btnStyle}
        onClick={() => setShowCV(true)}
      >
        <FileUser size={16} className="text-[#fbd000]" />
        <span>My CV</span>
      </button>

      {/* --- MODAL PORTAL (TEMA RETRO JUGA) --- */}
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
                    className="p-2 bg-black hover:bg-gray-800 text-white border-2 border-white transition-colors"
                    title="Download"
                  >
                    <Download size={16} />
                  </a>

                  <button
                    onClick={() => setShowCV(false)}
                    className="p-2 bg-black hover:bg-red-600 text-white border-2 border-white transition-colors"
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