'use client'
import React, { useState } from 'react';
import UsMap from "../../../components/ui/UsMap";

export default function Map() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">United States Map</h1>
      <div className="flex space-x-4 mb-8">
      </div>
      <div className="w-full max-w-4xl">
          <div className="text-center">
            <UsMap />
          </div>
      </div>
    </div>
  );
}
