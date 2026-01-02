import Profile from "../../assets/fotoformal.png";

// --- COMPONENT NAME (MARIO STYLE) ---
const ProfileName = () => {
  return (
    <div className="flex flex-row items-center w-full gap-6">
      {/* WARP PIPE CONTAINER */}
      <div className="relative group">
        <div className="w-28 h-28 rounded-full border-[6px] border-green-700 bg-green-600 overflow-hidden shadow- relative z-10 flex items-center justify-center">
           {/* Highlight Pipa */}
           <div className="absolute inset-0 border-4 border-green-600 rounded-full pointer-events-none z-20"></div>
           
           <img src={Profile} className="w-32 h-32 translate-y-3 object-cover" alt="Profile" />
        </div>
        {/* Bayangan Pipa di bawah */}
        <div className="absolute -bottom-2 -right-2 w-28 h-28 bg-black rounded-full -z-10" />
      </div>

      <div className="text-left">
        <h1 className="text-4xl font-black tracking-tighter text-[#222] uppercase drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]" style={{fontFamily: 'monospace'}}>
          Muhamad Raffi
        </h1>
        <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
          {/* Badge Role ala Jamur */}
          <span className=" bg-[#e52521] text-white text-xs font-bold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_black] uppercase tracking-wide flex items-center gap-2">
            Information Systems
          </span>
          <span className="bg-[#fbd000] text-black text-xs font-bold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_black] uppercase">
            Student
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileName;