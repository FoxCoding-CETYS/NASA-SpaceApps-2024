'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, LayoutDashboard, FileText, Settings, LogOut } from "lucide-react"
import LogoT from '../app/assets/tractor-short.png'
import LogoL from '../app/assets/logo-white.png'
import Link from 'next/link'

interface SidebarProps {
  signOut: () => void;
}

const CollapsibleSidebar: React.FC<SidebarProps> = ({ signOut }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const menuItems = [
    { href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { href: '/logs', icon: <FileText className="h-5 w-5" />, label: 'Logs' },
    { href: '/preferences', icon: <Settings className="h-5 w-5" />, label: 'Preferences' },
  ]

  return (
    <div className={`flex-shrink-0 flex flex-col h-full bg-green-700 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo Section */}
      <div className="flex flex-col items-center py-4">
        <Image
          src={LogoT}
          alt="Datafarm Logo"
          width={isCollapsed ? 40 : 160}
          height={isCollapsed ? 20 : 40}
          className="mb-2"
        />
        {!isCollapsed && (
          <Image
            src={LogoL}
            alt="Tractor Icon"
            width={160} // Mantén un tamaño fijo cuando está visible
            height={80}
            className="mb-2"
          />
        )}
      </div>

      {/* Toggle Button */}
      <div className="flex justify-end px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex items-center justify-center"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="w-full">
                <Button
                  variant="ghost"
                  className={`w-full justify-start flex items-center ${isCollapsed ? 'px-2' : 'px-4'}`}
                >
                  {item.icon}
                  {!isCollapsed && <span className="ml-2">{item.label}</span>}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <Button
          variant="ghost"
          className={`w-full justify-start flex items-center ${isCollapsed ? 'px-2' : 'px-4'}`}
          onClick={signOut}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  )
}

export default CollapsibleSidebar;
