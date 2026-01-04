import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

// --- INTERFACE ---
interface ExperienceItem {
  id?: number;
  title: string;
  role: string;
  image: string;
  desc?: string;       // Field khusus untuk Event & Work
  description?: string; // Field khusus untuk Organization
}

const ExperienceManager: React.FC = () => {
  const [subTab, setSubTab] = useState<'event' | 'organization' | 'working'>('event');
  
  const [dataList, setDataList] = useState<ExperienceItem[]>([]); 
  const [loading, setLoading] = useState(false);
  
  // State khusus untuk proses upload
  const [uploading, setUploading] = useState(false);

  // State form
  const [formData, setFormData] = useState<ExperienceItem>({ 
    title: '', 
    role: '', 
    image: '', 
    desc: '',       
    description: '' 
  });
  
  const [isEditing, setIsEditing] = useState<number | null>(null);

  // --- Fetch Data ---
  const fetchData = async () => {
    setLoading(true);
    let tableName = '';
    
    if (subTab === 'event') tableName = 'events'; 
    else if (subTab === 'organization') tableName = 'organizations'; 
    else if (subTab === 'working') tableName = 'work_experiences';

    const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('id', { ascending: false });
        
    if (error) {
        console.error('Error fetching:', error);
        alert(`Error: ${error.message}`);
    } else {
        setDataList((data as ExperienceItem[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    setFormData({ title: '', role: '', image: '', desc: '', description: '' });
    setIsEditing(null);
  }, [subTab]);

  // --- Handle Image Upload (FITUR BARU) ---
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      
      setUploading(true);
      const file = event.target.files[0];
      
      // Buat nama file unik: folder/timestamp-namafile
      // Pastikan bucket 'portfolio' ada di Supabase Storage Anda (public)
      const fileExt = file.name.split('.').pop();
      const fileName = `${subTab}-${Date.now()}.${fileExt}`;
      const filePath = `experience/${fileName}`;

      // 1. Upload ke Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio') // Menggunakan bucket 'portfolio' yang sama dengan ProfileManager
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Ambil Public URL
      const { data } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      // 3. Simpan URL ke state formData
      setFormData(prev => ({ ...prev, image: data.publicUrl }));
      
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // --- Handle Submit (Create/Update) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let tableName = '';
    let payload: any = {
        title: formData.title,
        role: formData.role,
        image: formData.image,
    };

    if (subTab === 'event') {
        tableName = 'events';
        payload.desc = formData.desc;
    } else if (subTab === 'organization') {
        tableName = 'organizations';
        payload.description = formData.description;
    } else if (subTab === 'working') {
        tableName = 'work_experiences';
        payload.desc = formData.desc;
    }

    let error;
    if (isEditing) {
      const { error: updateError } = await supabase.from(tableName).update(payload).eq('id', isEditing);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from(tableName).insert([payload]);
      error = insertError;
    }

    if (!error) {
        alert(isEditing ? 'Data updated successfully!' : 'Data created successfully!');
        setFormData({ title: '', role: '', image: '', desc: '', description: '' });
        setIsEditing(null);
        fetchData();
    } else {
        alert(`Failed: ${error.message}`);
    }
    
    setLoading(false);
  };

  // --- Handle Delete ---
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure used "Gust" to blow this data away?')) return;
    
    let tableName = '';
    if (subTab === 'event') tableName = 'events';
    else if (subTab === 'organization') tableName = 'organizations';
    else if (subTab === 'working') tableName = 'work_experiences';
    
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    if (!error) {
        fetchData();
    } else {
        alert(`Delete failed: ${error.message}`);
    }
  };

  // --- Handle Edit ---
  const handleEdit = (item: ExperienceItem) => {
    if (item.id !== undefined) {
        setIsEditing(item.id);
    }
    setFormData({
        title: item.title,
        role: item.role,
        image: item.image,
        desc: item.desc || '',               
        description: item.description || ''  
    });
  };

  // --- Styles (Pokemon Theme) ---
  const containerStyle = "border-4 border-yellow-400 bg-red-600 p-6 rounded-xl shadow-[10px_10px_0px_#1a202c]";
  const tabStyle = (isActive: boolean) => 
    `px-6 py-2 font-bold uppercase tracking-widest border-2 border-black transition-all cursor-pointer ${
      isActive ? 'bg-yellow-400 text-black shadow-[4px_4px_0px_black] -translate-y-1' : 'bg-white text-gray-500 hover:bg-gray-100'
    }`;
  
  const inputStyle = "w-full p-3 border-2 border-black rounded bg-green-100 font-mono focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all placeholder:text-gray-500";

  return (
    <div className="p-8 bg-blue-100 min-h-full font-mono">
        {/* Header Pokemon Style */}
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow-[4px_4px_0px_#2563EB] tracking-tighter stroke-black">
                POKÉ-EXPERIENCE CENTER
            </h1>
        </div>

        {/* Sub-Tabs */}
        <div className="flex justify-center gap-4 mb-8">
            <button onClick={() => setSubTab('event')} className={tabStyle(subTab === 'event')}>Events</button>
            <button onClick={() => setSubTab('organization')} className={tabStyle(subTab === 'organization')}>Organizations</button>
            <button onClick={() => setSubTab('working')} className={tabStyle(subTab === 'working')}>Working</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FORM SECTION (Pokedex Screen Style) */}
            <div className={containerStyle}>
                <div className="bg-gray-200 border-4 border-gray-400 p-4 rounded-lg mb-4 flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="font-bold text-gray-600 text-xs">MODE: {isEditing ? 'EVOLVE (EDIT)' : 'CATCH (ADD)'}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border-2 border-black rounded-lg">
                    {/* INPUT TITLE */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">TITLE</label>
                        <input 
                            placeholder="Title (e.g. Gym Leader)" 
                            value={formData.title} 
                            onChange={e => setFormData({...formData, title: e.target.value})} 
                            className={inputStyle} required 
                        />
                    </div>

                    {/* INPUT ROLE */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">ROLE / POSITION</label>
                        <input 
                            placeholder="Role (e.g. Water Type)" 
                            value={formData.role} 
                            onChange={e => setFormData({...formData, role: e.target.value})} 
                            className={inputStyle} required 
                        />
                    </div>

                    {/* INPUT IMAGE (UPLOAD FILE) */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">IMAGE UPLOAD</label>
                        
                        {/* Preview Image jika sudah ada */}
                        {formData.image && (
                            <div className="mb-2 p-2 border-2 border-dashed border-gray-400 bg-gray-50 rounded text-center">
                                <img src={formData.image} alt="Preview" className="h-24 mx-auto object-contain" />
                                <p className="text-[10px] text-gray-400 mt-1 break-all">{formData.image}</p>
                            </div>
                        )}
                        
                        <div className="relative">
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className={`file:mr-4 file:py-2 file:px-4
                                    file:rounded-none file:border-0
                                    file:text-sm file:font-bold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100
                                    ${inputStyle} p-1`} 
                            />
                            {uploading && (
                                <div className="absolute top-0 right-0 bg-yellow-300 px-2 py-1 text-xs font-bold border-2 border-black m-2 animate-bounce">
                                    Uploading...
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* INPUT DESCRIPTION (CONDITIONAL) */}
                    <div>
                        <label className="text-xs font-bold text-gray-500 ml-1">DESCRIPTION</label>
                        {subTab === 'organization' ? (
                            <textarea 
                                placeholder="Description (Organization)" 
                                value={formData.description} 
                                onChange={e => setFormData({...formData, description: e.target.value})} 
                                className={`${inputStyle} h-32`} required 
                            />
                        ) : (
                            <textarea 
                                placeholder="Desc (Event/Work)" 
                                value={formData.desc} 
                                onChange={e => setFormData({...formData, desc: e.target.value})} 
                                className={`${inputStyle} h-32`} required 
                            />
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading || uploading}
                        className={`w-full text-white font-bold py-3 border-2 border-black shadow-[4px_4px_0px_black] active:translate-y-1 active:shadow-none transition-all 
                        ${loading || uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                    >
                        {loading ? 'SAVING...' : uploading ? 'WAIT UPLOAD...' : isEditing ? 'UPDATE DATA' : 'REGISTER NEW DATA'}
                    </button>
                    
                    {isEditing && (
                        <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: '', role: '', image: '', desc: '', description: '' }); }} className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2 border-2 border-black">
                            CANCEL
                        </button>
                    )}
                </form>
            </div>

            {/* LIST SECTION (List Style) */}
            <div className="bg-white border-4 border-black p-4 shadow-[10px_10px_0px_gray] h-[750px] overflow-y-auto nintendo-scroll">
                <h3 className="text-xl font-bold mb-4 border-b-4 border-black pb-2 uppercase">{subTab === 'working' ? 'Work Exp' : subTab} LIST</h3>
                {loading && <p>Loading data...</p>}
                <div className="space-y-4">
                    {dataList.length === 0 && !loading && <p className="text-gray-500">No data found in database.</p>}
                    
                    {dataList.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 bg-gray-100 p-3 border-2 border-gray-300 hover:border-blue-500 transition-colors group">
                            {item.image ? (
                                <img src={item.image} alt="icon" className="w-16 h-16 object-cover rounded border-2 border-black bg-white" />
                            ) : (
                                <div className="w-16 h-16 bg-gray-300 border-2 border-black rounded flex items-center justify-center text-xs font-bold text-gray-500">No Img</div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-lg truncate">{item.title}</h4>
                                <p className="text-sm text-gray-600 truncate">{item.role}</p>
                            </div>
                            <div className="flex flex-col gap-2 shrink-0">
                                <button onClick={() => handleEdit(item)} className="bg-yellow-400 px-4 py-1 text-xs font-bold border-2 border-black hover:bg-yellow-300 shadow-[2px_2px_0_black] active:translate-y-0.5 active:shadow-none transition-all">EDIT</button>
                                <button onClick={() => item.id && handleDelete(item.id)} className="bg-red-500 text-white px-4 py-1 text-xs font-bold border-2 border-black hover:bg-red-400 shadow-[2px_2px_0_black] active:translate-y-0.5 active:shadow-none transition-all">DEL</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ExperienceManager;