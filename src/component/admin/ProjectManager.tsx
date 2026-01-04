import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// --- INTERFACES ---
interface Category {
  id: number;
  title: string;
  // description: string; // [DIHAPUS]
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

const ProjectManager: React.FC = () => {
  // --- STATE ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Jika null, berarti sedang mode "Manage Categories" (Garage Manager)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // State untuk loading upload

  // Form States
  const [catForm, setCatForm] = useState<Partial<Category>>({});
  const [projForm, setProjForm] = useState<Partial<Project> & { tech_stack_str?: string }>({});
  const [isEditing, setIsEditing] = useState(false);

  // --- FETCH DATA ---
  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select("*").order("id", { ascending: true });
    if (error) console.error(error);
    else setCategories(data || []);
    setLoading(false);
  };

  const fetchProjects = async (catId: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("category_id", catId)
      .order("id", { ascending: false });
    if (error) console.error(error);
    else setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProjects(selectedCategory.id);
      setProjForm({}); 
      setIsEditing(false);
    } else {
      // Jika kembali ke mode kategori, reset form
      setCatForm({});
      setIsEditing(false);
    }
  }, [selectedCategory]);

  // --- HANDLE FILE UPLOAD ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'category' | 'project') => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${type}s/${Date.now()}.${fileExt}`;

    try {
        const { error: uploadError } = await supabase.storage
            .from('portfolio')
            .upload(fileName, file);
        
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('portfolio').getPublicUrl(fileName);
        const publicUrl = data.publicUrl;

        if (type === 'category') {
            setCatForm(prev => ({ ...prev, thumbnail_url: publicUrl }));
        } else {
            setProjForm(prev => ({ ...prev, image_url: publicUrl }));
        }

    } catch (error: any) {
        alert("Upload failed: " + error.message);
    } finally {
        setUploading(false);
    }
  };

  // --- CRUD CATEGORY ---
  const handleSaveCategory = async () => {
    if (!catForm.title) return alert("Title is required!");
    
    setLoading(true);
    if (isEditing && catForm.id) {
      const { error } = await supabase.from("categories").update(catForm).eq("id", catForm.id);
      if (!error) {
        alert("Category updated!");
        setCatForm({});
        setIsEditing(false);
        fetchCategories();
      } else {
        alert("Error: " + error.message);
      }
    } else {
      const { error } = await supabase.from("categories").insert([catForm]);
      if (!error) {
        alert("Category added!");
        setCatForm({});
        fetchCategories();
      } else {
        alert("Error: " + error.message);
      }
    }
    setLoading(false);
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("WARNING: Deleting this category will delete ALL projects inside it! Continue?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) fetchCategories();
    else alert("Delete failed: " + error.message);
  };

  // --- CRUD PROJECT ---
  const handleSaveProject = async () => {
    if (!selectedCategory) return;
    if (!projForm.title) return alert("Title is required!");

    const stackArray = projForm.tech_stack_str 
      ? projForm.tech_stack_str.split(",").map((s) => s.trim()) 
      : [];

    const payload = {
      title: projForm.title,
      description: projForm.description,
      image_url: projForm.image_url,
      demo_url: projForm.demo_url,
      repo_url: projForm.repo_url,
      category_id: selectedCategory.id,
      tech_stack: stackArray,
    };

    setLoading(true);
    if (isEditing && projForm.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", projForm.id);
        if (!error) {
            alert("Project updated!");
            setProjForm({});
            setIsEditing(false);
            fetchProjects(selectedCategory.id);
        } else {
            alert("Error: " + error.message);
        }
    } else {
        const { error } = await supabase.from("projects").insert([payload]);
        if (!error) {
            alert("Project added!");
            setProjForm({});
            fetchProjects(selectedCategory.id);
        } else {
            alert("Error: " + error.message);
        }
    }
    setLoading(false);
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error && selectedCategory) fetchProjects(selectedCategory.id);
    else if (error) alert("Delete failed: " + error.message);
  };

  // --- EDIT HELPERS ---
  const startEditCategory = (cat: Category) => {
    setSelectedCategory(null);
    setCatForm(cat);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditProject = (proj: Project) => {
    setProjForm({
        ...proj,
        tech_stack_str: proj.tech_stack ? proj.tech_stack.join(", ") : ""
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- STYLES ---
  const inputClass = "w-full bg-zinc-800 border-2 border-zinc-700 p-2 rounded text-white focus:border-red-500 outline-none italic transition-colors placeholder:text-zinc-600";
  const labelClass = "text-xs font-bold text-zinc-400 uppercase ml-1 mb-1 block";

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 md:p-8 font-sans text-white overflow-y-auto nintendo-scroll">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="relative mb-8 text-center">
            <h1 className="text-5xl md:text-6xl font-black italic text-yellow-400 uppercase tracking-tighter drop-shadow-[4px_4px_0_#000]">
                Project Manager
            </h1>
        </div>

        {/* --- CATEGORY CHOICE BUTTONS --- */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center items-center">
            <button
                onClick={() => setSelectedCategory(null)}
                className={`px-5 py-2 rounded skew-x-[-10deg] font-bold uppercase italic border-2 transition-all duration-300 shadow-md ${
                    selectedCategory === null 
                    ? "bg-red-600 border-red-800 text-white scale-110 z-10 shadow-[0_0_15px_rgba(220,38,38,0.6)]" 
                    : "bg-zinc-800 border-zinc-600 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                }`}
            >
                ⚙️ Garage
            </button>

            <div className="w-px h-8 bg-zinc-700 mx-2 hidden md:block"></div>

            {categories.map((cat) => (
                <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded skew-x-[-10deg] font-bold uppercase italic border-2 transition-all duration-300 shadow-md ${
                        selectedCategory?.id === cat.id
                        ? "bg-yellow-400 border-yellow-600 text-black scale-110 z-10 shadow-[0_0_15px_rgba(250,204,21,0.6)]"
                        : "bg-zinc-800 border-zinc-600 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                    }`}
                >
                    {cat.title}
                </button>
            ))}
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- KOLOM KIRI: FORM INPUT --- */}
            <div className="lg:col-span-1">
                <div className={`border-4 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] sticky top-8 transition-colors duration-500 ${
                    selectedCategory ? "bg-zinc-900 border-yellow-400" : "bg-zinc-900 border-red-600"
                }`}>
                    <h2 className={`text-2xl font-bold italic mb-6 uppercase border-b-2 pb-2 ${
                        selectedCategory ? "text-yellow-400 border-yellow-400" : "text-red-500 border-red-600"
                    }`}>
                        {selectedCategory 
                            ? (isEditing ? "Tune Up Project" : "New Project") 
                            : (isEditing ? "Edit Category" : "New Category")
                        }
                    </h2>
                    
                    {!selectedCategory ? (
                        // --- FORM CATEGORY (DESKRIPSI DIHAPUS) ---
                        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                            <div>
                                <label className={labelClass}>Category Title</label>
                                <input 
                                    className={inputClass}
                                    placeholder="e.g. Frontend Development"
                                    value={catForm.title || ""}
                                    onChange={e => setCatForm({...catForm, title: e.target.value})}
                                />
                            </div>
                            
                            {/* UPLOAD THUMBNAIL CATEGORY */}
                            <div>
                                <label className={labelClass}>Thumbnail Image</label>
                                {catForm.thumbnail_url && (
                                    <div className="mb-2 border-2 border-dashed border-zinc-600 p-1 rounded bg-black/50">
                                        <img src={catForm.thumbnail_url} alt="Preview" className="h-20 w-full object-contain" />
                                    </div>
                                )}
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'category')}
                                    disabled={uploading}
                                    className="block w-full text-xs text-zinc-400
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded file:border-0
                                      file:text-xs file:font-bold
                                      file:bg-zinc-700 file:text-white
                                      hover:file:bg-zinc-600 cursor-pointer"
                                />
                                {uploading && <p className="text-yellow-400 text-xs mt-1 animate-pulse">Uploading...</p>}
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button 
                                    onClick={handleSaveCategory}
                                    disabled={loading || uploading}
                                    className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded font-bold uppercase italic -skew-x-6 transition-all shadow-md active:scale-95 disabled:bg-zinc-600"
                                >
                                    {loading ? "Saving..." : isEditing ? "Update" : "Add"}
                                </button>
                                {isEditing && (
                                    <button 
                                        onClick={() => { setIsEditing(false); setCatForm({}); }}
                                        className="bg-zinc-600 hover:bg-zinc-500 text-white px-4 rounded font-bold uppercase italic -skew-x-6"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        // --- FORM PROJECT ---
                        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
                            <div>
                                <label className={labelClass}>Project Title</label>
                                <input 
                                    className={`${inputClass} focus:border-yellow-400`}
                                    placeholder="e.g. Piston Cup App"
                                    value={projForm.title || ""}
                                    onChange={e => setProjForm({...projForm, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Description</label>
                                <textarea 
                                    className={`${inputClass} focus:border-yellow-400`}
                                    rows={3}
                                    placeholder="Project details..."
                                    value={projForm.description || ""}
                                    onChange={e => setProjForm({...projForm, description: e.target.value})}
                                />
                            </div>
                            
                            {/* UPLOAD PROJECT IMAGE */}
                            <div>
                                <label className={labelClass}>Project Image</label>
                                {projForm.image_url && (
                                    <div className="mb-2 border-2 border-dashed border-zinc-600 p-1 rounded bg-black/50">
                                        <img src={projForm.image_url} alt="Preview" className="h-24 w-full object-contain" />
                                    </div>
                                )}
                                <input 
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'project')}
                                    disabled={uploading}
                                    className="block w-full text-xs text-zinc-400
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded file:border-0
                                      file:text-xs file:font-bold
                                      file:bg-zinc-700 file:text-white
                                      hover:file:bg-zinc-600 cursor-pointer"
                                />
                                {uploading && <p className="text-yellow-400 text-xs mt-1 animate-pulse">Uploading...</p>}
                            </div>

                            <div>
                                <label className={labelClass}>Tech Stack (comma separated)</label>
                                <input 
                                    className={`${inputClass} focus:border-yellow-400`}
                                    placeholder="React, Supabase, Tailwind"
                                    value={projForm.tech_stack_str || ""}
                                    onChange={e => setProjForm({...projForm, tech_stack_str: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className={labelClass}>Demo URL</label>
                                    <input 
                                        className={`${inputClass} focus:border-yellow-400 text-xs`}
                                        placeholder="https://..."
                                        value={projForm.demo_url || ""}
                                        onChange={e => setProjForm({...projForm, demo_url: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Repo URL</label>
                                    <input 
                                        className={`${inputClass} focus:border-yellow-400 text-xs`}
                                        placeholder="https://github..."
                                        value={projForm.repo_url || ""}
                                        onChange={e => setProjForm({...projForm, repo_url: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button 
                                    onClick={handleSaveProject}
                                    disabled={loading || uploading}
                                    className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black py-2 rounded font-bold uppercase italic -skew-x-6 transition-all shadow-[0_3px_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 disabled:bg-zinc-600"
                                >
                                    {loading ? "Saving..." : isEditing ? "Update Project" : "Add Project"}
                                </button>
                                {isEditing && (
                                    <button 
                                        onClick={() => { setIsEditing(false); setProjForm({}); }}
                                        className="bg-zinc-600 hover:bg-zinc-500 text-white px-4 rounded font-bold uppercase italic -skew-x-6"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- KOLOM KANAN: LIST DATA --- */}
            <div className="lg:col-span-2">
                
                {/* 1. JIKA DI MODE GARAGE (MANAGE CATEGORIES) */}
                {!selectedCategory && (
                    <div className="animate-in slide-in-from-right-8 duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold italic text-zinc-400 uppercase">Your Categories</h3>
                            <span className="text-xs text-zinc-600 bg-zinc-900 px-2 py-1 rounded">Total: {categories.length}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categories.map((cat) => (
                                <div key={cat.id} className="group relative bg-zinc-900 border-2 border-zinc-700 rounded-lg p-4 flex gap-4 items-center hover:border-red-500 transition-all">
                                    <div className="w-16 h-16 bg-zinc-800 rounded overflow-hidden shrink-0 border border-zinc-600">
                                        {cat.thumbnail_url ? (
                                            <img src={cat.thumbnail_url} className="w-full h-full object-cover" alt="thumb"/>
                                        ) : <div className="flex items-center justify-center w-full h-full text-xs">No IMG</div>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-black italic text-white truncate group-hover:text-red-500 transition-colors">{cat.title}</h3>
                                        {/* Deskripsi di sini dihapus agar tidak error jika fieldnya hilang dari DB */}
                                        <div className="flex gap-2 mt-2">
                                            <button onClick={() => startEditCategory(cat)} className="text-[10px] bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded font-bold uppercase">Edit</button>
                                            <button onClick={() => handleDeleteCategory(cat.id)} className="text-[10px] bg-red-900 hover:bg-red-700 text-white px-3 py-1 rounded font-bold uppercase">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. JIKA DI MODE PROJECT (MANAGE PROJECTS) */}
                {selectedCategory && (
                    <div className="animate-in slide-in-from-right-8 duration-500">
                        <div className="flex items-center justify-between mb-4">
                             <h3 className="text-xl font-bold italic text-yellow-400 uppercase">
                                Projects in "{selectedCategory.title}"
                             </h3>
                             <span className="text-xs text-zinc-600 bg-zinc-900 px-2 py-1 rounded">Count: {projects.length}</span>
                        </div>

                         {projects.length === 0 && (
                             <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-zinc-800 rounded-lg">
                                 <p className="text-zinc-500 italic">No projects here yet.</p>
                                 <p className="text-zinc-600 text-sm">Use the form on the left to add one.</p>
                             </div>
                         )}
                         
                         <div className="flex flex-col gap-4">
                             {projects.map((proj) => (
                                <div key={proj.id} className="bg-zinc-900 border border-zinc-700 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-start hover:bg-zinc-800 hover:border-yellow-400/50 transition-all">
                                    <div className="w-full md:w-32 h-20 bg-black rounded overflow-hidden shrink-0 border border-zinc-800">
                                        {proj.image_url ? (
                                            <img src={proj.image_url} className="w-full h-full object-cover opacity-80" alt="proj" />
                                        ) : <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600">No IMG</div>}
                                    </div>
                                    <div className="flex-1 w-full">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-bold italic text-white">{proj.title}</h3>
                                            <div className="flex gap-1 shrink-0 ml-2">
                                                <button onClick={() => startEditProject(proj)} className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-xs font-bold uppercase text-white">Edit</button>
                                                <button onClick={() => handleDeleteProject(proj.id)} className="px-3 py-1 bg-red-800 hover:bg-red-700 rounded text-xs font-bold uppercase text-white">X</button>
                                            </div>
                                        </div>
                                        <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{proj.description}</p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {proj.tech_stack?.map((t, i) => (
                                                <span key={i} className="text-[10px] bg-black border border-zinc-700 text-yellow-400/80 px-1.5 py-0.5 rounded font-mono">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                             ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;