import Nintendo from "../component/Nintendo";

const Profile = () => {
  return (
    // 1. Container:
    // - Menambahkan padding responsif (p-4 hingga p-12) agar konten tidak mepet tepi.
    // - Flexbox akan menjaga posisi tetap di tengah (center).
    <div className="relative w-screen h-screen bg-neutral-900 overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      
      <style>{`
        .animate-pop { animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes pop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; }}
      `}</style>

      {/* 2. Wrapper Nintendo (Scaling):
         - Default (Mobile): scale-[0.5] (agar muat di HP vertikal)
         - sm (Tablet Portrait): scale-[0.65]
         - md (Tablet Landscape/Laptop Kecil): scale-[0.8]
         - lg (Laptop Standar): scale-[0.9]
         - xl (Monitor Desktop): scale-100 (ukuran asli)
         - 2xl (Monitor Besar): scale-110 (sedikit diperbesar)
      */}
      <div className="animate-pop transform transition-transform duration-500 ease-out 
        scale-[0.5] 
        sm:scale-[0.53] 
        md:scale-[0.68] 
        lg:scale-[0.83] 
        xl:scale-110 
        2xl:scale-120">
        
        <Nintendo />
        
      </div>
    </div>
  );
};

export default Profile;