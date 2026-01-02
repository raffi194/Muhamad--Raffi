import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProjectLogo from "./ProjectLogo";

// --- INTERFACES ---
interface Category {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  demo_url: string;
  repo_url: string;
  category_id: number;
}

const DetailProject = () => {
  // --- STATE ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // State untuk navigasi: Jika null, berarti sedang di menu Kategori
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // --- FETCH CATEGORIES (Initial Load) ---
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

  // --- FETCH PROJECTS BY CATEGORY ---
  useEffect(() => {
    if (!selectedCategory) return; // Jangan fetch jika belum pilih kategori

    const fetchProjectsByCategory = async () => {
      setLoadingProjects(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("category_id", selectedCategory.id) // Filter by Category ID
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
    setProjects([]); // Clear projects untuk hemat memori
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col w-full h-full bg-[#1a1a1a] overflow-hidden font-sans">
      {/* --- BACKGROUND PATTERN --- */}
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

      {/* --- HEADER (LOGIKA: Hanya Tampil jika BELUM memilih Kategori) --- */}
      {!selectedCategory && (
        <div className="relative z-10 text-center shrink-0 pt-6">
          <ProjectLogo className="inline w-25 h-25" />
        </div>
      )}

      {/* --- BACK BUTTON (Only visible inside a category) --- */}
      {selectedCategory && (
        // Menambahkan mt-8 agar tidak terlalu mepet atas karena Logo hilang
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 md:px-16 mb-4 mt-8">
          <button
            onClick={handleBackToMenu}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white text-xs font-bold uppercase italic rounded border-l-4 border-red-600 hover:bg-zinc-700 hover:pl-6 transition-all"
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
                      {/* Category Image */}
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

                      {/* Category Text */}
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
            <>
              {loadingProjects ? (
                <div className="flex items-center justify-center h-40 mt-10">
                  <p className="text-red-500 italic animate-pulse text-xl font-bold">
                    Revving Engines...
                  </p>
                </div>
              ) : projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 text-zinc-500 border-2 border-dashed border-zinc-700 rounded-xl">
                  <p className="text-xl font-bold italic uppercase">
                    Garage Empty
                  </p>
                  <p className="text-sm">No projects in this class yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 py-2 duration-500">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="group relative bg-zinc-900 border-2 border-zinc-700 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] flex flex-col"
                    >
                      {/* Sticker ID */}
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded skew-x-[-10deg] shadow-md z-20">
                        #{project.id < 10 ? `0${project.id}` : project.id}
                      </div>

                      {/* Image */}
                      <div className="h-36 w-full bg-zinc-800 overflow-hidden relative shrink-0">
                        {project.image_url ? (
                          <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 font-bold italic">
                            NO PREVIEW
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-white italic mb-1 truncate group-hover:text-red-500 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                          {project.tech_stack?.slice(0, 3).map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] uppercase font-bold px-2 py-1 bg-zinc-800 text-zinc-300 border border-zinc-600 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-2 border-t border-zinc-800">
                          {project.demo_url && (
                            <a
                              href={project.demo_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 text-center bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-2.5 rounded uppercase italic -skew-x-6 transition-all active:scale-95 shadow-[0_4px_0_rgb(153,27,27)] active:shadow-none active:translate-y-1"
                            >
                              Test Drive
                            </a>
                          )}
                          {project.repo_url && (
                            <a
                              href={project.repo_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 text-center bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold py-2.5 rounded uppercase italic -skew-x-6 transition-all active:scale-95 shadow-[0_4px_0_rgb(63,63,70)] active:shadow-none active:translate-y-1"
                            >
                              Blueprints
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailProject;