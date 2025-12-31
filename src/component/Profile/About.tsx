import { FileText } from "lucide-react";

const About = () => {
  return (
    <div className="relative mt-4">
      {/* Decorative Label */}
      <div className="absolute -top-4 left-6 bg-[#43b047] text-white px-4 py-1 border-4 border-black text-xs font-bold uppercase tracking-widest shadow-[2px_2px_0px_black] z-20">
        Character Info
      </div>

      {/* Main Box */}
      <div className="bg-[#222] text-white p-6 md:p-8 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.3)] relative">
        {/* Corner Decors (Pixel corners) */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-white" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-white" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-white" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-white" />

        <div className="flex items-start gap-4">
            <div className="hidden md:block mt-1">
                <FileText size={32} className="text-[#fbd000]" />
            </div>
            <p className="text-sm md:text-base leading-loose font-mono text-gray-200">
                <span className="text-[#fbd000] font-bold">"It's a me, Raffi!"</span> I am a second-year Information Systems student at Brawijaya University, 
                highly enthusiastic about technology. Like Mario jumping over obstacles, 
                I have a self-motivated attitude to thrive in dynamic environments. 
                Currently looking for a <span className="text-[#43b047] font-bold">Power-Up</span> to improve my skills and contribute to a professional organization.
            </p>
        </div>
      </div>
    </div>
  );
};

export default About;