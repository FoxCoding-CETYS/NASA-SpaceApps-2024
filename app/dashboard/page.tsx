// pages/index.tsx
import React from "react";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
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
