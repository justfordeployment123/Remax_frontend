"use client";

import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export default function BuyResidentialTestimonials({ category = "buy-residential" }) {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    // Adjust items per view based on screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [category]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/testimonials?category=${category}`);
      const data = await response.json();

      if (data.success && data.data) {
        setTestimonials(data.data);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, testimonials.length - itemsPerView);
      return prev + 1 > maxIndex ? 0 : prev + 1;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, testimonials.length - itemsPerView);
      return prev - 1 < 0 ? maxIndex : prev - 1;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3668]"></div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <p className="text-gray-600 text-lg">No testimonials available yet</p>
      </div>
    );
  }

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerView
  );
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  return (
    <div className="relative">
      {/* Testimonial Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleTestimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Accent bar on top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1A3668] to-[#2d5a8c]"></div>

            {/* Quotation mark background */}
            <div className="absolute top-4 right-4 text-gray-200 opacity-40">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.716-5-7-5m16 0c-3.284 0-7 3.75-7 5v8c0 7 4 8 7 8s4.228-2.567 6-6-1.5-9-3-9z" />
              </svg>
            </div>

            {/* Quote */}
            <p className="text-gray-700 leading-relaxed italic mb-6 text-base relative z-10 line-clamp-5">
              "{testimonial.quote}"
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[#1A3668]/20 to-transparent mb-6"></div>

            {/* Client Info */}
            <div className="space-y-3">
              {/* Name */}
              <div>
                <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
              </div>

              {/* Profile/Description */}
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {testimonial.profile}
              </p>

              {/* Location - if available */}
              {testimonial.location && (
                <div className="flex items-center gap-2 pt-2">
                  <MapPin className="w-4 h-4 text-[#1A3668] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#1A3668]">
                    {testimonial.location}
                  </span>
                </div>
              )}

              {/* Rating - if available */}
              {testimonial.rating && (
                <div className="flex items-center gap-1 pt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {testimonials.length > itemsPerView && (
        <div className="flex justify-center items-center gap-6 mt-12">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white border-2 border-[#1A3668] text-[#1A3668] hover:bg-[#1A3668] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {[...Array(Math.ceil(testimonials.length / itemsPerView))].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * itemsPerView)}
                className={`transition-all duration-300 rounded-full ${
                  i === Math.floor(currentIndex / itemsPerView)
                    ? "bg-[#1A3668] w-8 h-2.5"
                    : "bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial group ${i + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white border-2 border-[#1A3668] text-[#1A3668] hover:bg-[#1A3668] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
