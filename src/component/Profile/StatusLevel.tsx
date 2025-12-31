const StatusLevel = () => {
  return (
    <div className="hidden sm:flex items-center gap-4 bg-black p-3 border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transform -skew-x-6">
      <div className="flex flex-col items-center border-r-2 border-gray-600 pr-4">
         <span className="text-[#e52521] text-[10px] font-bold uppercase tracking-widest">WORLD</span>
         <span className="text-white text-xl font-mono leading-none">1-1</span>
      </div>
      
      <div className="flex flex-col items-center">
         <span className="text-[#fbd000] text-[10px] font-bold uppercase tracking-widest">AGE/LVL</span>
         <span className="text-white text-2xl font-mono leading-none tracking-widest">21</span>
      </div>

      <div className="flex flex-col items-center border-l-2 border-gray-600 pl-4">
         <span className="text-[#6b8cff] text-[10px] font-bold uppercase tracking-widest">TIME</span>
         <span className="text-white text-xl font-mono leading-none">∞</span>
      </div>
    </div>
  );
};

export default StatusLevel;