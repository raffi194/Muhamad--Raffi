"use client";

import { Routes, Route } from "react-router-dom";
import Nintendo from './pages/Page';
import AdminDashboard from "./pages/AdminDashboard";

// --- APP UTAMA ---
export default function App() {
  return (
    <Routes>
      {/* 1. Halaman Intro (Default) */}
      <Route path="/" element={<Nintendo />} />
      {/* 2. Halaman Admin Dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}