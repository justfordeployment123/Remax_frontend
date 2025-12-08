"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ConsultationModal from "../../components/ConsultationModal";
import RequirementsModal from "../../components/RequirementsModal";

const ChevronLeftIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function RentalGuide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.zipCode) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guides/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "rental",
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          zipCode: formData.zipCode,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          zipCode: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || "Failed to submit form");
      }
    } catch (err) {
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const slides = [
    {
      number: 1,
      title: "Why Lease Through RE/MAX Hub",
      description:
        "As part of the world's most recognized real estate brand, RE/MAX Hub offers landlords a professional, transparent, and data-driven leasing experience with access to qualified, pre-screened tenants and professional marketing across Dubai's leading portals.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    },
    {
      number: 2,
      title: "Understanding Dubai's Rental Market",
      description:
        "Dubai's rental market is dynamic and competitive. Our experts provide real-time rental comparisons, insights on tenant demand trends, and guidance on annual rent cap laws to help you set the optimal rent value.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
    },
    {
      number: 3,
      title: "Preparing Your Property for Rent",
      description:
        "First impressions attract better tenants. Our agents help you inspect the property, arrange professional cleaning and photography, and ensure utilities are active to present your property at its best.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {}
      <section className="relative py-16 bg-white">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1500&h=400&fit=crop"
                alt="Dubai Rental Guide"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="max-w-6xl">
            <h1 className="text-4xl font-semibold text-[#1A3668] mb-4 leading-tight">
              Dubai Landlord & Leasing Guide
            </h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Maximize Your Rental Returns with RE/MAX Hub Dubai
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              Renting out your property in Dubai should be simple, secure, and profitable. At RE/MAX Hub Dubai, we help landlords find qualified tenants, achieve competitive rental income, and maintain their properties with peace of mind.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Whether you own one apartment or an entire portfolio, our team provides end-to-end leasing and management services to protect your investment and optimize returns.
            </p>
          </div>
        </div>
      </section>

      {}
      {/* Rental Guide Form Section */}
      <section className="relative py-8" style={{ backgroundColor: '#f5f6f9' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8" style={{ backgroundColor: '#f5f6f9' }}>
            <h2 className="text-3xl font-bold text-[#1A3668] mb-3">
              Rental Guide
            </h2>
            <p className="text-gray-600 mb-4">
              Ready to maximize your rental returns? Get our comprehensive landlord and leasing guide.
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">✓ Thank you for your submission! We will contact you shortly.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Zip Code <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                />
              </div>

              <div className="text-xs text-gray-600 leading-relaxed">
                By clicking "Submit Request" below, you are agreeing to the{" "}
                <a href="#" className="text-[#1A3668] hover:underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#1A3668] hover:underline">
                  Privacy Policy
                </a>{" "}
                and are agreeing to receive marketing email messages from RE/MAX Hub Dubai and/or marketing emails, calls or texts placed by or on behalf of your local RE/MAX franchised office, to any phone number and/or email address that you provided, even if your number is on a federal, state, or our internal Do Not Call List. You further agree that call/texts may be sent with an automated system for selection or dialing of numbers and/or for artificial or prerecorded voice. Please note: Consent is not a condition of purchase. Standard data and messaging rate may apply. You may unsubscribe at any time.
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1A3668] text-white px-8 py-3 font-semibold rounded-lg hover:bg-[#003a75] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-12">
            <h2 className="text-2xl font-semibold text-remax-blue">
              Rental Guide, Step by Step
            </h2>
          </div>

          <div className="bg-[#1a3668] p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 text-white">
                <div className="flex-1 lg:pr-12">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-xl lg:text-2xl font-bold">
                      {slides[currentSlide].number}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold">
                      {slides[currentSlide].title}
                    </h3>
                  </div>
                  <p className="text-base lg:text-xl leading-relaxed text-white/90">
                    {slides[currentSlide].description}
                  </p>
                </div>

                <div className="flex-shrink-0 w-full lg:w-auto">
                  <div className="relative">
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      className="w-full lg:w-80 h-56 lg:h-60 object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-10">
                <div className="flex gap-2 justify-center md:justify-start">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-3 justify-center md:justify-end">
                  <button
                    onClick={prevSlide}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-transform duration-300"
                  >
                    <ChevronLeftIcon />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-transform duration-300"
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-8">
            <h2 className="text-2xl font-semibold text-[#1A3668]">
              Essentials for a Successful Lease
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mt-4">
              Our comprehensive rental process ensures your property is marketed effectively, tenants are thoroughly screened, and every legal requirement is handled with care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=250&fit=crop"
                  alt="Marketing"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-remax-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <h3 className="font-semibold text-[#1A3668]" style={{ fontSize: "20px" }}>
                    Marketing Your Property
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Promote your property across Dubai's top portals, social channels, and the RE/MAX network to reach qualified tenants locally and internationally.
                </p>
              </div>
            </div>

            <div className="group bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop"
                  alt="Tenant Screening"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-remax-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <h3 className="font-semibold text-[#1A3668]" style={{ fontSize: "20px" }}>
                    Tenant Screening
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Every tenant is vetted with ID and visa checks, proof of income, and references so you can lease confidently to reliable residents.
                </p>
              </div>
            </div>

            <div className="group bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop"
                  alt="Management"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-remax-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <h3 className="font-semibold text-[#1A3668]" style={{ fontSize: "20px" }}>
                    Property Management
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Opt for full management with rent collection, maintenance coordination, inspections, and renewals handled by the RE/MAX Hub team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-4 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-[#1A3668] mb-6">
            Tools to Support Your Rental Strategy
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            From pricing guidance to legal compliance, our team provides the resources you need for a smooth leasing experience.
          </p>

          <div className="space-y-6 mb-12">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Access to Qualified Tenants
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Tap into our database of pre-screened tenants. We handle verification, income checks, and references so you can focus on the results.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Market-Driven Pricing
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Receive data-backed rental valuations and pricing strategies tailored to Dubai’s fast-moving market, including advice on annual rent caps.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                RERA-Compliant Documentation
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ensure every agreement is Ejari-compliant with clear terms around rent, deposits, and maintenance, prepared by experienced leasing professionals.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-[#1A3668] mb-6">
              List Your Property with RE/MAX Hub
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Our experts evaluate your property, recommend ideal rental pricing, and connect you with quality tenants quickly and efficiently.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedTopic="Renting/Leasing"
      />
      
      <RequirementsModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        pageSource="rental_guide"
      />
    </main>
  );
}
