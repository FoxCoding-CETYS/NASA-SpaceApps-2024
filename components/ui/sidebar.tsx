"use client";

// components/Sidebar.tsx
import { useState } from "react";
import { Home, FileText, Settings, LogOut, Menu } from "lucide-react"; // Import the icons from lucide-react
import Image from 'next/image'
import LogoL from '../../app/assets/letters-short.png'
import LogoT from '../../app/assets/tractor-short.png'


export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // State to control the dropdown menu
  const [selectedSection, setSelectedSection] = useState('dashboard'); // State to control selected section

  const handleSelect = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <aside className="bg-orange-50 text-green-800 flex flex-col justify-between p-4 md:p-8 min-h-screen">
      {/* Top Section */}
      <div className="flex flex-col gap-6">
        <div className="items-center gap-4">
          <Image src={LogoL} alt={""} className=""/>
          <Image src={LogoT} alt='' className=''/>
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
                  className={`flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 ${
                    selectedSection === 'dashboard' ? 'bg-green-200 text-white' : ''
                  }`}
                  onClick={() => handleSelect('dashboard')}
                >
                  <Home size={20} className="text-black" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors ${
                    selectedSection === 'reports' ? 'bg-green-200 text-white' : ''
                  }`}
                  onClick={() => handleSelect('reports')}
                >
                  <FileText size={20} className="text-black" />
                  Community Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors ${
                    selectedSection === 'settings' ? 'bg-green-200 text-white' : ''
                  }`}
                  onClick={() => handleSelect('settings')}
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
                className={`flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 ${
                  selectedSection === 'dashboard' ? 'bg-green-800 text-white' : 'text-green-800'
                }`}
                onClick={() => handleSelect('dashboard')}
              >
                <Home size={20} />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors ${
                  selectedSection === 'reports' ? 'bg-green-800 text-white' : 'text-green-800'
                }`}
                onClick={() => handleSelect('reports')}
              >
                <FileText size={20} />
                Community Reports
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center gap-4 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors ${
                  selectedSection === 'settings' ? 'bg-green-800 text-white' : 'text-green-800'
                }`}
                onClick={() => handleSelect('settings')}
              >
                <Settings size={20} />
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
          <LogOut size={20} className="text-green-800" />
          Logout
        </a>
      </div>
    </aside>
  );
}
