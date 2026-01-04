import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Trash2, Edit, Save, Upload, FileText, BookOpen } from "lucide-react";

// --- INTERFACES ---
interface StatItem {
  id: number;
  label: string;
  value: string;
  icon_key: string;
}

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image_url: string;
  credential_url: string;
}

const ProfileManager: React.FC = () => {
  // --- STATE TABS ---
  // Menambahkan tab 'about'
  const [activeTab, setActiveTab] = useState<
    "stats" | "certificates" | "cv" | "about"
  >("stats");

  // --- STATE STATS ---
  const [stats, setStats] = useState<StatItem[]>([]);

  // --- STATE CERTIFICATES ---
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [certForm, setCertForm] = useState<Partial<Certificate>>({});
  const [isEditingCert, setIsEditingCert] = useState(false);

  // --- STATE CV ---
  const [cvUrl, setCvUrl] = useState<string>("");
  const [uploadingCv, setUploadingCv] = useState(false);

  // --- STATE ABOUT (NEW) ---
  const [aboutText, setAboutText] = useState("");

  // --- LOADING STATES ---
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --- INITIAL LOAD ---
  useEffect(() => {
    fetchStats();
    fetchCertificates();
    fetchCv();
    fetchAbout(); // Load About
  }, []);

  // --- FETCH FUNCTIONS ---
  const fetchStats = async () => {
    const { data, error } = await supabase
      .from("profile_stats")
      .select("*")
      .order("id", { ascending: false });
    if (!error && data) setStats(data);
  };

  const fetchCertificates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("id", { ascending: false });
    if (!error && data) setCertificates(data);
    setLoading(false);
  };

  const fetchCv = async () => {
    const { data, error } = await supabase
      .from("cv_config")
      .select("cv_url")
      .eq("id", 1)
      .single();
    if (!error && data) setCvUrl(data.cv_url);
  };

  // FETCH ABOUT
  const fetchAbout = async () => {
    const { data, error } = await supabase
      .from("profile_about")
      .select("content")
      .eq("id", 1)
      .single();
    if (!error && data) setAboutText(data.content);
  };

  // --- HANDLERS FOR STATS ---
  const handleStatChange = (index: number, newValue: string) => {
    const updatedStats = [...stats];
    updatedStats[index].value = newValue;
    setStats(updatedStats);
  };

  const handleSaveStats = async () => {
    setSaving(true);
    try {
      for (const item of stats) {
        await supabase
          .from("profile_stats")
          .update({ value: item.value })
          .eq("id", item.id);
      }
      alert("Stats Updated Successfully!");
    } catch (error) {
      alert("Error updating stats.");
    } finally {
      setSaving(false);
    }
  };

  // --- HANDLERS FOR CERTIFICATES ---
  const handleSaveCertificate = async () => {
    if (!certForm.title || !certForm.issuer)
      return alert("Title and Issuer are required!");
    setSaving(true);
    try {
      if (isEditingCert && certForm.id) {
        await supabase
          .from("certificates")
          .update(certForm)
          .eq("id", certForm.id);
      } else {
        await supabase.from("certificates").insert([certForm]);
      }
      setCertForm({});
      setIsEditingCert(false);
      fetchCertificates();
      alert(isEditingCert ? "Certificate Updated!" : "Certificate Added!");
    } catch (error) {
      alert("Error saving certificate.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCertificate = async (id: number) => {
    if (!confirm("Delete this certificate?")) return;
    const { error } = await supabase.from("certificates").delete().eq("id", id);
    if (!error) fetchCertificates();
  };

  const startEditCert = (cert: Certificate) => {
    setCertForm(cert);
    setIsEditingCert(true);
  };

  // --- HANDLERS FOR CV ---
  const handleCvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingCv(true);
      if (!event.target.files || event.target.files.length === 0)
        throw new Error("You must select a PDF file to upload.");

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `cv-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      const { error: dbError } = await supabase
        .from("cv_config")
        .update({ cv_url: publicUrl, updated_at: new Date() })
        .eq("id", 1);
      if (dbError) throw dbError;

      setCvUrl(publicUrl);
      alert("CV Updated Successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploadingCv(false);
    }
  };

  // --- HANDLER FOR ABOUT ---
  const handleSaveAbout = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profile_about")
        .update({ content: aboutText, updated_at: new Date() })
        .eq("id", 1);

      if (error) throw error;
      alert("About Info Updated!");
    } catch (error) {
      alert("Error saving about info.");
    } finally {
      setSaving(false);
    }
  };

  // --- RENDER ---
  const activeBtnClass = "bg-[#fbd000] text-black scale-110";
  const inactiveBtnClass = "bg-white text-gray-400 hover:bg-gray-100";
  const commonBtnClass =
    "px-4 md:px-6 py-2 font-black uppercase border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transition-transform active:translate-y-1 active:shadow-none text-sm md:text-base cursor-pointer";

  return (
    <div className="p-4 md:p-8 min-h-full bg-[#5c94fc] font-serif">
      <div className="max-w-5xl mx-auto border-4 border-black bg-[#c84c0c] p-1 shadow-[8px_8px_0px_black]">
        <div className="border-4 border-[#ffccc5] p-6 bg-[#c84c0c]">
          <h1 className="text-3xl md:text-4xl text-white font-black uppercase text-center mb-6 drop-shadow-md border-b-4 border-black pb-4">
            Mario Profile Manager
          </h1>

          {/* --- TAB SWITCHER --- */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("stats")}
              className={`${commonBtnClass} ${
                activeTab === "stats" ? activeBtnClass : inactiveBtnClass
              }`}
            >
              Stats
            </button>
            <button
              onClick={() => setActiveTab("certificates")}
              className={`${commonBtnClass} ${
                activeTab === "certificates" ? activeBtnClass : inactiveBtnClass
              }`}
            >
              Certificates
            </button>
            <button
              onClick={() => setActiveTab("cv")}
              className={`${commonBtnClass} ${
                activeTab === "cv" ? activeBtnClass : inactiveBtnClass
              }`}
            >
              CV Update
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`${commonBtnClass} ${
                activeTab === "about" ? activeBtnClass : inactiveBtnClass
              }`}
            >
              Bio / Story
            </button>
          </div>

          <div className="bg-[#ffccc5] p-4 md:p-8 border-4 border-black shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
            {/* === VIEW 1: STATS MANAGER === */}
            {activeTab === "stats" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-[#c84c0c] uppercase text-center mb-6">
                  Stats Editor
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white border-4 border-black p-4 relative group"
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fbd000] border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest shadow-md">
                        {item.label}
                      </div>
                      <div className="mt-4 text-center">
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) =>
                            handleStatChange(index, e.target.value)
                          }
                          className="w-full text-center text-3xl font-black border-b-4 border-gray-300 focus:border-[#e4000f] outline-none bg-transparent p-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleSaveStats}
                    disabled={saving}
                    className="bg-[#e4000f] text-white px-8 py-3 font-black text-xl border-4 border-black shadow-[4px_4px_0px_black] hover:translate-y-1 active:shadow-none transition-all"
                  >
                    {saving ? "SAVING..." : "SAVE STATS"}
                  </button>
                </div>
              </div>
            )}

            {/* === VIEW 2: CERTIFICATES MANAGER === */}
            {activeTab === "certificates" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-[#c84c0c] uppercase text-center mb-6">
                  Certificates Inventory
                </h2>
                <div className="bg-white border-4 border-black p-4 mb-8">
                  <h3 className="font-bold uppercase mb-2 border-b-2 border-dashed border-gray-400 pb-1">
                    {isEditingCert ? "Edit Certificate" : "Add New Loot"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Certificate Title"
                      value={certForm.title || ""}
                      onChange={(e) =>
                        setCertForm({ ...certForm, title: e.target.value })
                      }
                      className="border-2 border-black p-2 bg-gray-100 font-bold"
                    />
                    <input
                      placeholder="Issuer"
                      value={certForm.issuer || ""}
                      onChange={(e) =>
                        setCertForm({ ...certForm, issuer: e.target.value })
                      }
                      className="border-2 border-black p-2 bg-gray-100 font-bold"
                    />
                    <input
                      placeholder="Date"
                      value={certForm.date || ""}
                      onChange={(e) =>
                        setCertForm({ ...certForm, date: e.target.value })
                      }
                      className="border-2 border-black p-2 bg-gray-100 font-bold"
                    />
                    <input
                      placeholder="Image URL"
                      value={certForm.image_url || ""}
                      onChange={(e) =>
                        setCertForm({ ...certForm, image_url: e.target.value })
                      }
                      className="border-2 border-black p-2 bg-gray-100 font-bold"
                    />
                    <input
                      placeholder="Credential URL"
                      value={certForm.credential_url || ""}
                      onChange={(e) =>
                        setCertForm({
                          ...certForm,
                          credential_url: e.target.value,
                        })
                      }
                      className="border-2 border-black p-2 bg-gray-100 font-bold md:col-span-2"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleSaveCertificate}
                      disabled={saving}
                      className="flex-1 bg-[#22b14c] hover:bg-[#1a9e3e] text-white py-2 font-bold border-2 border-black flex items-center justify-center gap-2"
                    >
                      <Save size={16} /> {isEditingCert ? "Update" : "Add"}
                    </button>
                    {isEditingCert && (
                      <button
                        onClick={() => {
                          setIsEditingCert(false);
                          setCertForm({});
                        }}
                        className="px-4 bg-gray-500 text-white font-bold border-2 border-black"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {loading ? (
                    <p className="text-center font-bold">Loading...</p>
                  ) : (
                    certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-white border-2 border-black p-3 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
                      >
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-12 h-12 bg-gray-200 border border-black shrink-0 overflow-hidden">
                            {cert.image_url && (
                              <img
                                src={cert.image_url}
                                alt="img"
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <h4 className="font-black uppercase text-lg leading-none">
                              {cert.title}
                            </h4>
                            <p className="text-xs font-bold text-gray-500">
                              {cert.issuer} • {cert.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => startEditCert(cert)}
                            className="p-2 bg-blue-500 text-white border-2 border-black hover:bg-blue-600"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCertificate(cert.id)}
                            className="p-2 bg-red-500 text-white border-2 border-black hover:bg-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* === VIEW 3: CV MANAGER === */}
            {activeTab === "cv" && (
              <div className="animate-in fade-in duration-300 text-center">
                <h2 className="text-2xl font-bold text-[#c84c0c] uppercase mb-6">
                  CV Document Link
                </h2>
                <div className="bg-white border-4 border-black p-8 max-w-lg mx-auto">
                  <FileText size={48} className="mx-auto text-[#c84c0c] mb-4" />
                  <p className="font-bold text-gray-600 mb-2 uppercase text-sm tracking-widest">
                    Current CV URL:
                  </p>
                  <div className="bg-gray-100 border-2 border-black p-2 mb-6 break-all text-xs font-mono text-gray-500">
                    {cvUrl || "No CV uploaded yet."}
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleCvUpload}
                      disabled={uploadingCv}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label
                      htmlFor="cv-upload"
                      className={`flex items-center justify-center gap-2 w-full cursor-pointer bg-[#22b14c] hover:bg-[#1a9e3e] text-white py-4 font-black uppercase text-xl border-4 border-black shadow-[4px_4px_0px_black] active:translate-y-1 active:shadow-none transition-all ${
                        uploadingCv ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Upload size={24} className="mb-1" />{" "}
                      <span>
                        {uploadingCv ? "Uploading..." : "Upload New PDF"}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs font-bold text-gray-400 mt-2">
                    Max file size: 5MB (PDF Only)
                  </p>
                </div>
              </div>
            )}

            {/* === VIEW 4: ABOUT MANAGER (NEW) === */}
            {activeTab === "about" && (
              <div className="animate-in fade-in duration-300">
                <h2 className="text-2xl font-bold text-[#c84c0c] uppercase text-center mb-6">
                  Character Bio
                </h2>
                <div className="bg-white border-4 border-black p-6">
                  <div className="flex items-center gap-2 mb-4 border-b-2 border-dashed border-gray-400 pb-2">
                    <BookOpen size={24} className="text-[#c84c0c]" />
                    <h3 className="font-bold uppercase text-lg">Edit Story</h3>
                  </div>

                  <p className="text-xs font-bold text-gray-500 mb-2 uppercase">
                    Main Description:
                  </p>
                  <textarea
                    value={aboutText}
                    onChange={(e) => setAboutText(e.target.value)}
                    rows={6}
                    className="w-full bg-gray-100 border-4 border-black p-4 font-mono text-sm focus:bg-white focus:outline-none focus:border-[#e52521] resize-none shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]"
                    placeholder="Write your bio here..."
                  />
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSaveAbout}
                      disabled={saving}
                      className="bg-[#e52521] hover:bg-[#ff4444] text-white px-6 py-3 font-black uppercase border-4 border-black shadow-[4px_4px_0px_black] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
                    >
                      <Save size={18} /> {saving ? "Saving..." : "Save Bio"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
