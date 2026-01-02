const StatusLevel = () => {
  return (
    <div className="hidden sm:flex items-center gap-4 bg-black p-3 border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transform -skew-x-6">
      <div className="flex flex-col items-center">
         <span className="text-[#fbd000] text-[10px] font-bold uppercase tracking-widest">AGE/LVL</span>
         <span className="text-white text-2xl font-mono leading-none tracking-widest">21</span>
      </div>
    </div>
  );
};

export default StatusLevel;