import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoAlbersUsa, geoCentroid } from 'd3-geo';
import { json } from 'd3-fetch';
import * as topojson from 'topojson-client';
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
} from 'geojson';
import {
  Topology,
  GeometryCollection,
  Objects,
} from 'topojson-specification';

interface CountyData {
  lng: number;
  lat: number;
  evi: number;
}

interface CountyTopology extends Topology {
  objects: {
    counties: GeometryCollection<GeoJsonProperties>;
  };
}


interface GeoFeature {
  type: string;
  geometry: Geometry;
  properties: {
    name: string;
    [key: string]: any;
  };
  id: string | number;
}

const usaUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

// Función para mapear el valor EVI a un color RGB
const getColorFromEvi = (evi: number): string => {
  const red = Math.max(0, 255 * (1 - evi));
  const green = Math.max(0, 255 * (1 + evi));
  return `rgb(${red}, ${green}, 0)`;
};

export default function USMap() {
  const [geoData, setGeoData] = useState<Feature<Geometry, GeoJsonProperties>[]>([]);
  const [countyData, setCountyData] = useState<CountyData[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<{ name: string; evi: number | null } | null>(null);

  // Cargar datos del archivo modisData.json de manera asíncrona
  const fetchCountyData = async (): Promise<void> => {
    try {
      const response = await fetch('/modisData.json'); // Fetch desde public
      if (!response.ok) {
        throw new Error('Error al cargar los datos');
      }
      const data: CountyData[] = await response.json();
      setCountyData(data);
    } catch (error) {
      console.error('Error fetching the JSON data:', error);
    }
  };

  useEffect(() => {
    fetchCountyData();
  }, []);

  // Cargar los datos geográficos de los condados
  useEffect(() => {
    json<CountyTopology>(usaUrl)
      .then((topology) => {
        if (!topology) {
          console.error('Topology is undefined');
          return;
        }
  
        const geojson = topojson.feature(
          topology,
          topology.objects.counties
        ) as
          | FeatureCollection<Geometry, GeoJsonProperties>
          | Feature<Geometry, GeoJsonProperties>;
  
        if (geojson.type === 'FeatureCollection') {
          setGeoData(geojson.features);
        } else if (geojson.type === 'Feature') {
          setGeoData([geojson]);
        } else {
          //console.error('Unexpected GeoJSON type:', geojson.type);
        }
      })
      .catch((error) => {
        console.error('Error loading geography data:', error);
      });
  }, []);
  

  // Obtener el valor EVI según las coordenadas del condado
  const getEviForCounty = (geo: Feature<Geometry, GeoJsonProperties>): number | null => {
    const [longitude, latitude] = geoCentroid(geo);

    const county = countyData.find((data) => {
      return (
        Math.abs(data.lng - longitude) < 0.5 &&
        Math.abs(data.lat - latitude) < 0.5
      );
    });

    return county ? county.evi : null;
  };

  // Manejar el clic en un condado

  const handleClick = (geo: Feature<Geometry, GeoJsonProperties>): void => {
    const evi = getEviForCounty(geo);
  
    if (geo.properties && geo.properties.name) {
      setSelectedCounty({
        name: geo.properties.name,
        evi: evi,
      });
    } else {
      setSelectedCounty({
        name: 'Unknown',
        evi: evi,
      });
    }
  };
  

  return (
    <div>
      <h2>United States Map</h2>

      {/* Mostrar el nombre del condado seleccionado y su EVI */}
      {selectedCounty && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3>{selectedCounty.name}</h3>
          {selectedCounty.evi !== null && <p>EVI: {selectedCounty.evi}</p>}
        </div>
      )}

        <ComposableMap
          width={870}
          height={500}
          className="w-full h-full"
          projection="geoAlbersUsa"
          projectionConfig={{
            scale: 1000,
            center: [-97, 38], // Adjust as needed
          }}
        >
        <Geographies geography={usaUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const evi = getEviForCounty(geo);
              const fillColor = evi !== null ? getColorFromEvi(evi) : "#D6D6DA";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: fillColor,
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
                  onClick={() => handleClick(geo)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Espectro de colores para el EVI */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <div
          style={{
            width: '80%',
            height: '30px',
            margin: '0 auto',
            background: 'linear-gradient(to right, rgb(255,0,0), rgb(255,255,0), rgb(0,255,0))',
            borderRadius: '5px',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '10px auto' }}>
          <span>-1</span>
          <span>0</span>
          <span>1</span>
        </div>
        <p style={{ fontStyle: 'italic' }}>EVI Spectrum (from -1 to 1)</p>
      </div>
    </div>
  );
}
