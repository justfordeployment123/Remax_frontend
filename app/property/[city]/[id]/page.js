"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PropertyDetails() {
  const params = useParams();
  const propertyId = params?.id ? decodeURIComponent(params.id) : "";
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/listings`);
        const data = await response.json();
        const found = data.data?.find((p) => p.id === propertyId);
        setProperty(found);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (propertyId) fetchProperty();
  }, [propertyId]);

  const nextImage = () => {
    if (!property?.photos?.length) return;
    setCurrentImageIndex((current) => (current + 1) % property.photos.length);
  };

  const prevImage = () => {
    if (!property?.photos?.length) return;
    setCurrentImageIndex((current) =>
      current === 0 ? property.photos.length - 1 : current - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1A3668] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading property...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/homes-for-sale" className="text-[#1A3668] hover:text-[#152d54] font-semibold flex items-center gap-2 mb-8">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Search
          </Link>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-red-600 text-lg font-semibold">Property not found</p>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = property.photos?.[currentImageIndex] || "/assets/placeholder.png";
  const pricePerSqft = property.price && property.size ? Math.round(property.price / property.size) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/homes-for-sale" className="text-[#1A3668] hover:text-[#152d54] font-semibold flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Search
          </Link>
        </div>
      </div>

      {}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {}
            <div className="lg:col-span-2 relative rounded-lg overflow-hidden bg-gray-800 h-96 md:h-[500px] group">
              <img
                src={currentImage}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/assets/placeholder.png")}
              />

              {}
              {property.listingFinished === "finished" && (
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded font-bold text-sm">
                  Finished
                </div>
              )}

              {}
              {property.photos && property.photos.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                    aria-label="Previous image"
                  >
                    <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10"
                    aria-label="Next image"
                  >
                    <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}

              {}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all duration-200 z-10 ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-white/90 text-gray-600 hover:bg-white"
                }`}
              >
                <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {}
              <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
                {property.photos?.length || 0}
              </div>
            </div>

            {}
            <div className="space-y-4">
              {}
              {property.photos && property.photos.length > 1 && (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {property.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        currentImageIndex === idx
                          ? "border-[#1A3668] shadow-md"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.src = "/assets/placeholder.png")}
                      />
                    </div>
                  ))}
                </div>
              )}

              {}
              {property.photos && property.photos.length > 0 && (
                <div className="bg-gray-100 rounded-lg p-3 text-center text-xs text-gray-600">
                  {property.photos.length} Photos Available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {}
          <div className="lg:col-span-2 space-y-6">
            {}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{property.title}</h1>
              
              <div className="space-y-2 text-gray-700">
                <div className="text-xl font-bold text-gray-800">{property.community}</div>
                {property.subCommunity && (
                  <div className="text-sm text-gray-600">{property.subCommunity}</div>
                )}
                <div className="flex items-center gap-2 text-gray-600 pt-2">
                  <svg className="w-4 h-4 text-[#1A3668]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{property.community}, {property.city}</span>
                </div>
              </div>
            </div>

            {}
            {property.description && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About This Property</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">
                  {property.description}
                </p>
              </div>
            )}

            {}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-[#1A3668]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 text-center">{property.bedroom}</p>
                  <p className="text-gray-600 text-sm text-center font-semibold">Bedrooms</p>
                </div>

                <div>
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-[#1A3668]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a1 1 0 001 1h12a1 1 0 001-1V6a2 2 0 00-2-2H4zm12 12H4a2 2 0 01-2-2v-4a1 1 0 00-1-1H.5a.5.5 0 00-.5.5v4a4 4 0 004 4h12a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 text-center">{property.bathroom}</p>
                  <p className="text-gray-600 text-sm text-center font-semibold">Bathrooms</p>
                </div>

                <div>
                  <div className="flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-[#1A3668]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 text-center">{property.size?.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm text-center font-semibold">Sq Ft</p>
                </div>
              </div>

              {}
              <div className="border-t border-gray-200 mt-6 pt-6 grid grid-cols-2 gap-4">
                {property.propertyName && (
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">Building Name</p>
                    <p className="text-gray-900 font-semibold">{property.propertyName}</p>
                  </div>
                )}
                {property.referenceNumber && (
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">Reference</p>
                    <p className="text-gray-900 font-semibold">{property.referenceNumber}</p>
                  </div>
                )}
                {property.propertyType && (
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">Type</p>
                    <p className="text-gray-900 font-semibold">{property.propertyType}</p>
                  </div>
                )}
                {property.availabilityDate && (
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">Available</p>
                    <p className="text-gray-900 font-semibold">{new Date(property.availabilityDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {}
          <div className="space-y-6">
            {}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <p className="text-gray-600 text-sm font-semibold mb-2">
                {property.offeringType === "RR" ? "ANNUAL RENT" : "PRICE"}
              </p>
              <div className="text-4xl font-bold text-[#1A3668] mb-4">
                AED {property.price?.toLocaleString()}
              </div>

              <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                {property.paymentMethod && (
                  <div>
                    <p className="text-gray-600 text-xs font-semibold">PAYMENT METHOD</p>
                    <p className="text-gray-900 capitalize font-semibold">{property.paymentMethod}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600 text-xs font-semibold">PRICE PER SQ FT</p>
                  <p className="text-gray-900 font-semibold">AED {Math.round(property.price / property.size)}</p>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (property.agent.phone) {
                    window.location.href = `tel:${property.agent.phone}`;
                  } else if (property.agent.email) {
                    window.location.href = `mailto:${property.agent.email}`;
                  }
                }}
                className="w-full bg-[#1A3668] hover:bg-[#152d54] text-white font-bold py-3 px-4 rounded-lg transition-all duration-200">
                Contact Agent
              </button>
            </div>

            {}
            {property.agent && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <p className="text-gray-600 text-xs font-semibold mb-4">LISTED BY</p>

                {}
                <div className="mb-6 flex justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 mb-2">RE/MAX</div>
                    <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-blue-700 mx-auto"></div>
                  </div>
                </div>

                {}
                {}

                <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{property.agent.name}</h3>
                <p className="text-gray-600 text-sm text-center mb-4 font-semibold">RE/MAX Agent</p>

                <div className="space-y-3">
                  {property.agent.phone && (
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center justify-center gap-2 text-[#1A3668] hover:text-[#152d54] font-semibold transition-colors py-2 border-b border-gray-100"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.93 1.007a11.042 11.042 0 005.516 5.516l1.007-1.93a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2.57a1 1 0 01-.998-.997A17.006 17.006 0 013.001 5.568a1 1 0 01-.997-.998V3z" />
                      </svg>
                      {property.agent.phone}
                    </a>
                  )}

                  {property.agent.email && (
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center justify-center gap-2 text-[#1A3668] hover:text-[#152d54] font-semibold transition-colors py-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Email Agent
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
