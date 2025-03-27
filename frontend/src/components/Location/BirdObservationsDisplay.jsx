import React, { useState } from "react";
import { MapPin, Bird, Calendar, Hash, Eye, Info } from "lucide-react";
import PropTypes from "prop-types";

const BirdObservationsDisplay = ({ hotspots, observations }) => {
  const [selectedTab, setSelectedTab] = useState("observations");

  // Create a unique key for each observation
  const createUniqueKey = (obs) => {
    return `${obs.subId}-${obs.obsDt}-${obs.comName}`.replace(/\s+/g, "-");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-green-200">
        <button
          onClick={() => setSelectedTab("observations")}
          className={`px-6 py-3 font-medium flex items-center gap-2 transition-colors ${
            selectedTab === "observations"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500 hover:text-green-600"
          }`}
        >
          <Bird className="w-5 h-5" />
          Recent Sightings
        </button>
        <button
          onClick={() => setSelectedTab("hotspots")}
          className={`px-6 py-3 font-medium flex items-center gap-2 transition-colors ${
            selectedTab === "hotspots"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <MapPin className="w-5 h-5" />
          Birding Hotspots
        </button>
      </div>

      {/* Bird Observations Section */}
      {selectedTab === "observations" && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-700">
            <Bird className="text-green-600" />
            Recent Bird Sightings
          </h2>
          {observations.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {observations.map((obs) => (
                <div
                  key={createUniqueKey(obs)}
                  className="bg-gradient-to-br from-white to-green-50 rounded-lg shadow-md p-6 border border-green-100 hover:shadow-lg transition-shadow relative overflow-hidden group"
                >
                  {/* Decorative bird silhouette */}
                  <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Bird className="w-16 h-16 text-green-700" />
                  </div>

                  <div className="space-y-2 relative">
                    <h3 className="text-lg font-semibold text-green-700">
                      {obs.comName}
                    </h3>
                    <p className="text-sm text-gray-600 italic">
                      {obs.sciName}
                    </p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-600" />
                        {new Date(obs.obsDt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-green-600" />
                        Count: {obs.howMany || "Not specified"}
                      </p>
                      <p className="flex items-center gap-2 text-xs mt-1">
                        <MapPin className="w-4 h-4 text-green-600" />
                        {obs.locName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
              <p className="text-green-700">
                No bird sightings found in this area. Try adjusting your search
                radius or location.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Hotspots Section */}
      {selectedTab === "hotspots" && (
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700">
            <MapPin className="text-blue-600" />
            Birding Hotspots
          </h2>
          {hotspots.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {hotspots.map((hotspot, index) => (
                <div
                  key={`${hotspot.locId}-${index}`}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md p-6 border border-blue-100 hover:shadow-lg transition-shadow relative overflow-hidden group"
                >
                  {/* Decorative map pin silhouette */}
                  <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MapPin className="w-16 h-16 text-blue-700" />
                  </div>

                  <div className="space-y-2 relative">
                    <h3 className="text-lg font-semibold text-blue-700">
                      {hotspot.locName}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        {new Date(hotspot.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        {hotspot.count} species observed
                      </p>
                      <p className="flex items-center gap-2 text-xs mt-1">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {hotspot.lat.toFixed(4)}, {hotspot.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
              <p className="text-blue-700">
                No birding hotspots found in this area. Try adjusting your search
                radius or location.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

BirdObservationsDisplay.propTypes = {
  hotspots: PropTypes.arrayOf(
    PropTypes.shape({
      locId: PropTypes.string.isRequired,
      locName: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  observations: PropTypes.arrayOf(
    PropTypes.shape({
      subId: PropTypes.string,
      obsDt: PropTypes.string.isRequired,
      comName: PropTypes.string.isRequired,
      sciName: PropTypes.string.isRequired,
      howMany: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      locName: PropTypes.string.isRequired
    })
  ).isRequired
};

export default BirdObservationsDisplay;