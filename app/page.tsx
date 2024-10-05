
'use client'
import { useSession } from "next-auth/react";
// pages/index.tsx
import Image from "next/image";
import Sidebar from "../components/ui/sidebar";
import TopBar from "../components/ui/topbar";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>No session found</div>;
  }
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* TopBar for mobile */}
      <div className="md:hidden">
        <TopBar />
      </div>

      {/* Sidebar Component */}
      <div className="hidden md:flex md:flex-col md:w-64 h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 sm:p-20 bg-gray-100 flex flex-col items-center">
        <main className="flex flex-col gap-8 items-center sm:items-start">
        <div>
          <h1>Welcome, {session.user?.username}</h1>
          <p>Email: {session.user?.email}</p>
        </div>
        </main>
      </div>
    </div>
  );
}
