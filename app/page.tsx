
'use client'
// pages/index.tsx
import Sidebar from "../components/ui/sidebar";
import TopBar from "../components/ui/topbar";
import HistoricChart from "@/components/ui/historicChart";
import { ComparisonChart } from "@/components/ComparisonChart";
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
          <div className="w-full">
              <div className="mb-8">
                <ComparisonChart/>
              </div>
          <div>
              <HistoricChart/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
