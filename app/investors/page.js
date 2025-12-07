"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function InvestorsPage() {
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const scrollToForm = () => {
    window.location.href = '/contact-us?topic=Invest';
  };

  const bookConsultation = () => {
    window.location.href = '/contact-us?topic=Invest';
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                Property Investment in Dubai
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Invest in Dubai Property With a Clear, Data-Backed Strategy
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We help investors and family offices build and optimize Dubai portfolios across residential, off-plan and commercial assets – with a focus on yield, risk and exit options, not marketing noise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={scrollToForm}
                  className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Share Your Investment Brief
                </button>
                <button
                  onClick={bookConsultation}
                  className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200"
                >
                  Book an Investment Consultation
                </button>
              </div>
              <p className="text-sm text-gray-500">
                No mass mailing lists. No hype launches. Just a focused discussion around your goals.
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden">
              <Image
                src="/investors/image-invest-hero-1.png"
                alt="Investor analyzing Dubai property data"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/investors/buy-off-plan-strip-1.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Why Investors Work With RE/MAX HUB
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Residential, Off-Plan & Commercial</h3>
              <p className="text-sm text-gray-600">Support across multiple asset types and strategies.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Data-Driven Decisions</h3>
              <p className="text-sm text-gray-600">We use transaction data and market tools to benchmark pricing and yields.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Local & Global Clients</h3>
              <p className="text-sm text-gray-600">Advising GCC, European and overseas investors, including family offices.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">End-to-End Execution</h3>
              <p className="text-sm text-gray-600">From sourcing to transfer, leasing and basic portfolio oversight.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Is This Page For You as an Investor?
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-8 rounded-xl border-l-4 border-[#00458b]">
              <h3 className="text-xl font-bold text-gray-900 mb-6">You're in the right place if:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You're looking at Dubai property as an investment, not a random holiday home.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You want help choosing between ready, off-plan and commercial options.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You care about yield, risk, liquidity and exit, not just glossy renders.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You'd rather work with one advisor than ten agents spamming WhatsApp.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl border-l-4 border-gray-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Probably not for you if:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You're just window-shopping with no clear budget or timeline.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You're only chasing the latest hype launch on social media.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You want guaranteed, fixed returns with no risk at all.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You're not open to realistic feedback on pricing and expectations.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative h-[300px] rounded-xl overflow-hidden mb-8">
            <Image
              src="/investors/invest-fit-1.png"
              alt="Investor profiles"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Share My Investment Brief
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Our Approach to Dubai Property Investment
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="space-y-8">
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#00458b]">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Goal-Driven</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We start with your objectives – income, capital growth, diversification or future use – then work backwards.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#00458b]">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Data & Reality-Checked</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We benchmark prices, rents and yields using real transaction and listing data, not just "market is hot" comments.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#00458b]">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Risk-Aware</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We highlight downside scenarios (vacancy, delays, oversupply) and help you size positions appropriately.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={bookConsultation}
                  className="text-[#00458b] font-semibold hover:underline"
                >
                  See how this applies to your situation →
                </button>
              </div>
            </div>

            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/investors/IMAGE-INVEST-APPROACH-1.png"
                alt="Investment framework illustration"
                fill
                className="object-contain bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Investment Strategies We Work With
          </h2>

          <div className="relative h-[300px] rounded-xl overflow-hidden mb-12">
            <Image
              src="/investors/image-invest-strategies-1.png"
              alt="Investment strategies"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/buy-residential-dubai" className="bg-white p-8 rounded-xl border border-gray-200 hover:border-[#00458b] hover:shadow-lg transition-all duration-200 group">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00458b] transition-colors">
                <svg className="w-6 h-6 text-[#00458b] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00458b] transition-colors">Buy-to-Let Residential</h3>
              <p className="text-gray-600 leading-relaxed">
                Ready apartments and villas with established rental demand in key communities.
              </p>
            </Link>

            <Link href="/off-plan" className="bg-white p-8 rounded-xl border border-gray-200 hover:border-[#00458b] hover:shadow-lg transition-all duration-200 group">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00458b] transition-colors">
                <svg className="w-6 h-6 text-[#00458b] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00458b] transition-colors">Off-Plan & Development-Style Plays</h3>
              <p className="text-gray-600 leading-relaxed">
                Launch and early-phase projects with structured payment plans and clear risk disclosures.
              </p>
            </Link>

            <Link href="/commercial-real-estate-dubai" className="bg-white p-8 rounded-xl border border-gray-200 hover:border-[#00458b] hover:shadow-lg transition-all duration-200 group">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00458b] transition-colors">
                <svg className="w-6 h-6 text-[#00458b] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00458b] transition-colors">Income-Producing Commercial</h3>
              <p className="text-gray-600 leading-relaxed">
                Office, retail and warehouse assets with existing tenants and yield history.
              </p>
            </Link>

            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-[#00458b] hover:shadow-lg transition-all duration-200 group">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00458b] transition-colors">
                <svg className="w-6 h-6 text-[#00458b] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00458b] transition-colors">Portfolio & Family Office Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Helping families and investors structure, grow and manage a mix of Dubai assets over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Data, Not Just Opinions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine on-the-ground deal experience with data from Dubai transactions and listing platforms.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/investors/image-offplan-playbook-1.png"
                alt="Analytics and market data"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                We use tools like transaction databases and listing analytics to understand actual price bands, achievable rents and yield ranges in different areas. That doesn't remove risk, but it keeps you out of fantasy pricing.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-gray-700">Compare asking vs achieved prices in your target communities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-gray-700">Benchmark expected rent and gross yield before you commit.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="text-gray-700">Understand where supply is building up and where it's constrained.</span>
                </li>
              </ul>

              <button
                onClick={bookConsultation}
                className="text-[#00458b] font-semibold hover:underline"
              >
                Ask us to run numbers on a property you're considering →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How We Work With You as an Investor
          </h2>

          <div className="relative h-[300px] rounded-xl overflow-hidden mb-12">
            <Image
              src="/investors/image-invest-process-1.png"
              alt="Investment process timeline"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl border-l-4 border-[#00458b]">
              <div className="text-3xl font-bold text-[#00458b] mb-4">01</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Investment Brief & Constraints</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We clarify budget, leverage, target yield, risk tolerance and holding period.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-l-4 border-[#00458b]">
              <div className="text-3xl font-bold text-[#00458b] mb-4">02</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Market Scan & Shortlist</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We present a shortlist of options across ready, off-plan and commercial – with pros, cons and numbers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-l-4 border-[#00458b]">
              <div className="text-3xl font-bold text-[#00458b] mb-4">03</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Due Diligence & Execution</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We support viewings, documentation review, price and term negotiation, and coordination to transfer.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-l-4 border-[#00458b]">
              <div className="text-3xl font-bold text-[#00458b] mb-4">04</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Leasing, Management & Next Moves</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We help with leasing (if applicable) and plan your next acquisition or exit based on performance.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={bookConsultation}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Walk Me Through the Process
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Examples of How We've Helped Investors
          </h2>

          <div className="relative h-[300px] rounded-xl overflow-hidden mb-12">
            <Image
              src="/investors/image-invest-snapshot-1.png"
              alt="Investment case studies"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">GCC Client – Income-Focused</h3>
              <p className="text-gray-700 leading-relaxed">
                Shifted from one underperforming unit to two better-located apartments with stronger occupancy history and more balanced yield.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">European Client – Off-Plan Allocation</h3>
              <p className="text-gray-700 leading-relaxed">
                Structured an off-plan allocation in a waterfront project with a realistic payment plan and clear exit options around handover.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Local Business Owner – Diversification</h3>
              <p className="text-gray-700 leading-relaxed">
                Helped a business owner move from all residential exposure into a mix of residential plus a small leased commercial unit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How We Help You Think About Risk
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/investors/image-invest-risk-1.png"
                alt="Risk management"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                We're not here to pretend risk doesn't exist. We'd rather talk about it upfront and structure your portfolio around it.
              </p>

              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700">Discuss downside scenarios: vacancy, price drops, delays, FX risk.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700">Avoid over-exposure to a single project, developer or micro-location.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700">Size investments sensibly relative to your overall net worth and liquidity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700">Use conservative assumptions on rents, voids and exit pricing.</span>
                </li>
              </ul>

              <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-gray-400">
                <p className="text-sm text-gray-600">
                  <strong>Disclaimer:</strong> We're not a regulated investment advisor. We help you make better-informed decisions within your own risk appetite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            What Our Investor Clients Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-4">
                  "I already owned property in Saudi and London but didn't know where to start in Dubai. RE/MAX HUB helped me avoid a couple of overhyped launches and instead buy two rented apartments in established communities. The numbers they showed me on rent and service charges were very close to what I'm actually seeing now."
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">Hassan A.</p>
                <p className="text-sm text-gray-600">Investor from Saudi Arabia</p>
                <p className="text-xs text-[#00458b] mt-2">Focus: Buy-to-let residential in established communities</p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-4">
                  "Every developer presentation I saw made it sound like I had to 'book now or miss out'. RE/MAX HUB took the emotion out of it and compared three projects side by side: payment plans, handover risk, expected rents and possible exits. I booked one unit where the logic was clear, not because of the loudest marketing campaign."
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">Anna K.</p>
                <p className="text-sm text-gray-600">Investor from U.K.</p>
                <p className="text-xs text-[#00458b] mt-2">Focus: Off-plan waterfront apartment</p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed mb-4">
                  "Most of my money was tied up in my own business and one villa. I wanted more income but didn't want to become a full-time landlord. The team helped me buy a small leased commercial unit and one apartment that they then helped rent out. I now have two extra income streams without taking my eye off the business."
                </p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">Farid M.</p>
                <p className="text-sm text-gray-600">Business owner in Dubai</p>
                <p className="text-xs text-[#00458b] mt-2">Focus: Mixed small portfolio (commercial + residential)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investor FAQs for Dubai Property
            </h2>
          </div>

          <div className="relative mb-12">
            <div className="absolute inset-0 opacity-5">
              <Image
                src="/investors/buy-residential-dubai-faq-background.png"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="relative space-y-4">
              {[
                {
                  q: "Is now a good time to invest in Dubai property?",
                  a: "There is no universal \"good time\" – it depends on what you're buying, why you're buying it and how long you plan to hold. Dubai has cycles like any market. If you're chasing a short-term flip in a hot project, timing is everything and risk is high. If you're building a medium- to long-term portfolio with realistic yield assumptions, the question shifts from \"is now perfect?\" to \"does this specific deal at this price make sense for me?\"."
                },
                {
                  q: "What kind of returns can I expect in Dubai?",
                  a: "You'll see all sorts of promises, but reality is more boring: Ready residential yields often in the mid-single to high-single digits depending on area, building and price you pay. Off-plan return is heavily linked to your entry price, payment plan and where the market is at handover and beyond. Commercial yields can be higher but come with more vacancy and tenant risk. Any projection should include service charges, realistic rents, void periods and transaction costs. If someone shows you double-digit returns with no risk and no detail, that's marketing, not analysis."
                },
                {
                  q: "Should I buy ready, off-plan or commercial as my first Dubai investment?",
                  a: "It depends on your time horizon, risk tolerance, and need for income vs growth. As a rough guide: If you want immediate income and visibility, start with ready residential. If you have a longer horizon and want to stage payments, consider off-plan (with eyes open on risk). If you're comfortable with more complexity and vacancy risk, commercial can make sense. We usually walk through all three with actual examples before recommending what fits you."
                },
                {
                  q: "How much capital do I need to start?",
                  a: "You can enter the market with anything from the low millions of AED for a smaller apartment, up to much larger budgets for villas and commercial assets. The real question is what percentage of your net worth you should allocate, and how leveraged you want to be. You don't want your first Dubai property to be so large that a void or price move keeps you up at night."
                },
                {
                  q: "Can I invest if I don't live in Dubai?",
                  a: "Yes. Many of our clients are overseas investors. You don't need to be a resident to buy in freehold areas. You do, however, need to get comfortable with: Remote process (video calls, POA where needed), who is representing you on the ground (agent, lawyer, property manager), and currency and banking logistics (moving money, mortgage eligibility if any). We structure the process so you don't need to fly in for every step."
                },
                {
                  q: "How risky is off-plan compared to buying ready?",
                  a: "Off-plan carries extra risks: Construction delays or changes, market shifts between launch and handover, and over-supply in a specific cluster. You get potential benefits like payment plans and early pricing, but you trade off certainty and visibility. Ready property gives you more clarity on the actual building, community and rent today. We treat off-plan as one tool, not the default answer for every investor."
                },
                {
                  q: "How do you help me avoid overpaying?",
                  a: "We look at: Recent transaction data in that building/area, current asking prices and where the deal sits in that range, realistic rent today (not brochure rent), and comparable options you could buy instead with the same money. If the numbers don't stack up, we say so. Sometimes the best move is not to buy the thing you came asking about."
                },
                {
                  q: "Who handles leasing and management after I buy?",
                  a: "You have options: We can help you lease the property through our brokerage and partner network. For ongoing management, you can choose a third-party property manager or handle it yourself if you're local and have the time. For commercial assets, we help you understand tenant quality and lease terms, then you decide how hands-on you want to be. We don't force you into a bundled management product, but we do help you understand what needs to be handled."
                },
                {
                  q: "What are the main costs and taxes I need to be aware of as an investor?",
                  a: "Key items to factor in: Dubai Land Department fees on purchase, agency fees, service charges and maintenance, utilities/chiller (where applicable), any mortgage-related costs (valuation, processing, interest), and any tax obligations in your home country related to foreign property income or gains. Dubai itself doesn't have a recurring property tax like some countries, but that doesn't mean your home jurisdiction ignores the asset. You should speak to a tax advisor on your side for that piece."
                },
                {
                  q: "What's your role – are you just another broker?",
                  a: "We earn fees like any brokerage, but we don't pretend we have no conflicts. The difference is: We're happy to say \"this deal doesn't make sense\" and walk away. We look across ready, off-plan and commercial, not just whichever stock we're holding. We encourage you to think in terms of portfolio and risk, not just \"nice unit\". If you want someone to rubber-stamp whatever you've already decided to buy, you don't need us. If you want pushback and structure, that's where we're useful."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-[#00458b] flex-shrink-0 transition-transform ${faqOpen[index] ? 'transform rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {faqOpen[index] && (
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-gradient-to-br from-[#0B2340] to-[#00458b] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/investors/buy-residential-final-cta-background.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build or Refine Your Dubai Property Portfolio?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Share your brief – budget, timeframe, risk appetite, and what you own already – and we'll respond with options that actually match your profile, not a random link dump.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={scrollToForm}
              className="bg-white text-[#00458b] px-8 py-4 rounded-lg text-base font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Share Your Investment Brief
            </button>
            <button
              onClick={bookConsultation}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Book an Investment Consultation
            </button>
          </div>
          <p className="text-sm text-blue-100">
            Prefer WhatsApp? Message us at +971 4 398 3527 with "Investor enquiry" and a quick overview of your goals.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
