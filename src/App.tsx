"use client";

import { Routes, Route, useNavigate } from "react-router-dom";
import TextPressure from "./component/text/textstart/TextPressure";
import StartButton from "./component/button/StartButton/Button";
import MainContent from "./pages/Home";
import DetailPage from "./pages/Detail";
import Profile from './pages/Profile';

// --- KOMPONEN INTRO (Dipisahkan agar rapi) ---
const IntroScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center px-10 bg-black">
      <TextPressure />
      <div className="mb-20">
        {/* Saat Start diklik, pindah ke route /home */}
        <StartButton onClick={() => navigate('/home')} />
      </div>
    </div>
  );
};

// --- KOMPONEN WRAPPER HOME (Untuk menangani navigasi dari Home) ---
const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <MainContent
      onOpenDetail={() => navigate('/detail')}
      onOpenNintendo={() => navigate('/profile')} // Asumsi nintendo mengarah ke profile
    />
  );
};

// --- APP UTAMA ---
export default function App() {
  return (
    <Routes>
      {/* 1. Halaman Intro (Default) */}
      <Route path="/" element={<IntroScreen />} />

      {/* 2. Halaman Home (Workstation Utama) */}
      <Route path="/home" element={<HomeScreen />} />

      {/* 3. Halaman Detail (Zoom Meja) */}
      {/* Kita oper navigate(-1) ke onBack agar tombol back berfungsi */}
      <Route 
        path="/detail" 
        element={<DetailPageWrapper />} 
      />

      {/* 4. Halaman Profile (Nintendo / CV) */}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

// Wrapper kecil untuk DetailPage agar bisa menggunakan hooks navigasi jika diperlukan di level ini
const DetailPageWrapper = () => {
  const navigate = useNavigate();
  return <DetailPage onBack={() => navigate(-1)} />;
};