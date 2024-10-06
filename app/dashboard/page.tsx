// pages/index.tsx
import Sidebar from "../../components/ui/sidebar";
import TopBar from "../../components/ui/topbar";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* TopBar for mobile */}
        <div className="md:hidden z-20">
          <TopBar />
        </div>

        {/* Sidebar Component */}
        <div className="hidden md:flex md:flex-col md:w-64 h-full">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="z-10 flex-1 p-8 sm:p-20 bg-indigo-100 flex flex-col items-center">
          <div className="flex gap-x-8 sm:items-start">
            <div className="bg-neutral-100 rounded-lg size-72">
            </div>
            <div className="bg-neutral-100 rounded-lg size-72">
            </div>
            <div className="bg-neutral-100 rounded-lg size-72">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
