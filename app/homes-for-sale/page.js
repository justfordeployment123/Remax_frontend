"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaMapMarkerAlt, FaSearch, FaFilter } from "react-icons/fa";

export default function HomesForSale() {
  const router = useRouter();
  const [searchFilters, setSearchFilters] = useState({
    address: "",
    minPrice: "",
    maxPrice: "",
    minBeds: "NO MIN",
    maxBeds: "NO MAX",
    baths: "ANY",
  });

  const handleFilterChange = (filter, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      address: "",
      minPrice: "",
      maxPrice: "",
      minBeds: "NO MIN",
      maxBeds: "NO MAX",
      baths: "ANY",
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append("type", "sale");
    if (searchFilters.address) params.append("address", searchFilters.address);
    if (searchFilters.minPrice) params.append("minPrice", searchFilters.minPrice);
    if (searchFilters.maxPrice) params.append("maxPrice", searchFilters.maxPrice);
    if (searchFilters.minBeds !== "NO MIN") params.append("minBeds", searchFilters.minBeds);
    if (searchFilters.maxBeds !== "NO MAX") params.append("maxBeds", searchFilters.maxBeds);
    if (searchFilters.baths !== "ANY") params.append("baths", searchFilters.baths);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="relative py-8 sm:py-12 lg:py-16">
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg p-4 sm:p-8 border border-gray-200">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                Homes for Sale
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                Discover your ideal property with our comprehensive search tools
              </p>
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Dubai Marina, Downtown, Motor City..."
                  value={searchFilters.address}
                  onChange={(e) => handleFilterChange("address", e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent transition-all duration-200"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaMapMarkerAlt className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                PRICE
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    placeholder="No Min"
                    value={searchFilters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent transition-all duration-200"
                  />
                </div>
                <span className="text-gray-400 text-xs sm:text-base">to</span>
                <div className="flex-1 w-full">
                  <input
                    type="text"
                    placeholder="No Max"
                    value={searchFilters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-base text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                Beds
              </label>

              <div className="mb-3 sm:mb-4">
                <label className="block text-xs text-gray-500 mb-1 sm:mb-2">Minimum</label>
                <div className="grid grid-cols-5 gap-1 sm:gap-2">
                  {["NO MIN", "1", "2", "3", "4"].map((option) => (
                    <button
                      key={`min-${option}`}
                      onClick={() => handleFilterChange("minBeds", option)}
                      className={`py-2 sm:py-3 border text-xs sm:text-sm font-medium transition-all duration-200 rounded-md ${
                        searchFilters.minBeds === option
                          ? "border-[#1A3668] bg-blue-50 text-[#1A3668]"
                          : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1 sm:mb-2">Maximum</label>
                <div className="grid grid-cols-5 gap-1 sm:gap-2">
                  {["NO MAX", "1", "2", "3", "4"].map((option) => (
                    <button
                      key={`max-${option}`}
                      onClick={() => handleFilterChange("maxBeds", option)}
                      className={`py-2 sm:py-3 border text-xs sm:text-sm font-medium transition-all duration-200 rounded-md ${
                        searchFilters.maxBeds === option
                          ? "border-[#1A3668] bg-blue-50 text-[#1A3668]"
                          : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3">
                Baths
              </label>
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                {["ANY", "1+", "2+", "3+", "4+"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange("baths", option)}
                    className={`py-2 sm:py-3 border text-xs sm:text-sm font-medium transition-all duration-200 rounded-md ${
                      searchFilters.baths === option
                        ? "border-[#1A3668] bg-blue-50 text-[#1A3668]"
                        : "border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-base text-gray-600 font-medium hover:text-gray-800 transition-colors duration-200 hover:bg-gray-100 rounded-md"
              >
                <FaFilter className="w-3 sm:w-4 h-3 sm:h-4" />
                Clear All Filters
              </button>
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 px-4 sm:px-8 py-2.5 sm:py-3 bg-[#1A3668] text-white text-xs sm:text-base font-medium rounded-md hover:bg-[#0f2447] focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:ring-offset-2 transition-all duration-200"
              >
                <FaSearch className="w-4 h-4" />
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
