import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { MapPin, Bird, Loader2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import MapComponent from "./MapComponent";
import BirdObservationsDisplay from "./BirdObservationsDisplay";
import Footer from "../Footer";

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

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        searchLocation(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

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
    if (e) e.preventDefault();
    searchLocation(searchQuery);
  };
  
  return (
    <div className="min-h-screen text-slate-800 relative bg-gradient-to-b pt-4 from-blue-50 to-slate-100">
      <div className="container mx-auto py-20 px-4 relative z-10">
        <header className="text-center mb-10">
          <Link to="/">
            <h1 className="text-4xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-3">
              <Bird className="w-10 h-10 text-blue-600" />
              Birdz
            </h1>
          </Link>
          <p className="text-slate-800 max-w-2xl mx-auto">
            Bird Species Classification and Exploration
          </p>
        </header>

        {/* Location Search */}
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-white/80 backdrop-blur-md rounded-lg shadow-md border border-slate-200">
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <label className="block text-sm font-medium text-slate-800 mb-1">
              Search Location
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="City, State, Country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-white/70 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 text-slate-800 placeholder-slate-400"
                />
                {searchLoading && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 animate-spin" />
                )}
                
               {/* Search Results Dropdown - Improved Styling */}
{searchResults.length > 0 && (
  <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-slate-200 max-h-60 overflow-y-auto">
    <div className="p-2 bg-blue-50 border-b border-slate-200 text-xs font-medium text-slate-500">
      Search results
    </div>
    {searchResults.map((result, index) => (
      <button
        key={`${result.place_id}-${index}`}
        type="button"
        onClick={() => handleLocationSelect(result)}
        className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 border-b border-slate-100 last:border-0 flex items-center gap-2 transition-colors duration-150"
      >
        <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <span className="truncate">{result.display_name}</span>
      </button>
    ))}
  </div>
)}

{/* No Results Message */}
{searchResults.length === 0 && searchQuery.length > 2 && !searchLoading && (
  <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-slate-200">
    <div className="p-2 bg-blue-50 border-b border-slate-200 text-xs font-medium text-slate-500">
      Search results
    </div>
    <p className="p-3 text-sm text-slate-500 text-center">
      No locations found
    </p>
  </div>
)}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center shadow-sm"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
          
          {/* Location Display */}
          {selectedSearchResult && (
            <div className="text-sm text-slate-800 bg-white/50 backdrop-blur-sm p-2 rounded-lg flex items-center gap-2 border border-slate-200">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="truncate">Current: {selectedSearchResult}</span>
            </div>
          )}

          {/* Search Radius and Locate Me Section */}
          <div className="flex flex-col md:flex-row gap-4 items-center mt-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-slate-800 mb-1">
                Search Radius (km)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={searchRadius}
                  onChange={(e) => setSearchRadius(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-slate-800 font-medium min-w-[30px] text-center">
                  {searchRadius}
                </span>
              </div>
            </div>

            <button
              className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
              onClick={handleLocateMe}
              type="button"
            >
              <MapPin className="w-5 h-5" />
              <span>Find Birds Near Me</span> 
            </button>
          </div>
        </div>

        {/* Map Component - Responsive Container */}
      
          <MapComponent 
            center={center} 
            zoom={zoom} 
            searchRadius={searchRadius}
          />
      

        {/* Loading and Error States */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-slate-800 my-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span>Searching for birds...</span>
          </div>
        )}
        {error && (
          <div className="max-w-4xl mx-auto text-red-600 my-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-red-200">
            {error}
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && (
          <div className="max-w-4xl mx-auto mt-8 rounded-xl bg-white/80 backdrop-blur-sm shadow-md border mb-4 border-slate-200 p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-6">Bird Observations</h2>
            <BirdObservationsDisplay
              hotspots={hotspots}
              observations={birdData}
            />
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Location;