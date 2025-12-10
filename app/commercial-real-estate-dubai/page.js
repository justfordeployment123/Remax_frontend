"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ConsultationModal from '../../components/ConsultationModal';
import BuyResidentialTestimonials from '../../components/BuyResidentialTestimonials';
import FAQAccordion from '../../components/FAQAccordion';
import { 
  Building2, MapPin, DollarSign, CheckCircle, Users, 
  TrendingUp, Briefcase, FileText, ChevronDown, ChevronUp,
  ArrowRight, Zap
} from 'lucide-react';

export default function CommercialRealEstate() {
  const [openFaq, setOpenFaq] = useState(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState('Commercial');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const openRequirementsForm = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/contact-us?topic=Commercial&purpose=Rent+or+Invest';
    }
  };

  const openConsultation = (topic = 'Commercial') => {
    setConsultationTopic(topic);
    setIsConsultationModalOpen(true);
  };

  const credibilityPoints = [
    {
      title: "Office, Retail & Industrial",
      description: "Support across key asset types in Dubai."
    },
    {
      title: "Data-Driven Location Advice",
      description: "We look at footfall, access, licensing and total occupancy cost – not just rent per sq ft."
    },
    {
      title: "Local & Global Network",
      description: "Backed by the RE/MAX global brand with deep local knowledge in Dubai."
    },
    {
      title: "Fit-Out & Move-In Support",
      description: "Access to design, fit-out and project partners for a smoother move-in."
    }
  ];

  const assetTypes = [
    {
      title: "Office Space",
      description: "From small, fitted offices to full floors in grade A and B buildings across Dubai.",
      type: "office"
    },
    {
      title: "Retail & F&B",
      description: "Street retail, community malls and destination locations for cafes, restaurants and showrooms.",
      type: "retail"
    },
    {
      title: "Warehouse & Industrial",
      description: "Storage, logistics and light industrial units in key industrial districts.",
      type: "warehouse"
    },
    {
      title: "Flex & Co-Working",
      description: "Hybrid and serviced space options when you don't want long-term commitments.",
      type: "flex"
    }
  ];

  const considerations = [
    {
      title: "Location & Licensing",
      points: [
        "Access for staff, clients and deliveries",
        "Parking and public transport",
        "Mainland vs free zone, and matching trade license to location"
      ]
    },
    {
      title: "Space, Layout & Fit-Out",
      points: [
        "Required sqm / sq ft now and growth over 2–3 years",
        "Open plan vs cellular offices, meeting rooms, storage",
        "Fit-out costs and whether the unit is shell & core, CAT A or fitted"
      ]
    },
    {
      title: "Cost & Lease/Investment Structure",
      points: [
        "Base rent or purchase price per sq ft",
        "Service charges, utilities and parking costs",
        "Lease terms: length, break clauses, rent-free/incentives, deposits"
      ]
    }
  ];

  const commercialDistricts = [
    {
      name: "DIFC",
      image: "https://alshirawiinteriors.com/files/cache/e3c70281a736da867b2e02cf590040a2_f643.jpg",
      description: "Financial hub with grade A offices and global institutions."
    },
    {
      name: "Business Bay",
      image: "https://images.unsplash.com/photo-1721804222969-e15023a77eef?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Mixed-use district with a wide range of office and retail options."
    },
    {
      name: "Jumeirah Lake Towers (JLT)",
      image: "https://images.unsplash.com/photo-1604235782150-6723a15581ad?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Value-friendly offices with lake views and strong transport links."
    },
    {
      name: "Barsha Heights (TECOM)",
      image: "https://d3h330vgpwpjr8.cloudfront.net/x/1773x/Barsha_Heights_Tecom_Dubai_Area_and_Community_Guide_2c83539f05.webp",
      description: "Mid-market office stock with easy access to Sheikh Zayed Road."
    },
    {
      name: "Dubai South / Expo Corridor",
      image: "https://www.arabianbusiness.com/wp-content/uploads/sites/3/cloud/2021/11/09/iNJIfcKI-The-Avenue-Dubai-South.jpg",
      description: "Emerging logistics and business hub near Al Maktoum Airport."
    },
    {
      name: "Jebel Ali / Industrial Areas",
      image: "https://emirates.estate/uploads/images/2021-12/jebel-ali-industrial-100.jpg",
      description: "Logistics, warehousing and industrial space with port access."
    },
    {
      name: "Dubai Media City / Internet City",
      image: "https://d3ob0s3rxbjyep.cloudfront.net/content/media_city_07_fa568fad9d.jpg",
      description: "Media, tech and digital businesses close to Dubai Marina and Palm Jumeirah."
    },
    {
      name: "Dubai Silicon Oasis",
      image: "https://emirates.estate/uploads/images/2021-11/259.jpg",
      description: "Tech-focused mixed-use community with offices, light industrial space and easy highway access."
    }
  ];

  const benefits = [
    {
      title: "Occupier & Investor Focus",
      description: "We advise both tenants and investors, so we understand both sides of the table."
    },
    {
      title: "Numbers, Not Just Photos",
      description: "We compare locations and buildings based on cost per sq ft, service charges, incentives, yield and licensing fit."
    },
    {
      title: "Local Market Insight",
      description: "We're active across key business districts, industrial areas and new growth corridors in Dubai."
    },
    {
      title: "End-to-End Coordination",
      description: "From first briefing to signing the lease/Sales Agreement and moving in, we stay involved."
    }
  ];

  const testimonials = [
    {
      name: "Ali H.",
      profile: "Founder of a SaaS company in Dubai",
      area: "Office relocation from JLT to Barsha Heights (TECOM)",
      quote: "We'd outgrown our small office in JLT but every option we saw either killed our budget or wrecked our commute. RE/MAX HUB helped us compare JLT, Barsha Heights and Internet City on total occupancy cost, not just rent per square foot. We ended up relocating to a slightly larger fitted office in Barsha Heights with better parking and lower all-in costs than we were paying before."
    },
    {
      name: "Lina M.",
      profile: "Regional Manager, boutique coffee brand",
      area: "First Dubai retail store for a coffee brand in a community mall",
      quote: "Opening our first store in Dubai was a big step and we didn't want to gamble on the wrong mall or street. RE/MAX HUB walked us through footfall patterns, surrounding tenants and the real cost of being in different locations. They helped us secure a unit with strong visibility, negotiated rent-free fit-out time and clarified all the extra mall charges upfront, so there were no surprises after we signed."
    },
    {
      name: "Prakash K.",
      profile: "Operations Director, logistics company",
      area: "Warehouse expansion in Dubai South",
      quote: "We needed additional warehouse space with better access to the new airport and major roads. RE/MAX HUB shortlisted units in JAFZA and Dubai South that actually fit our loading, power and racking requirements instead of just sending whatever was available. They handled inspections, comparisons and negotiations on lease terms, and we signed a new facility in Dubai South that has already improved our turnaround times."
    }
  ];

  const faqs = [
    {
      question: "What's the difference between mainland and free zone locations?",
      answer: "Mainland space sits under Dubai's onshore jurisdiction, while free zone space sits under a specific free zone authority (DIFC, DMCC, DMC, D3, etc.). The main differences for you: Licensing & activity – Your trade license must match the jurisdiction and activities allowed in that zone. Some activities only make sense in certain free zones. Client/operational needs – Mainland can be better if you're dealing heavily with local retail, government, or you need \"onshore\" presence. Many service and international businesses are fine (or better) in free zones. Costs & requirements – Different rules on minimum office size, flex options, and visa quotas. You don't pick space first and license later – they need to be aligned from day one."
    },
    {
      question: "How is commercial rent usually structured in Dubai (cheques, deposits, etc.)?",
      answer: "Traditionally, rent is paid via post-dated cheques, but the market is slowly moving towards online payments / direct debits with some landlords. Typical structure: Rent – Often 1–4 cheques per year (1 = more negotiating leverage, 4–6 = more cashflow friendly but sometimes weaker negotiation power). Security deposit – Usually a percentage of annual rent (commonly one month's rent equivalent), held by the landlord. Agency fee – Usually a percentage of annual rent (e.g. 5%), paid once when the lease is signed. Service charges – Either included in the rent (all-in) or billed separately by the landlord/building. Everything is negotiable to a point, but if you come in with 12 cheques and no deposit, you're not in a strong position."
    },
    {
      question: "How long are typical office or retail leases?",
      answer: "Most commercial leases in Dubai are: Offices – Commonly 1–3 years, with many landlords preferring 2–3 for stability. Retail/F&B – Often 3–5 years, sometimes longer for strong brands or large spaces. Warehouses/industrial – Frequently 3–5 years, particularly for logistics and industrial users. Longer terms can help you negotiate better rent, fit-out contributions or rent-free periods, but they also lock you in. You need to balance flexibility with incentives."
    },
    {
      question: "What extra costs should I budget for besides base rent?",
      answer: "Base rent is only one line. Realistic budgeting should include: Service charges (if not included), Chiller / AC costs (in some buildings), DEWA (utilities), Parking fees (if not included in rent), Fit-out costs (design, build, approvals), IT/telecom setup, Agency fee and legal costs (if you use a lawyer), For retail: mall marketing fees, common area charges, etc. If you don't model \"all-in occupancy cost\", you're making decisions half blind."
    },
    {
      question: "Can I modify the space (fit-out) and who pays for it?",
      answer: "Usually yes, but it depends on: Current condition – Shell & core vs CAT A vs fully fitted. Lease terms – Some landlords contribute via fit-out allowances or rent-free periods; others expect you to pay 100%. Approvals – You must get landlord and authority approvals (DCD, civil defense, free zone authority etc.) before major changes. In most cases, you pay for the fit-out, either directly or effectively via higher rent/longer lock-in. The smarter move is to negotiate fit-out support before signing, not after."
    },
    {
      question: "What's different about buying commercial vs buying residential in Dubai?",
      answer: "Key differences: Valuation – Commercial is driven far more by income (rent, yield, covenant strength) and less by emotion or lifestyle. Lease structures – Commercial leases can be longer, more complex, and tailored – they directly impact the property's value. Liquidity – Good quality, well-leased commercial assets can be attractive, but liquidity is generally lower than typical residential stock. Vacancy risk – Longer void periods if a tenant leaves. Due diligence – You need to dig into leases, service charges, tenant quality, building management, usage restrictions, not just location and photos. If you treat commercial like a bigger apartment purchase, you'll miss half the risk and half the opportunity."
    },
    {
      question: "Do I need a trade license before I can rent commercial space?",
      answer: "In practice, yes, the license and space are linked, but you don't need everything fully finished before you start: Many landlords will issue initial approvals / reservation while your license is in process, especially in the same free zone. Most authorities require either a tenancy contract or Ejari / lease / flex-desk agreement as part of the licensing process. There's often a sequence: you agree terms on the space → get initial approval on the license → finalize lease → finalize license. You should treat licensing and space selection as a joined project, not two separate tasks handled months apart."
    },
    {
      question: "Can I use a residential property as an office?",
      answer: "Generally, no – not in a way that's compliant for a proper trade license and real operations. Most licensing authorities require commercial-zoned premises for most business activities, especially if you have staff or clients visiting. There are some edge cases (e.g. certain free-zone flex or \"virtual office\" solutions, or professional activities that allow home-based elements), but if you're planning a proper team or client-facing operation, assume you'll need commercial space that matches your license type."
    },
    {
      question: "How early should I start looking for new premises before my current lease expires?",
      answer: "Too many businesses leave this way too late and end up renewing bad terms because they ran out of time. Rough guidance: Small offices / flex – Start 3–4 months before expiry. Medium to large offices or warehouses – Start 6–9 months before. Complex retail / flagship locations – Easily 9–12+ months ahead. You need time for search, negotiation, fit-out, approvals and actual move-in. If fit-out is involved and you start 30–60 days before expiry, you're basically forcing yourself to stay where you are or take something rushed."
    },
    {
      question: "What documents will landlords usually ask for when renting commercial space?",
      answer: "Requirements vary, but broadly expect: For new companies/startups – Passport and visa copies of owners/authorized signatories, Business plan or activity description, Trade name reservation or initial approval from authority (if already started), Bank details / sometimes proof of funds. For existing companies – Trade license copy and company documents, Passport/visa/EID of signatory, Recent bank statements or financials (for larger spaces), Board resolution/POA authorizing the signatory, where relevant. Landlords are effectively underwriting your ability to pay and operate, so the more serious the space and rent, the more documentation and comfort they'll want."
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
                Commercial Real Estate in Dubai
              </span>
              
              <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Find the Right Office, Retail or Warehouse Space in Dubai
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Whether you're opening your first office, relocating a team or acquiring an income-generating asset, RE/MAX HUB helps you find and negotiate the right commercial property – not just whatever is on the portals this week.
              </p>

              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={openRequirementsForm}
                  className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Share Your Commercial Requirements
                </button>
                
                <button
                  onClick={() => openConsultation()}
                  className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200"
                >
                  Book a Commercial Consultation
                </button>
              </div>

              <p className="text-sm text-gray-600 italic">
                We represent both occupiers and investors. No obligation, no spam.
              </p>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/commercial/image-com-hero-1.png"
                alt="Find the Right Office, Retail or Warehouse Space in Dubai"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0">
            <Image
            src="/commercial/image-com-strip-1.png"
            alt="Commercial Pattern"
            fill
            className="object-cover"
            />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Businesses Work With RE/MAX HUB
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {credibilityPoints.map((point, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {point.title}
                </h3>
                <p className="text-gray-600">
                    {point.description}
                </p>
                </div>
            ))}
            </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Who We Help in Commercial Real Estate
          </h2>

          <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden mb-12">
            <Image
              src="/commercial/image-com-profiles-1.png"
              alt="Mixed Commercial Users"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Occupiers */}
            <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#00458b]" />
                For Occupiers (Businesses/Tenants)
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Startups and SMEs setting up their first Dubai office</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Established companies relocating or upgrading space</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">F&B and retail brands looking for street or mall locations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Warehousing and logistics users needing industrial space</span>
                </li>
              </ul>
            </div>

            {/* Investors */}
            <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                For Owners & Investors
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Investors purchasing income-generating office or retail</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Landlords seeking tenants for vacant units</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Family offices reviewing commercial portfolios</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={openRequirementsForm}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Share My Commercial Brief
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-3 text-center">
            How We Work With You on Commercial Property
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            From brief to fit-out, not just a list of listings.
          </p>

          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <Image
              src="/commercial/image-com-process-1.png"
              alt="Commercial Journey"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            
            <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
              <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Requirements & Strategy
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We define your use (office/retail/warehouse), licensing, headcount, location preferences and budget.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
              <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Market Scan & Shortlist
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We search both our own stock and the wider market, then give you a curated shortlist with pros/cons.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
              <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Viewings & Negotiation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We arrange inspections, compare options and negotiate rents, incentives and contract terms on your behalf.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#00458b] shadow-lg h-full">
              <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Contracts, Fit-Out & Handover
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We coordinate with landlords, PROs and fit-out partners so you can focus on running your business, not chasing paperwork.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => openConsultation('Commercial Process')}
              className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group text-lg"
            >
              Talk Through the Commercial Process
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            What Kind of Commercial Space Are You Looking For?
          </h2>

          <div className="relative h-[350px] rounded-2xl overflow-hidden mb-6">
            <Image
              src="/commercial/image-com-types-1.png"
              alt="Icon Grid"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {assetTypes.map((asset, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-[#00458b]">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {asset.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {asset.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            What You Need to Get Right with Commercial Property
          </h2>

          <div className="relative h-[500px] rounded-2xl overflow-hidden mb-12">
            <Image
              src="/commercial/image-com-guide-1.png"
              alt="Desk with Plans & Laptop"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {considerations.map((block, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {block.title}
                </h3>
                <ul className="space-y-4">
                  {block.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#00458b] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          

          <div className="bg-blue-50 p-8 rounded-xl border-l-4 border-[#00458b]">
            <p className="text-gray-700 mb-4">
              <strong>Not sure how to compare two or three options on a like-for-like basis?</strong>
            </p>
            <button
              onClick={() => openConsultation('Commercial Benchmark')}
              className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group text-lg"
            >
              Ask us to benchmark them for you
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Key Commercial Areas We Cover in Dubai
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commercialDistricts.map((district, index) => (
              <div key={index} className="group overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-[250px] overflow-hidden bg-gray-200">
                  <Image
                    src={district.image}
                    alt={district.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="bg-white p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {district.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {district.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/commercial/image-com-fitout-1.png"
                alt="Office Fit-Out in Progress"
                fill
                className="object-cover"
              />
            </div>

            {/* Right Column - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Need Fit-Out, Design or Approvals?
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The right space is only half the story. We work with selected partners, including TrueBuild, to help with interior design, fit-out, authority approvals and move-in planning – so your new office, retail outlet or warehouse is actually ready for business on time.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Space planning and test fits</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Interior design and fit-out execution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Approvals and compliance (where applicable)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Move-in coordination with landlord and building management</span>
                </li>
              </ul>

              <button
                onClick={() => openConsultation('Commercial Fit-Out')}
                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Discuss Space & Fit-Out Together
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Why Work With RE/MAX HUB for Commercial, Not Just Residential?
          </h2>

          <div className="relative h-[550px] rounded-2xl overflow-hidden mb-12">
            <Image
              src="/commercial/image-com-whyus-1.png"
              alt="Team / Boardroom"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => openConsultation('Commercial')}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Start a Commercial Conversation
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            How We've Helped Commercial Clients in Dubai
          </h2>

          <BuyResidentialTestimonials category="commercial" />
        </div>
      </section>

        <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
            <Image
            src="commercial/buy-residential-dubai-faq-background.png"
            alt="Background"
            fill
            className="object-cover"
            />
        </div>

        <div className="relative max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Commercial Real Estate FAQs in Dubai
            </h2>

            <div className="mb-12">
            <FAQAccordion category="commercial-real-estate-dubai" />
            </div>

            <div className="bg-blue-50 p-8 rounded-xl border-l-4 border-[#00458b] text-center">
            <p className="text-gray-700 mb-4">
                Still have specific questions about your business or property?
            </p>
            <button
                onClick={() => openConsultation('Commercial')}
                className="text-[#00458b] hover:text-[#003366] font-medium inline-flex items-center gap-2 group text-lg"
            >
                Ask us directly. Book a Commercial Consultation
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            </div>
        </div>
        </section>


      <section className="py-20 relative overflow-hidden">
        
        <div className="absolute inset-0">
          <Image
            src="/commercial/buy-residential-final-cta-background.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-bold text-white mb-3 text-center">
            Ready to Find the Right Commercial Space in Dubai?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 text-center max-w-3xl mx-auto">
            Tell us what you're planning – headcount, use, budget, timing – and we'll come back with a focused, realistic set of options.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={openRequirementsForm}
              className="bg-white text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Share Your Commercial Requirements
            </button>
            
            <button
              onClick={() => openConsultation()}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#00458b] transition-colors duration-200"
            >
              Book a Commercial Consultation
            </button>
          </div>

          <p className="text-center text-white/80 text-sm">
            Prefer WhatsApp? Message us at +971 [number] with "Commercial enquiry" and a brief of what you're looking for.
          </p>
        </div>
      </section>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedTopic={consultationTopic}
      />
    </main>
  );
}
