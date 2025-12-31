import React from 'react';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu, onLogout }) => {
  const menus = [
    { id: 'experience', label: 'Experience' },
    { id: 'profile', label: 'Profile' },
    { id: 'project', label: 'Project' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-6 flex flex-col shadow-2xl">
      <h2 className="text-2xl font-bold mb-8 text-center text-blue-400">Dashboard</h2>
      <nav className="flex-1 space-y-4">
        {menus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => setActiveMenu(menu.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
              activeMenu === menu.id
                ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] translate-x-2'
                : 'hover:bg-gray-800 hover:translate-x-1'
            }`}
          >
            {menu.label}
          </button>
        ))}
      </nav>
      <button
        onClick={onLogout}
        className="mt-auto w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-bold transition-colors"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Sidebar;