"use client";

// components/Sidebar.tsx
import { useState } from "react";
import { Home, FileText, Settings, LogOut, Menu } from "lucide-react"; // Import the icons from lucide-react

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // State to control the dropdown menu

  return (
    <aside className="bg-gray-100 text-black flex flex-col justify-between p-4 md:p-8 min-h-screen border-2">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold">DataFarm</span>
          {/* Hamburger menu button for mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden">
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <Home size={20} className="text-black" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <FileText size={20} className="text-black" />
                  Community Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <Settings size={20} className="text-black" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        )}

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Home size={20} className="text-black" />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <FileText size={20} className="text-black" />
                Community Reports
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Settings size={20} className="text-black" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Section (Logout) */}
      <div>
        <a
          href="#"
          className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <LogOut size={20} className="text-black" />
          Logout
        </a>
      </div>
    </aside>
  );
}
