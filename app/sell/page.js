"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ConsultationModal from '../../components/ConsultationModal';
import RequirementsModal from '../../components/RequirementsModal';
import BuyResidentialTestimonials from '../../components/BuyResidentialTestimonials';
import FAQAccordion from '../../components/FAQAccordion';
import { 
  Home, CheckCircle, XCircle, FileText, TrendingUp, 
  BarChart3, Globe, Target, Users, ChevronDown, ChevronUp 
} from 'lucide-react';

export default function Sell() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);

  const openValuationForm = () => {
    setIsRequirementsModalOpen(true);
  };

  const openLeaseForm = () => {
    setIsRequirementsModalOpen(true);
  };

  const openConsultation = (topic = 'Selling / Landlord') => {
    setIsConsultationModalOpen(true);
  };

  const testimonials = [
    {
      name: "Imran S.",
      profile: "Seller of a 2BR in Dubai Marina",
      quote: "I'd had the apartment listed with different brokers for months with no serious offers. RE/MAX HUB came in, reset the price based on real data, improved the listing and focused on qualified buyers only. We agreed a sale within a few weeks at a number I was comfortable with."
    },
    {
      name: "Noura A.",
      profile: "Villa owner in Arabian Ranches",
      quote: "I was nervous about selling the family villa and didn't want dozens of random viewings. The team filtered buyers, scheduled viewings efficiently and kept me updated after each one. They handled the negotiation and transfer calmly and professionally."
    },
    {
      name: "James P.",
      profile: "Landlord with multiple units in JVC",
      quote: "I needed reliable tenants, not just the first people willing to pay. RE/MAX HUB helped me adjust the rent slightly, ran proper checks and lined up tenants who paid on time. The communication around renewals and market updates has been straightforward."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                Sell or Lease Your Property in Dubai
              </span>
              
              <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Sell or Lease Your Property With a Clear Strategy
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We help owners and landlords price correctly, position their property and manage the full process from listing to transfer or tenancy – without guesswork or panic discounts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={openValuationForm}
                  className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Request a Valuation
                </button>
                
                <button
                  onClick={() => openConsultation('Selling / Landlord')}
                  className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200"
                >
                  Talk to a Selling Advisor
                </button>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/sell/image-sell-hero-1.png"
                alt="Sell or Lease Your Property in Dubai"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Is This For You? */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Is This Page For You?
          </h2>

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
                  <span className="text-gray-700">You own a villa, apartment or commercial unit in Dubai.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You're thinking about selling now or in the next 6–12 months.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You need clarity on realistic pricing and timelines.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You want one advisor to handle valuation, marketing and negotiation.</span>
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
                  Maybe not for you if:
                </h3>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You're only "testing the market" with unrealistic price expectations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You're not ready to provide basic documents (title deed, IDs, etc.).</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You're just looking for free valuations to show someone else.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Inline CTA */}
          <div className="text-center">
            <button
              onClick={openValuationForm}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Share My Property Details
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="relative h-[550px] rounded-2xl overflow-hidden">
            <Image
              src="/sell/image-sell-fit-1.png"
              alt="Is This Right For You"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            How We Work With Sellers and Landlords
          </h2>

          <div className="max-w-7xl mx-auto px-4 mb-12">
            <div className="relative h-[300px] rounded-2xl overflow-hidden">
              <Image
                src="/sell/image-sell-process-1.png"
                alt="Selling Process"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-10">
            
            <div className="relative">
              <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Property Review & Brief
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We review your property, documents and expectations, then agree on a realistic strategy – sell, lease, or both options.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Pricing & Positioning
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We benchmark against recent transactions, live listings and demand in your building/community.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Marketing & Viewings
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We prepare photography, listing copy and portals, and manage enquiries and viewings.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Offers, Negotiation & Transfer/Tenancy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We qualify buyers/tenants, negotiate price and terms, and coordinate all steps to transfer or lease signing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                How We Approach Valuation and Pricing
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We'd rather lose an instruction than list at a fantasy price that never sells. Our valuation approach combines data, current competition and your timeline so you can decide whether to sell now, hold, or lease instead.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <BarChart3 className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Compare recent transactions in your building / area.</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Analyze live competition (asking prices, quality, days on market).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Home className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Factor in rental value as an alternative to selling.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Set a strategy: market price, test-and-adjust, or aggressive for fast sale.</span>
                </li>
              </ul>

              <button
                onClick={openValuationForm}
                className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group text-lg"
              >
                Request an Honest Valuation
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/sell/image-sell-data-1.png"
                alt="Valuation and Pricing"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            How We Market Your Property
          </h2>
          
          <p className="text-base text-gray-600 mb-6 max-w-4xl mx-auto text-center leading-relaxed">
            Good marketing doesn't mean spamming every channel. It means showing the right buyers or tenants why your property is worth their time.
          </p>

          <div className="grid md:grid-cols-2 gap-6 items-start mb-6">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/sell/image-sell-marketing-1.png"
                alt="Marketing and Exposure"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid gap-3">
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="w-9 h-9 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4 text-[#00458b]" />
                </div>
                <p className="text-gray-700 text-sm">Professional photography and accurate listing copy.</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="w-9 h-9 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-2">
                  <Globe className="w-4 h-4 text-[#00458b]" />
                </div>
                <p className="text-gray-700 text-sm">Exposure on key portals like Bayut and Property Finder.</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="w-9 h-9 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-2">
                  <Globe className="w-4 h-4 text-[#00458b]" />
                </div>
                <p className="text-gray-700 text-sm">Use of the RE/MAX global network where relevant.</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="w-9 h-9 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-2">
                  <Users className="w-4 h-4 text-[#00458b]" />
                </div>
                <p className="text-gray-700 text-sm">Direct outreach to active leads and matching requirements in our CRM.</p>
              </div>

              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <div className="w-9 h-9 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-2">
                  <CheckCircle className="w-4 h-4 text-[#00458b]" />
                </div>
                <p className="text-gray-700 text-sm">Clear feedback after viewings so we can adjust quickly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Not Ready to Sell? Lease Out Your Property Instead
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                If selling now doesn't make sense, we can help you lease the property to the right tenant and revisit a sale later, once your income and timing are aligned.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Advice on market rent and realistic expectations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Listing, enquiries and tenant screening.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Coordination of Ejari and lease documentation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Option to discuss property management partners if needed.</span>
                </li>
              </ul>

              <button
                onClick={openLeaseForm}
                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Talk About Leasing My Property
              </button>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/sell/image-landlord-1.png"
                alt="Lease Your Property"
                fill
                className="object-cover"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* Why RE/MAX HUB For Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Work With RE/MAX HUB to Sell or Lease Your Property
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Honest Pricing Advice
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We'd rather tell you the truth than take an overpriced listing that sits for months.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Local + Global Reach
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Local Dubai expertise with access to the wider RE/MAX network.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Structured Process
              </h3>
              <p className="text-gray-600 leading-relaxed">
                From valuation to transfer or tenancy, one team owns the process.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Data, Not Just Opinions
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We use transaction and listing data to support our recommendations.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={openValuationForm}
              className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group text-lg"
            >
              Start With a Valuation
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Seller Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            What Our Seller Clients Say
          </h2>

          <BuyResidentialTestimonials category="sell" />
        </div>
      </section>

      {/* Seller FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Seller FAQs
          </h2>

          <FAQAccordion category="sell" />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#0B2340] to-[#00458b]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/sell/buy-residential-final-cta-background.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Talk About Selling or Leasing?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Share some basic details and we'll come back with a realistic view on price, options and next steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openValuationForm}
              className="bg-white text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Request a Valuation
            </button>
            
            <button
              onClick={() => openConsultation('Selling / Landlord')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#00458b] transition-colors duration-200"
            >
              Book a Selling Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedTopic="Selling / Landlord"
      />
      
      <RequirementsModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        pageSource="sell"
      />
    </main>
  );
}
