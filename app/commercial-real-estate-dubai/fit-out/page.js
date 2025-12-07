"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import {
  Hammer, Ruler, FileCheck, Wrench, Check, ArrowRight,
  Home, Users, Zap, Layout
} from 'lucide-react';

export default function CommercialFitOut() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    leaseStatus: '',
    size: '',
    spaceType: '',
    handoverDate: '',
    budget: '',
    fitoutGoals: '',
    consent: false
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.leaseStatus || 
        !formData.size || !formData.spaceType || !formData.handoverDate || !formData.fitoutGoals || 
        !formData.consent) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fit-outs/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData
        })
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

  const scrollToForm = () => {
    const formElement = document.getElementById('fitout-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const roleLeft = [
    {
      title: 'Workspace Strategy',
      description: 'Aligning location, size and layout with your headcount and growth plans.'
    },
    {
      title: 'Lease & Landlord Coordination',
      description: 'Timing, approvals, access, and ensuring the fit-out plan matches your lease obligations.'
    },
    {
      title: 'Project Framing',
      description: 'Budget ranges, timelines, and phasing so you don\'t overbuild or underbuild.'
    },
    {
      title: 'Partner Introduction',
      description: 'Matching you with fit-out specialists like TrueBuild based on scope and complexity.'
    }
  ];

  const roleRight = [
    {
      title: 'Concept Design & Space Planning',
      description: 'Zoning, workstations, meeting rooms, collaboration and focus areas.'
    },
    {
      title: 'Detailed Drawings & MEP',
      description: 'Ensuring HVAC, electrical and IT actually support your layout.'
    },
    {
      title: 'Authority Approvals',
      description: 'Working within Dubai\'s relevant authorities and building management requirements.'
    },
    {
      title: 'Build, Finishes & Handover',
      description: 'Executing the physical build with agreed materials, quality and timeline.'
    }
  ];

  const examples = [
    {
      title: 'SME Tech Team – 20–30 Staff',
      description: 'Open-plan work area with focus pods, 2–3 meeting rooms, a small boardroom and a decent breakout space – all within a mid-range budget.',
      afterImage: '/commercial-fitout/image-fitout-after-tech-1.png'
    },
    {
      title: 'Client-Facing Office',
      description: 'Reception, waiting area, mix of enclosed offices and meeting rooms, plus a small internal workspace for support staff.',
      afterImage: '/commercial-fitout/image-fitout-after-prof-1.png'
    },
    {
      title: 'Clinic Concept',
      description: 'Customer-facing frontage with clear signage zones, a clean reception, treatment/consult rooms.',
      afterImage: '/commercial-fitout/image-fitout-after-clinic-1.png'
    }
  ];

  const processSteps = [
    {
      number: '1',
      title: 'Brief & Site Walk',
      description: 'We start with your headcount, workflows, brand needs and budget. Then we look at the actual unit or shortlisted spaces to understand constraints and opportunities.',
      icon: Ruler
    },
    {
      number: '2',
      title: 'Concept & Budget Alignment',
      description: 'TrueBuild and our partners prepare concept layouts and mood directions, while we help you match these with realistic budget ranges and phasing options.',
      icon: Layout
    },
    {
      number: '3',
      title: 'Approvals & Technical Planning',
      description: 'Detailed drawings, MEP coordination and authority/building approvals are handled, so the design is buildable and compliant with your lease and regulations.',
      icon: FileCheck
    },
    {
      number: '4',
      title: 'Build, Snagging & Handover',
      description: 'The physical build is executed, with regular updates. We support with oversight at a high level and help you get to practical completion and move-in with minimal drama.',
      icon: Hammer
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
                Commercial Fit-Out in Dubai
              </span>
              
              <h1 className="text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Plan and Build a Workspace That Actually Works
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We help you align location, lease terms and fit-out – then work with partners like TrueBuild to design and build an office or retail space that supports how your team actually operates.
              </p>

              {/* Key bullets */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Integrated view: lease + design + build.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Partners experienced with Dubai approvals and regulations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Focus on function, budget and timeline – not just pretty renders.</span>
                </li>
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToForm}
                  className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Discuss My Fit-Out
                </button>
                
                <Link
                  href="/commercial-real-estate-dubai"
                  className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200 text-center"
                >
                  Looking for space first?
                </Link>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/commercial-fitout/image-fitout-hero-1.png"
                alt="Plan and Build a Workspace That Actually Works"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            How RE/MAX HUB and TrueBuild Work Together
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            You don't just need a contractor. You need someone who understands lease clauses, building rules and business requirements, and can connect that to a practical fit-out plan. That's where we and partners like TrueBuild come in.
          </p>

          <div className="relative h-[500px] rounded-2xl overflow-hidden mb-12">
            <Image
              src="/commercial-fitout/image-fitout-roles-1.png"
              alt="RE/MAX HUB and TrueBuild Partnership"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            
            <div className="bg-white p-8 rounded-xl border-2 border-[#00458b]/20 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What RE/MAX HUB Handles
              </h3>
              <ul className="space-y-4">
                {roleLeft.map((role, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-[#00458b] rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{role.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl border-2 border-green-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What TrueBuild & Partners Handle
              </h3>
              <ul className="space-y-4">
                {roleRight.map((role, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{role.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-[#00458b] text-center">
            <p className="text-gray-700 italic">
              We're not trying to be everything. We stay in our lane on advisory and coordination, and work with specialists on design and build.
            </p>
          </div>

        </div>
      </section>

      {/* Before / After Examples */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            From Shell & Core to Working Office
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Whether you're moving into shell & core, upgrading from a basic fit-out or reconfiguring your current space, the goal is the same: a workspace that supports your team and client experience, within a clear budget and timeline.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-gray-100 p-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">
                    {example.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-3">
                    {example.description}
                  </p>
                </div>
                <div className="relative h-[300px] bg-gray-200">
                  <Image
                    src={example.afterImage}
                    alt={example.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            How the Fit-Out Process Works
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            A simplified view of how we and partners like TrueBuild typically take a project from initial idea to handover.
          </p>

          <div className="relative h-[350px] rounded-2xl overflow-hidden">
            <Image
              src="/commercial-fitout/image-fitout-process-1.png"
              alt="Fit-Out Process"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-[#00458b]/20 shadow-sm">
                  <div className="w-12 h-12 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Form Section */}
      <section id="fitout-form" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Discuss Your Fit-Out Plan
          </h2>

          {submitted ? (
            <div className="max-w-2xl mx-auto bg-green-50 p-12 rounded-xl border-2 border-green-200 text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You – Enquiry Received
              </h3>
              <p className="text-lg text-gray-700 mb-8">
                We've received your fit-out enquiry. A member of the RE/MAX HUB team will review your brief and contact you to discuss location, budget and the best partner setup (including TrueBuild where appropriate).
              </p>
              <Link
                href="/commercial-real-estate-dubai"
                className="inline-block bg-[#00458b] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Explore Commercial Spaces
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Copy */}
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Whether you've already signed a lease or are still comparing buildings, we can help you frame the fit-out properly – so you don't sign something that's expensive or painful to build.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Early advice on layout and budget before you lock in a unit.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Honest view on what's realistic in your budget and timeframe.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-1" />
                    <span className="text-gray-700">Introduction to TrueBuild and other fit-out partners when the scope is clear.</span>
                  </li>
                </ul>
              </div>

              {/* Right Column - Form */}
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Share Your Fit-Out Requirements
                </h3>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Sarah Ahmed"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. ABC Technologies FZ-LLC"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. you@example.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Mobile / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +971 5X XXX XXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                      required
                    />
                  </div>

                  {/* Lease Status */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Have you already leased a space? *
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="leaseStatus"
                          value="Yes, we have a lease signed"
                          checked={formData.leaseStatus === 'Yes, we have a lease signed'}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-[#00458b]"
                          required
                        />
                        <span className="ml-2 text-gray-700">Yes, we have a lease signed</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="leaseStatus"
                          value="Shortlisted but not signed"
                          checked={formData.leaseStatus === 'Shortlisted but not signed'}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-[#00458b]"
                        />
                        <span className="ml-2 text-gray-700">Shortlisted but not signed</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="leaseStatus"
                          value="Still looking"
                          checked={formData.leaseStatus === 'Still looking'}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-[#00458b]"
                        />
                        <span className="ml-2 text-gray-700">Still looking</span>
                      </label>
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Approximate Size (sq ft) *
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      placeholder="e.g. 2,500 sq ft"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                      required
                    />
                  </div>

                  {/* Space Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Type of Space *
                    </label>
                    <select
                      name="spaceType"
                      value={formData.spaceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                      required
                    >
                      <option value="">Select space type</option>
                      <option value="Office">Office</option>
                      <option value="Retail">Retail</option>
                      <option value="Clinic / Medical">Clinic / Medical</option>
                      <option value="Warehouse / Industrial">Warehouse / Industrial</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Handover Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Target Handover / Move-In Date *
                    </label>
                    <input
                      type="text"
                      name="handoverDate"
                      value={formData.handoverDate}
                      onChange={handleInputChange}
                      placeholder="e.g. Q4 2026 or specific month"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                      required
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Indicative Fit-Out Budget
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder="e.g. AED 400–600k, or 'Exploring ranges'"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                    />
                  </div>

                  {/* Fit-Out Goals */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Tell us about your fit-out goals *
                    </label>
                    <textarea
                      name="fitoutGoals"
                      value={formData.fitoutGoals}
                      onChange={handleInputChange}
                      placeholder="Headcount, ways of working (open plan vs more enclosed), any must-have areas (boardroom, client lounge, storage, etc.)"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]"
                      required
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-[#00458b] mt-1"
                      required
                    />
                    <label className="text-sm text-gray-700">
                      I agree to be contacted by RE/MAX HUB regarding my fit-out enquiry and understand my details may be shared with selected fit-out partners where relevant. *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00458b] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#003366] transition-colors duration-200 disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Fit-Out Enquiry'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[#00458b] to-[#003366] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/commercial-fitout/image-fitout-process-1.png"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Plan Your Fit-Out?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Share your brief, and let's work with TrueBuild and partners to build a workspace that actually works for your team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="bg-white text-[#00458b] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Discuss My Fit-Out
            </button>
            
            <Link
              href="/commercial-real-estate-dubai"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#00458b] transition-colors duration-200"
            >
              Explore Commercial Spaces
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
