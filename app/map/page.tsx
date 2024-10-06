'use client'
import React, { useState } from 'react';
import UsMap from "../../components/ui/UsMap";
import WorldMap from "../../components/ui/WorldMap";

export default function Map() {
  const [hoveredState, setHoveredState] = useState(null);
  const [map, setMap] = useState('usa'); // Mapa predeterminado es Estados Unidos

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-4xl font-bold mb-8">Selecciona un Mapa</h1>
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setMap('usa')}
          className={`px-4 py-2 rounded ${
            map === 'usa' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'
          }`}
        >
          Mapa de Estados Unidos
        </button>
        <button
          onClick={() => setMap('world')}
          className={`px-4 py-2 rounded ${
            map === 'world' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'
          }`}
        >
          Mapa del Mundo
        </button>
      </div>
      <div className="w-full max-w-4xl">
        {map === 'usa' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Mapa de Estados Unidos</h2>
            <UsMap />
          </div>
        )}
        {map === 'world' && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Mapa del Mundo</h2>
            <WorldMap />
          </div>
        )}
      </div>
    </div>
  );
}
