import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoAlbersUsa } from 'd3-geo';
import { json } from 'd3-fetch';
import * as topojson from 'topojson-client';

const usaUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

export default function Map() {
  const [hoveredState, setHoveredState] = useState(null);
  const [geoData, setGeoData] = useState([]);
  const [inputCoords, setInputCoords] = useState({ longitude: '', latitude: '' });
  const [county, setCounty] = useState(null);
  const [highlightedCounty, setHighlightedCounty] = useState(null); 
  const projection = geoAlbersUsa();

  useEffect(() => {
    // Cargar los datos de geografía desde el JSON de topología
    json(usaUrl).then((topology) => {
      const geojson = topojson.feature(topology, topology.objects.counties);
      setGeoData(geojson.features);
    }).catch((error) => {
      console.error("Error loading geography data:", error);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputCoords((prevCoords) => ({
      ...prevCoords,
      [name]: value,
    }));
  };

  const findCountyByCoords = async () => {
    const { longitude, latitude } = inputCoords;
    if (longitude && latitude) {
      const countyName = await getCountyFromCoordinates(latitude, longitude);
      setCounty(countyName);

      const foundCounty = geoData.find(geo => geo.properties.name.toLowerCase() === countyName.toLowerCase());
      if (foundCounty) {
        setHighlightedCounty(foundCounty);
      } else {
        console.error("No matching county found in the map data.");
      }
    }
  };

  const getCountyFromCoordinates = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
    );
    const data = await response.json();

    if (data && data.address && data.address.county) {
      return data.address.county;
    } else {
      console.error("No county found");
      return "No county found";
    }
  };

  useEffect(() => {
    if (county && geoData.length > 0) {
      console.log(`County from Nominatim: ${county}`);
      console.log('geoData loaded:', geoData);

      // Comparación con los datos del mapa
    }
  }, [county, geoData]);

  return (
    <div>
      <h2>United States Map</h2>

      <div>
        {county ? (
          <p>County: {county}</p>
        ) : (
          <p>Enter coordinates to find a county</p>
        )}
      </div>

      <div className='w-full'>
        <ComposableMap
          projection="geoAlbersUsa"
          width={800}
          height={500}
          className='w-full h-full'
        >
          <Geographies geography={usaUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setHoveredState(geo.properties.name);
                  }}
                  onMouseLeave={() => {
                    setHoveredState(null);
                  }}
                  style={{
                    default: {
                      fill: highlightedCounty && highlightedCounty.properties.name === geo.properties.name ? "#F53" : "#D6D6DA",
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

      <div>
        <h3>Find County by Coordinates</h3>
        <input
          type="number"
          name="longitude"
          placeholder="Longitude"
          value={inputCoords.longitude}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="latitude"
          placeholder="Latitude"
          value={inputCoords.latitude}
          onChange={handleInputChange}
        />
        <button onClick={findCountyByCoords}>Find County</button>
      </div>

      {county && <p>County for the coordinates: {county}</p>}
    </div>
  );
}