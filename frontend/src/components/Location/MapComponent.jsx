<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
/* eslint-disable react/prop-types */
import { useEffect } from "react";
>>>>>>> eb229a5f6a71c3f25b51cb767bb201c61cee0bbe
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix the default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icon
const userMarkerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149059.png",
  iconSize: [35, 35],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34]
});

// Component to handle map updates
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      // Animate to the new center
      map.setView(center, zoom, {
        animate: true,
        duration: 1 // Animation duration in seconds
      });
    }
  }, [center, zoom, map]);
  
  return null;
};

const MapComponent = ({ center, zoom, searchRadius }) => {
<<<<<<< HEAD
=======
  const mapStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    border: "4px solid #34D399"
  };
  
>>>>>>> eb229a5f6a71c3f25b51cb767bb201c61cee0bbe
  // Convert search radius to meters
  const radiusInMeters = searchRadius * 1000;
  
  return (
<<<<<<< HEAD
    <div className="rounded-xl overflow-hidden shadow-md border-4 border-blue-600 bg-white">
      <div className="bg-gradient-to-b from-blue-50 to-slate-100 p-4">
        <h3 className="text-blue-700 font-semibold text-lg mb-2">Bird Location Map</h3>
        <p className="text-slate-800 text-sm">Search radius: {searchRadius} km</p>
      </div>
      
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: "500px", width: "100%" }}
        className="z-0"
=======
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg mb-8 relative">
      <MapContainer
        center={center}
        zoom={zoom}
        style={mapStyle}
        scrollWheelZoom={true}
        zoomControl={true}
>>>>>>> eb229a5f6a71c3f25b51cb767bb201c61cee0bbe
      >
        {/* Map Updater to handle center changes */}
        <MapUpdater center={center} zoom={zoom} />
        
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Centered Marker */}
        <Marker position={center} icon={userMarkerIcon}>
          <Popup className="bg-white/95 backdrop-blur-md text-slate-800 rounded-md shadow-md">
            <div className="text-blue-600 font-medium">Selected Location</div>
            <div className="text-slate-800 text-sm">Lat: {center.lat.toFixed(4)}, Lng: {center.lng.toFixed(4)}</div>
          </Popup>
        </Marker>
        
        {/* Search Radius Circle */}
        <Circle 
          center={center}
          radius={radiusInMeters}
<<<<<<< HEAD
          pathOptions={{ 
            color: '#34D399',
            fillColor: '#34D399',
            fillOpacity: 0.1,
            weight: 2 
=======
          pathOptions={{
            color: 'green',
            fillColor: 'green',
            fillOpacity: 0.2,
            weight: 2
>>>>>>> eb229a5f6a71c3f25b51cb767bb201c61cee0bbe
          }}
        />
      </MapContainer>
      
      
    </div>
  );
};

<<<<<<< HEAD
MapComponent.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  zoom: PropTypes.number,
  searchRadius: PropTypes.number.isRequired
};

MapComponent.defaultProps = {
  zoom: 10
};

=======
>>>>>>> eb229a5f6a71c3f25b51cb767bb201c61cee0bbe
export default MapComponent;