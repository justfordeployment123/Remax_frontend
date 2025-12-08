'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import { ArrowRight, Check } from 'lucide-react';

export default function Home() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState('');

  const openRequirementsForm = (topic = '') => {
    if (typeof window !== 'undefined') {
      const url = topic ? `/contact-us?topic=${encodeURIComponent(topic)}` : '/contact-us';
      window.location.href = url;
    }
  };

  const openConsultation = (topic = '') => {
    setConsultationTopic(topic);
    setIsConsultationModalOpen(true);
  };

  const partnerGroups = [
    {
      id: 'platforms',
      label: 'Listing & Data Platforms',
      subtext: 'Distribution and market intelligence through trusted UAE platforms.',
      partners: [
        {
          name: 'Bayut',
          logo: 'https://static.bayut.com/assets/logoBayutGreenEN_noinline.68ecc5e338a09cc96f4d88ab0feb815f.svg',
          url: 'https://www.bayut.com',
          tooltip: 'Bayut – UAE property portal'
        },
        {
          name: 'Property Finder',
          logo: 'https://www.propertyfinder.com/wp-content/themes/pf/images/logo-en.svg',
          url: 'https://www.propertyfinder.ae',
          tooltip: 'Property Finder – UAE property portal'
        },
        {
          name: 'REIDIN',
          logo: 'https://reidin.com/wp-content/uploads/2021/09/reidin-logo.svg',
          url: 'https://www.reidin.com',
          tooltip: 'REIDIN – real estate data and analytics'
        },
        {
          name: 'Geniemap',
          logo: 'https://gulfbridge.ae/images/partners/geniemap.svg',
          url: 'https://geniemap.net',
          tooltip: 'Geniemap – property data and mapping tools'
        }
      ],
      columns: 4
    },
    {
      id: 'developers',
      label: 'Developer Partners',
      subtext: 'Authorised broker for selected Dubai developers and projects.',
      partners: [
        {
          name: 'Beyond',
          logo: '/partners/Beyond.png',
          url: 'https://beyonddevelopments.ae/',
          tooltip: 'Beyond - Dubai real estate developer'
        },
        {
          name: 'Binghatti',
          logo: 'https://psinv.net/assets/img/Binghatti-logo-dark.svg',
          url: 'https://binghatti.com',
          tooltip: 'Binghatti - Dubai real estate developer'
        },
        {
          name: 'DAMAC',
          logo: 'https://vectorseek.com/wp-content/uploads/2023/09/DAMAC-Properties-Logo-Vector.svg-.png',
          url: 'https://www.damacproperties.com',
          tooltip: 'DAMAC - Dubai real estate developer'
        },
        {
          name: 'Emaar',
          logo: 'https://1000logos.net/wp-content/uploads/2020/09/Emaar-Properties-Logo-1.png',
          url: 'https://www.emaar.com',
          tooltip: 'Emaar - Dubai real estate developer'
        },
        {
          name: 'Mira',
          logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHwbkZpHCu4VQ/company-logo_200_200/B4DZfQCVf.GkAI-/0/1751541963230/mira_developments_logo?e=1766620800&v=beta&t=_F20frRC_kgq-Y0LRgc02MhZ4RZgnhmQwHuMAZiB-tw',
          url: 'https://miradevelopments.ae/',
          tooltip: 'Mira - property developer'
        },
        {
          name: 'Object One',
          logo: 'https://www.object-1.com/wp-content/themes/dubai-theme/images/logo.svg',
          url: 'https://www.object-1.com/',
          tooltip: 'Object One - property developer'
        },
        {
          name: 'Peace Homes',
          logo: '/peace.png',
          url: 'https://peacehomesdevelopment.com/',
          tooltip: 'Peace Homes - Dubai real estate developer'
        },
        {
          name: 'Sobha',
          logo: 'https://sobharealty.com/themes/sobha_uplift/images/footer-logo.svg',
          url: 'https://www.sobharealty.com',
          tooltip: 'Sobha - Dubai real estate developer'
        }
      ],
      columns: 4
    },
    {
      id: 'interior',
      label: 'Interior Design & Fit-Out',
      subtext: 'For clients who want move-in ready or fully customised spaces.',
      partners: [
        {
          name: 'TrueBuild',
          logo: 'https://truebuild.ae/images/logo3.png',
          url: '#',
          tooltip: 'TrueBuild - interior design and fit-out partner',
          description: 'TrueBuild is our interior design and fit-out partner, delivering high-quality residential and commercial spaces across Dubai.'
        }
      ],
      columns: 1,
      featured: true
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative w-full overflow-hidden" style={{ height: '550px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1682410601760-6372fd33ad2b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            width: '100%',
            height: '100%'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/20"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-start px-6 sm:px-8 lg:px-16 py-16 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-white font-bold mb-4 leading-tight" 
                style={{ 
                  fontSize: '2.5rem',
                  lineHeight: '1.2'
                }}>
              Dubai Property Experts for Serious Buyers & Investors
            </h1>

            <p className="text-white text-base lg:text-lg mb-8 leading-relaxed max-w-xl opacity-90">
              Luxury villas, modern apartments, off-plan projects, and commercial spaces across Dubai - guided by experienced, RERA-licensed RE/MAX agents who put your interests first.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button
                onClick={() => openRequirementsForm()}
                className="bg-[#00458b] text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-[#003366] transition-colors duration-200 w-fit"
              >
                Share Your Requirements
              </button>
              <button
                onClick={() => openConsultation()}
                className="border-2 border-white text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 w-fit"
              >
                Book a Consultation
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/30">
              <div className="text-white">
                <h4 className="font-semibold text-sm mb-1">Dubai Experts</h4>
                <p className="text-xs opacity-75">Freehold specialists</p>
              </div>
              <div className="text-white">
                <h4 className="font-semibold text-sm mb-1">Global RE/MAX</h4>
                <p className="text-xs opacity-75">Worldwide network</p>
              </div>
              <div className="text-white">
                <h4 className="font-semibold text-sm mb-1">Advisor Mindset</h4>
                <p className="text-xs opacity-75">Not just listings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-[280px] rounded-2xl p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-12 border border-gray-200 shadow-md bg-gray-50">
            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src="https://images.squarespace-cdn.com/content/v1/5a9f1b211aef1d822edb9d0b/1757003785913-NCI1YZTL145L8OU5LVIR/BMTA+USA+2025+Square+NW.png?format=300w"
                alt="Brand Spark Most Trusted Awards 2025"
                className="w-32 h-68 object-contain drop-shadow-lg"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-extrabold text-gray-900 mb-4 text-xl lg:text-2xl">
                Most Trusted Real Estate Agents in North America – Now in the U.A.E.
              </h3>
              <p className="text-gray-700 leading-relaxed text-base lg:text-lg max-w-2xl">
                RE/MAX has been voted the brand with the #1 Most Trusted Real Estate Agents in the U.S. and Canada by consumers in the BrandSpark Most Trusted Awards, in partnership with Newsweek.<br className="hidden lg:block" />
                This recognition reinforces our reputation for professionalism and integrity worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                Get the 2026-2035 UAE Real Estate Playbook
              </h2>
              
              <p className="text-base lg:text-lg text-gray-600 mb-4 font-semibold">
                A data-backed guide for serious investors and homebuyers, outlining our expectations for Dubai and the wider UAE market.
              </p>

              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                We've prepared the RE/MAX HUB Definitive Playbook for UAE Real Estate 2026–2035 — a strategic overview of price cycles, rental yields, key communities to watch, and the risks most people ignore.
              </p>

              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                Whether you're building a portfolio or buying a family home, this is the framework we use to advise our own clients.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-6 bg-white rounded border border-gray-200 overflow-hidden divide-x divide-gray-200">
                <div className="text-center py-3 px-3">
                  <p className="font-semibold text-gray-900 text-xs lg:text-sm">Market outlook for 2026 and beyond</p>
                </div>
                <div className="text-center py-3 px-3">
                  <p className="font-semibold text-gray-900 text-xs lg:text-sm">Community and asset-class opportunities</p>
                </div>
                <div className="text-center py-3 px-3">
                  <p className="font-semibold text-gray-900 text-xs lg:text-sm">Practical strategies for buyers and investors</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openRequirementsForm('Playbook')}
                  className="bg-[#00458b] text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Download Playbook
                </button>
                <button
                  onClick={() => openConsultation('Strategy Call')}
                  className="border-2 border-[#00458b] text-[#00458b] px-5 py-2 rounded-md text-sm font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200"
                >
                  Book a Strategy Call
                </button>
              </div>
            </div>

            <div className="relative h-[450px] rounded-lg overflow-hidden">
              <Image
                src="/playbook/iamge-playbook-cover-1.png"
                alt="UAE Real Estate Playbook 2026-2035"
                fill
                className="object-cover"
              />
            </div>
            
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              How Can We Help You in Dubai?
            </h2>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              Choose your path, and we'll guide you to the right property solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            
            <div 
              className="group rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full bg-white"
              onClick={() => openRequirementsForm('Buy')}
            >
              <div className="relative h-44 overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1514940403093-cccd37db1528?q=80&w=878&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Buy a Home"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Buy a Home</h3>
                  <p className="text-gray-600 text-xs mb-3">Find the right villa or apartment with professional guidance in every negotiation.</p>
                </div>
                <button className="text-[#00458b] font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                  Start Search
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div 
              className="group rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full bg-white"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.location.href = '/investors';
                }
              }}
            >
              <div className="relative h-44 overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1640808476588-e96ae8e7a419?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Invest in Dubai"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Invest in Dubai</h3>
                  <p className="text-gray-600 text-xs mb-3">Get curated opportunities based on your budget and risk profile.</p>
                </div>
                <button className="text-[#00458b] font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Opportunities
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div 
              className="group rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full bg-white"
              onClick={() => openRequirementsForm('Rent')}
            >
              <div className="relative h-44 overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Lease & Manage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Lease & Manage</h3>
                  <p className="text-gray-600 text-xs mb-3">Maximise rental income with professional leasing and tenant management.</p>
                </div>
                <button className="text-[#00458b] font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                  Talk to Expert
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div 
              className="group rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full bg-white"
              onClick={() => openRequirementsForm('Sell')}
            >
              <div className="relative h-44 overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1640877268187-2fa6b2ed7a5f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Sell With a Strategy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">Sell With a Strategy</h3>
                  <p className="text-gray-600 text-xs mb-3">Data-backed pricing and professional marketing to secure serious buyers.</p>
                </div>
                <button className="text-[#00458b] font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                  Get Strategy
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus Areas */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Our Focus Areas in Dubai
            </h2>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              We specialise in key segments of the Dubai market with dedicated advisors for each.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            
            <Link href="/properties" className="group">
              <div className="rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 h-full cursor-pointer bg-white">
                <div className="relative h-44 overflow-hidden bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1737898378296-94dc316cd443?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Residential Homes"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Residential Homes</h3>
                  <p className="text-gray-600 text-xs mb-4">Apartments and villas for end-users and long-term investors.</p>
                  <button className="text-[#00458b] font-semibold inline-flex items-center gap-1 text-xs group-hover:gap-2 transition-all">
                    View Services
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Link>

            <Link href="/off-plan" className="group">
              <div className="rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 h-full cursor-pointer bg-white">
                <div className="relative h-44 overflow-hidden bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1737475988869-59aaa06ebb83?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Off-Plan & Projects"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Off-Plan & New Projects</h3>
                  <p className="text-gray-600 text-xs mb-4">Access to new launches, allocations and early-stage opportunities.</p>
                  <button className="text-[#00458b] font-semibold inline-flex items-center gap-1 text-xs group-hover:gap-2 transition-all">
                    Explore Opportunities
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Link>

            <Link href="/commercial-real-estate-dubai" className="group">
              <div className="rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 h-full cursor-pointer bg-white">
                <div className="relative h-44 overflow-hidden bg-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1706074740295-d7a79c079562?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Commercial & Offices"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Commercial & Offices</h3>
                  <p className="text-gray-600 text-xs mb-4">Office, retail and industrial spaces for businesses and investors.</p>
                  <button className="text-[#00458b] font-semibold inline-flex items-center gap-1 text-xs group-hover:gap-2 transition-all">
                    See Solutions
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Network */}
      <section id="partners" className="py-12 lg:py-16 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Our Partner Network in Dubai
            </h2>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto">
              We work with leading platforms, developers and specialist partners so your transaction is supported from search to handover.
            </p>
          </div>

          {/* Partner Groups */}
          <div className="space-y-12">
            {partnerGroups.map((group) => (
              <div key={group.id}>
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{group.label}</h3>
                  <p className="text-xs text-gray-600">{group.subtext}</p>
                </div>

                {group.featured ? (
                  // Featured card for TrueBuild
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-w-md mx-auto">
                    {group.partners.map((partner) => (
                      <a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center">
                        <div className="mb-4 flex items-center justify-center h-16">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-h-12 object-contain"
                            title={partner.tooltip}
                          />
                        </div>
                        <h4 className="text-base font-semibold text-gray-900 mb-2">{partner.name}</h4>
                        <p className="text-gray-600 text-xs">{partner.description}</p>
                      </a>
                    ))}
                  </div>
                ) : (
                  // Grid for other partners
                  <div className={`grid gap-4 ${
                    group.columns === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
                  }`}>
                    {group.partners.map((partner) => (
                      <a
                        key={partner.name}
                        href={partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
                        title={partner.tooltip}
                        aria-label={partner.tooltip}
                      >
                        <div className="flex items-center justify-center h-12 mb-2 w-full">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="max-h-10 object-contain max-w-full"
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-900 text-center line-clamp-2">{partner.name}</p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedTopic={consultationTopic}
      />

      <Footer />
    </main>
  );
}