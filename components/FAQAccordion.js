"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function FAQAccordion({ category }) {
  const [faqs, setFaqs] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFAQs();
  }, [category]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/faqs?category=${category}`);
      const data = await response.json();

      if (data.success && data.data) {
        setFaqs(data.data);
        setExpandedId(null);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3668]"></div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <p className="text-gray-600 text-lg">No FAQs available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq._id}
          className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#1A3668] transition-colors"
        >
          <button
            onClick={() => toggleExpanded(faq._id)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-colors"
          >
            <h3 className="text-left font-semibold text-gray-900 text-base">
              {faq.question}
            </h3>
            <ChevronDown
              className={`w-5 h-5 text-[#1A3668] flex-shrink-0 ml-4 transition-transform duration-300 ${
                expandedId === faq._id ? "transform rotate-180" : ""
              }`}
            />
          </button>

          {expandedId === faq._id && (
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <p className="text-gray-700 leading-relaxed text-sm">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
