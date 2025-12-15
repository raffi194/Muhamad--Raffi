"use client";

import { useState } from "react";
import TextPressure from "./component/text/textstart/TextPressure";
import StartButton from "./component/button/StartButton/Button";
import MainContent from "./pages/Home";
import DetailPage from "./pages/Detail"; // Import halaman baru

export default function App() {
  // view state: 'intro' | 'home' | 'detail'
  const [view, setView] = useState<'intro' | 'home' | 'detail'>('intro');

  // 1. Tampilkan Intro jika view === 'intro'
  if (view === 'intro') {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-10 bg-black">
        <TextPressure />
        <div className="mb-20">
          {/* Saat Start diklik, pindah ke 'home' */}
          <StartButton onClick={() => setView('home')} />
        </div>
      </div>
    );
  }

  // 2. Tampilkan Halaman Detail jika view === 'detail'
  if (view === 'detail') {
    return <DetailPage onBack={() => setView('home')} />;
  }

  // 3. Default: Tampilkan Home
  return <MainContent onOpenDetail={() => setView('detail')} />;
}
