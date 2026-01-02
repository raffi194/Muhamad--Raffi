import { useEffect, useState } from "react";

const StatusLevel = () => {
  // State untuk menyimpan umur
  const [age, setAge] = useState(21);

  useEffect(() => {
    // --- KONFIGURASI TANGGAL LAHIR ---
    // Tahun 2004 dipilih agar:
    // - Sebelum Sept 2026 = 21 tahun
    // - Setelah Sept 2026 = 22 tahun
    // Ganti 2004 jika tahun lahir Anda berbeda.
    const birthYear = 2004;
    const birthMonth = 8; // September (Januari = 0, September = 8)
    const birthDate = 1;  // Tanggal 1

    const calculateAge = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const currentDate = today.getDate();

      let calculatedAge = currentYear - birthYear;

      // Cek apakah ulang tahun tahun ini sudah lewat atau belum
      // Jika bulan saat ini kurang dari September (8)
      // ATAU bulan ini September tapi tanggal belum sampai tanggal 1
      if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDate < birthDate)
      ) {
        calculatedAge--; // Kurangi 1 karena belum ulang tahun
      }

      setAge(calculatedAge);
    };

    calculateAge();
  }, []);

  return (
    <div className="hidden sm:flex items-center gap-4 bg-black p-3 border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.5)] transform -skew-x-6">
      <div className="flex flex-col items-center">
         <span className="text-[#fbd000] text-[10px] font-bold uppercase tracking-widest">AGE/LVL</span>
         {/* Render variable age yang sudah dihitung */}
         <span className="text-white text-2xl font-mono leading-none tracking-widest">{age}</span>
      </div>
    </div>
  );
};

export default StatusLevel;