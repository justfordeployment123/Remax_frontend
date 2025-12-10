"use client";

import { useState, useEffect } from "react";
import { Trash2, Edit2, Plus, X, Upload, Download, ChevronDown } from "lucide-react";

const categoryOptions = [
  { value: "contact-us", label: "Contact Us" },
  { value: "sell", label: "Sell" },
  { value: "rent-dubai", label: "Rent Dubai" },
  { value: "landlords", label: "Landlords" },
  { value: "commercial-real-estate-dubai", label: "Commercial Real Estate" },
  { value: "off-plan", label: "Off-Plan" },
  { value: "buy-residential-dubai", label: "Buy Residential" },
  { value: "playbook-2026-2035", label: "Playbook 2026-2035" },
  { value: "investors", label: "Investors" },
  { value: "general", label: "General" }
];

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bulkImporting, setBulkImporting] = useState(false);
  const [bulkImportResult, setBulkImportResult] = useState(null);
  const [bulkImportError, setBulkImportError] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "contact-us",
    order: 0,
    isPublished: true
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredFaqs(faqs);
    } else {
      setFilteredFaqs(faqs.filter((faq) => faq.category === selectedCategory));
    }
  }, [faqs, selectedCategory]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/faqs`);
      const data = await response.json();

      if (data.success) {
        setFaqs(data.data);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      alert("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (faq = null) => {
    if (faq) {
      setEditingId(faq._id);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: faq.order,
        isPublished: faq.isPublished
      });
    } else {
      setEditingId(null);
      setFormData({
        question: "",
        answer: "",
        category: "contact-us",
        order: 0,
        isPublished: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      question: "",
      answer: "",
      category: "contact-us",
      order: 0,
      isPublished: true
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.question || !formData.answer || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.question.length > 500) {
      alert("Question cannot exceed 500 characters");
      return;
    }

    if (formData.answer.length > 2000) {
      alert("Answer cannot exceed 2000 characters");
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const url = editingId
        ? `${apiUrl}/faqs/${editingId}`
        : `${apiUrl}/faqs`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert(editingId ? "FAQ updated successfully" : "FAQ created successfully");
        handleCloseModal();
        fetchFAQs();
      } else {
        alert(data.message || "Error saving FAQ");
      }
    } catch (error) {
      console.error("Error saving FAQ:", error);
      alert("Error saving FAQ");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/faqs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await response.json();

      if (data.success) {
        alert("FAQ deleted successfully");
        fetchFAQs();
      } else {
        alert(data.message || "Error deleting FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Error deleting FAQ");
    }
  };

  const handleBulkImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setBulkImporting(true);
      setBulkImportError(null);
      setBulkImportResult(null);

      const fileContent = await file.text();
      const jsonData = JSON.parse(fileContent);

      if (!jsonData.faqs || !Array.isArray(jsonData.faqs)) {
        setBulkImportError("Invalid JSON format. File must contain a 'faqs' array.");
        setBulkImporting(false);
        return;
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/faqs/bulk/import`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(jsonData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBulkImportResult({
          success: true,
          count: data.count,
          message: `Successfully imported ${data.count} FAQ(s)`
        });
        fetchFAQs();
        setTimeout(() => {
          setShowBulkImport(false);
          setBulkImportResult(null);
        }, 2000);
      } else {
        setBulkImportError(data.message || "Import failed");
        if (data.errors && Array.isArray(data.errors)) {
          const errorDetails = data.errors
            .map((err) => `FAQ ${err.index}: ${err.error}`)
            .join("\n");
          setBulkImportError(`${data.message}\n\n${errorDetails}`);
        }
      }
    } catch (error) {
      console.error("Error importing FAQs:", error);
      setBulkImportError(error.message || "Error importing FAQs. Please check the file format.");
    } finally {
      setBulkImporting(false);
      e.target.value = "";
    }
  };

  const downloadTemplate = () => {
    const template = {
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of purchase.",
          category: "contact-us",
          order: 1,
          isPublished: true
        },
        {
          question: "How do I schedule a property viewing?",
          answer: "You can schedule a viewing through our website or by calling us. We typically arrange viewings within 24 hours.",
          category: "buy-residential-dubai",
          order: 2,
          isPublished: true
        }
      ]
    };

    const dataStr = JSON.stringify(template, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "faq_template.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">FAQ Management</h1>
            <p className="text-gray-600">Manage frequently asked questions across all categories</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBulkImport(!showBulkImport)}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Upload className="w-5 h-5" />
              Bulk Import
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-6 py-3 bg-[#1A3668] text-white rounded-lg font-semibold hover:bg-[#152d54] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add FAQ
            </button>
          </div>
        </div>

        {/* Bulk Import Section */}
        {showBulkImport && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Bulk Import FAQs</h2>
              <button
                onClick={() => {
                  setShowBulkImport(false);
                  setBulkImportError(null);
                  setBulkImportResult(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Import Instructions */}
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">How to use Bulk Import</h3>
              <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                <li>Download the template JSON file to see the required format</li>
                <li>Create or prepare your FAQs in the JSON format</li>
                <li>Upload the JSON file using the file input below</li>
                <li>The system will validate and import all FAQs automatically</li>
              </ol>
            </div>

            {/* Format Specification */}
            <details className="mb-8 bg-gray-50 border border-gray-300 rounded-lg p-4">
              <summary className="cursor-pointer font-semibold text-gray-900 flex items-center gap-2">
                <ChevronDown className="w-5 h-5" />
                View Format Specification
              </summary>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <p className="font-semibold text-gray-900">Required fields:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>question</strong> (string, max 500 chars)</li>
                  <li><strong>answer</strong> (string, max 2000 chars)</li>
                  <li><strong>category</strong> (string, must be valid)</li>
                </ul>
                <p className="font-semibold text-gray-900 mt-3">Optional fields:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>order</strong> (number, default: 0)</li>
                  <li><strong>isPublished</strong> (boolean, default: true)</li>
                </ul>
                <p className="font-semibold text-gray-900 mt-3">Valid categories:</p>
                <div className="grid grid-cols-2 gap-2 ml-2">
                  {categoryOptions.map((cat) => (
                    <span key={cat.value} className="text-xs bg-white px-2 py-1 rounded border border-gray-300">
                      {cat.value}
                    </span>
                  ))}
                </div>
              </div>
            </details>

            {/* Success Message */}
            {bulkImportResult && bulkImportResult.success && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  ✓ {bulkImportResult.message}
                </p>
              </div>
            )}

            {/* Error Message */}
            {bulkImportError && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-semibold mb-2">Import Error:</p>
                <p className="text-red-700 text-sm whitespace-pre-wrap break-words">{bulkImportError}</p>
              </div>
            )}

            {/* File Upload */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select JSON File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleBulkImportFile}
                    disabled={bulkImporting}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-green-600 file:text-white
                      hover:file:bg-green-700
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Supported format: JSON (.json)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Download Template
                </label>
                <button
                  onClick={downloadTemplate}
                  disabled={bulkImporting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  Download Template JSON
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> If any FAQ in the file has validation errors, the entire import will fail. 
                Please fix all errors before trying again.
              </p>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none"
          >
            <option value="all">All Categories</option>
            {categoryOptions.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* FAQs List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A3668]"></div>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No FAQs found in this category</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div
                key={faq._id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {categoryOptions.find((c) => c.value === faq.category)?.label}
                      </span>
                      {!faq.isPublished && (
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          Unpublished
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{faq.answer}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenModal(faq)}
                      className="p-2 text-gray-600 hover:text-[#1A3668] hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq._id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingId ? "Edit FAQ" : "Add New FAQ"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body - Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Question Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Question *
                    </label>
                    <span className={`text-xs font-medium ${
                      formData.question.length > 500 ? 'text-red-500' : 
                      formData.question.length > 400 ? 'text-amber-500' : 
                      'text-gray-500'
                    }`}>
                      {formData.question.length}/500
                    </span>
                  </div>
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder="Enter the FAQ question..."
                    required
                    maxLength="500"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none transition-colors ${
                      formData.question.length > 500 
                        ? 'border-red-500 bg-red-50' 
                        : formData.question.length > 400 
                        ? 'border-amber-300 bg-amber-50' 
                        : 'border-gray-300'
                    }`}
                  />
                  {formData.question.length > 400 && (
                    <p className={`text-xs mt-1 ${formData.question.length > 500 ? 'text-red-600' : 'text-amber-600'}`}>
                      {formData.question.length > 500 
                        ? `Exceeds limit by ${formData.question.length - 500} characters` 
                        : `${500 - formData.question.length} characters remaining`}
                    </p>
                  )}
                </div>

                {/* Answer Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Answer *
                    </label>
                    <span className={`text-xs font-medium ${
                      formData.answer.length > 2000 ? 'text-red-500' : 
                      formData.answer.length > 1600 ? 'text-amber-500' : 
                      'text-gray-500'
                    }`}>
                      {formData.answer.length}/2000
                    </span>
                  </div>
                  <textarea
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    placeholder="Enter the FAQ answer..."
                    required
                    rows="8"
                    maxLength="2000"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none resize-none transition-colors ${
                      formData.answer.length > 2000 
                        ? 'border-red-500 bg-red-50' 
                        : formData.answer.length > 1600 
                        ? 'border-amber-300 bg-amber-50' 
                        : 'border-gray-300'
                    }`}
                  />
                  {formData.answer.length > 1600 && (
                    <p className={`text-xs mt-1 ${formData.answer.length > 2000 ? 'text-red-600' : 'text-amber-600'}`}>
                      {formData.answer.length > 2000 
                        ? `Exceeds limit by ${formData.answer.length - 2000} characters` 
                        : `${2000 - formData.answer.length} characters remaining`}
                    </p>
                  )}
                </div>

                {/* Category & Order in Grid */}
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
                      {categoryOptions.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A3668] outline-none"
                    />
                  </div>
                </div>

                {/* Publish Status */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded border-gray-300 text-[#1A3668] focus:ring-[#1A3668]"
                  />
                  <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
                    Publish this FAQ (make it visible to users)
                  </label>
                </div>

                {/* Form Actions */}
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
                    disabled={formData.question.length > 500 || formData.answer.length > 2000 || !formData.question || !formData.answer || !formData.category}
                    className={`px-6 py-2 text-white rounded-lg font-semibold transition-colors ${
                      formData.question.length > 500 || formData.answer.length > 2000 || !formData.question || !formData.answer || !formData.category
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#1A3668] hover:bg-[#152d54]'
                    }`}
                    title={
                      formData.question.length > 500 
                        ? 'Question exceeds 500 characters' 
                        : formData.answer.length > 2000 
                        ? 'Answer exceeds 2000 characters'
                        : !formData.question || !formData.answer || !formData.category
                        ? 'Fill in all required fields'
                        : 'Submit form'
                    }
                  >
                    {editingId ? "Update" : "Create"} FAQ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
