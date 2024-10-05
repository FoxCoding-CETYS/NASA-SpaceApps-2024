// components/ui/TopBar.tsx
"use client";

import { useState } from "react";
import { Home, FileText, Settings, LogOut, Menu } from "lucide-react";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false); // State to control the dropdown menu

  return (
    <header className="bg-gray-100 flex items-center justify-between p-4 border-b">
      <span className="text-xl font-bold">DataFarm</span>
      {/* Hamburger menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="absolute top-16 right-0 bg-gray-100 w-full shadow-md">
          <ul className="space-y-2 p-4">
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
            <li>
              <a
                href="#"
                className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <LogOut size={20} className="text-black" />
                Logout
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
