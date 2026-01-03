import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProjectLogo from "./ProjectLogo";
import Directions from "../Directions";
import ProjectList, { type Project } from "./ProjectList";

interface Category {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
}

const DetailProject = () => {
  // --- STATE ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // --- FETCH CATEGORIES ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        if (data) setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // --- FETCH PROJECTS ---
  useEffect(() => {
    if (!selectedCategory) return;
    const fetchProjectsByCategory = async () => {
      setLoadingProjects(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("category_id", selectedCategory.id)
          .order("id", { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjectsByCategory();
  }, [selectedCategory]);

  // --- HANDLERS ---
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleBackToMenu = () => {
    setSelectedCategory(null);
    setProjects([]);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col w-full h-full bg-[#1a1a1a] overflow-hidden font-sans">
      
      {/* Directions: Hanya tampil jika BELUM memilih kategori (Menu Utama) */}
      {!selectedCategory && (
        <div className="scale-40 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg p-2 rounded-4xl translate-y-3 pointer-events-none absolute bottom-0 left-1/2 -translate-x-202 z-10">
          <Directions />
        </div>
      )}

      {/* Background Pattern Global */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Strip Balap Kiri & Kanan */}
      <div
        className="absolute left-0 top-0 bottom-0 w-8 bg-repeat-y opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      ></div>
      <div
        className="absolute right-0 top-0 bottom-0 w-8 bg-repeat-y opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      ></div>

      {/* --- HEADER (Hanya Tampil jika BELUM memilih Kategori) --- */}
      {!selectedCategory && (
        <div className="relative z-10 text-center shrink-0 pt-6">
          <ProjectLogo className="inline w-25 h-25" />
        </div>
      )}

      {/* --- BACK BUTTON (Only visible inside a category) --- */}
      {selectedCategory && (
        <div className="relative z-30 w-full max-w-7xl mx-auto px-8 md:px-16 mb-4 mt-8">
          <button
            onClick={handleBackToMenu}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white text-xs font-bold uppercase italic rounded border-l-4 border-red-600 hover:bg-zinc-700 hover:pl-6 transition-all shadow-lg"
          >
            <span>◄</span> Pit Stop (Back)
          </button>
        </div>
      )}

      {/* --- CONTENT SCROLL AREA --- */}
      <div className="relative z-10 flex-1 w-full overflow-y-auto nintendo-scroll px-8 md:px-16 pb-12">
        <div className="w-full max-w-7xl mx-auto min-h-[50vh]">
          
          {/* VIEW 1: CATEGORIES SELECTION */}
          {!selectedCategory && (
            <>
              {loading ? (
                <div className="flex items-center justify-center h-40 mt-10">
                  <p className="text-yellow-400 italic animate-pulse text-xl font-bold">
                    Loading Tracks...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat)}
                      className="group relative h-64 bg-zinc-900 border-4 border-zinc-800 rounded-2xl overflow-hidden cursor-pointer hover:border-yellow-400 hover:scale-[1.03] transition-all duration-300 shadow-xl"
                    >
                      <div className="absolute inset-0">
                        {cat.thumbnail_url ? (
                          <img
                            src={cat.thumbnail_url}
                            alt={cat.title}
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="w-full h-full bg-zinc-800" />
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter skew-x-[-10deg] drop-shadow-md group-hover:text-yellow-400 transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-zinc-400 text-sm font-medium mt-1 line-clamp-2">
                          {cat.description}
                        </p>
                        <div className="mt-4 inline-block px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase italic rounded skew-x-[-10deg]">
                          Start Engine
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* VIEW 2: PROJECT LIST (Filtered) */}
          {selectedCategory && (
            <ProjectList 
              loadingProjects={loadingProjects} 
              projects={projects} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProject;