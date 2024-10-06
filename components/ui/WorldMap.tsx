import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import * as topojson from 'topojson-client';
import { geoContains, geoMercator } from 'd3-geo';
import { json } from 'd3-fetch';

const worldUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";

export default function WorldMap() {
  const [clickedCountry, setClickedCountry] = useState(null);
  const [clickedCoords, setClickedCoords] = useState(null);
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    json(worldUrl).then((topology) => {
      const geojson = topojson.feature(topology, topology.objects.countries);
      setGeoData(geojson.features);
    }).catch((error) => {
      console.error("Error loading geography data:", error);
    });
  }, []);

  const projection = geoMercator().scale(150).translate([400, 250]);

  const handleMapClick = (event) => {
    const { clientX, clientY } = event;
    const svg = event.target.closest('svg');
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const invertedCoords = point.matrixTransform(svg.getScreenCTM().inverse());

    const [longitude, latitude] = projection.invert([invertedCoords.x, invertedCoords.y]);

    for (const geo of geoData) {
      if (geoContains(geo, [longitude, latitude])) {
        setClickedCountry(geo.properties.name || geo.properties.NAME);
        break;
      }
    }

    setClickedCoords([longitude, latitude]);
  };

  return (
    <div>
      <h2>World Map</h2>
      <div>
        {clickedCountry ? (
          <p>Clicked on: {clickedCountry}</p>
        ) : (
          <p>Click on the map to get country details</p>
        )}
      </div>
      <div>
        {clickedCoords && <p>Coordinates: {clickedCoords[0]}, {clickedCoords[1]}</p>}
      </div>

      <ComposableMap
        width={800}
        height={500}
        className="w-full h-full"
        onClick={handleMapClick}
        projection={projection}
      >
        <Geographies geography={worldUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
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
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
