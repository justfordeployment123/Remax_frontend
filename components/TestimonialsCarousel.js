"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsCarousel({ category, showRatings = true }) {
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
      const url = category
        ? `${apiUrl}/testimonials?category=${category}`
        : `${apiUrl}/testimonials`;

      const response = await fetch(url);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00458b]"></div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-lg">No testimonials available</p>
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleTestimonials.map((testimonial) => (
          <div
            key={testimonial._id}
            className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
          >
            {showRatings && (
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            )}

            <p className="text-gray-700 leading-relaxed mb-6 italic">
              "{testimonial.quote}"
            </p>

            <div>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-600 mb-1">{testimonial.profile}</p>
              {testimonial.location && (
                <p className="text-xs text-[#00458b] font-medium">{testimonial.location}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {testimonials.length > itemsPerView && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-[#00458b]" />
          </button>

          <div className="flex items-center gap-2">
            {[...Array(Math.ceil(testimonials.length / itemsPerView))].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === Math.floor(currentIndex / itemsPerView) || 
                  (currentIndex === Math.ceil(testimonials.length / itemsPerView) - 1 && i === Math.floor(currentIndex / itemsPerView))
                    ? "bg-[#00458b] w-8"
                    : "bg-gray-300 w-2"
                }`}
                aria-label={`Go to testimonial group ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-[#00458b]" />
          </button>
        </div>
      )}
    </div>
  );
}
