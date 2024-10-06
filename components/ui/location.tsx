"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import countriesData from "./countries.json";

// Adjust the path as necessary

export default function LocationPage() {
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [error, setError] = useState("");
  const [manualLocation, setManualLocation] = useState({
    country: "",
    zipCode: "",
  });
  const [manualError, setManualError] = useState("");
  const [countries, setCountries] = useState<string[]>([]); // Specify type as string[]
  const [showManualEntry, setShowManualEntry] = useState(false); // State to toggle manual entry visibility
  const [showAutoLocation, setShowAutoLocation] = useState(true); // State to toggle auto location visibility

  // Set countries from JSON file
  useEffect(() => {
    setCountries(countriesData);
  }, []);

  // Handler for automatic geolocation
  const handleSaveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError(""); // Clear any previous errors
        },
        (err) => {
          setError("Error fetching location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  // Handler for manual location by country and zip code
  const handleManualLocation = async () => {
    const { country, zipCode } = manualLocation;
    if (!country || !zipCode) {
      setManualError("Please enter both country and zip code.");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${zipCode},${country}&key=0daf624007c24afb9270d610098282b4`
      );
      const { lat, lng } = response.data.results[0].geometry;
      setCoordinates({ lat, lon: lng });
      setManualError(""); // Clear any previous errors
    } catch (err) {
      setManualError("Error fetching coordinates. Please check your inputs.");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl mb-4">Let's set your location.</h2>

      {/* Automatic Geolocation */}
      {showAutoLocation && (
        <>
          <button
            onClick={handleSaveLocation}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mb-4"
          >
            Get location
          </button>
          <p className="text-sm text-center">
            If that doesn't work, you can try inputting your ZIP code manually{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default anchor behavior
                setShowManualEntry((prev) => !prev); // Toggle visibility
                setShowAutoLocation(false); // Hide automatic location on toggle
              }}
              className="text-blue-500 hover:underline"
            >
              here
            </a>
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
        </>
      )}

      {/* Manual Location Entry */}
      {showManualEntry && (
        <div className="mb-4">
          <h3 className="text-lg mb-2">Enter country and ZIP code</h3>

          {/* Country Dropdown */}
          <select
            value={manualLocation.country}
            onChange={(e) =>
              setManualLocation({ ...manualLocation, country: e.target.value })
            }
            className="mb-2 border border-gray-300 p-2 rounded-md"
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          <Input
            type="text"
            placeholder="Zip Code"
            value={manualLocation.zipCode}
            onChange={(e) =>
              setManualLocation({ ...manualLocation, zipCode: e.target.value })
            }
          />
          {manualError && <p className="text-red-500 mt-2">{manualError}</p>}

          <button
            onClick={handleManualLocation}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mt-4"
          >
            Get Coordinates
          </button>
        </div>
      )}
    </div>
  );
}
