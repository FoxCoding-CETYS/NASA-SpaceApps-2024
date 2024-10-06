"use client";
import Sidebar from "../components/ui/sidebar";
import TopBar from "../components/ui/topbar";
import { MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LocationPage from "../components/ui/location";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:hidden">
        <TopBar />
      </div>
      <div className="hidden md:flex md:flex-col md:w-64 h-full">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 sm:p-20 bg-gray-100 flex flex-col items-center">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Dialog>
              <DialogTrigger asChild>
                <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                  <MapPin className="dark:invert" width={20} height={20} />
                  Set location
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <LocationPage />
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}
