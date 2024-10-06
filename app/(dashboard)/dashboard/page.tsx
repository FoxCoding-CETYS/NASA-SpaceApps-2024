'use client'
import React, { useState, useEffect, useRef  } from 'react';
import { Bell, Search, ChevronDown, Droplets, Cloud, Bug, Leaf, BarChart2, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource"; // Your generated schema

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

  const isFirstRender = useRef(true);


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
                  <Bug className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">Moderate Risk</div>
                  <p className="text-muted-foreground">Corn Rootworm detected</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Recommended action: Schedule inspection
                  </p>
                </CardContent>
              </Card>
            </div>
   
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Crop Health Overview</CardTitle>
                  <CardDescription>Select a crop to view detailed information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="soybeans">Soybeans</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Growth Stage:</span>
                      <span className="font-medium">Vegetative</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Estimated Yield:</span>
                      <span className="font-medium">180 bu/acre</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Nutrient Status:</span>
                      <span className="font-medium text-green-500">Good</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Leaf className="mr-2 h-4 w-4" />
                    View Detailed Crop Report
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Resource Optimization</CardTitle>
                  <CardDescription>Recommendations for efficient resource use</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="water">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="water">Water</TabsTrigger>
                      <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
                      <TabsTrigger value="pesticides">Pesticides</TabsTrigger>
                    </TabsList>
                    <TabsContent value="water" className="mt-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Current Usage:</h4>
                        <Progress value={60} />
                        <p className="text-sm text-muted-foreground">
                          You're using 60% of your optimal water allocation.
                        </p>
                        <h4 className="font-semibold mt-4">Recommendation:</h4>
                        <p className="text-sm">
                          Increase irrigation by 10% in the north field due to forecasted dry spell.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="fertilizer" className="mt-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Current Usage:</h4>
                        <Progress value={75} />
                        <p className="text-sm text-muted-foreground">
                          You're using 75% of your planned fertilizer application.
                        </p>
                        <h4 className="font-semibold mt-4">Recommendation:</h4>
                        <p className="text-sm">
                          Apply nitrogen-rich fertilizer to the east field within the next 7 days.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="pesticides" className="mt-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Current Usage:</h4>
                        <Progress value={40} />
                        <p className="text-sm text-muted-foreground">
                          You're using 40% of your expected pesticide amount.
                        </p>
                        <h4 className="font-semibold mt-4">Recommendation:</h4>
                        <p className="text-sm">
                          Monitor the south field for signs of corn rootworm. Spot treatment may be necessary.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    View Full Resource Report
                  </Button>
                </CardFooter>
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
              <CardFooter>
              <Dialog>
                <DialogTrigger className='flex w-full'>
                  <div className='w-full flex justify-center '>
                    <Zap className="mr-3" />
                    Run Custom Prediction Model
                  </div>
                </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
