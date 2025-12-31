import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Sidebar from "../component/admin/Sidebar";
import ExperienceManager from "../component/admin/ExperienceManager";
import ProfileManager from "../component/admin/ProfileManager";
import ProjectManager from "../component/admin/ProjectManager";

// --- 1. KOMPONEN LOGIN KHUSUS ADMIN (Email & Password) ---
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Login menggunakan Email & Password
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg(error.message); // Tampilkan error jika password salah/user tidak ada
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Admin Access
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Masuk menggunakan akun admin yang terdaftar.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-3 text-white placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Email Admin"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-3 text-white placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="text-red-500 text-sm text-center bg-red-900/20 p-2 rounded border border-red-900">
              {errorMsg}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- 2. KOMPONEN UTAMA DASHBOARD ---
const AdminDashboard: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState<string>('experience');
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    // Cek session saat load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    // Listener perubahan auth (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoadingSession(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Tampilkan loading screen sederhana saat mengecek session
  if (loadingSession) {
    return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  // Jika tidak ada session (belum login), TAMPILKAN LOGIN SCREEN
  // Ini memperbaiki error "LoginScreen declared but never read"
  if (!session) {
    return <LoginScreen />; 
  }

  // Render Content Berdasarkan Menu Pilihan Sidebar
  const renderContent = () => {
    switch (activeMenu) {
      case 'experience':
        return <ExperienceManager />;
      case 'profile':
        return <ProfileManager />;
      case 'project':
        return <ProjectManager />;
      default:
        return <ExperienceManager />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar Navigasi */}
      <Sidebar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
        onLogout={handleLogout} 
      />

      {/* Area Konten Utama */}
      <div className="flex-1 overflow-y-auto relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;