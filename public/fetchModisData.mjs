import fetch from 'node-fetch'; // Asegúrate de tener node-fetch instalado
import fs from 'fs';
import csv from 'csv-parser'; // Para analizar el archivo CSV

const MODIS_API_URL = "https://modis.ornl.gov/rst/api/v1/MOD13Q1/subset";

// Verifica si las coordenadas están dentro del rango de EE.UU.
const isInUsa = (lat, lng) => {
  return lat >= 24 && lat <= 50 && lng >= -125 && lng <= -66;
};

// Función para obtener datos de MODIS
async function fetchModisData(lat, lng) {
  const params = `?latitude=${lat}&longitude=${lng}&band=250m_16_days_EVI&startDate=A2024241&endDate=A2024241&kmAboveBelow=0&kmLeftRight=0`;

  const response = await fetch(`${MODIS_API_URL}${params}`);
  const data = await response.json();

  if (data.subset && data.subset[0].data && data.scale) {
    const evi = data.subset[0].data[0] * data.scale; // Escalar el valor de EVI
    return { lng: data.longitude, lat: data.latitude, evi };
  }
  return null;
}

async function saveModisDataFromCsv(csvFilePath) {
  const results = [];
  const usaCoordinates = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const lat = parseFloat(row.lat);
      const lng = parseFloat(row.lng);
      if (isInUsa(lat, lng)) {
        usaCoordinates.push({ lat, lng });
      }
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');
      
      for (const coord of usaCoordinates) {
        try {
          const modisData = await fetchModisData(coord.lat, coord.lng);
          if (modisData) {
            results.push(modisData);
            console.log(`Fetched data for (${coord.lat}, ${coord.lng})`);
          }
        } catch (error) {
          console.error(`Error fetching data for (${coord.lat}, ${coord.lng}):`, error);
        }
      }

      fs.writeFileSync('./modisData.json', JSON.stringify(results, null, 2), 'utf-8');
      console.log('All data saved to modisData.json');
    });
}

saveModisDataFromCsv('./usa_coordinates.csv'); 
