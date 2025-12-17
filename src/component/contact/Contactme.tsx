import React, { useRef, useState } from "react";
import { Send, User, Mail, FileText, Loader2 } from "lucide-react"; // Tambah Loader2 untuk loading icon
import emailjs from "@emailjs/browser";
import Contactmebg from "../../assets/ContactMebg.png";

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
          <div className="bg-[#1a1a1a]/60 backdrop-blur-md border border-[#F7F8E6]/20 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-[#F7F8E6] mb-5 flex items-center gap-2 uppercase tracking-wider border-b border-[#F7F8E6]/10 pb-3">
              <Send size={16} className="text-[#8A7B66]" />
              Send Transmission
            </h3>

            <form ref={form} className="space-y-3" onSubmit={sendEmail}>
              {/* Input Name */}
              <div className="relative group">
                <User
                  size={14}
                  className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#8A7B66] transition-colors"
                />
                <input
                  type="text"
                  name="user_name" // WAJIB ADA: Sesuai {{user_name}} di EmailJS
                  required
                  placeholder="Player Name"
                  className="w-full bg-black/40 border border-[#F7F8E6]/20 rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#F7F8E6] placeholder-gray-500 focus:outline-none focus:border-[#8A7B66] focus:ring-1 focus:ring-[#8A7B66] transition-all"
                />
              </div>

              {/* Input Email */}
              <div className="relative group">
                <Mail
                  size={14}
                  className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#8A7B66] transition-colors"
                />
                <input
                  type="email"
                  name="user_email" // WAJIB ADA: Sesuai {{user_email}} di EmailJS
                  required
                  placeholder="Email Address"
                  className="w-full bg-black/40 border border-[#F7F8E6]/20 rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#F7F8E6] placeholder-gray-500 focus:outline-none focus:border-[#8A7B66] focus:ring-1 focus:ring-[#8A7B66] transition-all"
                />
              </div>

              {/* Input Subject */}
              <div className="relative group">
                <FileText
                  size={14}
                  className="absolute left-3 top-3 text-gray-400 group-focus-within:text-[#8A7B66] transition-colors"
                />
                <input
                  type="text"
                  name="subject" // WAJIB ADA: Sesuai {{subject}} di EmailJS
                  required
                  placeholder="Subject"
                  className="w-full bg-black/40 border border-[#F7F8E6]/20 rounded-lg py-2.5 pl-9 pr-3 text-xs text-[#F7F8E6] placeholder-gray-500 focus:outline-none focus:border-[#8A7B66] focus:ring-1 focus:ring-[#8A7B66] transition-all"
                />
              </div>

              {/* Textarea */}
              <textarea
                rows={3}
                name="message" // WAJIB ADA: Sesuai {{message}} di EmailJS
                required
                placeholder="Type your message here..."
                className="w-full bg-black/40 border border-[#F7F8E6]/20 rounded-lg p-3 text-xs text-[#F7F8E6] placeholder-gray-500 focus:outline-none focus:border-[#8A7B66] focus:ring-1 focus:ring-[#8A7B66] transition-all resize-none"
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#8A7B66] hover:bg-[#7a6d5a] disabled:bg-gray-600 disabled:cursor-not-allowed text-[#F7F8E6] font-bold py-3 rounded-lg text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactme;
