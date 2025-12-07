"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { 
  Home, CheckCircle, XCircle, FileText, Calendar, 
  Shield, Users, TrendingUp, Search, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function Landlords() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openPropertyForm = () => {
    // TODO: Integrate with global Sell/Lease form with prefill: Purpose = Lease
    window.location.href = '/contact-us?topic=Lease&purpose=Lease';
  };

  const openConsultation = (topic = 'Landlord / Leasing') => {
    // TODO: Integrate with Book Consultation with preselected topic
    window.location.href = `/contact-us?topic=${encodeURIComponent(topic)}`;
  };

  const faqs = [
    {
      question: "How do you decide what rent I can get for my property?",
      answer: "We look at actual asking rents and recent leases in your building and area, plus property condition and demand for similar units. We'll show you a realistic range and discuss a strategy – whether to price at market, slightly above and test, or more aggressively for a fast lease."
    },
    {
      question: "What fees do you charge landlords for leasing out a property?",
      answer: "Fees depend on the type and value of the property, but are usually a percentage of the annual rent or a fixed amount agreed in advance. We confirm the exact fee structure in writing before we start marketing your property."
    },
    {
      question: "How many cheques are typical for rent in Dubai?",
      answer: "It varies by property and market conditions. Many landlords still prefer 1–2 cheques, but 4–6 cheques are increasingly common, especially in mid-market communities. We'll advise what's realistic for your property and what impact stricter or more flexible terms might have on demand."
    },
    {
      question: "What documents do I need to lease out my property?",
      answer: "You will usually need: title deed, passport/Emirates ID copy, contact details, and basic property information. For Ejari registration, the signed tenancy contract and tenant documents are also required. If there is an existing mortgage, your bank details may be needed in some cases."
    },
    {
      question: "Do I have to be in Dubai to sign the lease?",
      answer: "Not always. In many cases, you can authorize someone via power of attorney to sign on your behalf, or sign electronically where accepted. We'll explain what's possible based on your situation and the requirements of your community or building."
    },
    {
      question: "Can you help with Ejari registration?",
      answer: "We'll guide you and the tenant on the documentation and process, and coordinate where possible. In most cases, either the tenant or the landlord (or their PRO) completes the Ejari through official channels, but we stay involved to make sure it's done correctly."
    },
    {
      question: "What happens if the tenant stops paying or damages the property?",
      answer: "We can't guarantee tenant behaviour, but we reduce risk through screening and clear contracts. If issues arise, we can connect you with legal and property management professionals and share general guidance on typical next steps under Dubai tenancy law."
    },
    {
      question: "Do you also handle ongoing property management?",
      answer: "We can discuss light-touch support and connect you with trusted property management partners if you need a more hands-off arrangement. Our core role here is leasing and advisory, but we work with specialists who can take on full management if required."
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
                For Landlords in Dubai
              </span>
              
              <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Lease Out Your Property With the Right Tenants, Not Just the First Ones
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We help Dubai landlords set realistic rents, market properly and screen tenants carefully – so you're not chasing payments or regretting a rushed lease six months later.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={openPropertyForm}
                  className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Share My Property Details
                </button>
                
                <button
                  onClick={() => openConsultation('Landlord / Leasing')}
                  className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200"
                >
                  Talk to a Landlord Advisor
                </button>
              </div>

              <p className="text-sm text-gray-500">
                No fee or commitment to get an honest opinion on rent and strategy.
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/landlords/image-sell-hero-1.png"
                alt="Lease Out Your Property in Dubai"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Is This Page For You?
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 text-center">
            We work best with landlords who treat their property like a real asset, not a lottery ticket.
          </p>

          {/* Two Columns */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Left Column - Right Place */}
            <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  You're in the right place if:
                </h3>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You own an apartment, villa, townhouse or small building in Dubai.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You want reliable, screened tenants rather than the fastest possible cheque.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You're open to realistic rent advice based on data, not rumours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You prefer one advisor coordinating viewings, paperwork and Ejari.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You might later consider selling, but for now want solid rental income.</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Not Right */}
            <div className="bg-red-50 p-8 rounded-xl border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  This is probably not for you if:
                </h3>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You only want to list at well above market rent and refuse to adjust.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You're not prepared to keep the property in reasonable condition.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You expect a lease signed without basic tenant checks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You want to do everything yourself and just need a broker to "upload the ad".</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Inline CTA */}
          <div className="text-center">
            <button
              onClick={openPropertyForm}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Share My Property Details
            </button>
          </div>
        </div>

        {/* Supporting Image */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="relative h-[550px] rounded-2xl overflow-hidden">
            <Image
              src="/landlords/image-sell-fit-1.png"
              alt="Is This Right For You"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Leasing Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            How We Lease Out Your Property
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">
            A clear process from first conversation to signed tenancy and Ejari.
          </p>

          {/* 4-Step Process */}
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Brief & Property Review
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We discuss your goals, property details and any existing tenants. Then we review current rents and competition in your building and area.
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
                  Pricing & Listing Setup
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We agree on a realistic asking rent and strategy, then prepare photography and listing copy for key portals and our own channels.
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
                  Enquiries, Viewings & Screening
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We manage enquiries, schedule viewings, and screen interested tenants for basic suitability (income, employment, family profile, etc.).
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
                  Lease Terms, Signing & Ejari
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We help negotiate terms, coordinate documents, get the tenancy contract signed and support you with Ejari registration guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Inline CTA Button */}
          <div className="text-center">
            <button
              onClick={() => openConsultation('Landlord / Leasing')}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Walk Me Through the Process
            </button>
          </div>
        </div>

        {/* Process Illustration */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <Image
              src="/landlords/image-sell-process-1.png"
              alt="Leasing Process"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Tenant Screening and Risk Management
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                A fast lease with the wrong tenant is far more expensive than a slightly longer vacancy. We focus on basic but important checks so you have a clearer picture of who you're renting to.
              </p>

             
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What we typically look at:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Employment & income – does it realistically support the rent?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Family profile & occupancy – who will actually live in the property?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Previous rental history where possible.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Basic document checks – IDs, visas, trade licenses (for company leases).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Payment structure – number of cheques, security deposit, start date.</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What we don't do:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">We don't promise "zero risk" or guarantee perfect tenants.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">We don't skip checks just to push a lease through quickly.</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                You'll always know what information we've verified and what we haven't, so you can decide how comfortable you are before signing.
              </p>

              <Link
                href="/contact-us?topic=Landlord / Leasing"
                className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group"
              >
                Have specific concerns about a potential tenant? Ask us directly
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/landlords/image-landlord-risk-1.png"
                alt="Tenant Screening"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions (FAQs)
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

          {/* CTA under FAQs */}
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              Still have a specific question about your situation?
            </p>
            <button
              onClick={() => openConsultation('Landlord / Leasing')}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Ask a Landlord Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#0B2340] to-[#00458b]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/landlords/buy-residential-final-cta-background.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Talk About Leasing Out Your Property?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Share a few details about your apartment, villa or unit, and we'll come back with a realistic rent range and recommended approach – not just "list high and hope."
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openPropertyForm}
              className="bg-white text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Share My Property Details
            </button>
            
            <button
              onClick={() => openConsultation('Landlord / Leasing')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#00458b] transition-colors duration-200"
            >
              Book a Landlord Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
