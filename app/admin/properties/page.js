"use client";
import { useState, useEffect } from "react";

export default function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/listings`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }

      const data = await response.json();
      if (data.success && data.data) {
        setProperties(data.data);
        setError("");
      }
    } catch (err) {
      setError("Failed to load properties. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.community?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === "rental") {
      return matchesSearch && property.offeringType === "RR";
    } else if (filterType === "sale") {
      return matchesSearch && property.offeringType !== "RR";
    }
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties Management</h1>
          <p className="text-gray-600 mt-2">View all property listings from the XML feed (Read-Only)</p>
        </div>

        {}
        {error && (
          <div className="mt-6 mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}

        {}
        <div className="mt-8 bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by title, community, city, or reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>

            {}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
              >
                <option value="all">All Properties</option>
                <option value="rental">Rentals</option>
                <option value="sale">For Sale</option>
              </select>
            </div>

            {}
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                Found <span className="font-bold text-blue-600">{filteredProperties.length}</span> properties
              </div>
            </div>
          </div>
        </div>

        {}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        )}

        {}
        {!loading && filteredProperties.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No properties found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}

        {}
        {!loading && filteredProperties.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Reference</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Beds</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Baths</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Sqft</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {property.referenceNumber || property.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold max-w-xs truncate">
                        {property.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>{property.community}</div>
                        <div className="text-xs text-gray-500">{property.city}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-blue-600">
                        AED {property.price?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          property.offeringType === "RR" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {property.offeringType === "RR" ? "Rental" : "Sale"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {property.bedroom}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {property.bathroom}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {property.size?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {property.agent?.name || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}