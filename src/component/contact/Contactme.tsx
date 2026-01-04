import React, { useRef, useState } from "react";
import { Send, User, Mail, FileText, Loader2 } from "lucide-react"; // Tambah Loader2 untuk loading icon
import emailjs from "@emailjs/browser";
import Contactmebg from "../../assets/ContactMebg.png";
import Directions from "../Directions";

// Import komponen SVG
import TouchIt from "./TouchIt";
import Here from "./Here";

const Contactme = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // GANTI 'YOUR_PUBLIC_KEY' DENGAN PUBLIC KEY DARI DASHBOARD EMAILJS ANDA
    const publicKey = "k8tsMlax6zwp-qPKd";

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_p6jcmwk", // Service ID Anda
        "template_7z2qdt7", // Template ID Anda
        form.current,
        publicKey
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Transmission Sent Successfully!"); // Pesan Sukses
          form.current?.reset(); // Kosongkan form setelah kirim
        },
        (error) => {
          console.log(error.text);
          alert("Transmission Failed. Please try again."); // Pesan Gagal
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    // Wrapper Utama
    <div className="relative w-full h-full font-sans overflow-hidden">
      {/* 1. BACKGROUND IMAGE */}
      <img
        src={Contactmebg}
        alt="Contact Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* 2. KONTEN UTAMA (GRID 2 KOLOM) */}
      <div className="relative z-10 w-full h-full p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* --- SECTION KIRI (Text & Info Graphics) --- */}
        <div className="flex flex-col h-full justify-center space-y-6 overflow-y-auto nintendo-scroll pr-2">
          {/* Header Text Block */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-wider drop-shadow-md mb-3 leading-tight">
              <span className="text-[#F7F8E6]">Lets Get in </span>
              <span className="text-[#8A7B66]">Touch!</span>
            </h1>

            <p className="text-xs text-[#F7F8E6] leading-relaxed mb-2 opacity-90 max-w-md">
              Have a question or need assistance? Reach out to us via email,
              phone, or the contact form below. We're eager to assist you.
            </p>

            <p className="text-xs font-bold text-[#8A7B66] uppercase tracking-widest mt-1">
              Nice hearing from you!
            </p>
          </div>

          {/* SVG Components Block */}
          <div className="flex flex-col space-y-6 w-full items-start justify-start">
            {/* Bagian Pertama: TouchIt */}
            <div className="w-full scale-80 origin-left">
              <TouchIt width="100%" height="auto" />
            </div>

            {/* Bagian Kedua: Here */}
            <div className="w-full text-left">
              <Here width="100%" height="auto" />
            </div>
          </div>
        </div>

        {/* --- SECTION KANAN (Formulir Kontak) --- */}
        <div className="h-full flex flex-col justify-center">
          {/* Card Container */}
          {/* Mengubah shadow menjadi warna taupe/krem gelap agar senada dengan border #8A7B66 */}
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-[8px_8px_0_#b8b0a4] border-4 border-[#8A7B66]">
            {/* Header Form */}
            <h3 className="flex items-center gap-2 mb-5 text-[#8A7B66] font-bold uppercase tracking-widest text-xs border-b-2 border-dashed border-[#8A7B66] pb-3">
              <Send size={16} />
              <span>Send Transmission</span>
            </h3>

            <form ref={form} className="space-y-3" onSubmit={sendEmail}>
              {/* Input Name */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8A7B66] group-focus-within:text-[#8A7B66] transition-colors">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  name="user_name" // WAJIB ADA
                  required
                  placeholder="Villager Name"
                  className="w-full bg-[#fbfbf9] border-2 border-[#e6e2d6] text-[#5d5345] text-xs rounded-2xl pl-10 pr-4 py-3 placeholder-[#b5afa3] focus:outline-none focus:border-[#8A7B66] focus:ring-4 focus:ring-[#8A7B66]/20 transition-all font-bold"
                />
              </div>

              {/* Input Email */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8A7B66] group-focus-within:text-[#8A7B66] transition-colors">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  name="user_email" // WAJIB ADA
                  required
                  placeholder="Email"
                  className="w-full bg-[#fbfbf9] border-2 border-[#e6e2d6] text-[#5d5345] text-xs rounded-2xl pl-10 pr-4 py-3 placeholder-[#b5afa3] focus:outline-none focus:border-[#8A7B66] focus:ring-4 focus:ring-[#8A7B66]/20 transition-all font-bold"
                />
              </div>

              {/* Input Subject */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#8A7B66] group-focus-within:text-[#8A7B66] transition-colors">
                  <FileText size={16} />
                </div>
                <input
                  type="text"
                  name="subject" // WAJIB ADA
                  required
                  placeholder="Subject"
                  className="w-full bg-[#fbfbf9] border-2 border-[#e6e2d6] text-[#5d5345] text-xs rounded-2xl pl-10 pr-4 py-3 placeholder-[#b5afa3] focus:outline-none focus:border-[#8A7B66] focus:ring-4 focus:ring-[#8A7B66]/20 transition-all font-bold"
                />
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  rows={3}
                  name="message" // WAJIB ADA
                  required
                  placeholder="Write something nice..."
                  className="w-full bg-[#fbfbf9] border-2 border-[#e6e2d6] text-[#5d5345] text-xs rounded-2xl p-3 placeholder-[#b5afa3] focus:outline-none focus:border-[#8A7B66] focus:ring-4 focus:ring-[#8A7B66]/20 transition-all resize-none font-bold leading-relaxed"
                ></textarea>
              </div>

              {/* Submit Button - Style Tombol Dialog 3D (Warna Dasar #8A7B66) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#8A7B66] hover:bg-[#6e6251] text-white font-black text-sm py-3 rounded-full shadow-[0_4px_0_#544b3d] active:shadow-none active:translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-wider group mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send It!</span>
                    <Send
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="scale-40 bg-white/20 backdrop-blur-md border border-white/30 shadow-lg p-2 rounded-4xl translate-y-3 pointer-events-none absolute bottom-0 left-1/2 -translate-x-202 z-10">
        <Directions />
      </div>
    </div>
  );
};

export default Contactme;
