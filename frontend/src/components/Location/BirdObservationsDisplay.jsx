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
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg mb-8 bg-navy-800 border border-navy-700">
      {/* Tab Navigation */}
      <div className="flex bg-navy-900 border-b border-navy-700">
        <button
          onClick={() => setSelectedTab("observations")}
          className={`px-6 py-3 font-medium flex items-center gap-2 transition-all duration-300 ${
            selectedTab === "observations"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-navy-700"
          }`}
        >
          <Bird className="w-5 h-5" />
          Recent Sightings
        </button>
        <button
          onClick={() => setSelectedTab("hotspots")}
          className={`px-6 py-3 font-medium flex items-center gap-2 transition-all duration-300 ${
            selectedTab === "hotspots"
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-navy-700"
          }`}
        >
          <MapPin className="w-5 h-5" />
          Birding Hotspots
        </button>
      </div>

      {/* Content Container */}
      <div className="p-6 text-gray-100">
        {/* Bird Observations Section */}
        {selectedTab === "observations" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b pb-2 border-navy-700">
              <Bird className="w-6 h-6 text-blue-400" />
              Recent Bird Sightings
            </h2>
            {observations.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {observations.map((obs) => (
                  <div
                    key={createUniqueKey(obs)}
                    className="bg-navy-900 rounded-xl border border-navy-700 overflow-hidden"
                  >
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-100">
                            {obs.comName}
                          </h3>
                          <p className="text-sm text-gray-400 italic">
                            {obs.sciName}
                          </p>
                        </div>
                        <Bird className="w-10 h-10 text-blue-400 opacity-50" />
                      </div>
                      <div className="text-sm text-gray-400 space-y-2">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          {new Date(obs.obsDt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-blue-400" />
                          Count: {obs.howMany || "Not specified"}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          {obs.locName}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-navy-900 p-8 rounded-xl border border-navy-700 text-center">
                <p className="text-gray-400 text-lg">
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
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b pb-2 border-navy-700">
              <MapPin className="w-6 h-6 text-blue-400" />
              Birding Hotspots
            </h2>
            {hotspots.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {hotspots.map((hotspot, index) => (
                  <div
                    key={`${hotspot.locId}-${index}`}
                    className="bg-navy-900 rounded-xl border border-navy-700 overflow-hidden"
                  >
                    <div className="p-6 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-100">
                            {hotspot.locName}
                          </h3>
                        </div>
                        <MapPin className="w-10 h-10 text-blue-400 opacity-50" />
                      </div>
                      <div className="text-sm text-gray-400 space-y-2">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          {new Date(hotspot.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-blue-400" />
                          {hotspot.count} species observed
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          {hotspot.lat.toFixed(4)}, {hotspot.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-navy-900 p-8 rounded-xl border border-navy-700 text-center">
                <p className="text-gray-400 text-lg">
                  No birding hotspots found in this area. Try adjusting your
                  search radius or location.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
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