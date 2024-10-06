import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const usaUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function Map() {
  const [hoveredState, setHoveredState] = useState(null);
  const [map, setMap] = useState(null)

  return (
    <div>
      <h2>Mapa de Estados Unidos</h2>

      <div>
        {hoveredState ? (
          <p>Estado: {hoveredState}</p>
        ) : (
          <p>Pasa el mouse sobre un estado.</p>
        )}
      </div>


      <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        <ComposableMap
          projection="geoAlbersUsa"
          width={800}
          height={500}
          className='w-full h-full'
        >
          <Geographies geography={usaUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { name } = geo.properties;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setHoveredState(name);
                    }}
                    onMouseLeave={() => {
                      setHoveredState(null);
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}