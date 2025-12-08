"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ConsultationModal from '../../components/ConsultationModal';
import RequirementsModal from '../../components/RequirementsModal';
import { 
  Home, CheckCircle, XCircle, Globe, BarChart3, Users, 
  TrendingUp, Building2, MapPin, Bed, Bath, Maximize, 
  ChevronDown, ChevronUp, DollarSign, FileText, Calendar 
} from 'lucide-react';

export default function BuyResidentialDubai() {
  const [openFaq, setOpenFaq] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoadingProperties(true);
      // TODO: will Replace with actual API call when listings endpoint is ready
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties?segment=buy&limit=6`);
      // const data = await response.json();
      // if (data.success) {
      //   setProperties(data.data);
      // }
      setProperties([]);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoadingProperties(false);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openRequirementsForm = () => {
    setIsRequirementsModalOpen(true);
  };

  const openConsultation = (topic = 'Buying a Property') => {
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

  const faqs = [
    {
      question: "Can non-residents buy property in Dubai?",
      answer: "Yes. Non-residents can buy freehold property in Dubai in designated freehold areas (Dubai Marina, Downtown, Palm, JVC, etc.). You don't need a UAE residence visa to own, and the title deed is in your name. You can't buy everywhere – some areas are reserved for UAE/GCC nationals – but most of the popular expat communities are open to foreign buyers. We'll confirm exactly what you're buying before you commit."
    },
    {
      question: "What are the main buying costs besides the property price?",
      answer: "As a rough guide, budget around 7–8% on top of the purchase price if you're using a mortgage, slightly less if you're paying cash. The main costs are: Dubai Land Department (DLD) transfer fee – 4%, Trustee / registration fees (paid at the transfer office), Agency fee – typically 2% of the price + 5% VAT, Developer NOC fee, If financed: bank processing and valuation fees, mortgage registration, After handover: DEWA connection and ongoing service charges. For any specific property, we prepare a line-item cost breakdown, so you know your real total, not just the advertised price."
    },
    {
      question: "How much down payment do I need if I'm using a mortgage?",
      answer: "For ready residential property, current rules mean most expat buyers should expect: 20% down payment for a first home up to AED 5M, 30%+ down payment for more expensive or higher-risk cases, Higher down payments (around 40%) on second / investment properties. For UAE nationals, down payments are slightly lower. Important: your cash needs to cover both the down payment and the fees (DLD 4%, agency, trustee, bank fees). The bank does not finance those. When we run scenarios with you, we work off total cash required, not just the LTV headline."
    },
    {
      question: "What's the typical timeline from offer to handover?",
      answer: "For a ready property: Cash purchase: usually around 2–4 weeks from signed MOU to transfer, With mortgage: typically 4–6 weeks, sometimes longer, depending on bank approvals and documentation. The basic steps are: 1) Agree price and terms, sign the MOU / Form F, pay the deposit, 2) (If financed) Bank valuation and final loan approval, 3) Seller obtains developer NOC, 4) Both parties attend the Trustee office for transfer and title issuance. We'll map out a realistic timeline upfront based on your situation so there are no surprises."
    },
    {
      question: "Is it better to buy ready or off plan as a first-time buyer?",
      answer: "It depends on your timeline, risk tolerance and cash flow. Ready property is usually better if you want to live in the home or rent it out soon, prefer to see the actual building, view and community before you commit, or are comfortable with more cash up front but less uncertainty. Off plan can make sense if you have a longer horizon (2–4 years to completion), like staggered payment plans, or understand and accept construction and delivery risk. For many first-time buyers in Dubai, a good ready property in a proven community is the safer starting point, but we'll walk you through both options with real numbers, not just brochures."
    },
    {
      question: "How do agent fees work when I buy with RE/MAX HUB?",
      answer: "Dubai's typical brokerage fee on sales is 2% of the purchase price + 5% VAT. Who pays that depends on the deal structure. With RE/MAX HUB: In many resales and most off-plan transactions, our fee is paid by the seller or developer. If there is any buyer-side fee, we: Tell you upfront, Confirm it in writing (Form B / brokerage agreement), Do not add hidden or duplicate charges. In short: you'll know exactly what we earn and who pays it before you sign anything."
    },
    {
      question: "Can you help if I'm overseas and can't attend every viewing?",
      answer: "Yes. A large part of our buyer work is with clients who aren't in Dubai full-time. We typically: Do live video viewings from shortlisted properties, Share floor plans, service charges and recent comparable sales/rents, Handle on-ground checks (building quality, surroundings, access, etc.), Coordinate banks, sellers and Trustee offices. For the final transfer, you can either fly in for a short trip or appoint a Power of Attorney through your chosen lawyer. We work alongside you and your legal/finance partners so you can buy confidently even if you're not here for every step."
    }
  ];

  const testimonials = [
    {
      name: "Omar & Aisha",
      profile: "Family from Canada",
      community: "Dubai Hills Estate",
      quote: "We were overwhelmed by Dubai listings and didn't know where to start. RE/MAX HUB helped us narrow down communities that actually fit our kids' schools and commute, then negotiated a better price than we were expecting. The whole process felt structured, not random."
    },
    {
      name: "Sarah L.",
      profile: "First-Time Buyer, UK",
      community: "Jumeirah Village Circle (JVC)",
      quote: "I was nervous about buying my first property in a different country. The team walked me through every step, from financing options to the final transfer, and were very transparent about pros and cons of each building. I never felt pushed into anything."
    },
    {
      name: "Khalid A.",
      profile: "Investor from KSA",
      community: "Dubai Marina",
      quote: "I wanted a unit with strong rental demand and decent yield, not just a shiny brochure. RE/MAX HUB backed their advice with actual data and shortlisted only serious options. We closed on a unit that started renting within weeks of handover."
    }
  ];

  const communities = [
    {
      name: "Dubai Marina",
      description: "High-rise waterfront living",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"
    },
    {
      name: "Downtown Dubai",
      description: "City-centre lifestyle by Burj Khalifa",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800"
    },
    {
      name: "Business Bay",
      description: "Urban business hub with canal views",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800"
    },
    {
      name: "Jumeirah Village Circle (JVC)",
      description: "Affordable community living in New Dubai",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
    },
    {
      name: "Dubai Hills Estate",
      description: "Master-planned villas and green golf views",
      image: "https://www.constructionweekonline.com/cloud/2021/07/07/Dubai-Hills-Estate-masterpl.png"
    },
    {
      name: "Arabian Ranches",
      description: "Family villas in a quiet suburban community",
      image: "https://d3h330vgpwpjr8.cloudfront.net/x/1773x/Untitled_1_7_0b0f216fc2.webp"
    },
    {
      name: "Jumeirah Lake Towers (JLT)",
      description: "Lakeside towers with easy metro access",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800"
    },
    {
      name: "Dubai South",
      description: "Emerging district near Al Maktoum Airport & Expo City",
      image: "/buy-residential-dubai/dubai-south.avif"
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
                Buying a Home in Dubai
              </span>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Buy Your Next Home in Dubai With a Clear Plan
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Skip the guesswork and portal overload. RE/MAX HUB advisors help you define your brief, filter the market and negotiate the right villa or apartment in Dubai – from first viewing to handover.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={openRequirementsForm}
                  className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Share Your Requirements
                </button>
                
                <button
                  onClick={() => openConsultation('Buying a Property')}
                  className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200"
                >
                  Book a Free Buyer Consultation
                </button>
              </div>

              <p className="text-sm text-gray-500">
                No fees for buyers on most transactions. No spam. Just advice.
              </p>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/buy-residential-dubai/buy-residential-dubai-hero.png"
                alt="Buy Your Next Home in Dubai"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 bg-gradient-to-r from-[#0B2340] to-[#00458b]">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/buy-residential-dubai/buy-residential-page-dubai-texture-background.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-semibold text-white text-center mb-8">
            Why Buyers Work With RE/MAX HUB
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">Global RE/MAX Network</h4>
              <p className="text-white/80 text-sm">Connected to 140,000+ agents worldwide.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">Data-Backed Advice</h4>
              <p className="text-white/80 text-sm">Access to REIDIN, Geniemap and more.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-white font-bold mb-2">End-to-End Support</h4>
              <p className="text-white/80 text-sm">From requirements to viewing, negotiation and transfer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            How We Help You Buy the Right Property
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">
            A structured process so you're not just reacting to random listings.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mb-10">
            
            <div className="relative">
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-[#00458b] h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Discovery & Brief
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We understand your budget, lifestyle, financing and timelines, then translate that into a clear buying brief.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-[#00458b] h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Curated Shortlist
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We scan our own listings and the wider market to create a tailored shortlist instead of sending you every portal link.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-[#00458b] h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Viewings & Due Diligence
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We arrange and attend viewings, highlight red flags, check documents and run basic market checks.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-50 p-6 rounded-xl border-2 border-[#00458b] h-full">
                <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Negotiation & Handover
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We negotiate price and terms, coordinate with banks and transfer offices, and guide you until keys are in your hand.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => openConsultation('Buying a Property')}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Talk Through the Process
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Is This for You?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            
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
                  <span className="text-gray-700">You want to buy a home or investment property in Dubai.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You're confused by conflicting portal prices and marketing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You'd rather work with one advisor than a dozen random agents.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You want help comparing communities, floor plans and buildings.</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 p-8 rounded-xl border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  This is not for you if:
                </h3>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You're just sightseeing listings with no intention to buy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You only want the absolute cheapest property, regardless of quality.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">You're not open to realistic market feedback on pricing.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={openRequirementsForm}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Share My Requirements
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="/buy-residential-dubai/buy-residential-age-dubai-is-this-for-you.png"
              alt="Is This For You"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Browse Our Current Dubai Listings
          </h2>
          
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto text-center">
            We can also source properties beyond our in-house stock, but this is a good starting point.
          </p>

          {loadingProperties ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#00458b] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          ) : properties.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {properties.map((property) => (
                  <Link
                    key={property._id}
                    href={`/properties/${property._id}`}
                    className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#00458b] hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative h-48 bg-gray-200">
                      <Image
                        src={property.image || '/placeholder-property.jpg'}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xl font-bold text-[#00458b] mb-2">
                        AED {formatPrice(property.price)}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">{property.community}, Dubai</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Bed className="w-4 h-4" /> {property.beds} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-4 h-4" /> {property.baths} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize className="w-4 h-4" /> {property.size} sqft
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Listing by RE/MAX HUB</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/properties?segment=buy"
                  className="inline-block bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  View All RE/MAX HUB Listings
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-6">
                Our listings are being updated. Share your requirements and we'll source properties across the market for you.
              </p>
              <button
                onClick={openRequirementsForm}
                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Share My Requirements
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            What You Need to Consider Before You Buy
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-10">
            
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Budget & Financing
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#00458b] mt-1">•</span>
                  <span>Total budget vs. down payment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00458b] mt-1">•</span>
                  <span>Bank financing vs. cash.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00458b] mt-1">•</span>
                  <span>Additional costs: DLD fees, agency fees, bank fees, service charges.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Property Type & Community
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#00458b] mt-1">•</span>
                  <span>Apartment vs. villa/townhouse.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00458b] mt-1">•</span>
                  <span>New communities vs. established areas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00458b] mt-1">•</span>
                  <span>Proximity to work, schools, lifestyle.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Ownership & Timeline
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#00458b] mt-1">•</span>
                  <span>Freehold vs. leasehold (where applicable).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00458b] mt-1">•</span>
                  <span>Ready vs off-plan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00458b] mt-1">•</span>
                  <span>Handover timing and vacancy status.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Not sure how to structure your budget or short list?
            </p>
            <button
              onClick={() => openConsultation('Buying a Property')}
              className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group text-lg"
            >
              Talk to a RE/MAX HUB advisor
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Supporting Image */}
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="relative h-[550px] rounded-2xl overflow-hidden">
            <Image
              src="/buy-residential-dubai/buy-residential-dubai-key-considerations.png"
              alt="Key Considerations"
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
                Need Help With Financing?
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We work with selected mortgage advisors and banks to help you structure your purchase correctly from day one.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Pre-approval guidance so you know your buying power.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Comparison of bank options & repayment scenarios.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Coordination between bank, seller and transfer office.</span>
                </li>
              </ul>

              <button
                onClick={() => openConsultation('Buying a Property')}
                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Speak to a Mortgage-Friendly Advisor
              </button>
            </div>

            <div className="bg-gray-50 p-12 rounded-xl border border-gray-200 flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Mortgage partner logos coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Off-Plan vs Ready Property – What's Right for You?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            
            <div className="bg-white p-8 rounded-xl border-2 border-[#00458b]">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready Property</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Pros:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Immediate move-in or rental income.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>You can physically see the unit and building.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Cons:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Higher upfront cash requirement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Limited choice in layout and floors.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-[#00458b]">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Off-Plan</h3>
              
              <div className="mb-6">
                <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Pros:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Payment plans and lower entry price.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Access to new communities and facilities.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Cons:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Construction and delivery risk.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Limited visibility on actual finishes and community maturity.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/off-plan"
              className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group text-lg"
            >
              Learn more about how off plan purchases work in Dubai
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="relative h-[550px] rounded-2xl overflow-hidden">
            <Image
              src="/buy-residential-dubai/buy-residential-dubai-offplan-vs-ready.png"
              alt="Off-Plan vs Ready"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Neighbourhoods We Help Buyers In */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Popular Communities We Help Buyers In
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communities.map((community, index) => (
              <Link
                key={index}
                href={`/properties?community=${encodeURIComponent(community.name)}`}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{community.name}</h3>
                  <p className="text-sm text-white/90">{community.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With RE/MAX HUB as a Buyer */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Work With RE/MAX HUB as Your Buyer's Advisor
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Advisory, Not Just Listings
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're not here to push whatever we have listed. We source across the market and tell you when to walk away.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Data-Backed Pricing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We use transaction data and portal analytics to benchmark asking prices and support your negotiation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Local & Global Network
              </h3>
              <p className="text-gray-600 leading-relaxed">
                On-the-ground knowledge in Dubai with access to the global RE/MAX network for future moves.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <div className="w-14 h-14 bg-[#00458b]/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#00458b]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                End-to-End Execution
              </h3>
              <p className="text-gray-600 leading-relaxed">
                From viewings and offers to bank coordination and transfer, one team stays with you through the process.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => openConsultation('Buying a Property')}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Start the Conversation
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            What Our Buyers Say
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

      {/* FAQ */}
      <section className="relative py-16 bg-gray-50">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/buy-residential-dubai/buy-residential-dubai-faq-background.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Buyer FAQs for Dubai Property
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
              Still have questions? Ask us directly.
            </p>
            <button
              onClick={() => openConsultation('Buying a Property')}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Contact an Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#0B2340] to-[#00458b]">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/buy-residential-dubai/buy-residential-final-cta-background.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Dubai Home Search?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Send us your brief and we'll come back with a tailored plan, not a list of random links.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={openRequirementsForm}
              className="bg-white text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Share Your Requirements
            </button>
            
            <button
              onClick={() => openConsultation('Buying a Property')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#00458b] transition-colors duration-200"
            >
              Book a Free Buyer Consultation
            </button>
          </div>

          <p className="text-sm text-white/70">
            Prefer WhatsApp? Message us with "Buyer enquiry" and we'll reply shortly.
          </p>
        </div>
      </section>

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedTopic="Buying a Property"
      />

      <RequirementsModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        pageSource="buy_residential_dubai"
      />

      <Footer />
    </main>
  );
}
