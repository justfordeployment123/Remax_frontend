"use client";
import { useState } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Playbook20262035() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    profileType: '',
    budget: '',
    timeframe: '',
    consent: false
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [faqOpen, setFaqOpen] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('download-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const bookConsultation = () => {
    window.location.href = '/contact-us?topic=Invest';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playbook/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                2026-2035 UAE Real Estate Outlook
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                The RE/MAX HUB Definitive Playbook for UAE Real Estate
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                A deep-dive into how we expect Dubai and wider UAE real estate to evolve over the next decade - with practical guidance for end-users, investors and family offices making decisions today.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Data-backed insights on pricing, rents, supply and demand.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Community-level outlook for core Dubai areas and new growth corridors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">Practical strategies for end-users, yield investors and long-term capital.</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={scrollToForm}
                  className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Get the 2026-2035 Playbook
                </button>
                <button
                  onClick={bookConsultation}
                  className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200"
                >
                  Talk to an Advisor
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Free PDF. No spam. We only reach out if your brief matches what we can actually help with.
              </p>
            </div>

            <div className="relative h-[420px] lg:h-[550px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/playbook/IAMGE-PLAYBOOK-COVER-1.png"
                alt="RE/MAX HUB 2026-2035 Playbook Cover"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
            Who This Playbook Is For
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            This isn't a coffee-table brochure. It's written for people making real capital decisions over the next 3–10 years.
          </p>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#00458b]">
              <h3 className="text-xl font-bold text-gray-900 mb-6">You'll get the most value if you are:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">A Dubai or UAE-based homeowner planning upgrades or portfolio changes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">A yield-focused investor deciding where to allocate capital across Dubai communities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">A regional or international investor / family office evaluating long-term themes in UAE real estate.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">A serious agent or advisor who wants a structured view of the coming decade.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl border-l-4 border-gray-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6">This is not for you if:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You're just browsing listings for fun with no intention to buy or invest.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You're only looking for short-term flipping tips and hype.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You want predictions with no nuance, no risk discussion, and guaranteed returns.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src="/playbook/IMAGE-PLAYBOOK-AUDIENCE-1.png"
              alt="Playbook audience"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Get the Playbook Now
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
            What's Inside the 2026-2035 Playbook
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Some of the key chapters and themes we cover:
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[750px] rounded-xl overflow-hidden bg-white p-3">
              <Image
                src="/playbook/IMAGE-PLAYBOOK-CONTENCT-1.png"
                alt="Playbook content overview"
                fill
                className="object-contain bg-white z-1000"
              />
            </div>

            <div className="space-y-4">
              <div className="bg-white p-3 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">1. Macro & Demographics</h3>
                <p className="text-gray-600">Population growth, inflows, and who is actually moving to the UAE.</p>
              </div>

              <div className="bg-white p-3 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">2. Dubai Sub-Markets & Price Bands</h3>
                <p className="text-gray-600">How prime, upper-mid and value segments are likely to behave.</p>
              </div>

              <div className="bg-white p-3 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">3. Rental Market & Yield Outlook</h3>
                <p className="text-gray-600">Where yields may compress, hold, or potentially expand.</p>
              </div>

              <div className="bg-white p-3 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">4. Off-Plan vs Ready Over the Decade</h3>
                <p className="text-gray-600">Supply pipeline, developer behaviour, and risk framing.</p>
              </div>

              <div className="bg-white p-3 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">5. Key Community Spotlights</h3>
                <p className="text-gray-600">Dubai Marina, Downtown, Business Bay, JVC, Dubai Hills Estate, Dubai South and others.</p>
              </div>

              <div className="bg-white p-3 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">6. Commercial, Logistics & Emerging Niches</h3>
                <p className="text-gray-600">Offices, warehouses, flex spaces and new mixed-use hubs.</p>
              </div>

              <div className="bg-white p-3 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-2">7. Playbooks by Profile</h3>
                <p className="text-gray-600">Frameworks for end-users, income investors, and long-term capital allocators.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Want to discuss a specific community or strategy?{' '}
              <button onClick={bookConsultation} className="text-[#00458b] font-semibold hover:underline">
                Book a consultation →
              </button>
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
            A Glimpse of the Analysis Inside
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            The Playbook includes simplified versions of the models and charts we use internally - not to overwhelm you with data, but to frame decisions clearly.
          </p>

          <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
            <Image
              src="/playbook/IMAGE-PLAYBOOK-DASHBOARD-1.png"
              alt="Playbook analytics dashboard"
              fill
              className="object-contain bg-white"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Price & Rent Trend Bands</h3>
              <p className="text-gray-600 leading-relaxed">
                We show how different property bands have behaved historically and outline scenarios for where they may head through 2030 and beyond.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Positioning Matrix</h3>
              <p className="text-gray-600 leading-relaxed">
                A visual comparison of key Dubai communities by price, yield, and lifestyle - highlighting potential over- and under-valued areas.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Off-Plan Supply & Risk View</h3>
              <p className="text-gray-600 leading-relaxed">
                A structured way to look at off-plan pipeline, handover timelines and absorption, broken down by major corridors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="download-form" className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/playbook/IMAGE-PLAYBOOK-COVER-1.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Download the 2026–2035 Playbook
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fill in a few details so we can send you the PDF and, if relevant, connect you with the right advisor for a deeper conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white p-8 rounded-xl border-l-4 border-[#00458b] mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What happens after you submit?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">You'll receive an email with the Playbook PDF within minutes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-gray-700">Your information stays private. We don't share or sell your data.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-gray-700">If your brief matches our expertise, we'll reach out to see if a consultation makes sense.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              {!submitted ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Get the Playbook by Email</h3>

                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors"
                        placeholder="e.g. Omar Al Mansoori"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors"
                        placeholder="e.g. you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors"
                        placeholder="Select your country"
                      />
                    </div>

                    <div>
                      <label htmlFor="profileType" className="block text-sm font-semibold text-gray-700 mb-2">
                        You are: *
                      </label>
                      <select
                        id="profileType"
                        name="profileType"
                        value={formData.profileType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors"
                      >
                        <option value="">Select your profile</option>
                        <option value="End-user / Homebuyer">End-user / Homebuyer</option>
                        <option value="Investor">Investor</option>
                        <option value="Family office / Institutional">Family office / Institutional</option>
                        <option value="Agent / Advisor">Agent / Advisor</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                        Approximate budget (optional)
                      </label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors"
                        placeholder="e.g. AED 1.5M - 5M, or 'Exploring'"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Timeframe you're thinking about
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {['0–6 months', '6–18 months', '18+ months', 'Just researching'].map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="timeframe"
                              value={option}
                              checked={formData.timeframe === option}
                              onChange={handleInputChange}
                              className="text-[#00458b] focus:ring-[#00458b]"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        required
                        className="mt-1 w-4 h-4 text-[#00458b] border-gray-300 rounded focus:ring-[#00458b]"
                      />
                      <label htmlFor="consent" className="text-sm text-gray-600">
                        I agree to receive the Playbook and occasional relevant updates from RE/MAX HUB. I can unsubscribe at any time. *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#00458b] text-white px-6 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Send Me the Playbook'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Playbook Sent</h3>
                  <p className="text-base text-gray-600 mb-6">
                    We've emailed you a link to download the 2026–2035 Playbook. If you don't see it in a few minutes, please check your spam or promotions folder.
                  </p>
                  <p className="text-sm text-gray-600 mb-8">
                    If you'd like to discuss how the insights apply to your specific situation, you can book a strategy call below.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={bookConsultation}
                      className="w-full bg-[#00458b] text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
                    >
                      Book a Strategy Consultation
                    </button>
                    <a
                      href="/"
                      className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg text-base font-semibold hover:bg-gray-50 transition-colors duration-200 inline-block"
                    >
                      Back to RE/MAX HUB Home
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Playbook FAQs
          </h2>

          <div className="space-y-4 mb-12">
            {[
              {
                q: "Is this Playbook free?",
                a: "Yes. It's a free PDF download. We built this because we wanted a resource that reflects how we actually think about the market, not a marketing brochure disguised as analysis. If you find it useful and want to work with us, great. If not, you've still got value from it."
              },
              {
                q: "How long is the Playbook?",
                a: "Around 40–60 pages, depending on final layout. It's structured so you can read it cover-to-cover or jump to the chapters that matter most to you. We've tried to keep it readable without dumbing down the content."
              },
              {
                q: "Will I be added to a mailing list?",
                a: "You'll receive the Playbook by email, and we may send occasional updates if we publish a major revision or relevant market note. You can unsubscribe at any time. We don't sell or share your details, and we won't spam you with property listings."
              },
              {
                q: "Can I share this with my business partner / family / advisor?",
                a: "Yes. We'd prefer you didn't post it publicly or distribute it widely online, but sharing with your immediate decision-making circle is fine. If someone wants their own copy, they can download it from this page."
              },
              {
                q: "Is this going to tell me which property to buy?",
                a: "No. The Playbook is a strategic framework and market outlook, not a 'buy this unit in this building' guide. If you want specific property advice, that's what a consultation is for. The Playbook gives you the context; we help you apply it to your situation."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
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

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Prefer to skip the reading and go straight to a strategy conversation?
            </p>
            <button
              onClick={bookConsultation}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Book a Strategy Consultation
            </button>
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
            Ready to Turn Insights Into a Concrete Plan?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Use the Playbook as context, then work with us to design an actual buying or investment strategy for the next decade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={bookConsultation}
              className="bg-white text-[#00458b] px-8 py-4 rounded-lg text-base font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Book a Strategy Consultation
            </button>
            <button
              onClick={() => window.location.href = '/contact-us?topic=Invest'}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Share Your Investment Requirements
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
