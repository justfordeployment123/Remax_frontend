"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ConsultationModal from '../../components/ConsultationModal';
import RequirementsModal from '../../components/RequirementsModal';
import BuyResidentialTestimonials from '../../components/BuyResidentialTestimonials';
import FAQAccordion from '../../components/FAQAccordion';
import { 
  Home, CheckCircle, FileText, Calendar, Users, 
  TrendingUp, MapPin, Bed, Bath, Maximize, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function RentDubai() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [rentals, setRentals] = useState([]);
  const [loadingRentals, setLoadingRentals] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      setLoadingRentals(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/listings`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Filter for rental properties (offeringType = RR) and limit to 6
          const rentalProperties = data.data
            .filter(prop => prop.offeringType === "RR")
            .slice(0, 6);
          setRentals(rentalProperties);
        }
      }
    } catch (error) {
      console.error('Error fetching rentals:', error);
    } finally {
      setLoadingRentals(false);
    }
  };

  const openShareRequirements = () => {
    setIsRequirementsModalOpen(true);
  };

  const openConsultation = (topic = 'Renting / Relocation') => {
    setIsConsultationModalOpen(true);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(2)}M`;
    }
    if (price >= 1000) {
      return `${(price / 1000).toFixed(0)}K`;
    }
    return price.toLocaleString();
  };

  const testimonials = [
    {
      name: "Sana & Farhan",
      profile: "New to Dubai from Pakistan",
      community: "Dubai Hills Estate",
      quote: "We landed in Dubai with two kids and a long list of worries. RE/MAX HUB helped us narrow down communities near the schools we liked, then lined up viewings in one afternoon. We found a place that felt right and had the contract and Ejari sorted quickly."
    },
    {
      name: "Michael R.",
      profile: "Tech professional, UK",
      community: "Jumeirah Lake Towers (JLT)",
      quote: "I didn't want to waste my weekends on apartments that looked nothing like the photos. The team gave me honest feedback on buildings and landlords, and we focused only on realistic options within my budget. The lease terms and cheques were explained clearly."
    },
    {
      name: "Hessa A.",
      profile: "Upgrading from a studio",
      community: "Business Bay",
      quote: "I was moving from a studio to a one-bedroom and had a very specific idea about layout and light. Instead of pushing anything, they told me when something wasn't worth it and when it was. We ended up with a better view than I expected, at a rent I was comfortable with."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-8 sm:py-12 lg:py-20 xl:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <span className="text-xs sm:text-xs lg:text-sm font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                Rent a Home in Dubai
              </span>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Find a Rental That Actually Fits Your Life
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                We help you narrow down areas, budget and requirements so you're not spending weeks on random viewings that never lead anywhere.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
                <button
                  onClick={openShareRequirements}
                  className="bg-[#00458b] text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-xs sm:text-base lg:text-lg font-semibold hover:bg-[#003366] transition-colors duration-200 w-full sm:w-auto text-center"
                >
                  Share Your Rental Requirements
                </button>
                
                <Link
                  href="/properties?type=rental"
                  className="border-2 border-[#00458b] text-[#00458b] px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-xs sm:text-base lg:text-lg font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200 text-center w-full sm:w-auto"
                >
                  Browse Our Rental Listings
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-gray-500">
                No fees for tenants on most leases. No spam. Just straight advice.
              </p>
            </div>

            <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] xl:h-[500px] rounded-lg sm:rounded-2xl overflow-hidden">
              <Image
                src="/rent-dubai/image-rent-hero-1.png"
                alt="Rent a Home in Dubai"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 text-center">
            Why Rent Through RE/MAX HUB Instead of Just Scrolling Portals
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-12 max-w-4xl mx-auto text-center leading-relaxed">
            Portals are useful for browsing, but they don't tell you what's actually realistic for your budget, visa situation and timeline. We help you cut through the noise and focus on homes that make sense for your life.
          </p>

          <div className="max-w-7xl mx-auto px-4 mb-12">
            <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg sm:rounded-2xl overflow-hidden">
              <Image
                src="/rent-dubai/IMAGE-RENT-WHY-1.png"
                alt="Why Rent Through RE/MAX HUB"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl border border-gray-200">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 sm:w-7 h-6 sm:h-7 text-[#00458b]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Curated Shortlists
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                We listen first, then send you a focused shortlist instead of 40 random links.
              </p>
            </div>

            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl border border-gray-200">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 sm:w-7 h-6 sm:h-7 text-[#00458b]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Area & Building Advice
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                Honest feedback on communities, buildings and landlords – not just glossy photos.
              </p>
            </div>

            <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl border border-gray-200">
              <div className="w-12 sm:w-14 h-12 sm:h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 sm:w-7 h-6 sm:h-7 text-[#00458b]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Support Through the Paperwork
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                From offer to contract, Ejari and move-in, we stay with you through the process.
              </p>
            </div>
          </div>

          {/* Optional Inline CTA */}
          <div className="text-center">
            <button
              onClick={openShareRequirements}
              className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group"
            >
              Share your rental requirements and we'll tell you what's realistic
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
            How the Rental Process Works in Dubai
          </h2>
          
          <p className="text-base sm:text-lg lg:text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">
            A quick overview so you know what to expect before you start viewing apartments.
          </p>

          <div className="max-w-7xl mx-auto px-4 mb-12">
            <div className="relative h-[200px] sm:h-[250px] lg:h-[300px] rounded-lg sm:rounded-2xl overflow-hidden">
              <Image
                src="/rent-dubai/IMAGE-RENT-PROCESS-1.png"
                alt="Rental Process in Dubai"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-8 mb-10">
            
            <div className="relative">
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold mb-4">
                  1
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  Brief & Shortlist
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We discuss your budget, areas, commute, family situation and move-in date. Then we build a shortlist of realistic options instead of dragging you to anything and everything.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold mb-4">
                  2
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  Viewings & Feedback
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We schedule viewings efficiently, group them when possible, and give you honest pros and cons of each unit, building and landlord.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold mb-4">
                  3
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  Offer, Terms & Cheques
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Once you choose a property, we structure your offer – rent, number of cheques, move-in date, any requests – and present it clearly to the landlord.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold mb-4">
                  4
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  Contract, Ejari & Move-in
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We help guide you through the tenancy contract, documentation and Ejari registration, and coordinate move-in dates with the landlord or building management.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => openConsultation('Renting / Relocation')}
              className="bg-[#00458b] text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-xs sm:text-base lg:text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Talk Through the Process
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
            
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                What You Should Prepare Before You Start
              </h2>
              
              <p className="text-base sm:text-lg lg:text-lg text-gray-600 mb-8 leading-relaxed">
                A bit of preparation makes everything smoother. Here's what most landlords and agents will expect from you.
              </p>

              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-4">Documents</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Passport & visa copy (or Emirates ID).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Proof of income – recent salary slips or employment letter; for self-employed, basic company documents.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Family details – who will live in the property (adults, children, domestic staff).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Previous landlord reference if available (optional but helpful).</span>
                  </li>
                </ul>
              </div>

              {/* Money & Deposits */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-4">Money & Deposits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Security deposit – typically 5% of annual rent (unfurnished) or 10% (furnished).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Agency fee – usually 5% of annual rent or a fixed amount agreed in advance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Cheques – understand how many cheques you can realistically offer and from which bank.</span>
                  </li>
                </ul>
              </div>

              {/* Timing */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-4">Timing</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Move-in date – know your earliest realistic date.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Notice period at your current place, if any.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Flexibility – the more flexible you are on move-in and cheques, the more options you'll have.</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={openShareRequirements}
                className="text-[#00458b] hover:text-[#003366] text-xs sm:text-sm lg:text-base font-medium inline-flex items-center gap-2 group"
              >
                Not sure what you can realistically afford? Share your requirements and we'll help you structure a budget
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="relative h-[350px] sm:h-[450px] lg:h-[600px] rounded-lg sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
              <Image
                src="/rent-dubai/Image-rent-checklist-1.png"
                alt="Rental Checklist"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
            Browse Our Current Rental Listings
          </h2>
          
          <p className="text-base sm:text-lg lg:text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">
            These are just some of our active rentals. Share your requirements if you don't see the right fit here – we can search beyond our in-house stock.
          </p>

          {loadingRentals ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#00458b] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading rental listings...</p>
            </div>
          ) : rentals.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8">
                {rentals.map((rental) => (
                  <Link
                    key={rental.id}
                    href={`/properties/${rental.city.toLowerCase().replace(/\s+/g, "-")}/${rental.id}`}
                    className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#00458b] hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative h-40 sm:h-44 lg:h-48 bg-gray-200">
                      {rental.photos && rental.photos.length > 0 ? (
                        <Image
                          src={rental.photos[0]}
                          alt={rental.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="text-lg sm:text-xl font-bold text-[#00458b] mb-2">
                        AED {formatPrice(rental.price)}/year
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3">{rental.community}, {rental.city}</p>
                      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Bed className="w-3 sm:w-4 h-3 sm:h-4" /> {rental.bedroom} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3 sm:w-4 h-3 sm:h-4" /> {rental.bathroom} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="w-3 sm:w-4 h-3 sm:h-4" /> {(rental.size / 1000).toFixed(1)}K sqft
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Listing by RE/MAX HUB</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/properties?type=rental"
                  className="inline-block bg-[#00458b] text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-xs sm:text-base lg:text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  View All Rentals
                </Link>
              </div>
            </>
          ) : (
            // Empty State
            <div className="text-center py-12 bg-white rounded-lg sm:rounded-xl border border-gray-200">
              <Home className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                We don't currently have rental listings published here, but we can still help. Share your rental requirements and we'll search across our network for you.
              </p>
              <button
                onClick={openShareRequirements}
                className="bg-[#00458b] text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-xs sm:text-base lg:text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Share My Rental Requirements
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            What Our Tenants Say
          </h2>

          <BuyResidentialTestimonials category="rent" />
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
            Tenant FAQs for Renting in Dubai
          </h2>

          <div className="mb-12">
            <FAQAccordion category="rent-dubai" />
          </div>

          <div className="text-center">
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              Still have questions about renting in Dubai?
            </p>
            <button
              onClick={() => openConsultation('Renting / Relocation')}
              className="bg-[#00458b] text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-xs sm:text-base lg:text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Ask a Rental Advisor
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-[#0B2340] to-[#00458b]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/rent-dubai/buy-residential-final-cta-background.png"
            alt=""
            fill
            loading="lazy"
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
            Ready to Start Your Dubai Rental Search?
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-10 leading-relaxed">
            Tell us what you're looking for and we'll respond with a clear, realistic plan – not a random dump of listing links.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={openShareRequirements}
              className="bg-white text-[#00458b] px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-xs sm:text-base lg:text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Share Your Rental Requirements
            </button>
            
            <Link
              href="/properties?type=rental"
              className="border-2 border-white text-white px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg text-xs sm:text-base lg:text-lg font-semibold hover:bg-white hover:text-[#00458b] transition-colors duration-200"
            >
              Browse Our Rental Listings
            </Link>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedTopic="Renting/Leasing"
      />

      <RequirementsModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        pageSource="rent_dubai"
      />

      <Footer />
    </main>
  );
}
