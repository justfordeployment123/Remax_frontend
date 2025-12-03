"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";


export default function HomesForSale() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchFilters, setSearchFilters] = useState({
    address: searchParams.get("address") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minBeds: searchParams.get("minBeds") || "NO MIN",
    maxBeds: searchParams.get("maxBeds") || "NO MAX",
    baths: searchParams.get("baths") || "ANY",
  });

  
  useEffect(() => {
    fetchProperties();
  }, []);

  
  useEffect(() => {
    if (!searchParams.toString()) {
      setSearchFilters({
        address: "",
        minPrice: "",
        maxPrice: "",
        minBeds: "NO MIN",
        maxBeds: "NO MAX",
        baths: "ANY",
      });
    }
  }, []);

  
  useEffect(() => {
    if (properties.length > 0) {
      applyFilters(properties);
    }
  }, [searchParams, properties]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/listings`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        setProperties(data.data);
        setError("");
      } else {
        throw new Error("Invalid API response");
      }
    } catch (err) {
      setError("Failed to load properties. Please try again later.");
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (propertiesToFilter) => {
    const filtered = propertiesToFilter.filter((prop) => {
      const addressMatch =
        !searchFilters.address ||
        prop.community.toLowerCase().includes(searchFilters.address.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchFilters.address.toLowerCase());

      const minPriceMatch =
        !searchFilters.minPrice ||
        prop.price >= parseInt(searchFilters.minPrice);

      const maxPriceMatch =
        !searchFilters.maxPrice ||
        prop.price <= parseInt(searchFilters.maxPrice);

      const minBedsMatch =
        searchFilters.minBeds === "NO MIN" ||
        prop.bedroom >= parseInt(searchFilters.minBeds);

      const maxBedsMatch =
        searchFilters.maxBeds === "NO MAX" ||
        prop.bedroom <= parseInt(searchFilters.maxBeds);

      const bathsMatch =
        searchFilters.baths === "ANY" ||
        prop.bathroom >= parseInt(searchFilters.baths);

      return (
        addressMatch &&
        minPriceMatch &&
        maxPriceMatch &&
        minBedsMatch &&
        maxBedsMatch &&
        bathsMatch
      );
    });

    setFilteredProperties(filtered);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading && (
                <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1A3668] mb-4"></div>
                <p className="text-gray-600 text-lg">Loading properties...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
                <p className="text-red-700 font-semibold">{error}</p>
                </div>
            )}

            {!loading && filteredProperties.length === 0 && (
                <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                    {searchParams.toString() ? "No properties found matching your criteria." : "Enter search criteria to find properties"}
                </p>
                </div>
            )}

            {!loading && !error && filteredProperties.length > 0 && (
                <>
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-gray-600 text-lg font-semibold">
                    Found <span className="text-[#1A3668] font-bold">{filteredProperties.length}</span> properties
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProperties.map((property) => (
                    <Link
                        key={property.id}
                        href={`/property/${property.city.toLowerCase().replace(/\s+/g, "-")}/${property.id}`}
                    >
                        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 cursor-pointer">
                        {}
                        <div className="relative h-56 bg-gray-200 overflow-hidden">
                            <img
                            src={property.photos && property.photos.length > 0 ? property.photos[0] : "/assets/placeholder.png"}
                            alt={property.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                                e.target.src = "/assets/placeholder.png";
                            }}
                            />
                            {property.listingFinished === "Yes" && (
                            <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                                Coming Soon
                            </div>
                            )}
                        </div>

                        {}
                        <div className="p-4">
                            {}
                            <h3 className="text-xl font-bold text-[#1A3668] mb-2">
                            ${property.price.toLocaleString()}
                            </h3>

                            <p className="text-sm text-gray-700 font-semibold mb-4">
                            {property.community}, {property.city}
                            </p>

                            <div className="flex gap-4 text-gray-600 text-xs font-semibold border-t border-b border-gray-200 py-3 mb-4">
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3 text-[#1A3668]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.5 1.5H9.5V0h1v1.5zM14 4l-.7-.7.7-.7.7.7-.7.7zM6 4l.7-.7-.7-.7-.7.7.7.7zM16.5 9.5H18v1h-1.5v-1zM2.5 9.5H1v1h1.5v-1zM14.5 14l.7.7-.7.7-.7-.7.7-.7zM5.5 14l-.7.7.7.7.7-.7-.7-.7z"/>
                                </svg>
                                <span>{property.bedroom} Beds</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3 text-[#1A3668]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a1 1 0 001 1h12a1 1 0 001-1V6a2 2 0 00-2-2H4zm12 12H4a2 2 0 01-2-2v-4a1 1 0 00-1-1H.5a.5.5 0 00-.5.5v4a4 4 0 004 4h12a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" clipRule="evenodd" />
                                </svg>
                                <span>{property.bathroom} Baths</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3 text-[#1A3668]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>{property.size.toLocaleString()} sqft</span>
                            </div>
                            </div>

                            {}
                            {property.agent && (
                            <p className="text-xs text-gray-600">
                                Listing by <span className="font-bold text-gray-800">{property.agent.name}</span>
                            </p>
                            )}
                        </div>
                        </div>
                    </Link>
                    ))}
                </div>
                </>
                )}
            </div>
        </section>

      <Footer />
    </main>
  );
}
