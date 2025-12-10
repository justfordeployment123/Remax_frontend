"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, Heart } from "lucide-react";

export default function PropertyDetails() {
  const params = useParams();
  const propertyId = params?.id ? decodeURIComponent(params.id) : "";
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

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
      <div className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <div className="relative rounded-xl overflow-hidden bg-gray-900 h-96 md:h-[500px] group cursor-pointer" onClick={() => setShowImageModal(true)}>
                <img
                  src={currentImage}
                  alt={property.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => (e.target.src = "/assets/placeholder.png")}
                />

                {property.listingFinished === "finished" && (
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                    Finished
                  </div>
                )}

                {property.photos && property.photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-800" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-800" />
                    </button>
                  </>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                  }}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-200 z-10 ${
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-white/90 text-gray-600 hover:bg-white"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
                </button>

                <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                  </svg>
                  {currentImageIndex + 1} / {property.photos?.length || 1}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              {property.photos && property.photos.length > 1 && (
                <div className="grid grid-cols-2 gap-3">
                  {property.photos.slice(0, 4).map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-32 rounded-lg overflow-hidden cursor-pointer border-2 transition-all hover:shadow-md ${
                        currentImageIndex === idx
                          ? "border-[#1A3668] shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => (e.target.src = "/assets/placeholder.png")}
                      />
                    </div>
                  ))}
                </div>
              )}

              {property.photos && property.photos.length > 4 && (
                <button
                  onClick={() => setShowImageModal(true)}
                  className="w-full mt-3 bg-[#1A3668] hover:bg-[#152d54] text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  View All {property.photos.length} Photos
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showImageModal && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="max-w-6xl mx-auto w-full px-4">
            <div className="relative rounded-lg overflow-hidden bg-black h-96 md:h-[600px]">
              <img
                src={currentImage}
                alt={property.title}
                className="w-full h-full object-contain"
                onError={(e) => (e.target.src = "/assets/placeholder.png")}
              />

              {property.photos && property.photos.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-3 rounded-full transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full">
                {currentImageIndex + 1} / {property.photos?.length || 1}
              </div>
            </div>

            {property.photos && property.photos.length > 1 && (
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2 justify-center flex-wrap">
                {property.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === idx
                        ? "border-white shadow-lg"
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={photo}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = "/assets/placeholder.png")}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {}
          <div className="lg:col-span-2 space-y-8">
            {}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-xl text-gray-700 font-semibold">{property.community}, {property.city}</p>
              
              <div className="text-4xl font-bold text-[#1A3668] py-2">
                ${property.price?.toLocaleString()}
              </div>
              
              <div className="text-gray-600 text-sm">
                Listed By {property.agent?.name || 'Jamie Realty Group'}, {property.agent?.phone || ''}
              </div>
              
              {}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  <span className="text-gray-700"><strong>{property.bedroom}</strong> Beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a1 1 0 001 1h12a1 1 0 001-1V6a2 2 0 00-2-2H4zm12 12H4a2 2 0 01-2-2v-4a1 1 0 00-1-1H.5a.5.5 0 00-.5.5v4a4 4 0 004 4h12a1 1 0 001-1v-1a1 1 0 10-2 0v1a1 1 0 001 1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><strong>{property.bathroom}</strong> Baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700"><strong>{property.size?.toLocaleString()}</strong> Sq Ft</span>
                </div>
              </div>
            </div>

            {}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-700 leading-relaxed text-justify text-base">
                {showFullDescription 
                  ? property.description 
                  : property.description ? property.description.substring(0, 400) + (property.description.length > 400 ? '...' : '') : 'No description available.'
                }
              </p>
              {property.description && property.description.length > 400 && (
                <button 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-[#1A3668] hover:text-[#152d54] font-semibold mt-3 flex items-center gap-1"
                >
                  {showFullDescription ? 'Show Less' : 'Read More'}
                  <svg className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            {}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {property.propertyType && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Type</p>
                    <p className="text-gray-900 font-semibold">{property.propertyType}</p>
                  </div>
                )}
                {property.propertyName && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Building Name</p>
                    <p className="text-gray-900 font-semibold">{property.propertyName}</p>
                  </div>
                )}
                {property.referenceNumber && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Reference</p>
                    <p className="text-gray-900 font-semibold">{property.referenceNumber}</p>
                  </div>
                )}
                {property.availabilityDate && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Available</p>
                    <p className="text-gray-900 font-semibold">{new Date(property.availabilityDate).toLocaleDateString()}</p>
                  </div>
                )}
                {property.parking > 0 && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Parking Spaces</p>
                    <p className="text-gray-900 font-semibold">{property.parking}</p>
                  </div>
                )}
                {property.cheques > 0 && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Payment Cheques</p>
                    <p className="text-gray-900 font-semibold">{property.cheques}</p>
                  </div>
                )}
                {property.amenities && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Amenities Code</p>
                    <p className="text-gray-900 font-semibold">{property.amenities}</p>
                  </div>
                )}
                {property.paymentMethod && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Payment Method</p>
                    <p className="text-gray-900 font-semibold capitalize">{property.paymentMethod}</p>
                  </div>
                )}
                {property.subCommunity && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Sub Community</p>
                    <p className="text-gray-900 font-semibold">{property.subCommunity}</p>
                  </div>
                )}
                {property.geopoints && (
                  <div>
                    <p className="text-gray-600 text-xs font-bold uppercase tracking-wide mb-2">Coordinates</p>
                    <p className="text-gray-900 font-semibold text-sm">{property.geopoints}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {}
          <div className="space-y-6 lg:sticky lg:top-24">
            {}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <div className="space-y-3">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all border-2 flex items-center justify-center gap-2 ${
                    isLiked
                      ? "bg-red-50 border-red-500 text-red-600"
                      : "bg-white border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600"
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
                  Favorite
                </button>
                <button 
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 hover:border-[#1A3668] hover:text-[#1A3668] py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path fillRule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-2A6 6 0 1 0 8 2a6 6 0 0 0 0 14zm3.5-9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {}
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tour with a RE/MAX Agent</h3>
              <div className="space-y-3">
                <button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
                >
                  Schedule a Tour
                </button>
                <div className="text-center text-gray-500 text-sm font-semibold">OR</div>
                <button 
                  onClick={() => {
                    if (property.agent.phone) {
                      window.location.href = `tel:${property.agent.phone}`;
                    } else if (property.agent.email) {
                      window.location.href = `mailto:${property.agent.email}`;
                    }
                  }}
                  className="w-full bg-white border-2 border-[#1A3668] text-[#1A3668] hover:bg-blue-50 font-bold py-3 px-4 rounded-lg transition-all"
                >
                  Contact an Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
