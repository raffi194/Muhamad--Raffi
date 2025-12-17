"use client";

import { Routes, Route, useNavigate } from "react-router-dom";
import Nintendo from '../src/component/Nintendo';

// --- APP UTAMA ---
export default function App() {
  return (
    <Routes>
      {/* 1. Halaman Intro (Default) */}
      <Route path="/" element={<Nintendo />} />
    </Routes>
  );
}