'use client'
import React, { useState, useEffect } from 'react';
import { Bell, Search, ChevronDown, Droplets, Cloud, Bug, Leaf, BarChart2, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WeatherData {
  humidity: number;
  temperature: number;
  precipitation: number;
}

export default function FarmerDashboard() {
  const [selectedCrop, setSelectedCrop] = useState("corn");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const latitude = '40.7128';  // Ejemplo de latitud (Nueva York)
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar would go here */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold">Datafarm Dashboard</h1>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input className="pl-8" placeholder="Search fields, crops..." />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="text-gray-500" />
            <Avatar>
              <AvatarImage src="/placeholder-farmer.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost">
              John Doe
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Datafarm</h2>
              <p className="text-gray-600">Revolutionizing Farming with Data</p>
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
                  <div className="text-2xl font-bold">Partly Cloudy</div>
                  <p className="text-muted-foreground">High: 75°F | Low: 60°F</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    20% chance of rain
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
                <Button className="w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  Run Custom Prediction Model
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
