import React from 'react';

const ProjectManager: React.FC = () => {
  return (
    <div className="p-8 min-h-full bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Header Checkerboard */}
        <div className="h-8 w-full bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fff_10px,#fff_20px)] border-4 border-red-600 mb-6"></div>
        
        <div className="bg-red-600 p-8 rounded-xl border-4 border-yellow-400 shadow-[0_0_20px_rgba(220,38,38,0.6)]">
            <h1 className="text-5xl font-extrabold italic text-yellow-400 text-center mb-8 uppercase tracking-tighter" style={{ textShadow: '4px 4px 0px black' }}>
                KACHOW! PROJECTS
            </h1>

            <div className="bg-white p-6 rounded-lg border-4 border-black transform -skew-x-6">
                <h2 className="text-2xl font-bold italic text-black mb-4 uppercase">Piston Cup Garage</h2>
                <p className="font-bold text-gray-600">CRUD untuk Project akan ada di sini dengan kecepatan tinggi.</p>
                <div className="mt-6 flex gap-4">
                    <div className="h-12 w-full bg-gray-200 rounded border-2 border-black italic p-2">Input Project Name...</div>
                </div>
            </div>
        </div>
        
        <div className="h-8 w-full bg-[repeating-linear-gradient(-45deg,#000,#000_10px,#fff_10px,#fff_20px)] border-4 border-red-600 mt-6"></div>
      </div>
    </div>
  );
};

export default ProjectManager;