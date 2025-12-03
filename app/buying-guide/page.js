"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function BuyingGuide() {
  const [currentSlide, setCurrentSlide] = useState(0);
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

  const ChevronLeftIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const slides = [
    {
      number: 1,
      title: "Determine Your Budget",
      description:
        "Before you start looking at properties in Dubai or UAE, understand your budget and financing options. A RE/MAX agent can guide you through UAE mortgage requirements and help you understand your financial position.",
      image:
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&h=300&fit=crop",
    },
    {
      number: 2,
      title: "Pick a RE/MAX Agent",
      description:
        "Buying property in the UAE requires local expertise. Whether you're a first-time buyer, investor, or relocating to Dubai, a trusted RE/MAX agent can streamline the process, from property searches to RERA registration and handover.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
    },
    {
      number: 3,
      title: "Start Your Property Search",
      description:
        "Work with your agent to find properties that match your criteria across Dubai, Abu Dhabi, and other Emirates. Visit properties, explore communities, and discover the perfect location for your lifestyle.",
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "buying",
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
        setFormData({ firstName: "", lastName: "", email: "", phone: "", zipCode: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || "Failed to submit form");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {}
      <section className="relative py-16 bg-white">
        <div className="relative max-w-7xl mx-auto px-6">
          {}
          <div className="mb-12">
            <div className="relative  overflow-hidden">
              <img
                src="https://blog.remax.com/wp-content/uploads/sites/4/2025/04/REMAX-Home-Buyers-Guide.jpg?w=1500&format=auto"
                alt="REMAX Home Buying"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {}
          <div className=" max-w-6xl">
            <h1 className="text-4xl font-semibold text-[#1A3668] mb-6 leading-tight">
              Welcome to the REMAX Homebuyer's Guide!
            </h1>
            <p className="text-base text-gray-700 leading-relaxed">
              Buying a home can be one of the most exciting experiences of your life. The{" "}
              <span className="font-semibold italic">REMAX Homebuyer's Guide</span>{" "}
              breaks down the buying process step-by-step, so you can start your journey feeling confident and prepared. From creating a budget to signing your name on the dotted line, here's what you need to know about the homebuying process.
            </p>
          </div>
        </div>
      </section>

      {/* Buyer's Guide Form Section */}
      <section className="relative py-8" style={{ backgroundColor: '#f5f6f9' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8" style={{ backgroundColor: '#f5f6f9' }}>
            <h2 className="text-3xl font-bold text-[#1A3668] mb-3">
              Buyer's Guide
            </h2>
            <p className="text-gray-600 mb-4">
              Ready for your next move? Let's find your perfect neighborhood, home and price.
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
                and are agreeing to receive marketing email messages from RE/MAX, LLC and/or marketing emails, calls or texts placed by or on behalf of a local RE/MAX franchised office, to any phone number and/or email address that you provided, even if your number is on a federal, state, or our internal Do Not Call List. You further agree that consent may be sent with an automated system for selection or dialing of numbers and/or with an artificial or prerecorded voice. Please note: Consent is not a condition of purchase. Standard data and messaging rate may apply. You may unsubscribe at any time.
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1A3668] text-white px-6 py-3 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#15294d]"
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
          <div className="text-left mb-16">
            <h2 className="text-2xl font-semibold text-[#1A3668]">
              Buying Property in UAE, Step by Step
            </h2>
          </div>

          {}
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
                      className="w-full lg:w-80 h-56 lg:h-60 object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-10">
                <div className="flex gap-2 justify-center md:justify-start">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white" : "bg-white/40"
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

      <div className="flex flex-col text-center justify-center items-center sm:flex-row gap-4 py-8">
      </div>

      {}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-8">

            <h2 className="text-2xl font-semibold text-[#1A3668]">
              Top Tips for Working With Your Buying Agent
            </h2>
            <p className="text-xm text-gray-600 max-w-3xl mt-4">
              A home is likely the biggest investment you'll make in your
              lifetime, so it can feel overwhelming. Your REMAX agent is here to
              answer your questions and take the guesswork out of the
              transaction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tip 1 */}
            <div className="group bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop"
                  alt="Find the Right Agent"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A3668] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <h3 className="font-semibold text-[#1A3668]" style={{ fontSize: '20px' }}>
                    Find the Right Agent
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Research real estate agents online, read reviews and solicit
                  recommendations from friends and family to find someone who
                  understands your needs.
                </p>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="group bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop"
                  alt="Communicate"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-remax-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <h3 className="font-semibold text-[#1A3668]" style={{ fontSize: '20px' }}>
                    Communicate
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Choose an agent who you feel has your best interests in mind
                  and will help you navigate the process with clear, honest
                  communication.
                </p>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="group bg-white overflow-hidden">

              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop"
                  alt="Trust the Process"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-remax-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <h3 className="font-semibold text-[#1A3668]" style={{ fontSize: '20px' }}>
                    Trust the Process
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  This may be your first time buying a home, but your agent has
                  guided many through the journey and knows what to expect.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-4 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Heading */}
          <h2 className="text-2xl font-semibold text-[#1A3668] mb-6">
            Tools to Help You Find Your Home
          </h2>

          {/* Intro Paragraph */}
          <p className="text-gray-700 mb-8 leading-relaxed">
            Once you've defined your home search goals, discussed them with your REMAX agent, and have spoken with a mortgage professional to see what your buying power is, you're ready to find your dream home! In addition to local knowledge on the current market, REMAX offers online tools that can help make your initial search as easy as possible.
          </p>

          {/* Tool Items */}
          <div className="space-y-6 mb-12">
            {/* Interactive Map Search */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Find a Home Using Our Interactive Map Search
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We know that location plays an important role in the home buying process. Use the map search available on our website to view homes located in or near the area you love.
              </p>
            </div>

            {/* Know the Neighborhood */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Get to Know the Neighborhood
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Feel confident and informed about your neighborhood choice! On any listing page, you can learn more about the communities you are interested in, including a breakdown of the local population, school ratings and more.
              </p>
            </div>

            {/* Create Account */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Create an Account on Our Website
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Sign up for an account on our website to save searches, favorite homes you love, receive real time property alerts, and more!
              </p>
            </div>
          </div>

          {/* We're Here For You Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-[#1A3668] mb-6">
              We're Here For You.
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Buying a home can seem like a lot – because it is. But you're not alone. With the right experience and tools, a{" "}
              <a href="#" className="text-[#1A3668] font-semibold hover:underline">
                REMAX agent
              </a>{" "}
              can help you find the home of your dreams.
            </p>

            {}
            <div className="flex justify-center">
              <Link href="/property">
                <button className="bg-[#1A3668] text-white px-8 py-3 rounded font-semibold hover:bg-[#003a75] transition-all duration-300 uppercase text-sm">
                  Browse Listings
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {}
      {}
      <Footer />
    </main>
  );
}
