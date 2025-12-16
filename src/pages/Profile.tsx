import Nintendo from "../component/Profile/Nintendo";

const Profile = () => {
  return (
    <div className="relative w-screen h-screen bg-neutral-900 overflow-hidden flex items-center justify-center">
      <style>{`
        .animate-pop { animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes pop { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; }}
      `}</style>

      <div className="animate-pop transform transition-transform duration-500 ease-out scale-[0.4] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 xl:scale-125">
        <Nintendo />
      </div>
    </div>
  );
};

export default Profile;
