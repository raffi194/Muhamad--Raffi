import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const About = () => {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        // Mengambil data dari table profile_about id 1
        const { data, error } = await supabase
          .from("profile_about")
          .select("content")
          .eq("id", 1)
          .single();

        if (data && !error) {
          setDescription(data.content);
        }
      } catch (err) {
        console.error("Error fetching about:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

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
          
          <div className="text-sm md:text-base leading-loose font-mono text-gray-200 w-full">
            {/* Hardcoded Intro Header (Optional, bisa dihapus jika ingin full dari DB) */}
            <span className="text-[#fbd000] font-bold">"It's a me, Raffi!"</span>{" "}
            
            {/* Dynamic Content from Database */}
            {loading ? (
               <span className="animate-pulse text-gray-500">[LOADING CHARACTER DATA...]</span>
            ) : (
               <span>{description || "No description available."}</span>
            )}
            
            {/* Hardcoded Footer / Power-Up text (Opsional) */}
            {/* Jika ingin full dinamis, hapus bagian bawah ini dan masukkan ke database text */}
            <br className="mb-2"/>
            <span className="block mt-2">
                Currently looking for a <span className="text-[#43b047] font-bold">Power-Up</span> to improve my skills and contribute to a professional organization.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;