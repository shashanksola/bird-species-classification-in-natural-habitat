import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  MapPin,
  Bird,
  Loader2,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import MapComponent from "./MapComponent";
import BirdObservationsDisplay from "./BirdObservationsDisplay";
import Navbar from "../Navbar";

const DEFAULT_LOCATION = { lat: 16.4971, lng: 80.4992 };

const Location = () => {
  const [center, setCenter] = useState(DEFAULT_LOCATION);
  const [zoom, setZoom] = useState(10);
  const [hotspots, setHotspots] = useState([]);
  const [birdData, setBirdData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchRadius, setSearchRadius] = useState(25);
  const [locationInitialized, setLocationInitialized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedSearchResult, setSelectedSearchResult] = useState(null);
  const [locationName, setLocationName] = useState("");

  // Function to fetch location data from OpenStreetMap
  const searchLocation = async (query) => {
    if (!query.trim()) return;
    
    setSearchLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for location:", error);
      setError("Location search failed. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  // Function to get location name from coordinates
  const getLocationNameFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      
      const data = await response.json();
      if (data && data.display_name) {
        setLocationName(data.display_name);
        setSelectedSearchResult(data.display_name);
      }
    } catch (error) {
      console.error("Error getting location name:", error);
    }
  };

  // Function to handle location selection
  const handleLocationSelect = (result) => {
    const newLocation = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon)
    };
    
    setCenter(newLocation);
    setZoom(10);
    setSelectedSearchResult(result.display_name);
    setLocationName(result.display_name);
    setSearchResults([]);
    fetchBirdData(newLocation.lat, newLocation.lng, searchRadius);
  };

  // Function to fetch bird data and hotspots
  const fetchBirdData = async (lat, lng, radius) => {
    setLoading(true);
    setError(null);
    try {
      const birdDataResponse = await fetch(
        `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lng}&dist=${radius}`,
        {
          headers: {
            "X-eBirdApiToken": "lv9ldei00jf0",
          },
        }
      );
      const hotspotsResponse = await fetch(
        `https://api.ebird.org/v2/ref/hotspot/geo?lat=${lat}&lng=${lng}&dist=${radius}`,
        {
          headers: {
            "X-eBirdApiToken": "lv9ldei00jf0",
          },
        }
      );

      if (!birdDataResponse.ok || !hotspotsResponse.ok) {
        throw new Error("Failed to fetch bird or hotspot data");
      }

      const birdData = await birdDataResponse.json();
      const hotspotsData = await hotspotsResponse.text();

      Papa.parse(hotspotsData, {
        complete: (result) => {
          const parsedData = result.data
            .map((row) => ({
              locId: row[0],
              locName: row[6],
              lat: parseFloat(row[4]),
              lng: parseFloat(row[5]),
              date: row[7],
              count: row[8],
            }))
            .filter(
              (hotspot) =>
                !isNaN(hotspot.lat) &&
                !isNaN(hotspot.lng) &&
                hotspot.locName &&
                hotspot.locId &&
                hotspot.date &&
                hotspot.count !== undefined
            );

          setHotspots(parsedData);
          setBirdData(birdData);
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again later.");
      setLoading(false);
    }
  };

  // Initialize location and fetch data on first load
  useEffect(() => {
    if (!locationInitialized) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCenter(userLocation);
            setLocationInitialized(true);
            
            // Get location name from coordinates
            getLocationNameFromCoordinates(userLocation.lat, userLocation.lng);
            
            fetchBirdData(userLocation.lat, userLocation.lng, searchRadius);
          },
          // Error handler for geolocation
          (error) => {
            console.warn("Geolocation Permission Denied:", error);
            setLocationInitialized(true);
            // Use default location
            fetchBirdData(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng, searchRadius);
            // Try to get location name for the default location
            getLocationNameFromCoordinates(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
          }
        );
      } else {
        console.warn("Geolocation Not Supported");
        setLocationInitialized(true);
        fetchBirdData(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng, searchRadius);
        // Try to get location name for the default location
        getLocationNameFromCoordinates(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
      }
    }
  }, [locationInitialized, searchRadius]);
  
  // When radius changes, fetch new data with existing location
  useEffect(() => {
    if (locationInitialized) {
      fetchBirdData(center.lat, center.lng, searchRadius);
    }
  }, [searchRadius, locationInitialized, center]);
  
  const handleLocateMe = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(newLocation);
          setZoom(10);
          // Get location name when using "Find Birds Near Me"
          getLocationNameFromCoordinates(newLocation.lat, newLocation.lng);
          fetchBirdData(newLocation.lat, newLocation.lng, searchRadius);
        },
        (error) => {
          console.warn("Geolocation Permission Denied:", error);
          alert("Unable to access your location. Using default location instead.");
        }
      );
    }
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchLocation(searchQuery);
  };
  
  return (
   <div 
      className="min-h-screen text-gray-900 relative bg-cover bg-center bg-no-repeat" 
      style={{ 
        backgroundImage: "url('https://bird-species.s3.ap-south-1.amazonaws.com/_website_images/classify-bg.svg')",
        backgroundSize: 'cover',
        backgroundColor: 'rgba(255,255,255,0.8)',
        backgroundBlendMode: 'lighten'
      }}
    >
      <div className="container mx-auto py-8 px-4 relative z-10">
        <header className="text-center mb-10">
          <Link to="/">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Bird className="w-10 h-10 text-gray-700" />
            Birdz
          </h1>
          </Link>
         
          <p className="text-gray-700 max-w-2xl mx-auto">
            Bird Species Classification and Exploration
          </p>
        </header>

        {/* Location Search */}
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Location
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="City, State, Country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-white/70 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 text-gray-900 placeholder-gray-600"
                />
                {searchLoading && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 animate-spin" />
                )}
                
                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full bg-white/90 backdrop-blur-sm rounded-md shadow-lg border border-gray-300 max-h-60 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <button
                        key={`${result.place_id}-${index}`}
                        type="button"
                        onClick={() => handleLocationSelect(result)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-200 last:border-0 text-gray-900"
                      >
                        {result.display_name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
          
          {/* Location Display */}
          {selectedSearchResult && (
            <div className="text-sm text-gray-700 bg-white/50 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2 border border-gray-300">
              <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0" />
              <span className="truncate">Current: {selectedSearchResult}</span>
            </div>
          )}

          {/* Search Radius and Locate Me Section */}
          <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Radius (km)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-gray-900 font-medium">
                  {searchRadius}
                </span>
              </div>
            </div>

            <button
              className="w-full md:w-auto px-6 py-2.5 bg-gray-800 hover:bg-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
             
              type="button"
            >
              <MapPin className="w-5 h-5" />
            <span className="text-blue-950"> Find Birds Near Me</span> 
            </button>
           
          </div>
          
        </div>

        <MapComponent 
          center={center} 
          zoom={zoom} 
          searchRadius={searchRadius}
        />

        {/* Loading and Error States */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-gray-700 mb-8">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Searching for birds...</span>
          </div>
        )}
        {error && (
          <div className="max-w-4xl mx-auto text-red-700 mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-red-300">
            {error}
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && (
          <div className="rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-300 p-6">
            <BirdObservationsDisplay
              hotspots={hotspots}
              observations={birdData}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600 text-sm relative z-10">
          <p>© {new Date().getFullYear()} Birdz. All rights reserved.</p>
        </footer>
      </div>
    </div>
  
  );
};

export default Location;