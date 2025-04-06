import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PropTypes from "prop-types";

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
      // Animate to the new center with reduced zoom
      map.setView(center, zoom, {
        animate: true,
        duration: 1 // Animation duration in seconds
      });
    }
  }, [center, zoom, map]);

  return null;
};

const MapComponent = ({ center, zoom, searchRadius }) => {
  const mapStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    border: "4px solid #43368A"
  };

  // Convert search radius to meters
  const radiusInMeters = searchRadius * 1000;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg mb-8 relative">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={mapStyle} 
        scrollWheelZoom={true}
        zoomControl={true}
      >
        {/* Map Updater to handle center changes */}
        <MapUpdater center={center} zoom={zoom} />

        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Centered Marker */}
        <Marker position={center} icon={userMarkerIcon}>
          <Popup>Selected Location</Popup>
        </Marker>

        {/* Search Radius Circle */}
        <Circle
          center={center}
          radius={radiusInMeters}
          pathOptions={{ 
            color: 'green', 
            fillColor: 'green', 
            fillOpacity: 0.2,
            weight: 2
          }}
        />
      </MapContainer>
    </div>
  );
};

MapComponent.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  zoom: PropTypes.number, // Make zoom optional
  searchRadius: PropTypes.number.isRequired
};

MapComponent.defaultProps = {
  zoom: 10 // Reduced default zoom level
};

export default MapComponent;