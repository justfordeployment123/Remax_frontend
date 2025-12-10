"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { FaBed, FaBath, FaRuler, FaParking, FaFileContract } from "react-icons/fa";


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
    type: searchParams.get("type") || "",
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
        type: "",
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
        if (data.data.length > 0) {
          console.log("First property:", {
            id: data.data[0].id,
            title: data.data[0].title,
            photosCount: data.data[0].photos?.length || 0,
            firstPhoto: data.data[0].photos?.[0] || "NO PHOTOS"
          });
        }
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

      const typeMatch =
        !searchFilters.type ||
        (searchFilters.type === "rental" && prop.offeringType === "RR") ||
        (searchFilters.type === "sale" && prop.offeringType === "RS");

      return (
        addressMatch &&
        minPriceMatch &&
        maxPriceMatch &&
        minBedsMatch &&
        maxBedsMatch &&
        bathsMatch &&
        typeMatch
      );
    });

    setFilteredProperties(filtered);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Header />

      <section className="bg-gradient-to-r from-[#1A3668] to-[#2d5a8c] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {searchFilters.type === "rental" ? "Rental Properties" : searchFilters.type === "sale" ? "Properties for Sale" : "Find Your Perfect Property"}
              </h1>
              <p className="text-lg text-blue-100">Discover exceptional properties across Dubai</p>
            </div>
            <Link
              href="/homes-for-sale"
              className="hidden md:block bg-white text-[#1A3668] hover:bg-blue-50 px-6 py-3 rounded-sm font-bold transition-colors"
            >
              ← Modify Search
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6 md:hidden">
            <Link
              href="/homes-for-sale"
              className="inline-flex items-center gap-2 bg-[#1A3668] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#152d54] transition-colors"
            >
              ← Modify Search
            </Link>
          </div>

          <div>
            {!loading && filteredProperties.length > 0 && (
              <div className="mb-8">
                <p className="text-gray-600">
                  Showing <span className="text-[#1A3668] font-bold text-xl">{filteredProperties.length}</span> 
                  <span className="text-gray-600"> properties</span>
                </p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#1A3668] mb-4"></div>
                <p className="text-gray-600 text-lg font-semibold">Loading properties...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8 rounded-lg">
                <h3 className="text-red-800 font-bold mb-1">Error Loading Properties</h3>
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {!loading && filteredProperties.length === 0 && !error && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-12 text-center border border-blue-200">
                <svg className="w-16 h-16 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Properties Found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria
                </p>
                <Link
                  href="/homes-for-sale"
                  className="inline-block bg-[#1A3668] hover:bg-[#152d54] text-white font-bold px-6 py-3 rounded-lg transition-colors"
                >
                  Modify Search
                </Link>
              </div>
            )}

            {!loading && filteredProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/properties/${property.city.toLowerCase().replace(/\s+/g, "-")}/${property.id}`}
                  >
                    <div className="group bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer">
                      
                      <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                        {property.photos && property.photos.length > 0 ? (
                          <Image
                            src={property.photos[0]}
                            alt={property.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={() => {
                              console.error("Image failed to load:", property.photos[0]);
                            }}
                            onLoad={() => {
                              console.log("Image loaded successfully:", property.photos[0]);
                            }}
                          />
                        ) : (
                          <img
                            src="/assets/placeholder.png"
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        
                        {/* Badge Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Status Badge */}
                        {property.listingFinished === "finished" && (
                          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-sm text-xs font-bold shadow-lg flex items-center gap-1">
                            <span>✓</span>
                            <span>Finished</span>
                          </div>
                        )}
                        {property.listingFinished === "Yes" && (
                          <div className="absolute top-3 left-3 bg-amber-400 text-white px-3 py-1 rounded-sm text-xs font-bold shadow-lg flex items-center gap-1">
                            <span>⏱</span>
                            <span>Coming Soon</span>
                          </div>
                        )}

                        {/* Photo Counter */}
                        {property.photos && property.photos.length > 1 && (
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                            <span>📸</span>
                            <span>{property.photos.length}</span>
                          </div>
                        )}

                        {/* Type Badge */}
                        <div className="absolute top-3 right-3">
                          {property.offeringType === "RR" && (
                            <span className="inline-block bg-purple-400 text-white px-3 py-1 rounded-sm text-xs font-bold shadow-lg">
                              Rental
                            </span>
                          )}
                          {property.offeringType === "RS" && (
                            <span className="inline-block bg-orange-400 text-white px-3 py-1 rounded-sm text-xs font-bold shadow-lg">
                              For Sale
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Container */}
                      <div className="p-5">
                        {/* Price */}
                        <div className="mb-3">
                          <h3 className="text-2xl font-bold text-[#1A3668] group-hover:text-[#152d54] transition-colors">
                            AED {property.price.toLocaleString()}
                          </h3>
                        </div>

                        {/* Location */}
                        <p className="text-sm text-gray-700 font-semibold mb-1">
                          {property.community}, {property.city}
                        </p>
                        {property.subCommunity && (
                          <p className="text-xs text-gray-500 mb-3 italic">
                            {property.subCommunity}
                            {property.propertyName && ` • ${property.propertyName}`}
                          </p>
                        )}

                        {/* Property Features */}
                        <div className="flex gap-3 text-xs font-semibold text-gray-700 border-t border-b border-gray-200 py-3 mb-4">
                          <div className="flex items-center gap-1 flex-1">
                            <FaBed className="text-[#1A3668]" />
                            <span>{property.bedroom}</span>
                          </div>
                          <div className="flex items-center gap-1 flex-1">
                            <FaBath className="text-[#1A3668]" />
                            <span>{property.bathroom}</span>
                          </div>
                          <div className="flex items-center gap-1 flex-1">
                            <FaRuler className="text-[#1A3668]" />
                            <span>{(property.size / 1000).toFixed(1)}K sqft</span>
                          </div>
                        </div>

                        {/* Agent Info */}
                        {property.agent && (
                          <div className="mb-3 pb-3 border-b border-gray-200">
                            <p className="text-xs text-gray-600">
                              Listed by <span className="font-bold text-gray-800">{property.agent.name}</span>
                            </p>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {property.parking > 0 && (
                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                              <FaParking className="w-3 h-3" />
                              <span>{property.parking}</span>
                            </span>
                          )}
                          {property.cheques > 0 && (
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                              <FaFileContract className="w-3 h-3" />
                              <span>{property.cheques}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
