'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, LayoutDashboard, FileText, Settings, LogOut } from "lucide-react"
import LogoT from '../app/assets/tractor.png'
import LogoL from '../app/assets/letters-short.png'
import Link from 'next/link'


interface sidebarProps {
  signOut: () => void;
}

const CollapsibleSidebar: React.FC<sidebarProps> = ({ signOut }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  return (
    <div className={`flex-shrink-0 flex flex-col h-full bg-gray-500 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`} >
      <div className="flex flex-col items-center py-4">
        <Image
          src={LogoT}
          alt="Datafarm Logo"
          width={isCollapsed ? 40 : 160}
          height={isCollapsed ? 20 : 40}
          className="mb-2"
        />
        <Image
          src={LogoL}
          alt="Tractor Icon"
          width={isCollapsed ? 80 : 80}
          height={isCollapsed ? 80 : 80}
          className="mb-2"
        />
      </div>
      <div className="flex justify-end px-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          <li>
            <Button variant="ghost" className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}>
              <Link href="/">
                <LayoutDashboard className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">Dashboard</span>}
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}>
              <Link href="/logs">
                <FileText className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">Logs</span>}
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="ghost" className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}>
              <Link href="/preferences">
                <Settings className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">Preferences</span>}
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <Button variant="ghost" className={`w-full justify-start ${isCollapsed ? 'px-2' : 'px-4'}`}
          onClick={signOut}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </ div>
  )
}

export default CollapsibleSidebar;