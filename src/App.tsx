"use client";

import { Routes, Route } from "react-router-dom";
import Nintendo from "./pages/Page";
import AdminDashboard from "./pages/AdminDashboard";
import OrientationGuard from "./component/OrientationGuard";

// --- APP UTAMA ---
export default function App() {
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
