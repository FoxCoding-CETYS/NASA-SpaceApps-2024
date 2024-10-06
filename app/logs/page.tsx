'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown, ChevronUp, Search } from "lucide-react"
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
const client = generateClient<Schema>();

export default function Logs() {
    const [date, setDate] = useState<Date>(new Date());
    const [location, setLocation] = useState<string>('');
    const [cropType, setCropType] = useState<string>('corn');
    const [soilCondition, setSoilCondition] = useState<string>('moist');
    const [weather, setWeather] = useState<string>('sunny');
    const [pestObservations, setPestObservations] = useState<string>('');
    const [generalNotes, setGeneralNotes] = useState<string>('');
    const [expandedLog, setExpandedLog] = useState<number | null>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Handle form submission logic
    const handleSubmit = async () => {
        try {
            await client.models.LogEntry.create({
                date: format(date, 'yyyy-MM-dd'),
                location: location,
                cropType: cropType,
                soilCondition: soilCondition,
                weather: weather,
                pestObservations: pestObservations,
                generalNotes: generalNotes,
            });
            console.log('Log entry created successfully');

            // Clear inputs after submission
            setLocation('');
            setCropType('corn');
            setSoilCondition('moist');
            setWeather('sunny');
            setPestObservations('');
            setGeneralNotes('');
            setDate(new Date());
        } catch (error) {
            console.error('Error creating log entry:', error);
        }
    };

    // Filtered logs based on search term
    const filteredLogs = logs.filter(log =>
        log.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.cropType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        // Use observeQuery for real-time updates
        client.models.LogEntry.observeQuery().subscribe({
            next: (data) => setLogs([...data.items]),
            error: (error) => console.error('Error fetching log entries:', error),
        });
    }, []);

    return (
        <div className="min-h-screen bg-green-50 p-4 md:p-8">
            <h1 className="text-4xl font-bold text-green-800 mb-8">Farm Log</h1>

            {/* Log Entry Creation Form */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Create New Log Entry</CardTitle>
                    <CardDescription>Record your farm observations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(newDate) => newDate && setDate(newDate)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Field/Location</Label>
                            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter field or location" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cropType">Crop Type</Label>
                            <Select value={cropType} onValueChange={setCropType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select crop type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="corn">Corn</SelectItem>
                                    <SelectItem value="wheat">Wheat</SelectItem>
                                    <SelectItem value="soybean">Soybean</SelectItem>
                                    <SelectItem value="cotton">Cotton</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Soil Condition</Label>
                            <RadioGroup value={soilCondition} onValueChange={setSoilCondition}>
                                <div className="flex space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="dry" id="dry" />
                                        <Label htmlFor="dry">Dry</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="moist" id="moist" />
                                        <Label htmlFor="moist">Moist</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="wet" id="wet" />
                                        <Label htmlFor="wet">Wet</Label>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="weather">Weather Condition</Label>
                            <Select value={weather} onValueChange={setWeather}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select weather condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sunny">Sunny</SelectItem>
                                    <SelectItem value="cloudy">Cloudy</SelectItem>
                                    <SelectItem value="rainy">Rainy</SelectItem>
                                    <SelectItem value="windy">Windy</SelectItem>
                                    <SelectItem value="snow">Snow</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="pestObservations">Pest and Disease Observations</Label>
                            <Textarea id="pestObservations" value={pestObservations} onChange={(e) => setPestObservations(e.target.value)} placeholder="Enter any pest or disease observations" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="generalNotes">General Notes</Label>
                            <Textarea id="generalNotes" value={generalNotes} onChange={(e) => setGeneralNotes(e.target.value)} placeholder="Enter any additional notes" />
                        </div>

                        <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Submit Log Entry
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Previous Logs View */}
            <Card>
                <CardHeader>
                    <CardTitle>Previous Logs</CardTitle>
                    <CardDescription>View and search your past entries</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <Label htmlFor="search" className="sr-only">
                            Search logs
                        </Label>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="search"
                                placeholder="Search by date, location, or crop type"
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredLogs.length === 0 ? (
                        <p className="text-center text-muted-foreground">No logs found.</p>
                    ) : (
                        <ul className="space-y-4">
                            {filteredLogs.map((log) => (
                                <li key={log.id} className="border-b pb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{log.date}</p>
                                            <p>{log.location} - {log.cropType}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {log.generalNotes.substring(0, 100)}
                                                {log.generalNotes.length > 100 ? '...' : ''}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                        >
                                            {expandedLog === log.id ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    {expandedLog === log.id && (
                                        <div className="mt-2 space-y-2">
                                            <p><strong>Soil Condition:</strong> {log.soilCondition}</p>
                                            <p><strong>Weather:</strong> {log.weather}</p>
                                            <p><strong>Pest Observations:</strong> {log.pestObservations}</p>
                                            <p><strong>General Notes:</strong> {log.generalNotes}</p>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}