"use client";

import { useEffect } from "react"; // 1. Import useEffect
import { Routes, Route } from "react-router-dom";
import Nintendo from "./pages/Page";
import AdminDashboard from "./pages/AdminDashboard";
import OrientationGuard from "./component/OrientationGuard";
import { supabase } from "./lib/supabaseClient"; // 2. Import supabase

// --- APP UTAMA ---
export default function App() {
  
  // 3. Tambahkan Logika "Keep Alive" ini
  useEffect(() => {
    const pingSupabase = async () => {
      // Ganti 'projects' dengan nama tabel apa saja yang ada di database kamu
      // (misalnya: 'profile', 'experience', atau 'projects')
      const { data, error } = await supabase
        .from('projects') 
        .select('id')
        .limit(1);
        
      if (error) {
        console.error("Supabase Ping Error:", error.message);
      } else {
        console.log("Supabase Keep-Alive: Active", data);
      }
    };

    pingSupabase();
  }, []);

  return (
    <>
      <OrientationGuard />

      <Routes>
        {/* 1. Halaman Intro (Default) */}
        <Route path="/" element={<Nintendo />} />
        {/* 2. Halaman Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}