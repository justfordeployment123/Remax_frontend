"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  Home, CheckCircle, FileText, Calendar, Users, 
  TrendingUp, MapPin, Bed, Bath, Maximize, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function RentDubai() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [rentals, setRentals] = useState([]);
  const [loadingRentals, setLoadingRentals] = useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      setLoadingRentals(true);
      // TODO: Replace with actual API call when rental listings endpoint is ready
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties?segment=rent&limit=6`);
      // const data = await response.json();
      // if (data.success) {
      //   setRentals(data.data);
      // }
      setRentals([]); // Empty for now
    } catch (error) {
      console.error('Error fetching rentals:', error);
    } finally {
      setLoadingRentals(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openShareRequirements = () => {
    setShowRequirementsModal(true);
    window.location.href = '/contact-us?topic=Rent&prefill=true';
  };

  const openConsultation = (topic = 'Renting / Relocation') => {
    window.location.href = `/contact-us?topic=${encodeURIComponent(topic)}`;
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

  const faqs = [
    {
      question: "Do I have to pay any fees to RE/MAX HUB as a tenant?",
      answer: "In most cases, yes – tenants pay an agency fee, usually a percentage of the annual rent or a fixed amount agreed upfront. We'll always confirm the fee clearly before you proceed with any lease."
    },
    {
      question: "How many cheques do landlords usually accept?",
      answer: "It depends on the landlord, property and market conditions. Some still prefer 1–2 cheques, especially for premium areas, while others accept 4–6 cheques. We'll tell you what's realistic for each property and try to balance your needs with the landlord's expectations."
    },
    {
      question: "How much should I budget for upfront costs?",
      answer: "Typically you should expect: Security deposit (usually 5% of annual rent for unfurnished, 10% for furnished), Agency fee, First rent cheque, Possible Ejari and moving fees (building-dependent). We'll help you estimate your total before you commit."
    },
    {
      question: "Can I negotiate the rent or number of cheques?",
      answer: "Sometimes, yes. It depends on demand, how long the property has been on the market and the landlord's situation. We'll give you a realistic read and suggest an offer structure that has a genuine chance of being accepted."
    },
    {
      question: "What documents do I need as a tenant?",
      answer: "Normally: passport/Emirates ID copy, visa copy (or proof in progress), proof of income/employment, and basic contact details. For company leases, trade license and signatory documents may be required."
    },
    {
      question: "How long is a typical tenancy contract in Dubai?",
      answer: "Most standard tenancies are for 12 months, renewed annually. Shorter terms are possible but less common and may come at a premium."
    },
    {
      question: "Who pays for Ejari and utility connections?",
      answer: "It varies, but in many cases tenants handle Ejari, DEWA and telecom connections. We'll clarify who is responsible for what before you sign so there are no surprises."
    },
    {
      question: "What happens if I need to leave before my contract ends?",
      answer: "Early termination is subject to the terms in your tenancy contract and Dubai tenancy law. Many contracts include a penalty or require a notice period. We'll highlight these clauses before you sign and, if needed later, explain your options."
    },
    {
      question: "Can I have pets in the property?",
      answer: "Pet policies depend on both the building/community rules and the landlord. Some are strict, others are flexible. Tell us upfront if you have pets so we only show you properties where they're genuinely allowed."
    },
    {
      question: "How involved will you be after I move in?",
      answer: "We're mainly focused on helping you secure the right property and getting the contract set up correctly. For ongoing maintenance or building issues, you'll typically deal with the landlord or their management company, but we're happy to clarify any questions you have about your rights and obligations."
    }
  ];

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
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                Rent a Home in Dubai
              </span>
              
              <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Find a Rental That Actually Fits Your Life
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We help you narrow down areas, budget and requirements so you're not spending weeks on random viewings that never lead anywhere.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={openShareRequirements}
                  className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Share Your Rental Requirements
                </button>
                
                <Link
                  href="/properties?segment=rent"
                  className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200 text-center"
                >
                  Browse Our Rental Listings
                </Link>
              </div>

              <p className="text-sm text-gray-500">
                No fees for tenants on most leases. No spam. Just straight advice.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
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

      {/* Why Rent Through RE/MAX HUB */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Why Rent Through RE/MAX HUB Instead of Just Scrolling Portals
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto text-center leading-relaxed">
            Portals are useful for browsing, but they don't tell you what's actually realistic for your budget, visa situation and timeline. We help you cut through the noise and focus on homes that make sense for your life.
          </p>

          {/* Three Benefit Blocks */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Curated Shortlists
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We listen first, then send you a focused shortlist instead of 40 random links.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Area & Building Advice
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Honest feedback on communities, buildings and landlords – not just glossy photos.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Support Through the Paperwork
              </h3>
              <p className="text-gray-600 leading-relaxed">
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

        {/* Visual */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <Image
              src="/rent-dubai/IMAGE-RENT-WHY-1.png"
              alt="Why Rent Through RE/MAX HUB"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* How the Rental Process Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            How the Rental Process Works in Dubai
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">
            A quick overview so you know what to expect before you start viewing apartments.
          </p>

          {/* 4-Step Timeline */}
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Brief & Shortlist
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We discuss your budget, areas, commute, family situation and move-in date. Then we build a shortlist of realistic options instead of dragging you to anything and everything.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Viewings & Feedback
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We schedule viewings efficiently, group them when possible, and give you honest pros and cons of each unit, building and landlord.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Offer, Terms & Cheques
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Once you choose a property, we structure your offer – rent, number of cheques, move-in date, any requests – and present it clearly to the landlord.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Contract, Ejari & Move-in
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We help guide you through the tenancy contract, documentation and Ejari registration, and coordinate move-in dates with the landlord or building management.
                </p>
              </div>
            </div>
          </div>

          {/* Inline CTA Button */}
          <div className="text-center">
            <button
              onClick={() => openConsultation('Renting / Relocation')}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Talk Through the Process
            </button>
          </div>
        </div>

        {/* Visual */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <Image
              src="/rent-dubai/IMAGE-RENT-PROCESS-1.png"
              alt="Rental Process in Dubai"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* What You Should Prepare */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What You Should Prepare Before You Start
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                A bit of preparation makes everything smoother. Here's what most landlords and agents will expect from you.
              </p>

              {/* Documents */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Documents</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Passport & visa copy (or Emirates ID).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Proof of income – recent salary slips or employment letter; for self-employed, basic company documents.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Family details – who will live in the property (adults, children, domestic staff).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Previous landlord reference if available (optional but helpful).</span>
                  </li>
                </ul>
              </div>

              {/* Money & Deposits */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Money & Deposits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Security deposit – typically 5% of annual rent (unfurnished) or 10% (furnished).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Agency fee – usually 5% of annual rent or a fixed amount agreed in advance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Cheques – understand how many cheques you can realistically offer and from which bank.</span>
                  </li>
                </ul>
              </div>

              {/* Timing */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Timing</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Move-in date – know your earliest realistic date.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Notice period at your current place, if any.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Flexibility – the more flexible you are on move-in and cheques, the more options you'll have.</span>
                  </li>
                </ul>
              </div>

              {/* Inline CTA */}
              <button
                onClick={openShareRequirements}
                className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group"
              >
                Not sure what you can realistically afford? Share your requirements and we'll help you structure a budget
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/rent-dubai/IMAGE-RENT-CHECKLIST-1.png"
                alt="Rental Checklist"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Browse Our Current Rental Listings
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">
            These are just some of our active rentals. Share your requirements if you don't see the right fit here – we can search beyond our in-house stock.
          </p>

          {loadingRentals ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#00458b] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading rental listings...</p>
            </div>
          ) : rentals.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {rentals.map((rental) => (
                  <Link
                    key={rental._id}
                    href={`/properties/${rental._id}`}
                    className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#00458b] hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={rental.image || '/placeholder-property.jpg'}
                        alt={rental.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xl font-bold text-[#00458b] mb-2">
                        AED {formatPrice(rental.price)}/year
                      </p>
                      <p className="text-sm text-gray-600 mb-3">{rental.community}, Dubai</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Bed className="w-4 h-4" /> {rental.beds} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-4 h-4" /> {rental.baths} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="w-4 h-4" /> {rental.size} sqft
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Listing by RE/MAX HUB</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/properties?segment=rent"
                  className="inline-block bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  View All Rentals
                </Link>
              </div>
            </>
          ) : (
            // Empty State
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                We don't currently have rental listings published here, but we can still help. Share your rental requirements and we'll search across our network for you.
              </p>
              <button
                onClick={openShareRequirements}
                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Share My Rental Requirements
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            What Our Tenants Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200"
              >
                <div className="mb-6">
                  <p className="text-lg font-bold text-gray-900 mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">{testimonial.profile}</p>
                  <p className="text-sm text-[#00458b] font-medium">{testimonial.community}</p>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Tenant FAQs for Renting in Dubai
          </h2>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#00458b] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#00458b] flex-shrink-0" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              Still have questions about renting in Dubai?
            </p>
            <button
              onClick={() => openConsultation('Renting / Relocation')}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Ask a Rental Advisor
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-br from-[#0B2340] to-[#00458b]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/rent-dubai/buy-residential-final-cta-background.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Dubai Rental Search?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Tell us what you're looking for and we'll respond with a clear, realistic plan – not a random dump of listing links.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openShareRequirements}
              className="bg-white text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Share Your Rental Requirements
            </button>
            
            <Link
              href="/properties?segment=rent"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#00458b] transition-colors duration-200"
            >
              Browse Our Rental Listings
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
