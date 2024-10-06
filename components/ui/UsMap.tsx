import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { geoAlbersUsa, geoCentroid } from 'd3-geo'; // Importamos geoCentroid
import { json } from 'd3-fetch';
import * as topojson from 'topojson-client';

const dummyData = [
    {
      "longitude": -103.59179687498357,
      "latitude": 40.17887331434696,
      "evi": 0.82
    },
    {
      "longitude": -99.140625,
      "latitude": 34.88593094075317,
      "evi": -0.58
    },
    {
      "longitude": -112.05078125,
      "latitude": 37.3002752813443,
      "evi": -0.12
    },
    {
      "longitude": -93.515625,
      "latitude": 41.50857729743935,
      "evi": 0.47
    },
    {
      "longitude": -109.51171875,
      "latitude": 47.040182144806664,
      "evi": -0.75
    },
    {
      "longitude": -120.234375,
      "latitude": 44.08758502824516,
      "evi": 0.23
    },
    {
      "longitude": -97.20703125,
      "latitude": 39.774769485295465,
      "evi": 0.66
    },
    {
      "longitude": -83.671875,
      "latitude": 35.60371874069731,
      "evi": 0.39
    },
    {
      "longitude": -101.6015625,
      "latitude": 41.50857729743935,
      "evi": -0.45
    },
    {
      "longitude": -109.51171875,
      "latitude": 46.55886030311718,
      "evi": 0.13
    },
    {
      "longitude": -111.796875,
      "latitude": 32.54681317351514,
      "evi": -0.36
    },
    {
      "longitude": -100.078125,
      "latitude": 39.57182223734374,
      "evi": 0.93
    },
    {
      "longitude": -106.875,
      "latitude": 36.27970720524017,
      "evi": 0.61
    },
    {
      "longitude": -95.2734375,
      "latitude": 32.54681317351514,
      "evi": -0.91
    },
    {
      "longitude": -117.421875,
      "latitude": 34.30714385628804,
      "evi": -0.22
    },
    {
      "longitude": -88.59375,
      "latitude": 34.88593094075317,
      "evi": 0.55
    },
    {
      "longitude": -98.7890625,
      "latitude": 44.84029065139799,
      "evi": -0.68
    },
    {
      "longitude": -96.6796875,
      "latitude": 41.64007838467894,
      "evi": 0.74
    },
    {
      "longitude": -89.6484375,
      "latitude": 39.436192999314095,
      "evi": -0.01
    },
    {
      "longitude": -106.34765625,
      "latitude": 35.137879119634185,
      "evi": 0.49
    },
    {
      "longitude": -99.4921875,
      "latitude": 37.16031654673677,
      "evi": 0.32
    },
    {
      "longitude": -104.765625,
      "latitude": 33.87041555094182,
      "evi": -0.93
    },
    {
      "longitude": -110.7421875,
      "latitude": 38.8225909761771,
      "evi": -0.15
    },
    {
      "longitude": -92.109375,
      "latitude": 35.96022296929667,
      "evi": 0.87
    },
    {
      "longitude": -105.1171875,
      "latitude": 40.463666324587685,
      "evi": -0.44
    },
    {
      "longitude": -90.46875,
      "latitude": 38.238180119798635,
      "evi": 0.18
    },
    {
      "longitude": -94.921875,
      "latitude": 36.5978891330702,
      "evi": -0.84
    },
    {
      "longitude": -109.51171875,
      "latitude": 35.460669951495305,
      "evi": 0.05
    },
    {
      "longitude": -88.9453125,
      "latitude": 38.8225909761771,
      "evi": 0.41
    },
    {
      "longitude": -90.3515625,
      "latitude": 40.39676430557203,
      "evi": -0.49
    },
    {
      "longitude": -102.48046875,
      "latitude": 36.527294814546245,
      "evi": 0.92
    },
    {
      "longitude": -113.90625,
      "latitude": 38.41055825094609,
      "evi": -0.63
    },
    {
      "longitude": -109.16015625,
      "latitude": 32.54681317351514,
      "evi": -0.74
    },
    {
      "longitude": -98.26171875,
      "latitude": 34.66935854524543,
      "evi": 0.99
    },
    {
      "longitude": -95.9765625,
      "latitude": 39.57182223734374,
      "evi": 0.36
    },
    {
      "longitude": -99.84375,
      "latitude": 38.272688535980976,
      "evi": 0.64
    },
    {
      "longitude": -105.29296875,
      "latitude": 39.50404070558415,
      "evi": -0.88
    },
    {
      "longitude": -107.578125,
      "latitude": 38.685509760012,
      "evi": -0.33
    },
    {
      "longitude": -91.58203125,
      "latitude": 32.54681317351514,
      "evi": 0.59
    },
    {
      "longitude": -85.78125,
      "latitude": 32.84267363195431,
      "evi": -0.19
    },
    {
      "longitude": -104.765625,
      "latitude": 36.527294814546245,
      "evi": 0.24
    },
    {
      "longitude": -88.41796875,
      "latitude": 35.31736632923788,
      "evi": 0.88
    },
    {
      "longitude": -94.5703125,
      "latitude": 35.37113502280101,
      "evi": -0.77
    },
    {
      "longitude": -101.07421875,
      "latitude": 41.07935114946899,
      "evi": 0.77
    },
    {
      "longitude": -94.39453125,
      "latitude": 31.98944183792288,
      "evi": 0.09
    },
    {
      "longitude": -108.80859375,
      "latitude": 38.8225909761771,
      "evi": -0.35
    },
    {
      "longitude": -96.85546875,
      "latitude": 33.063924198120645,
      "evi": 0.81
    },
    {
      "longitude": -94.39453125,
      "latitude": 37.996162679728116,
      "evi": 0.12
    },
    {
      "longitude": -109.3359375,
      "latitude": 45.1510532655634,
      "evi": -0.96
    },
    {
      "longitude": -91.7578125,
      "latitude": 42.032974332441405,
      "evi": 0.25
    },
    {
      "longitude": -93.8671875,
      "latitude": 38.61687046392973,
      "evi": -0.58
    },
    {
      "longitude": -87.01171875,
      "latitude": 37.85750715625203,
      "evi": 0.65
    }
  ]
  

const usaUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const getColorFromEvi = (evi) => {
  const red = Math.max(0, 255 * (1 - evi));
  const green = Math.max(0, 255 * (1 + evi));
  return `rgb(${red}, ${green}, 0)`;
};

export default function USMap() {
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    json(usaUrl).then((topology) => {
      const geojson = topojson.feature(topology, topology.objects.counties);
      setGeoData(geojson.features);
    }).catch((error) => {
      console.error("Error loading geography data:", error);
    });
  }, []);

  const projection = geoAlbersUsa().scale(1000).translate([500, 250]);


  const getEviForCounty = (geo) => {
    const [longitude, latitude] = geoCentroid(geo); 


    const countyData = dummyData.find(data => {
      return (
        Math.abs(data.longitude - longitude) < 0.5 && 
        Math.abs(data.latitude - latitude) < 0.5
      );
    });
    return countyData ? countyData.evi : null;
  };

  return (
    <div>
      <h2>United States Map</h2>

      <ComposableMap
        width={870}
        height={500}
        className="w-full h-full"
        projection={projection}
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
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
