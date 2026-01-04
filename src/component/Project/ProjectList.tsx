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
    <div className="relative w-full min-h-full">
      
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 bg-[#1a1a1a] z-20 pointer-events-none"></div>
      <div
        className="fixed inset-0 opacity-10 pointer-events-none z-20"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* CONTENT LAYER */}
      <div className="relative z-30 pb-10">
        
        {/* Loading State */}
        {loadingProjects && (
          <div className="flex items-center justify-center h-40 mt-10">
            <p className="text-red-500 italic animate-pulse text-xl font-bold">
              Revving Engines...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loadingProjects && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center h-60 text-zinc-500 border-2 border-dashed border-zinc-700 rounded-xl bg-zinc-900/50">
            <p className="text-xl font-bold italic uppercase">Garage Empty</p>
            <p className="text-sm">No projects in this class yet.</p>
          </div>
        )}

        {/* Project Grid */}
        {!loadingProjects && projects.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 py-2 duration-500">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-zinc-900 border-2 border-zinc-700 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] flex flex-col"
              >
                {/* Sticker ID */}
                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded skew-x-[-10deg] shadow-md z-20">
                  #{project.id < 10 ? `0${project.id}` : project.id}
                </div>

                {/* Image */}
                <div className="h-24 md:h-36 w-full bg-zinc-800 overflow-hidden relative shrink-0">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 font-bold italic text-xs">
                      NO PREVIEW
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-900 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-5 flex flex-col flex-1">
                  <h3 className="text-sm md:text-xl font-bold text-white italic mb-1 truncate group-hover:text-red-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack - PERBAIKAN DI SINI */}
                  <div className="flex flex-wrap gap-1 mb-3 md:mb-6 mt-auto">
                    {/* .slice(0, 3) DIBUANG agar menampilkan semua data */}
                    {project.tech_stack?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[8px] md:text-[10px] uppercase font-bold px-1.5 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-600 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col md:flex-row gap-2 pt-2 border-t border-zinc-800">
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center bg-red-600 hover:bg-red-500 text-white text-[10px] md:text-xs font-bold py-2 rounded uppercase italic -skew-x-6 transition-all active:scale-95 shadow-[0_3px_0_rgb(153,27,27)] active:shadow-none active:translate-y-1"
                      >
                        Test Drive
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 text-center bg-zinc-700 hover:bg-zinc-600 text-white text-[10px] md:text-xs font-bold py-2 rounded uppercase italic -skew-x-6 transition-all active:scale-95 shadow-[0_3px_0_rgb(63,63,70)] active:shadow-none active:translate-y-1"
                      >
                        Blueprint
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