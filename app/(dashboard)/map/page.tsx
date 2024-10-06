'use client'
import React, { useState } from 'react';
import UsMap from "../../../components/ui/UsMap";

export default function Map() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-4xl font-bold text-green-700 pb-4">United States Map</h1>
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <UsMap />
        </div>
      </div>
    </div>
  );
}
