// components/ui/TopBar.tsx
"use client";

import { useState } from "react";
import { Home, FileText, Settings, LogOut, Menu } from "lucide-react";
import Image from 'next/image'
import LogoT from '../../app/assets/tractor.png'

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false); // State to control the dropdown menu

  return (
    <header className="bg-gray-100 flex items-center justify-between p-4 bg-orange-50">
      <Image src={LogoT} alt='' className='size-12'/>

      {/* Hamburger menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <Menu size={24} className='text-green-800' />
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="absolute top-16 right-0 bg-orange-50 w-full shadow-md">
          <ul className="space-y-2 p-4">
            <li>
              <a
                href="#"
                className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors text-green-800"
              >
                <Home size={20} className="text-green-800" />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors text-green-800"
              >
                <FileText size={20} className="text-green-800" />
                Community Reports
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors text-green-800"
              >
                <Settings size={20} className="text-green-800" />
                Settings
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors text-green-800"
              >
                <LogOut size={20} className="text-green-800" />
                Logout
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
