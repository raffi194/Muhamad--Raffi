import React from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  demo_url: string;
  repo_url: string;
  category_id: number;
}

interface ProjectListProps {
  loadingProjects: boolean;
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({
  loadingProjects,
  projects,
}) => {
  return (
    // Wrapper utama relative agar bisa menampung absolute background
    <div className="relative w-full min-h-full">
      
      {/* --- BACKGROUND LAYER (TIBAN / COVER) --- */}
      {/* Background ini memiliki z-20 agar menutupi Directions (yg z-10) di parent, 
          tapi tetap di bawah konten list (z-30) */}
      <div className="fixed inset-0 bg-[#1a1a1a] z-20 pointer-events-none"></div>
      
      {/* Pattern Background (opsional, agar senada dengan DetailProject) */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none z-20"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* --- CONTENT LAYER --- */}
      {/* z-30 agar konten list muncul di atas background yang kita buat tadi */}
      <div className="relative z-30 pb-10">
        
        {/* 1. Loading State */}
        {loadingProjects && (
          <div className="flex items-center justify-center h-40 mt-10">
            <p className="text-red-500 italic animate-pulse text-xl font-bold">
              Revving Engines...
            </p>
          </div>
        )}

        {/* 2. Empty State */}
        {!loadingProjects && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center h-60 text-zinc-500 border-2 border-dashed border-zinc-700 rounded-xl bg-zinc-900/50">
            <p className="text-xl font-bold italic uppercase">Garage Empty</p>
            <p className="text-sm">No projects in this class yet.</p>
          </div>
        )}

        {/* 3. Project Grid (Data Available) */}
        {!loadingProjects && projects.length > 0 && (
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
      </div>
    </div>
  );
};

export default ProjectList;