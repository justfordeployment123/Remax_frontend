"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SellingGuide() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.nameF]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Request submitted successfully!");
  };

  const handleDownloadGuide = async () => {
    try {
      // Create a link to download the PDF file
      const link = document.createElement('a');
      link.href = '/assets/REMAX_Property_Selling_Guide.pdf';
      link.download = 'REMAX Property Selling Guide.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading guide:', error);
      alert('Error downloading the guide. Please try again.');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const slides = [
    {
      number: 1,
      title: "Choose a Real Estate Agent ",
      description:
        "REMAX agents use cutting-edge tech, extensive marketing strategies, and expert advice to understand market nuances and establish a competitive price for your home.",
      image:
        "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=300&fit=crop",
    },
    {
      number: 2,
      title: "Prepare Your Home for Sale",
      description:
        "Before listing your home, add to its value by fixing issues like water damage or foundation problems. Small cosmetic updates like new light fixtures or fresh paint help significantly.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop"
    },
    {
      number: 3,
      title: "Determine Your Home's Value",
      description:
        "Setting the right price for your home is crucial. Online estimates may help, but working with an agent offers a more accurate evaluation based on local trends and your home's condition.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
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

      {/* Hero Section */}
      <section className="relative py-16 bg-white">
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Image on Top */}
          <div className="mb-12">
            <div className="relative overflow-hidden">
              <img
                src="https://blog.remax.com/wp-content/uploads/sites/4/2025/04/REMAX-Home-Sellers-Guide.jpg?w=1500&format=auto"
                alt="REMAX Home Selling"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text Content Below */}
          <div className="max-w-6xl">
            <h1 className="text-4xl font-semibold text-[#00458b] mb-6 leading-tight">
              Welcome to the REMAX Home Seller's Guide!
            </h1>
            <p className="text-base text-gray-700 leading-relaxed">
              Selling your home is a big decision, and REMAX® is here for you. Whether this is your first time on the selling side of your real estate journey or you've done it several times before, downloading the REMAX Home Seller's Guide is a great first step to selling your home with confidence and achieving your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Seller's Guide Form Section */}
      <section className="relative py-8" style={{ backgroundColor: "#f5f6f9" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-8" style={{ backgroundColor: "#f5f6f9" }}>
            {/* Heading */}
            <h2 className="text-3xl font-bold text-remax-blue mb-3">Seller's Guide</h2>
            <p className="text-gray-600 mb-4">
              Is it time to sell? Get the best value for your home with our comprehensive guide and expert assistance.
            </p>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b] focus:border-transparent"
                  />
                </div>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone and Zip Code Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b] focus:border-transparent"
                  />
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Terms and Privacy Policy */}
              <div className="text-xs text-gray-600 leading-relaxed">
                By clicking "Submit Request" below, you are agreeing to the{" "}
                <a href="#" className="text-[#1A3668] hover:underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#1A3668] hover:underline">
                  Privacy Policy
                </a>{" "}
                and are agreeing to receive marketing email messages from REMAX, LLC and/or marketing emails, calls or texts placed by or on behalf of a local REMAX franchised office, to any phone number and/or email address that you provided, even if your number is on a federal, state, or our internal Do Not Call List. You further agree that consent may be sent with an automated system for selection or dialing of numbers and/or with an artificial or prerecorded voice. Please note: Consent is not a condition of purchase. Standard data and messaging rate may apply. You may unsubscribe at any time.
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00458b] text-white px-6 py-3 font-semibold transition-all duration-300"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Selling Step by Step Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-12">
            <h2 className="text-2xl font-semibold text-remax-blue">
              Selling Your Home, Step by Step
            </h2>
          </div>

          {/* Slider */}
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

              {/* Navigation */}
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
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-transform duration-300"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col text-center justify-center items-center sm:flex-row gap-4">
        <button
          onClick={handleDownloadGuide}
          className="bg-[#1A3668] text-white px-6 py-4 rounded-md text-md font-semibold flex items-center gap-3"
        >
          <Download className="w-5 h-5" />
          Download the Complete Guide
        </button>
      </div>

      {/* Top Tips Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-8">
            <h2 className="text-2xl font-semibold text-remax-blue">
              Top Tips for Working With Your Selling Agent
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mt-4">
              The process of selling your home can feel overwhelming, but with the right resources, it doesn't have to be. Your REMAX agent is here to make your journey from "For Sale" to "Sold" as smooth and successful as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tip 1 */}
            <div className="group bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=250&fit=crop"
                  alt="Be Patient"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-remax-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <h3 className="font-semibold text-remax-blue" style={{ fontSize: "20px" }}>
                    Be Patient
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  The time it takes to sell a home can vary based on market conditions, but no matter how fast or slow the sale moves, avoid entering into negotiations with buyers who aren't pre-approved for a mortgage.
                </p>
              </div>
            </div>

            {/* Tip 2 */}
            <div className="group bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop"
                  alt="Do Your Part"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-remax-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <h3 className="font-semibold text-remax-blue" style={{ fontSize: "20px" }}>
                    Do Your Part
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Why try to do it all yourself, when you can hire a professional agent with the experience and expertise to do it for you? However, when you hire a real estate agent, don't leave it all up to them.
                </p>
              </div>
            </div>

            {/* Tip 3 */}
            <div className="group bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=250&fit=crop"
                  alt="Be Ready"
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-remax-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <div className="flex gap-3 mb-4">
                  <h3 className="font-semibold text-remax-blue" style={{ fontSize: "20px" }}>
                    Be Ready
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Your property should be ready when buyers are. It's best not to request a 24-hour notice or let your phone go unanswered. It's recommended that the seller leave the home during showings.
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
          <h2 className="text-2xl font-semibold text-[#00458b] mb-6">
            Tools to Help You Sell Your Home
          </h2>

          {/* Intro Paragraph */}
          <p className="text-gray-700 mb-8 leading-relaxed">
            REMAX agents have access to advanced technology and marketing strategies, and have the knowledge and expertise to help sell your home quickly and confidently.
          </p>

          {/* Tool Items */}
          <div className="space-y-6 mb-12">
            {/* Online Listing */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Online Listing for Your Home
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Showcase your property with an online listing that highlights key details and includes high-quality images. These listings instantly grab potential buyers' attention and make your property stand out.
              </p>
            </div>

            {/* Marketing Strategies */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Advanced Marketing Strategies
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Reach more buyers with REMAX's cutting-edge digital marketing tools. With targeted ads and online strategies, your property will get maximum visibility to drive traffic and generate interest.
              </p>
            </div>

            {/* REMAX Network */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Leverage the REMAX Network
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You're not alone, and neither are we. Tap into the power of the REMAX network. With one of the largest networks of agents in the country, word of mouth, online marketing, and advertising opportunities will help get your property the attention it deserves.
              </p>
            </div>
          </div>

          {/* We're Here For You Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-[#00458b] mb-6">
              We're Here For You.
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              A <span className="font-semibold">REMAX agent</span> can help eliminate the guesswork of your real estate transaction. With this experienced professional on one hand, and our comprehensive Home Seller's Guide on the other, you'll be well prepared to navigate the market and sell your home quickly and confidently.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button
                onClick={handleDownloadGuide}
                className="bg-[#1A3668] text-white px-8 py-3 rounded font-semibold hover:bg-[#003a75] transition-all duration-300 uppercase text-sm"
              >
                Download the Selling Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
