import React from 'react';

const ProfileManager: React.FC = () => {
  return (
    <div className="p-8 min-h-full bg-[#5c94fc] font-serif"> {/* Mario Sky Blue */}
       <div className="max-w-4xl mx-auto border-4 border-black bg-[#c84c0c] p-1 shadow-[8px_8px_0px_black]"> {/* Brick Red */}
            <div className="border-4 border-[#ffccc5] p-6 bg-[#c84c0c]">
                 <h1 className="text-4xl text-white font-black uppercase text-center mb-8 drop-shadow-md border-b-4 border-black pb-4">
                    Mario Profile World
                 </h1>
                 
                 <div className="bg-[#ffccc5] p-8 border-4 border-black text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
                     <p className="text-2xl font-bold text-[#c84c0c] mb-4">It's a me, Admin!</p>
                     <p className="text-gray-800">
                         Fitur CRUD Profile (DetailProfile.tsx) akan ditempatkan di sini.
                         Bayangkan ada pipa hijau dan kotak tanda tanya (?) di sini.
                     </p>
                     <div className="mt-8 flex justify-center gap-4">
                        <button className="bg-[#e4000f] text-white px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_black] hover:translate-y-1 hover:shadow-none">
                            SAVE
                        </button>
                     </div>
                 </div>
            </div>
       </div>
    </div>
  );
};

export default ProfileManager;