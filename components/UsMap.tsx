import React, { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ProjectionConfig,
} from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
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

const usaUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';

// Function to map EVI value to an RGB color
const getColorFromEvi = (evi: number): string => {
  const red = Math.max(0, 255 * (1 - evi));
  const green = Math.max(0, 255 * (1 + evi));
  return `rgb(${red}, ${green}, 0)`;
};

export default function USMap() {
  const [geoData, setGeoData] = useState<Feature<Geometry, GeoJsonProperties>[]>([]);
  const [countyData, setCountyData] = useState<CountyData[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<{ name: string; evi: number | null } | null>(null);

  // Asynchronously load data from modisData.json
  const fetchCountyData = async (): Promise<void> => {
    try {
      const response = await fetch('/modisData.json'); // Fetch from public
      if (!response.ok) {
        throw new Error('Error loading data');
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

  // Load geographic data of the counties
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
        ) as Feature<Geometry, GeoJsonProperties> | FeatureCollection<Geometry, GeoJsonProperties>;
        

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

  // Get the EVI value based on the county's coordinates
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

  // Handle click on a county
  const handleClick = (geo: Feature<Geometry, GeoJsonProperties>): void => {
    const evi = getEviForCounty(geo);
    setSelectedCounty({
      name: geo.properties?.name ?? 'Unknown',
      evi: evi,
    });
  };

  return (
    <div>
      <h2>United States Map</h2>

      {/* Display the selected county's name and EVI */}
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
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const evi = getEviForCounty(geo);
              const fillColor = evi !== null ? getColorFromEvi(evi) : '#D6D6DA';

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: fillColor,
                      outline: 'none',
                    },
                    hover: {
                      fill: '#F53',
                      outline: 'none',
                    },
                    pressed: {
                      fill: '#E42',
                      outline: 'none',
                    },
                  }}
                  onClick={() => handleClick(geo)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* EVI color spectrum */}
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '80%',
            margin: '10px auto',
          }}
        >
          <span>-1</span>
          <span>0</span>
          <span>1</span>
        </div>
        <p style={{ fontStyle: 'italic' }}>EVI Spectrum (from -1 to 1)</p>
      </div>
    </div>
  );
}
