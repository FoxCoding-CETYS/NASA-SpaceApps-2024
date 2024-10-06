// components/WeatherClient.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface WeatherData {
  humidity: number;
  temperature: number;
  precipitation: number;
}

const WeatherClient: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const latitude = '40.7128';  // Example latitude (e.g., New York City)
  const longitude = '-74.0060'; 


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`);
        const data = await response.json();

        if (response.ok) {
          setWeatherData(data);
        } else {
          setError('Failed to fetch weather data');
        }
      } catch (error) {
        setError('An error occurred while fetching weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Current Weather</h2>
      <div className="mb-2">
        <strong>Temperature:</strong> {weatherData?.temperature}°C
      </div>
      <div className="mb-2">
        <strong>Humidity:</strong> {weatherData?.humidity}%
      </div>
      <div className="mb-2">
        <strong>Precipitation (past 24 hours):</strong> {weatherData?.precipitation} mm
      </div>
    </div>
  );
};

export default WeatherClient;
