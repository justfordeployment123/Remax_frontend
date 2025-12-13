'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">

        <section className="bg-gradient-to-br from-gray-50 to-white py-8 sm:py-12 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              
              <div>
                <p className="text-[#00458b] font-semibold text-xs sm:text-sm uppercase tracking-wide mb-4">
                  About RE/MAX HUB
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-6">
                  A Dubai-Focused Brokerage Backed by a Global Brand
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8">
                  RE/MAX HUB combines UAE family-business roots, on-the-ground Dubai experience and the global RE/MAX network to deliver advisory-led real estate for end-users, investors and corporates.
                </p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-start">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-[#00458b] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Advisory-first, not listing spam.</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-[#00458b] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Deep focus on Dubai communities and projects.</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 sm:w-6 h-5 sm:h-6 text-[#00458b] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs sm:text-sm lg:text-base text-gray-700">Backed by the global RE/MAX network.</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-4 bg-[#00458b] text-white font-semibold rounded-lg text-xs sm:text-base lg:text-lg hover:bg-[#0B2340] transition-colors w-full sm:w-auto"
                  >
                    Work With Us
                  </Link>
                  <Link 
                    href="/join"
                    className="inline-flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-4 border-2 border-[#00458b] text-[#00458b] font-semibold rounded-lg text-xs sm:text-base lg:text-lg hover:bg-[#00458b] hover:text-white transition-colors w-full sm:w-auto"
                  >
                    Join RE/MAX HUB
                  </Link>
                </div>

                <p className="text-sm text-gray-500 italic">
                  Whether you're a client or an agent, we care more about fit than volume.
                </p>
              </div>

              <div className="relative h-[250px] sm:h-[350px] lg:h-[400px] xl:h-[500px] rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about/image-about-hero-1.png"
                  alt="RE/MAX HUB Team and Office"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12">Our Story</h2>
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-6">
                RE/MAX HUB is operated by Purple Bricks Real Estate LLC, part of a multi-generational family business group with long-standing interests in real estate, textiles and investments in the UAE. We've been on the owner and investor side of the table for years before building a brokerage.
              </p>
              
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-6">
                We created RE/MAX HUB to solve a simple problem: most buyers, tenants and investors in Dubai don't need more listings – they need clearer thinking. The HUB exists to bring together market data, on-the-ground experience and a selective team of agents who can have grown-up conversations about property.
              </p>
              
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-8">
                Instead of chasing volume for the sake of it, we focus on a manageable number of clients, projects and agents where we can actually add value – whether that's a first home, a long-term portfolio acquisition, or a commercial lease aligned with fit-out and growth plans.
              </p>
            </div>

            <div className="bg-gray-50 border-l-4 border-[#00458b] rounded-r-lg p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">What That Means in Practice</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6 text-[#00458b] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base text-gray-700">We say no to deals that don't make sense for the client.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6 text-[#00458b] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base text-gray-700">We look at data, not just developer brochures.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6 text-[#00458b] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base text-gray-700">We're comfortable talking about risk, not just upside.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6 text-[#00458b] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base text-gray-700">We build long-term relationships, not one-off transactions.</span>
                </li>
              </ul>
            </div>

            <div className="mt-12 relative h-[250px] sm:h-[350px] lg:h-[400px] rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/about/image-about-story-1.png"
                alt="Advisory-led property consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Powered by the RE/MAX Global Network</h2>
                
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-6">
                  RE/MAX is one of the world's most recognised real estate brands, with tens of thousands of agents across thousands of offices in over 100 countries. Being part of that network means our clients benefit from established systems, global visibility and cross-border referral channels.
                </p>
                
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed mb-8">
                  RE/MAX HUB is a locally owned and operated franchise. Strategic decisions, hiring and client service are driven from Dubai, by people who actually live and invest here. You get the scale and credibility of the global brand, with the focus of a specialist local team.
                </p>

                <div className="bg-white border-l-4 border-[#00458b] rounded-r-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">What this means for you:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#00458b] mr-2 text-lg">•</span>
                      <span className="text-xs sm:text-sm lg:text-base text-gray-700">Easier cross-border coordination if you're relocating or investing internationally.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00458b] mr-2 text-xl">•</span>
                      <span className="text-gray-700">Access to established best practices in marketing and transaction management.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#00458b] mr-2 text-xl">•</span>
                      <span className="text-gray-700">The reassurance that you're dealing with a brokerage plugged into a global ecosystem, not an isolated shop.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/about/image-about-global-1.png"
                  alt="RE/MAX Global Network"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">Leadership</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-8">
              
              <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:shadow-xl transition-shadow">
                <div className="relative w-full h-72 sm:h-96 lg:h-[420px] mb-4 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src="/topg/iak.PNG"
                    alt="Ismail Abdul Karim"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Ismail Abdul Karim</h3>
                <p className="text-[#00458b] font-semibold mb-3 text-xs sm:text-sm">Group Chairman</p>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                  Ismail Abdul Karim is the founding patriarch of the Group, providing strategic direction and oversight across its real estate, textile, and investment interests. With decades of entrepreneurship in the UAE, he focuses on capital allocation, governance, and long-term value creation for the family and its partners. Ismail chairs the Group's board, mentors the next generation of leaders, and safeguards the organisation's reputation, relationships, and core values.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:shadow-xl transition-shadow">
                <div className="relative w-full h-72 sm:h-96 lg:h-[420px] mb-4 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src="/topg/asif.png"
                    alt="Asif Ismail"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Asif Ismail</h3>
                <p className="text-[#00458b] font-semibold mb-3 text-xs sm:text-sm">Chief Executive Officer</p>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                  As Chief Executive Officer, Asif Ismail leads the Group's overall strategy, growth, and performance. He oversees all business units, driving expansion in income-generating real estate, core trading operations, and diversified financial investments. Asif is responsible for setting commercial priorities, building high-performing teams, and ensuring disciplined execution across the portfolio, while maintaining strong relationships with key stakeholders, banks, and strategic partners.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:shadow-xl transition-shadow">
                <div className="relative w-full h-72 sm:h-96 lg:h-[420px] mb-4 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src="/topg/yahya.png"
                    alt="Yahya Ismail"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Yahya Ismail</h3>
                <p className="text-[#00458b] font-semibold mb-3 text-xs sm:text-sm">Chief Operation Officer</p>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                  As Chief Operating Officer, Yahya Ismail is responsible for turning strategy into execution across the Group's day-to-day activities. He oversees operations, finance, and internal systems, ensuring projects run on time, budgets are controlled, and reporting is accurate and transparent. Yahya focuses on process improvement, risk management, and technology adoption, creating the operational backbone that supports sustainable growth and seamless coordination between the Group's different businesses.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:shadow-xl transition-shadow">
                <div className="relative w-full h-72 sm:h-96 lg:h-[420px] mb-4 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src="/topg/nancy.png"
                    alt="Nancy Gabriel"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Nancy Gabriel</h3>
                <p className="text-[#00458b] font-semibold mb-3 text-xs sm:text-sm">Director of Operations</p>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                  Nancy Gabriel manages the Group's operational workflows, leading cross-functional teams to deliver efficient, consistent service across all departments. She is responsible for implementing policies and procedures, overseeing office and administrative functions, and supporting project delivery for both real estate and corporate initiatives. Nancy focuses on operational excellence, staff development, and continuous improvement, ensuring the organisation's infrastructure can scale with its growth ambitions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">Selected Platforms and Partners</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 text-center mb-16">
              We work with a focused set of platforms and partners to deliver better data, marketing and execution for our clients.
            </p>

            <div className="mb-16">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">Listing & Data Platforms</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-28 sm:h-32">
                  <Image src="/partners/bayout.svg" alt="Bayut" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-28 sm:h-32">
                  <Image src="/partners/property-finder.png" alt="Property Finder" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-28 sm:h-32">
                  <Image src="/partners/reddin.jpeg" alt="REIDIN" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-28 sm:h-32">
                  <Image src="/partners/Geniemap.png" alt="Geniemap" width={120} height={40} className="object-contain" />
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">Developers & Project Partners</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32">
                  <Image src="/partners/Beyond.png" alt="Beyond" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32">
                  <Image src="/partners/binghati.jpeg" alt="Binghatti" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32">
                  <Image src="/partners/damac.png" alt="Damac" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32">
                  <Image src="/partners/Emaar.svg" alt="Emaar" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32">
                  <Image src="/partners/mira.png" alt="Mira" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32">
                  <Image src="/partners/object1.png" alt="Object One" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32">
                  <Image src="/partners/peacehomes.png" alt="Peace Homes" width={120} height={40} className="object-contain" />
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32">
                  <Image src="/partners/sobha.png" alt="Sobha" width={120} height={40} className="object-contain" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">Fit-Out & Design</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-28 sm:h-32">
                  <Image src="/partners/true-build.png" alt="TrueBuild" width={120} height={40} className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12 lg:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">How We Operate</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 text-center mb-16">
              These are the principles we keep coming back to when we make decisions about clients, agents and projects.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              
              <div className="bg-gradient-to-br from-gray-50 to-white border-l-4 border-[#00458b] rounded-r-xl p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Advisory Over Hype</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                  We'd rather talk you out of a bad deal than talk you into a shiny one. Long-term trust beats short-term commission.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white border-l-4 border-[#00458b] rounded-r-xl p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Data Before Opinion</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                  We use transaction data, yield analysis and market context wherever possible. "Feels like a good deal" is not a strategy.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white border-l-4 border-[#00458b] rounded-r-xl p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Fewer, Better Relationships</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                  We don't try to be everything to everyone. We'd rather do deep, consistent work with fewer clients than chase volume.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white border-l-4 border-[#00458b] rounded-r-xl p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Straightforward Communication</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                  Clear, direct conversations about price, risk, timelines and constraints. No sugarcoating, no vague promises.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white border-l-4 border-[#00458b] rounded-r-xl p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Accountability</h3>
                <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                  If we say we'll do something, we track it and follow through. Internally and with clients, we treat commitments like actual commitments.
                </p>
              </div>

              <div className="relative h-full min-h-[200px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/about/image-about-values-1.png"
                  alt="Our Values and Principles"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-[#0B2340] to-[#00458b] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/placeholder-pattern.svg')] bg-repeat"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
                  Ready to Work With Us – or Work With Us as an Agent?
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed">
                  Whether you're planning your next move in Dubai property or thinking about your next move as an agent, the next step is a conversation.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <Link 
                  href="/contact-us"
                  className="inline-flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-5 bg-white text-[#00458b] font-bold rounded-lg text-xs sm:text-base lg:text-lg hover:bg-gray-100 transition-colors w-full"
                >
                  Talk About My Property Plans
                </Link>
                <Link 
                  href="/join"
                  className="inline-flex items-center justify-center px-4 sm:px-8 py-2.5 sm:py-5 border-2 border-white text-white font-bold rounded-lg text-xs sm:text-base lg:text-lg hover:bg-white hover:text-[#00458b] transition-colors w-full"
                >
                  Join RE/MAX HUB as an Agent
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}