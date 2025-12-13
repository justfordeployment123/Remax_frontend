"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, Eye, EyeOff } from "lucide-react";

export default function TestimonialManagement() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    profile: "",
    category: "buy-residential",
    quote: "",
    location: "",
    rating: 5,
    image: "",
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "buy-residential", label: "Buy Residential" },
    { value: "sell", label: "Sell" },
    { value: "rent", label: "Rent" },
    { value: "commercial", label: "Commercial" },
    { value: "off-plan", label: "Off-Plan" },
    { value: "investors", label: "Investors" },
  ];

  // Fetch testimonials
  useEffect(() => {
    fetchTestimonials();
  }, [selectedCategory]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const url =
        selectedCategory === "all"
          ? `${apiUrl}/testimonials`
          : `${apiUrl}/testimonials?category=${selectedCategory}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setTestimonials(data.data);
        setError("");
      } else {
        setError("Failed to load testimonials");
      }
    } catch (err) {
      setError("Error loading testimonials");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");

      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${apiUrl}/testimonials/${editingId}`
        : `${apiUrl}/testimonials`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowModal(false);
        setEditingId(null);
        setFormData({
          name: "",
          profile: "",
          category: "buy-residential",
          quote: "",
          location: "",
          rating: 5,
          image: "",
        });
        fetchTestimonials();
      } else {
        setError(data.message || "Failed to save testimonial");
      }
    } catch (err) {
      setError("Error saving testimonial");
      console.error(err);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial._id);
    setFormData({
      name: testimonial.name,
      profile: testimonial.profile,
      category: testimonial.category,
      quote: testimonial.quote,
      location: testimonial.location || "",
      rating: testimonial.rating || 5,
      image: testimonial.image || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiUrl}/testimonials/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        fetchTestimonials();
      } else {
        setError("Failed to delete testimonial");
      }
    } catch (err) {
      setError("Error deleting testimonial");
      console.error(err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      name: "",
      profile: "",
      category: "buy-residential",
      quote: "",
      location: "",
      rating: 5,
      image: "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Testimonials</h1>
              <p className="text-gray-600">Manage client testimonials and reviews</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#1A3668] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#152d54] transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Testimonial
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat.value
                      ? "bg-[#1A3668] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3668]"></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600 text-lg">No testimonials found</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-[#1A3668] font-semibold mt-4 hover:underline"
              >
                Create the first one
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                        <span className="text-xs bg-[#1A3668]/10 text-[#1A3668] px-3 py-1 rounded-full font-semibold">
                          {categories.find((c) => c.value === testimonial.category)?.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{testimonial.profile}</p>
                      {testimonial.location && (
                        <p className="text-sm text-[#1A3668] font-medium">{testimonial.location}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="text-blue-600 hover:text-blue-700 p-2"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial._id)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({testimonial.rating}/5)</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Added {new Date(testimonial.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? "Edit Testimonial" : "Add New Testimonial"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Omar & Aisha"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Profile *
                    </label>
                    <span className={`text-xs font-medium ${
                      formData.profile.length > 150 ? 'text-red-500' : 
                      formData.profile.length > 120 ? 'text-amber-500' : 
                      'text-gray-500'
                    }`}>
                      {formData.profile.length}/150
                    </span>
                  </div>
                  <input
                    type="text"
                    name="profile"
                    value={formData.profile}
                    onChange={handleInputChange}
                    placeholder="Family from Canada"
                    required
                    maxLength="150"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none transition-colors ${
                      formData.profile.length > 150 
                        ? 'border-red-500 bg-red-50' 
                        : formData.profile.length > 120 
                        ? 'border-amber-300 bg-amber-50' 
                        : 'border-gray-300'
                    }`}
                  />
                  {formData.profile.length > 120 && (
                    <p className={`text-xs mt-1 ${formData.profile.length > 150 ? 'text-red-600' : 'text-amber-600'}`}>
                      {formData.profile.length > 150 
                        ? `Exceeds limit by ${formData.profile.length - 150} characters` 
                        : `${150 - formData.profile.length} characters remaining`}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none"
                  >
                    {categories.filter((c) => c.value !== "all").map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Dubai Hills Estate"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} Star{num !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Testimonial Quote *
                  </label>
                  <span className={`text-xs font-medium ${
                    formData.quote.length > 400 ? 'text-red-500' : 
                    formData.quote.length > 320 ? 'text-amber-500' : 
                    'text-gray-500'
                  }`}>
                    {formData.quote.length}/400
                  </span>
                </div>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  placeholder="Enter the client's testimonial quote..."
                  required
                  rows="5"
                  maxLength="400"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none resize-none transition-colors ${
                    formData.quote.length > 400 
                      ? 'border-red-500 bg-red-50' 
                      : formData.quote.length > 320 
                      ? 'border-amber-300 bg-amber-50' 
                      : 'border-gray-300'
                  }`}
                />
                {formData.quote.length > 320 && (
                  <p className={`text-xs mt-1 ${formData.quote.length > 400 ? 'text-red-600' : 'text-amber-600'}`}>
                    {formData.quote.length > 400 
                      ? `Exceeds limit by ${formData.quote.length - 400} characters` 
                      : `${400 - formData.quote.length} characters remaining`}
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formData.profile.length > 150 || formData.quote.length > 400 || !formData.name || !formData.profile || !formData.category || !formData.quote}
                  className={`px-6 py-2 text-white rounded-lg font-semibold transition-colors ${
                    formData.profile.length > 150 || formData.quote.length > 400 || !formData.name || !formData.profile || !formData.category || !formData.quote
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#1A3668] hover:bg-[#152d54]'
                  }`}
                  title={
                    formData.profile.length > 150 
                      ? 'Profile exceeds 150 characters' 
                      : formData.quote.length > 400 
                      ? 'Quote exceeds 400 characters'
                      : !formData.name || !formData.profile || !formData.category || !formData.quote
                      ? 'Fill in all required fields'
                      : 'Submit form'
                  }
                >
                  {editingId ? "Update" : "Create"} Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
