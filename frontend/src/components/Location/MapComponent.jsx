import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PropTypes from "prop-types";

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

MapUpdater.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number
};

const MapComponent = ({ center, zoom, searchRadius }) => {
  // Convert search radius to meters
  const radiusInMeters = searchRadius * 1000;
  
  const mapContainerStyle = {
    // Set a max-width for large screens
    width: "100%",
    maxWidth: "800px", // Adjust this value as needed
    height: "500px",
    margin: "0 auto" // Center the map horizontally
  };
  
  return (
    <div className="map-wrapper">
      <MapContainer 
        center={center || [51.505, -0.09]} 
        zoom={zoom || 13} 
        style={mapContainerStyle}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {center && (
          <>
            <Marker position={center} icon={userMarkerIcon}>
              <Popup>Your location</Popup>
            </Marker>
            
            {searchRadius > 0 && (
              <Circle 
                center={center}
                radius={radiusInMeters}
                pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
              />
            )}
          </>
        )}
        
        <MapUpdater center={center} zoom={zoom} />
      </MapContainer>
    </div>
  );
};

MapComponent.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  searchRadius: PropTypes.number
};

MapComponent.defaultProps = {
  searchRadius: 0,
  zoom: 13
};

export default MapComponent;