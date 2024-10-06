"use client"
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource"; // Your generated schema
import { Button } from "@nextui-org/react";
import { useToast } from "@/hooks/use-toast"


const client = generateClient<Schema>();


export default function Preferences() {
    const { toast } = useToast()

    const [settings, setSettings] = useState({
        latitude: "",
        longitude: "",
        zipCode: "",
    });
    const [loading, setLoading] = useState(false);
    const [userSettingsId, setUserSettingsId] = useState<string | null>(null);


    useEffect(() => {
        const fetchUserSettings = async () => {
            setLoading(true);
            try {
                const { data } = await client.models.UserSettings.list();
                // Check if user already has settings
                if (data.length > 0) {
                    const userSettings = data[0]; // Assume each user has one settings entry
                    setSettings({
                        latitude: userSettings.latitude?.toString() || "",
                        longitude: userSettings.longitude?.toString() || "",
                        zipCode: userSettings.zipCode?.toString() || "",
                    });
                    setUserSettingsId(userSettings.id); // Store the ID for updating later
                }
            } catch (error) {
                console.error("Error fetching user settings", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchUserSettings();
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        if (loading) {
            return; // Prevent saving while loading
        }

        try {
            const settingsPayload = {
                latitude: parseFloat(settings.latitude), // Convert string to float
                longitude: parseFloat(settings.longitude), // Convert string to float
                zipCode: settings.zipCode, // This can stay as a string
            };
            if (userSettingsId) {
                // If settings exist, update them
                await client.models.UserSettings.update({
                    id: userSettingsId, // Pass the ID for updating
                    ...settingsPayload, // Spread other fields
                });
                toast({
                    title: "Updated",
                    description: "Successfully",
                })
            } else {
                // If no settings exist, create new ones
                await client.models.UserSettings.create({
                    latitude: parseFloat(settings.latitude),
                    longitude: parseFloat(settings.longitude),
                    zipCode: settings.zipCode,
                });
                toast({
                    title: "Created",
                    description: "Successfully",
                })
            }
        } catch (error) {
            console.error("Error saving settings", error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen w-full">
            <div className="z-10 flex-1 p-8 sm:p-20 bg-[#f0f4f8] flex flex-col items-center text-center text-gray-800">
                <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold mb-6">Settings</h1>
                    {!loading ? (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row items-center">
                                <label className="w-full sm:w-1/3 text-left mb-2 sm:mb-0">Latitude</label>
                                <Input
                                    className="w-full sm:w-2/3"
                                    type="number"
                                    name="latitude"
                                    value={settings.latitude}
                                    onChange={handleChange}
                                    placeholder="Latitude"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center">
                                <label className="w-full sm:w-1/3 text-left mb-2 sm:mb-0">Longitude</label>
                                <Input
                                    className="w-full sm:w-2/3"
                                    type="number"
                                    name="longitude"
                                    value={settings.longitude}
                                    onChange={handleChange}
                                    placeholder="Longitude"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center">
                                <label className="w-full sm:w-1/3 text-left mb-2 sm:mb-0">Zip Code</label>
                                <Input
                                    className="w-full sm:w-2/3"
                                    type="number"
                                    name="zipCode"
                                    value={settings.zipCode}
                                    onChange={handleChange}
                                    placeholder="3489023"
                                />
                            </div>
                            <Button
                                className="mt-8"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                Save Changes
                            </Button>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}