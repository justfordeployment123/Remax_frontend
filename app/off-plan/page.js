"use client";
import { useState } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ConsultationModal from '../../components/ConsultationModal';
import RequirementsModal from '../../components/RequirementsModal';
import { Building2, CheckCircle, Shield, TrendingUp, FileText, Users } from 'lucide-react';

export default function OffPlanDubai() {
  const [faqOpen, setFaqOpen] = useState({});
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const shareRequirements = () => {
    setIsRequirementsModalOpen(true);
  };

  const bookConsultation = () => {
    setIsConsultationModalOpen(true);
  };

  const downloadPlaybook = () => {
    window.location.href = '/playbook-2026-2035';
  };

  // Featured projects - dummy data for now
  const featuredProjects = [
    {
      id: 1,
      developer: 'Emaar',
      name: 'Creek Beach Residences',
      location: 'Dubai Creek Harbour',
      bullets: [
        '60/40 post-handover payment plan',
        'Handover Q4 2027',
        'Waterfront + community amenities'
      ]
    },
    {
      id: 2,
      developer: 'Sobha',
      name: 'Sobha Seahaven',
      location: 'Dubai Harbour',
      bullets: [
        '70/30 payment plan',
        'Handover Q2 2028',
        'Beach access + luxury finishes'
      ]
    },
    {
      id: 3,
      developer: 'Binghatti',
      name: 'Burj Binghatti Jacob & Co',
      location: 'Business Bay',
      bullets: [
        '80/20 payment plan',
        'Handover Q1 2027',
        'Iconic design + prime location'
      ]
    }
  ];

  const developers = [
    { name: 'Emaar', description: 'Large master-planned communities and strong brand recognition.' },
    { name: 'Sobha', description: 'High-spec finishes and integrated communities.' },
    { name: 'Damac', description: 'Diverse portfolio across Dubai with varied price points.' },
    { name: 'Binghatti', description: 'Distinctive designs and active pipeline across Dubai.' },
    { name: 'Beyond', description: 'Focused developer with niche projects.' },
    { name: 'Mira', description: 'Family-oriented communities with strong amenities.' },
    { name: 'Object One', description: 'Boutique developments with unique positioning.' },
    { name: 'Peace Homes', description: 'Value-focused projects in emerging areas.' }
  ];

  const faqs = [
    {
      q: "How safe is buying off-plan in Dubai?",
      a: "Safer than it used to be, but not risk-free. Dubai now requires most off-plan projects to be registered with RERA, with buyer funds paid into an escrow account and released to the developer in stages linked to construction progress. That reduces outright fraud risk significantly. The real risks today are delays, changes in market conditions, and overpaying for hype. If you choose a reputable developer, a properly registered project and a sensible payment plan – and you're not banking on a quick flip – off-plan can be a reasonable play. But you should still treat it as a medium- to long-term commitment, not a guaranteed shortcut to fast profits."
    },
    {
      q: "What happens if the project is delayed?",
      a: "Delays are not unusual with off-plan. Contracts usually give the developer some flexibility on timelines, and only after a certain grace period do compensation or cancellation rights kick in. What happens in practice depends on: the developer's policy (some may offer alternative units, small compensation, or revised handover dates), the exact wording of your SPA (sale and purchase agreement), and whether the delay is due to normal construction issues or more serious problems. In a normal delay scenario, you wait longer and your payment schedule may shift. In more serious cases (e.g. stalled projects), RERA and the escrow framework are meant to step in to restructure, cancel or transfer the project. You shouldn't assume 'it will be fine because it's Dubai' – you should assume delays are possible and plan your timelines and financing accordingly."
    },
    {
      q: "How do escrow and RERA protect me?",
      a: "When a project is properly registered: your payments should go into a RERA-approved escrow account, not directly into the developer's general account. The funds are released in stages, tied to verified construction progress, which reduces the risk of your money being diverted elsewhere. RERA (Real Estate Regulatory Agency) oversees project registration, escrow, and compliance with key rules. In extreme cases (cancelled or severely troubled projects), RERA can step in to restructure or liquidate the project through official channels. This doesn't mean you can't lose time or face inconvenience, but it does mean you're not simply wiring large sums to an unregulated entity with no oversight. The protection is structural – you still need to choose decent developers and projects, and read your contract."
    },
    {
      q: "Can non-residents buy off-plan?",
      a: "Yes. Non-residents can buy off-plan property in designated freehold areas in Dubai. You don't need a UAE residence visa to purchase, and many developers specifically target overseas buyers. The main differences for non-residents are: mortgage options may be more limited or require higher down payments, you may rely more heavily on power of attorney and remote signing for some steps, and you should be extra careful about who is representing you on the ground – agent, lawyer, or both. We regularly work with non-resident buyers and can structure the process so you don't have to be physically in Dubai for every step."
    },
    {
      q: "How do off-plan payment plans work?",
      a: "Most off-plan deals follow a staged payment structure: an initial booking fee / down payment on reservation and signing the SPA, several construction-linked installments (e.g. at 10%, 30%, 60% completion), a larger handover payment when the unit is ready and you receive keys, and some projects offer post-handover payment plans, where the last chunk is spread over 1–5 years after handover. The key is to map the schedule against your actual cashflow and financing. It's not enough to see '60/40' and think it's easy – you need to know when each amount is due and what happens if you're late."
    },
    {
      q: "Can I sell before handover?",
      a: "Often yes, but not always and not on your terms alone. Many developers allow assignment / resale before handover once you've paid a certain percentage of the purchase price (for example, 30–40%). Some may charge administrative or NOC fees for the transfer, and they may have rules about pricing or marketing. You also have to consider market reality: just because you can resell doesn't mean there's strong demand at your desired price. Flipping off-plan is not a guaranteed strategy. We treat 'can I exit before handover?' as one scenario in your plan, not the entire thesis."
    },
    {
      q: "What are the main extra costs when buying off-plan?",
      a: "Beyond the headline property price and payment plan, you should factor in: Dubai Land Department (DLD) fee (a percentage of the purchase price – often 4% of the net price, though developers sometimes run 'DLD waived' offers), Oqood / registration fees for off-plan registration, agency fees (if applicable, depending on how the deal is structured), bank / mortgage fees if you are financing (valuation fees, processing fees, etc.), and future service charges once the building is operational. The exact numbers depend on the project and structure, but if you're not budgeting for these, you're not looking at the real cost."
    },
    {
      q: "How do I know if a developer is 'good' or not?",
      a: "Ignore the glossy brochure and look at: past projects – Did they deliver on time or with long delays? What's the actual build quality like if you visit today? Service charge levels – Are existing owners complaining about high charges for average service? Resale and rental performance – How have earlier projects performed in the market compared to peers? How they handle issues – Snagging, defects, communication during delays. We usually shortlist developers based on track record first, then look at specific projects. If you start from hype and ads, you're doing it backwards."
    },
    {
      q: "Is off-plan better than buying a ready property?",
      a: "It depends on your situation, not on what's being marketed this month. Off-plan can be better if: you want payment flexibility and a lower initial cash outlay, you're comfortable with waiting and can tolerate construction risk, and you're targeting new communities or upcoming areas. Ready can be better if: you need to move in or rent out quickly, you want to see exactly what you're buying – building, community, views, and you prefer certainty on timelines and actual live market performance. We usually walk clients through both routes with real numbers and timelines before recommending anything. If someone is only pushing off-plan or only pushing ready, they're selling their inventory, not advising you."
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                Buying Off-Plan in Dubai
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Invest in Dubai Off-Plan With a Clear Strategy
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We help you choose the right projects, understand payment plans and manage risk-so you're not just buying a brochure and a promise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={shareRequirements}
                  className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Share Your Off-Plan Requirements
                </button>
                <button
                  onClick={bookConsultation}
                  className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200"
                >
                  Book an Off-Plan Strategy Call
                </button>
              </div>

              <p className="text-sm text-gray-500">
                We work with multiple developers, not just one. No pressure, no spam.
              </p>
            </div>

            <div className="relative h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/off-plan/buy-off-plan-hero.png"
                alt="Dubai off-plan lifestyle and construction"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="relative py-16 bg-[#0B2340] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/off-plan/buy-off-plan-strip-1.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Off-Plan Buyers Work With RE/MAX HUB
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <Building2 className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-3">Multiple Developers</h3>
              <p className="text-blue-100 leading-relaxed">
                We work across projects from Emaar, Sobha, Damac, Binghatti, Beyond and more.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <FileText className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-3">Data & Due Diligence</h3>
              <p className="text-blue-100 leading-relaxed">
                We review masterplans, payment plans and historical track records before recommending anything.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <CheckCircle className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold mb-3">End-to-End Support</h3>
              <p className="text-blue-100 leading-relaxed">
                From early launch allocations to handover and leasing/resale strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Help You Choose the Right Off-Plan Project
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A structured process that balances opportunity and risk.
            </p>
          </div>

          <div className="relative h-[300px] rounded-xl overflow-hidden mb-12">
            <Image
              src="/off-plan/buy-off-plan-process-1.png"
              alt="Off-plan process timeline"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#00458b]">
              <div className="text-4xl font-bold text-[#00458b] mb-3">01</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Strategy & Budget</h3>
              <p className="text-gray-600 leading-relaxed">
                Clarify your goal (home vs investment), risk tolerance, budget and time horizon.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#00458b]">
              <div className="text-4xl font-bold text-[#00458b] mb-3">02</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Project & Developer Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                We shortlist projects and developers that match your profile, showing pros/cons-not just launch hype.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#00458b]">
              <div className="text-4xl font-bold text-[#00458b] mb-3">03</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Payment Plan & Contract Review</h3>
              <p className="text-gray-600 leading-relaxed">
                We explain the payment schedule, escrow, DLD registration and key contract points in plain English.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#00458b]">
              <div className="text-4xl font-bold text-[#00458b] mb-3">04</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Construction Updates & Exit Plan</h3>
              <p className="text-gray-600 leading-relaxed">
                We stay involved through construction, handover and help you plan leasing or exit when the time is right.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={bookConsultation}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Talk Through the Off-Plan Process
            </button>
          </div>
        </div>
      </section>

      {/* Is Off-Plan Right for You */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Is Off-Plan Actually Right for You?
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-8 rounded-xl border-l-4 border-[#00458b]">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Off-Plan may be a good fit if:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You have a 2–7 year horizon and don't need to move in immediately.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You want payment plans or lower entry price vs ready property.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You're comfortable with some construction and timeline risk.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">You care about new communities, amenities and facilities.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl border-l-4 border-gray-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Off-Plan is probably not for you if:</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You need to move in within the next 6–12 months.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You're depending on immediate rental income.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You can't tolerate construction delays or design changes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-600">You're chasing "quick flip" rumors more than fundamentals.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <Image
              src="/off-plan/buy-off-plan-fit-1.png"
              alt="Buyer reviewing off-plan model"
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center">
            <button
              onClick={shareRequirements}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Share My Off-Plan Requirements
            </button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Off-Plan Projects We Currently Recommend
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Handpicked based on developer track record, location and payment terms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#00458b] hover:shadow-lg transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-5 h-5 text-[#00458b]" />
                    <span className="text-sm font-semibold text-[#00458b]">{project.developer}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{project.location}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#00458b] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={shareRequirements}
                      className="text-sm text-[#00458b] font-semibold hover:underline"
                    >
                      Discuss This Project →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developers We Work With */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/off-plan/buy-off-plan-developers-1.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
            Developers We Work With (and Why)
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We don't push a single developer's stock. We work across multiple UAE developers and give you a view on track record, delivery, and after-sales.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developers.map((dev, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{dev.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{dev.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans Explained */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Off-Plan Payment Plans Actually Work
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understand the cashflow before you sign anything.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/off-plan/payment-plan-diagram.png"
                alt="Payment plan diagram"
                fill
                className="object-contain bg-gray-50"
              />
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Most off-plan purchases start with a <strong>booking fee</strong> and signing the SPA (sale and purchase agreement). After that, your payments are usually tied to <strong>construction milestones</strong> – for example, a percentage at foundation, structure, and completion of key stages.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                A larger chunk is due at <strong>handover</strong> when you receive the keys, and some projects offer <strong>post-handover payment plans</strong>, where the final portion is paid over 1–5 years after you move in or start renting the unit.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The key is to map this schedule against your actual cashflow and financing, not just the developer's marketing slide.
              </p>
            </div>
          </div>

          <div className="relative h-[550px] rounded-xl overflow-hidden mb-8">
            <Image
              src="/off-plan/payment-plan-milestones.png"
              alt="Payment plan milestones example"
              fill
              className="object-cover"
            />
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#00458b] text-center">
            <p className="text-gray-700 mb-4">
              Want us to stress-test a payment plan against your cashflow?
            </p>
            <button
              onClick={bookConsultation}
              className="text-[#00458b] font-semibold hover:underline"
            >
              Send us your numbers →
            </button>
          </div>
        </div>
      </section>

      {/* Off-Plan vs Ready Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Off-Plan vs Ready – The Real Trade-Offs
          </h2>

          <div className="relative h-[400px] rounded-xl overflow-hidden mb-12">
            <Image
              src="/off-plan/buy-residential-dubai-offplan-vs-ready.png"
              alt="Off-plan vs ready comparison"
              fill
              className="object-cover"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready Property</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">Pros:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Immediate move-in or rental income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">What you see is what you get</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Easier mortgage approval</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">No construction risk</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-red-700 mb-3">Cons:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✕</span>
                    <span className="text-gray-700">Higher upfront cost</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✕</span>
                    <span className="text-gray-700">Less payment flexibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✕</span>
                    <span className="text-gray-700">May need maintenance/upgrades</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Off-Plan</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-green-700 mb-3">Pros:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Lower entry price (10-30% cheaper)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Flexible payment plans (2-5 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Brand new with warranty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Potential capital appreciation</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-red-700 mb-3">Cons:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✕</span>
                    <span className="text-gray-700">2-4 year wait until handover</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✕</span>
                    <span className="text-gray-700">Construction/delivery risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✕</span>
                    <span className="text-gray-700">Market price uncertainty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">✕</span>
                    <span className="text-gray-700">Less liquidity during construction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Not sure which route makes more sense for you right now?
            </p>
            <button
              onClick={bookConsultation}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Book a 20-Minute Call
            </button>
          </div>
        </div>
      </section>

      {/* Market Insight & Playbook */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              See Where Dubai Is Heading, Not Just What's Launching
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our 2026–2035 Playbook outlines our expectations for key corridors, asset types and off-plan cycles.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-8">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/off-plan/image-offplan-playbook-1.png"
                alt="Analytics and Dubai map"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Demand trends by area and asset type.</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Where off-plan stock is concentrated.</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Our view on risk, timelines and pricing cycles.</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={downloadPlaybook}
                  className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Download Off-Plan Playbook Extract
                </button>
                <button
                  onClick={bookConsultation}
                  className="border-2 border-[#00458b] text-[#00458b] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200"
                >
                  Talk Through the Insights
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How We Help You Manage Off-Plan Risk
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/off-plan/shield.jpeg"
                alt="Risk management illustration"
                fill
                className="object-contain bg-white"
              />
            </div>

            <div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">We look at developer track record (delays, handover quality, service charges).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">We check escrow, RERA registration and project status before you commit.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">We highlight contract clauses that you should pay attention to (delays, variations, cancellation).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">We help plan exit scenarios (hold, rent, sell around handover).</span>
                </li>
              </ul>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Disclaimer:</strong> We are not a law firm or financial advisor, but we help you ask the right questions before you sign.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            What Our Off-Plan Buyers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "I wanted to buy into a project early but was worried about taking on unnecessary risk. RE/MAX HUB walked me through the developer's history, the escrow setup and the payment plan in plain language. I ended up buying a 2-bed unit in Business Bay and every milestone so far has matched exactly what they prepared me for."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Yousef R.</p>
                <p className="text-sm text-gray-600">Investor from Kuwait</p>
                <p className="text-xs text-[#00458b] mt-1">Off-plan apartment in Business Bay</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "Different agents kept pushing us into the latest 'hot' launches. The team at RE/MAX HUB slowed things down, compared three projects side by side and showed us what was real value versus pure hype. We finally booked a townhouse in a quieter community with a better layout and handover timeline for our kids, not just the loudest project on social media."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Imran & Nadia</p>
                <p className="text-sm text-gray-600">Family living in Dubai</p>
                <p className="text-xs text-[#00458b] mt-1">Off-plan townhouse in Dubai Hills Estate</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "Buying off plan in Dubai while living in Italy felt risky at the start. Having Leonardo, an Italian-speaking agent at RE/MAX HUB, made it much easier. He explained every part of the contract in Italian, double-checked the payment schedule with the developer and handled the bank and POA for me. Even from thousands of kilometres away, I always knew what was happening and never felt lost."
              </p>
              <div>
                <p className="font-semibold text-gray-900">Marco B.</p>
                <p className="text-sm text-gray-600">Buyer from Italy</p>
                <p className="text-xs text-[#00458b] mt-1">Off-plan apartment near Dubai Creek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <Image
            src="/off-plan/buy-residential-dubai-faq-background.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Off-Plan FAQs for Dubai Property
          </h2>

          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
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

          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Still unsure whether a specific project is worth it? Ask us to review it with you.
            </p>
            <button
              onClick={bookConsultation}
              className="text-[#00458b] font-semibold hover:underline"
            >
              Book Consultation →
            </button>
          </div>
        </div>
      </section>

    <section className="relative py-20 overflow-hidden text-gray-900">
    <div className="absolute inset-0">
        <Image
        src="/off-plan/buy-residential-final-cta-background.png"
        alt=""
        fill
        className="object-cover"
        />
    </div>

    <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Build an Off-Plan Plan?
        </h2>

        <p className="text-lg mb-8 max-w-2xl mx-auto">
        Tell us what you're considering and we'll come back with a structured view—projects we like, ones we'd avoid, and what fits your budget.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
        <button
            onClick={shareRequirements}
            className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003a75] transition-colors duration-200"
        >
            Share Your Off-Plan Requirements
        </button>

        <button
            onClick={bookConsultation}
            className="border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#00458b]/10 transition-colors duration-200"
        >
            Book an Off-Plan Strategy Call
        </button>
        </div>

        <p className="text-sm text-gray-800">
        Prefer WhatsApp? Message us at <a href="tel:+97143983527" className="font-semibold underline">+971 4 398 3527</a> with "Off-plan enquiry" and the projects you're looking at.
        </p>
    </div>
    </section>


      <Footer />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedTopic="Off-Plan"
      />
      
      <RequirementsModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        pageSource="off_plan"
      />
    </main>
  );
}
