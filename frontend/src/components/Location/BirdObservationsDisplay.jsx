/* eslint-disable react/prop-types */
import { useState } from "react";
import { MapPin, Bird, Calendar, Eye, Info, ChevronLeft, ChevronRight } from "lucide-react";


const BirdObservationsDisplay = ({ hotspots, observations }) => {
  const [selectedTab, setSelectedTab] = useState("observations");
  const [observationsPage, setObservationsPage] = useState(1);
  const [hotspotPage, setHotspotPage] = useState(1);
  
  const itemsPerPage = 6; // Number of items to display per page

  // Pagination helper functions
  const paginateArray = (array, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return array.slice(startIndex, endIndex);
  };

  const getTotalPages = (array, itemsPerPage) => {
    return Math.ceil(array.length / itemsPerPage);
  };

  // Create a unique key for each observation
  const createUniqueKey = (obs) => {
    return `${obs.subId}-${obs.obsDt}-${obs.comName}`.replace(/\s+/g, "-");
  };

  // Paginated data
  const paginatedObservations = paginateArray(observations, observationsPage, itemsPerPage);
  const paginatedHotspots = paginateArray(hotspots, hotspotPage, itemsPerPage);

  // Pagination controls component
  const PaginationControls = ({ 
    currentPage, 
    totalPages, 
    onPageChange 
  }) => (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden mb-8 bg-gradient-to-b from-gray-200 to-gray-300 relative">
      {/* Mountain-like layer effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute inset-0 bg-[length:100%_50px] bg-mountain-pattern opacity-20"></div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-gray-800/70 backdrop-blur-sm border-b border-gray-700">
        <button
          onClick={() => {
            setSelectedTab("observations");
            setObservationsPage(1);
          }}
          className={`px-6 py-3 font-medium flex items-center gap-2 transition-all duration-300 ${
            selectedTab === "observations"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:bg-gray-700/50"
          }`}
        >
          <Bird className="w-5 h-5" />
          Recent Sightings
        </button>
        <button
          onClick={() => {
            setSelectedTab("hotspots");
            setHotspotPage(1);
          }}
          className={`px-6 py-3 font-medium flex items-center gap-2 transition-all duration-300 ${
            selectedTab === "hotspots"
              ? "bg-gray-700 text-white"
              : "text-gray-400 hover:bg-gray-700/50"
          }`}
        >
          <MapPin className="w-5 h-5" />
          Birding Hotspots
        </button>
      </div>

      {/* Content Container */}
      <div className="p-6 text-gray-900 relative z-10">
        {selectedTab === "observations" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b pb-2 border-gray-600">
              <Bird className="w-6 h-6 text-gray-700" />
              Recent Bird Sightings
            </h2>
            {observations.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {paginatedObservations.map((obs) => (
                    <div
                      key={createUniqueKey(obs)}
                      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-300 overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {obs.comName}
                            </h3>
                            <p className="text-sm text-gray-600 italic">
                              {obs.sciName}
                            </p>
                          </div>
                          <Bird className="w-10 h-10 text-gray-700 opacity-50" />
                        </div>
                        <div className="text-sm text-gray-800 space-y-2">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-600" />
                            {new Date(obs.obsDt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-gray-600" />
                            Count: {obs.howMany || "Not specified"}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            {obs.locName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <PaginationControls 
                  currentPage={observationsPage} 
                  totalPages={getTotalPages(observations, itemsPerPage)}
                  onPageChange={setObservationsPage}
                />
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border border-gray-300 text-center">
                <p className="text-gray-700 text-lg">
                  No bird sightings found. Adjust search parameters.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Hotspots Section with Pagination */}
        {selectedTab === "hotspots" && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b pb-2 border-gray-600">
              <MapPin className="w-6 h-6 text-gray-700" />
              Birding Hotspots
            </h2>
            {hotspots.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  {paginatedHotspots.map((hotspot, index) => (
                    <div
                      key={`${hotspot.locId}-${index}`}
                      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-300 overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {hotspot.locName}
                            </h3>
                          </div>
                          <MapPin className="w-10 h-10 text-gray-700 opacity-50" />
                        </div>
                        <div className="text-sm text-gray-800 space-y-2">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-600" />
                            {new Date(hotspot.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="flex items-center gap-2">
                            <Info className="w-4 h-4 text-gray-600" />
                            {hotspot.count} species observed
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-600" />
                            {hotspot.lat.toFixed(4)}, {hotspot.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <PaginationControls 
                  currentPage={hotspotPage} 
                  totalPages={getTotalPages(hotspots, itemsPerPage)}
                  onPageChange={setHotspotPage}
                />
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-md border border-gray-300 text-center">
                <p className="text-gray-700 text-lg">
                  No birding hotspots found. Adjust search parameters.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};



export default BirdObservationsDisplay;