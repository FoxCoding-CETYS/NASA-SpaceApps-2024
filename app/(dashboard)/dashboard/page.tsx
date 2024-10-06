'use client'
import React, { useState, useEffect, useRef  } from 'react';
import { Bell, Search, ChevronDown, Droplets, Cloud, Bug, Leaf, BarChart2, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ScaledEviPredictionChart from "@/components/scaled-evi-prediction-chart"
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource"; // Your generated schema
import  Link  from 'next/link';

const client = generateClient<Schema>();

const calculateRainProbability = (cloudCover: number): number => {
  if (cloudCover <= 20) return 5; 
  if (cloudCover >= 90) return 90; 

  return Math.min(90, Math.pow(cloudCover / 10, 2)); 
};


interface WeatherData {
  humidity: number;
  temperature: number;
  precipitation: number;
  cloudCover: number;
}

export default function FarmerDashboard() {
  const [selectedCrop, setSelectedCrop] = useState("corn");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<string>("");  
  const [longitude, setLongitude] = useState<string>(""); 
  const [locationSet, setLocationSet] = useState(true);

  const isFirstRender = useRef(true);

  useEffect(() => {
    checkLocation();
  }, []);

  const checkLocation = async () => {
    const { data } = await client.models.UserSettings.list();
    if (data.length > 0) {
      const userSettings = data[0];
      if (userSettings.latitude === null || userSettings.longitude === null) {
        setLocationSet(false);
      } else {
        setLocationSet(true);
      }
    } else {
      setLocationSet(false);
    }
  };

  useEffect( () => {   
    const fetchUserSettings = async () => {
      setLoading(true);
      try {
        const { data } = await client.models.UserSettings.list();
        if (data.length > 0) {
          const userSettings = data[0]; 
          setLatitude(userSettings.latitude?.toString() || "");
          setLongitude(userSettings.longitude?.toString() || "");
        }
      } catch (error) {
        console.error("Error fetching user settings", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserSettings();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Set to false after the first render
      return; // Prevent running on the first render
    }

    if (!latitude || !longitude) return; 


    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`);
        const data = await response.json();
  
        if (response.ok) {
          console.log(`/api/weather?latitude=${latitude}&longitude=${longitude}`)
          setWeatherData(data);
        } else {
          console.log(`/api/weather?latitude=${latitude}&longitude=${longitude}`)
          setError('Failed to fetch weather data');
        }
      } catch (error) {
        setError('An error occurred while fetching weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  if (!locationSet) {
    return (
      <div className="bg-gray-100 p-4 h-full w-full flex justify-center flex-col content-center space-y-4">
  <p className="text-center text-2xl text-black">
    Location isn't set. Please set your location in preferences.
  </p>
  <Link href="./preferences">
    <Button variant="outline" className="max-w-xs mx-auto block">
      Go to preferences
    </Button>
  </Link>
</div>

      
    );
  }
  function calculatePestRisk(weatherData: WeatherData): string {
    const { temperature, humidity, precipitation } = weatherData;

    if (temperature > 25 && humidity > 70 && precipitation < 5) {
      return 'High Risk';
    } else if (temperature > 20 && humidity > 60 && precipitation < 10) {
      return 'Medium';
    } else {
      return 'Low';
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar would go here */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="text-center">
              <h2 className="text-6xl font-bold text-green-800 mb-2">Welcome</h2>
              <p className="text-gray-600">Revolutionizing farming with Data</p>
            </div>

            {/* Weather Data Display */}
            {loading ? (
              <div>Loading weather data...</div>
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div className="p-6 bg-gray-100 rounded-lg shadow-md mb-8">
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
            )}
            
            {/* Rest of the dashboard (Cards and other sections) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
                  <Droplets className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <Progress value={68} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Optimal range: 60-80%
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weather Forecast</CardTitle>
                  <Cloud className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Cloud Cover</div>
                  <p className="text-muted-foreground">{weatherData?.cloudCover}%</p>
                  <p className="text-xs text-muted-foreground mt-2">
                  {weatherData?.cloudCover
                  ? `${calculateRainProbability(weatherData.cloudCover)}% chance of rain`
                  : 'No rain expected'}
                  </p>
                </CardContent>
              </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pest Alert</CardTitle>
                    <Bug className={`h-4 w-4 ${weatherData ? (calculatePestRisk(weatherData) === 'High Risk' ? 'text-red-500' : calculatePestRisk(weatherData) === 'Medium' ? 'text-orange-500' : 'text-yellow-500') : 'text-gray-500'}`} />
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${weatherData ? (calculatePestRisk(weatherData) === 'High Risk' ? 'text-red-500' : calculatePestRisk(weatherData) === 'Medium' ? 'text-orange-500' : 'text-yellow-500') : 'text-gray-500'}`}>
                      {weatherData ? calculatePestRisk(weatherData) : 'Unknown'} Risk
                    </div>
                    <p className="text-muted-foreground">Insect pest risk based on current weather conditions</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended action: Schedule inspection
                    </p>
                  </CardContent>
                </Card>
            </div>
   
            <Card>
              <CardHeader>
                <CardTitle>Predictive Analytics</CardTitle>
                <CardDescription>AI-powered insights for your farm</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Projected Yield</h4>
                      <p className="text-sm text-muted-foreground">Based on current conditions and historical data</p>
                    </div>
                    <div className="text-2xl font-bold">+12%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Pest Outbreak Probability</h4>
                      <p className="text-sm text-muted-foreground">For the next 30 days</p>
                    </div>
                    <div className="text-2xl font-bold text-yellow-500">Medium</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Optimal Harvest Window</h4>
                      <p className="text-sm text-muted-foreground">For corn crop</p>
                    </div>
                    <div className="text-2xl font-bold">Sep 15 - Sep 30</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className='w-full flex justify-center'>
              <ScaledEviPredictionChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
