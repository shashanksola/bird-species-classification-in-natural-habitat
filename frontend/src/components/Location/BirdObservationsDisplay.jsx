/* eslint-disable react/prop-types */
import  { useState } from "react";
import { MapPin, Bird, Calendar, Eye, Info, ChevronLeft, ChevronRight } from "lucide-react";
import PropTypes from "prop-types";

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
    // eslint-disable-next-line react/prop-types
    totalPages, 
    onPageChange 
  }) => (
    <div className="flex justify-center items-center space-x-4 mt-6">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full bg-slate-100 hover:bg-blue-50 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-blue-600" />
      </button>
      <span className="text-sm text-slate-800">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full bg-slate-100 hover:bg-blue-50 transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-blue-600" />
      </button>
    </div>
  );

  return (
    <>
      <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden mb-8 bg-white shadow-md border border-slate-200">
        {/* Tab Navigation */}
        <div className="flex bg-white shadow-sm border-b border-slate-200">
          <button
            onClick={() => {
              setSelectedTab("observations");
              setObservationsPage(1);
            }}
            className={`px-6 py-3 font-medium flex items-center gap-2 transition-all duration-300 ${
              selectedTab === "observations"
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-slate-600 hover:bg-blue-50/50 hover:text-blue-600"
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
                ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                : "text-slate-600 hover:bg-blue-50/50 hover:text-blue-600"
            }`}
          >
            <MapPin className="w-5 h-5" />
            Birding Hotspots
          </button>
        </div>

        {/* Content Container */}
        <div className="p-6 text-slate-800 relative z-10">
          {selectedTab === "observations" && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b pb-2 border-slate-200 text-blue-700">
                <Bird className="w-6 h-6 text-blue-600" />
                Recent Bird Sightings
              </h2>
              {observations.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {paginatedObservations.map((obs) => (
                      <div
                        key={createUniqueKey(obs)}
                        className="bg-white shadow-md rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
                      >
                        <div className="p-6 space-y-3 group-hover:bg-white/60 backdrop-blur-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold text-blue-700">
                                {obs.comName}
                              </h3>
                              <p className="text-sm text-slate-600 italic">
                                {obs.sciName}
                              </p>
                            </div>
                            <Bird className="w-10 h-10 text-blue-600 opacity-70" />
                          </div>
                          <div className="text-sm text-slate-800 space-y-2">
                            <p className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-600" />
                              {new Date(obs.obsDt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <p className="flex items-center gap-2">
                              <Eye className="w-4 h-4 text-slate-600" />
                              Count: {obs.howMany || "Not specified"}
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-600" />
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
                <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 text-center">
                  <p className="text-slate-800 text-lg">
                    No bird sightings found. Adjust search parameters.
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Hotspots Section with Pagination */}
          {selectedTab === "hotspots" && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b pb-2 border-slate-200 text-blue-700">
                <MapPin className="w-6 h-6 text-blue-600" />
                Birding Hotspots
              </h2>
              {hotspots.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {paginatedHotspots.map((hotspot, index) => (
                      <div
                        key={`${hotspot.locId}-${index}`}
                        className="bg-white shadow-md rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group"
                      >
                        <div className="p-6 space-y-3 group-hover:bg-white/60 backdrop-blur-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold text-blue-700">
                                {hotspot.locName}
                              </h3>
                            </div>
                            <MapPin className="w-10 h-10 text-blue-600 opacity-70" />
                          </div>
                          <div className="text-sm text-slate-800 space-y-2">
                            <p className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-600" />
                              {new Date(hotspot.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                            <p className="flex items-center gap-2">
                              <Info className="w-4 h-4 text-slate-600" />
                              {hotspot.count} species observed
                            </p>
                            <p className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-600" />
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
                <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 text-center">
                  <p className="text-slate-800 text-lg">
                    No birding hotspots found. Adjust search parameters.
                  </p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
      <div className="text-center w-full">
        &copy; Data accessed through the eBird API 2.0 (Cornell Lab of
        Ornithology)
      </div>
    </>
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