import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { GraduationCap } from "lucide-react";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Icon Nintendo Pixelated Sederhana
const NintendoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="24" height="24">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="4" y="8" width="16" height="8" fill="currentColor" opacity="0.2"/>
    <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
  </svg>
);

// Interface Data
interface StatItem {
  id: number;
  label: string;
  value: string;
  icon_key: string;
}

const Stats = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from("profile_stats")
          .select("*")
          .order("id", { ascending: true }); // Pastikan urutan tetap: GPA -> Project -> Exp

        if (error) throw error;
        if (data) setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Style Block Dasar
  const blockStyle = "relative h-32 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center transition-transform hover:-translate-y-2 hover:shadow-[6px_6px_0px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none cursor-pointer group overflow-hidden";
  const questionBlock = `${blockStyle} bg-[#fbd000]`;
  const brickBlock = `${blockStyle} bg-[#c25934]`;

  // Helper untuk render icon berdasarkan key database
  const renderIcon = (key: string, className: string) => {
    if (key === 'gpa') return <GraduationCap className={className} size={28} />;
    if (key === 'project') return <FontAwesomeIcon icon={faPlaystation} className={`${className} text-2xl`} />;
    if (key === 'exp') return <NintendoIcon className={className} />;
    return null;
  };

  // Helper render content (karena strukturnya berulang)
  const renderContent = (item: StatItem, isDarkText: boolean) => (
    <div className={`z-10 flex flex-col items-center justify-center ${isDarkText ? "text-black" : "text-white"}`}>
        {renderIcon(item.icon_key, "mb-2 drop-shadow-md")}
        <div className="text-3xl font-black leading-none drop-shadow-md">{item.value}</div>
        <div className="text-[10px] uppercase tracking-widest mt-1 opacity-90 font-bold">{item.label}</div>
    </div>
  );

  // Loading State (Skeleton sederhana)
  if (loading) return <div className="text-center font-mono animate-pulse">Loading Stats...</div>;

  // Pastikan ada data, kalau kosong return null/error
  if (stats.length < 3) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
      
      {/* Item 1: GPA (Question Block) */}
      <div className={questionBlock}>
        {/* Hiasan Paku */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        
        {renderContent(stats[0], true)}
      </div>

      {/* Item 2: Projects (Brick Block) */}
      <div className={brickBlock}>
         <div className="absolute inset-0 opacity-20 bg-[linear-gradient(335deg,rgba(0,0,0,0.3)_2px,transparent_2px),linear-gradient(155deg,rgba(0,0,0,0.3)_2px,transparent_2px),linear-gradient(335deg,rgba(0,0,0,0.3)_2px,transparent_2px),linear-gradient(155deg,rgba(0,0,0,0.3)_2px,transparent_2px)] bg-size-[20px_20px]" />
         
         {renderContent(stats[1], false)}
      </div>

      {/* Item 3: Experience (Question Block) */}
      <div className={questionBlock}>
        {/* Hiasan Paku */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-black/30 rounded-full" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-black/30 rounded-full" />

        {renderContent(stats[2], true)}
      </div>

    </div>
  );
};

export default Stats;