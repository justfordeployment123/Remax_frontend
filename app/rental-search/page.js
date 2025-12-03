"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaSearch, FaFilter } from "react-icons/fa";

export default function RentalSearch() {
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
    console.log("Search filters:", searchFilters);
    alert("Searching with filters: " + JSON.stringify(searchFilters, null, 2));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="relative py-16">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Homes for Rent
              </h1>
              <p className="text-gray-600 text-sm">
                Discover your ideal rental property with our comprehensive search tools
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Address, City, ZIP, and More"
                  value={searchFilters.address}
                  onChange={(e) => handleFilterChange("address", e.target.value)}
                  className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent transition-all duration-200"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                MONTHLY RENT
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="No Min"
                    value={searchFilters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent transition-all duration-200"
                  />
                </div>
                <span className="text-gray-400">to</span>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="No Max"
                    value={searchFilters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Beds
              </label>
              
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-2">Minimum</label>
                <div className="flex gap-2">
                  {["NO MIN", "1", "2", "3", "4"].map((option) => (
                    <button
                      key={`min-${option}`}
                      onClick={() => handleFilterChange("minBeds", option)}
                      className={`flex-1 py-2 border text-sm font-medium transition-all duration-200 rounded-md ${
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
                <label className="block text-xs text-gray-500 mb-2">Maximum</label>
                <div className="flex gap-2">
                  {["NO MAX", "1", "2", "3", "4"].map((option) => (
                    <button
                      key={`max-${option}`}
                      onClick={() => handleFilterChange("maxBeds", option)}
                      className={`flex-1 py-2 border text-sm font-medium transition-all duration-200 rounded-md ${
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

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Baths
              </label>
              <div className="flex gap-2">
                {["ANY", "1+", "2+", "3+", "4+"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange("baths", option)}
                    className={`flex-1 py-2 border text-sm font-medium transition-all duration-200 rounded-md ${
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

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 font-medium hover:text-gray-800 transition-colors duration-200 hover:bg-gray-100 rounded-md"
              >
                <FaFilter className="w-4 h-4" />
                Clear All Filters
              </button>
              <button
                onClick={handleSearch}
                className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
              >
                <FaSearch className="w-4 h-4" />
                Search Rentals
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Properties for Rent
              </h2>
              <p className="text-gray-600">Discover amazing rental homes in your area</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
              <select className="w-full sm:w-auto px-4 py-3 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent bg-white">
                <option>Sort by: Price (Low to High)</option>
                <option>Price (High to Low)</option>
                <option>Newest First</option>
                <option>Size (Largest First)</option>
              </select>
              <div className="inline-flex border border-gray-300 rounded-md overflow-hidden w-full sm:w-auto">
                <button className="px-4 py-3 text-sm font-medium bg-[#1A3668] text-white hover:bg-[#15294d] transition-colors">
                  List
                </button>
                <button className="px-4 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  Map
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((property) => (
              <div key={property} className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer border border-gray-100">
                <div className="relative">
                  <div
                    className="h-56 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80")',
                    }}
                  ></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                    {property % 2 === 0 ? "Luxury" : "Available"}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-[#1A3668] text-white rounded-sm px-3 py-1 text-sm font-semibold">
                    For Rent
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      AED {8500 + property * 1000}/mo
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {property} days ago
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Luxury Family Residence
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm flex items-center">
                    <FaMapMarkerAlt className="w-3 h-3 mr-2 text-gray-400" />
                    Premium Location, Dubai
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-md p-3">
                    <span className="flex items-center gap-1">
                      <FaBed className="w-4 h-4 text-gray-400" />
                      {2 + property % 3} beds
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath className="w-4 h-4 text-gray-400" />
                      {1 + property % 3} baths
                    </span>
                    <span className="flex items-center gap-1">
                      <FaRulerCombined className="w-4 h-4 text-gray-400" />
                      1,200 sqft
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="bg-[#1A3668] text-white px-8 py-3 font-medium rounded-md hover:bg-[#15294d] focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:ring-offset-2 transition-all duration-200">
              Load More Rentals
            </button>
            <p className="text-gray-600 mt-4 text-sm">Showing 6 of 892 rental properties</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}