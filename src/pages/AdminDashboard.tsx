import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";

// Tipe Data Event
interface EventData {
  id: number;
  title: string;
  role: string;
  image: string;
  desc: string;
}

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Cek Status Login
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
        Loading Auth...
      </div>
    );
  }

  return session ? <DashboardView /> : <LoginView />;
}

// ==========================================
// 1. KOMPONEN LOGIN
// ==========================================
function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setErrorMsg(error.message);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-gray-900 p-8 shadow-2xl border border-gray-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-gray-400">Masuk untuk mengelola Event Carousel</p>
        </div>

        {errorMsg && (
          <div className="rounded bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
            {errorMsg}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-yellow-500 px-4 py-2 font-bold text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 transition-colors"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 2. KOMPONEN DASHBOARD (CRUD LENGKAP)
// ==========================================
function DashboardView() {
  const [events, setEvents] = useState<EventData[]>([]);
  
  // State Form & Edit
  const [form, setForm] = useState({ title: "", role: "", image: "", desc: "" });
  const [editingId, setEditingId] = useState<number | null>(null); // ID yang sedang diedit
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Data
  const fetchEvents = async () => {
    const { data } = await supabase.from("events").select("*").order("id", { ascending: true });
    if (data) setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // --- FUNGSI RESET FORM ---
  const resetForm = () => {
    setForm({ title: "", role: "", image: "", desc: "" });
    setEditingId(null); // Keluar dari mode edit
  };

  // --- FUNGSI KLIK TOMBOL EDIT ---
  const handleEditClick = (event: EventData) => {
    // Isi form dengan data yang dipilih
    setForm({
      title: event.title,
      role: event.role,
      image: event.image,
      desc: event.desc,
    });
    setEditingId(event.id); // Set ID agar sistem tahu kita sedang mode edit
    
    // Scroll ke atas (opsional, agar user melihat form)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- FUNGSI SUBMIT (Bisa Insert atau Update) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.role) return;

    setIsSubmitting(true);

    if (editingId) {
      // MODE UPDATE: Jika ada editingId, lakukan update
      const { error } = await supabase
        .from("events")
        .update(form) // Data baru
        .eq("id", editingId); // Cari berdasarkan ID

      if (!error) {
        fetchEvents();
        resetForm();
      } else {
        alert("Gagal update: " + error.message);
      }

    } else {
      // MODE CREATE: Jika tidak ada editingId, lakukan insert
      const { error } = await supabase.from("events").insert([form]);
      
      if (!error) {
        fetchEvents();
        resetForm();
      } else {
        alert("Gagal menambahkan: " + error.message);
      }
    }
    
    setIsSubmitting(false);
  };

  // --- FUNGSI HAPUS ---
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus event ini?")) return;
    
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) {
        fetchEvents();
        // Jika user menghapus item yang sedang diedit, reset formnya
        if (editingId === id) resetForm();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6 text-white md:p-12">
      <div className="mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase text-yellow-400">Dashboard Admin</h1>
            <p className="text-gray-400">Kelola konten Event Carousel</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600/10 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-600 hover:text-white transition-colors border border-red-600/20"
          >
            Keluar
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* FORM INPUT (KIRI) */}
          <div className="lg:col-span-1">
            <div className={`sticky top-6 rounded-xl border p-6 shadow-lg transition-colors ${editingId ? 'bg-gray-800 border-yellow-500/50' : 'bg-gray-900 border-gray-800'}`}>
              
              <div className="mb-4 flex items-center justify-between">
                <h3 className={`text-xl font-bold ${editingId ? 'text-yellow-400' : 'text-white'}`}>
                    {editingId ? "Edit Event" : "Tambah Event Baru"}
                </h3>
                {editingId && (
                    <button onClick={resetForm} className="text-xs text-red-400 hover:text-red-300 underline">
                        Batal
                    </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase">Judul Event</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="mt-1 w-full rounded bg-gray-950/50 p-2 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                    placeholder="Contoh: Hackathon 2025"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase">Role</label>
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="mt-1 w-full rounded bg-gray-950/50 p-2 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                    placeholder="Contoh: Speaker"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase">URL Gambar</label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="mt-1 w-full rounded bg-gray-950/50 p-2 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                    placeholder="https://..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase">Deskripsi</label>
                  <textarea
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    className="mt-1 w-full rounded bg-gray-950/50 p-2 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                    rows={3}
                    placeholder="Deskripsi singkat..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded py-3 font-bold text-black transition-transform active:scale-95 disabled:opacity-50 ${editingId ? 'bg-green-500 hover:bg-green-400' : 'bg-yellow-400 hover:bg-yellow-300'}`}
                >
                  {isSubmitting ? "Menyimpan..." : (editingId ? "Simpan Perubahan" : "+ Tambah Event")}
                </button>
              </form>
            </div>
          </div>

          {/* LIST EVENT (KANAN) */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-xl font-bold text-white">Daftar Event ({events.length})</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {events.map((event) => (
                <div key={event.id} className={`group relative overflow-hidden rounded-xl bg-gray-900 border transition-all ${editingId === event.id ? 'border-yellow-500 ring-1 ring-yellow-500' : 'border-gray-800 hover:border-yellow-500/50'}`}>
                  
                  {/* Indikator Sedang Diedit */}
                  {editingId === event.id && (
                      <div className="absolute top-2 right-2 z-10 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                          Sedang Diedit
                      </div>
                  )}

                  {/* Gambar Preview */}
                  <div className="aspect-video w-full overflow-hidden bg-gray-800">
                    <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  
                  {/* Konten */}
                  <div className="p-4">
                    <h4 className="truncate text-lg font-bold text-white">{event.title}</h4>
                    <span className="inline-block rounded bg-blue-600/20 px-2 py-0.5 text-xs font-semibold text-blue-400 border border-blue-600/30">
                      {event.role}
                    </span>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-400">{event.desc}</p>
                    
                    {/* Action Buttons */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                         {/* Tombol Edit */}
                        <button
                          onClick={() => handleEditClick(event)}
                          className="flex items-center justify-center rounded border border-indigo-500/30 bg-indigo-500/10 py-2 text-sm text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors"
                        >
                          Edit
                        </button>
                        
                         {/* Tombol Hapus */}
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="flex items-center justify-center rounded border border-red-500/30 bg-red-500/10 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          Hapus
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}