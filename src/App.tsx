"use client";

import { Routes, Route } from "react-router-dom";
import Nintendo from './pages/Page';

// --- APP UTAMA ---
export default function App() {
  return (
    <Routes>
      {/* 1. Halaman Intro (Default) */}
      <Route path="/" element={<Nintendo />} />
    </Routes>
  );
}