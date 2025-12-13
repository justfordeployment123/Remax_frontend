'use client'

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PrivacyPolicy() {
  const sections = [
    'who-we-are',
    'what-this-policy-covers',
    'data-we-collect',
    'how-we-use-your-data',
    'legal-bases',
    'how-we-share-your-data',
    'international-transfers',
    'data-retention',
    'your-rights',
    'cookies-and-tracking',
    'third-party-links',
    'security',
    'updates-to-this-policy',
    'how-to-contact-us'
  ];

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#00458b] to-[#0B2340] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl align-middle text-center">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4 text-center">Privacy Policy</h1>
              <p className="text-xl md:text-2xl text-blue-100 text-center">Last updated: 05 December 2025</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 lg:p-16">
          
          {/* Introduction */}
          <div className="mb-12 pb-8 border-b border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This Privacy Policy explains how RE/MAX HUB, operated by Purple Bricks Real Estate LLC ("we", "us", "our"), collects, uses, shares and protects your personal data when you use our website, contact us, or work with us in connection with real estate services in Dubai and beyond.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By using our website or providing your personal data to us, you agree to this Privacy Policy.
            </p>
          </div>

          {/* 1. Who We Are */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">This website is operated by:</p>
            <div className="bg-blue-50 border-l-4 border-[#00458b] p-6 rounded-r-lg mb-6">
              <p className="font-bold text-lg text-gray-900 mb-2">Purple Bricks Real Estate LLC</p>
              <p className="text-gray-700 mb-1">Trading as RE/MAX HUB</p>
              <p className="text-gray-600 text-sm">(Trade License No. 1486788, RERA ORN 50737)</p>
              <p className="text-gray-700 mt-2">Dubai, United Arab Emirates</p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this Policy, "we", "us" and "our" refer to Purple Bricks Real Estate LLC / RE/MAX HUB, including our staff, authorised agents and, where relevant, any entities in our group that support our real estate activities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy applies in the context of the laws of the United Arab Emirates and any other data protection laws that may apply to you depending on your location.
            </p>
          </section>

          {/* 2. What This Policy Covers */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. What This Policy Covers</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Privacy Policy explains how we handle personal data in connection with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Our website and any microsites linked to it.</li>
              <li>Forms you submit on our website (contact forms, "Share Your Requirements", "Join RE/MAX HUB").</li>
              <li>Email, phone, WhatsApp or other communication you have with us.</li>
              <li>Enquiries, viewings, negotiations and transactions we handle as part of our real estate brokerage and advisory services.</li>
              <li>Marketing communications and updates we send (where permitted).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This Policy does not replace any separate contractual terms you may sign with us (listing agreements, brokerage agreements, employment contracts), which may include additional privacy and confidentiality terms.
            </p>
          </section>

          {/* 3. Data We Collect */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Data We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We collect different types of personal data depending on how you interact with us.
            </p>

            <h3 className="text-xl font-bold text-[#00458b] mb-4 mt-8">3.1 Information You Provide Directly</h3>
            <p className="text-gray-700 leading-relaxed mb-3">You may provide personal data to us when you:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Fill in forms on our website (contact, requirements, application).</li>
              <li>Communicate with us by email, phone, WhatsApp or other channels.</li>
              <li>Meet with us in person or attend viewings or events.</li>
              <li>Enter into a brokerage, listing or other service agreement with us.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">This may include:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li><span className="font-medium">Identification details:</span> name, title, nationality (if you share it).</li>
              <li><span className="font-medium">Contact details:</span> email address, phone number, WhatsApp number, postal address.</li>
              <li><span className="font-medium">Professional details:</span> company name, job title, years of experience (for agent recruitment).</li>
              <li>
                <span className="font-medium">Property-related details:</span>
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>Whether you are looking to buy, sell, rent, invest, off-plan or commercial.</li>
                  <li>Budget, preferred areas, property types, timelines.</li>
                  <li>Details of properties you own, lease or are interested in.</li>
                </ul>
              </li>
              <li><span className="font-medium">Financial context:</span> high-level budget, preferred financing approach; we do not typically collect full banking or card details via the website.</li>
              <li>Any other information you choose to include in messages or attachments you send to us.</li>
            </ul>

            <h3 className="text-xl font-bold text-[#00458b] mb-4">3.2 Information Collected Automatically</h3>
            <p className="text-gray-700 leading-relaxed mb-3">When you use our website, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Device and browser information (type, version, operating system).</li>
              <li>IP address and approximate location (city/country level).</li>
              <li>Website activity: pages visited, time spent, links clicked, referring site.</li>
              <li>Information from cookies and similar technologies (see Cookies and Tracking Technologies below).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-6">
              This data is typically collected using analytics tools and server logs and is used in aggregated or pseudonymised form.
            </p>

            <h3 className="text-xl font-bold text-[#00458b] mb-4">3.3 Information from Third Parties</h3>
            <p className="text-gray-700 leading-relaxed mb-3">We may receive personal data about you from third parties, such as:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Property portals where you have submitted an enquiry (Bayut, Property Finder, etc.).</li>
              <li>RE/MAX network offices in other countries referring you to us or receiving a referral from us.</li>
              <li>Mortgage brokers, banks, fit-out partners (such as TrueBuild) and other service providers involved in your transaction, where you have engaged or authorised them.</li>
              <li>Publicly available sources (trade registers, public listings) when performing due diligence.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We treat this data in line with this Privacy Policy and any applicable obligations agreed with those third parties.
            </p>
          </section>

          {/* 4. How We Use Your Data */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. How We Use Your Data</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li><span className="font-medium">Responding to enquiries:</span> To reply to messages, calls and form submissions and to communicate with you about your property needs.</li>
              <li><span className="font-medium">Providing services:</span> To identify suitable properties or buyers/tenants, arrange viewings, conduct negotiations, prepare documentation, coordinate with third parties and complete transactions.</li>
              <li><span className="font-medium">Advisory work:</span> To analyse budgets, yields, community fit, off-plan vs ready options and to provide recommendations based on your requirements.</li>
              <li><span className="font-medium">Recruitment:</span> To assess applications from agents or staff, schedule interviews and manage the recruitment process.</li>
              <li><span className="font-medium">Marketing (where permitted):</span> To send you guides, news, property updates or event invitations relevant to your interests. You can opt out at any time.</li>
              <li><span className="font-medium">Website operation and improvement:</span> To operate, secure and improve our website, including usage analytics and troubleshooting.</li>
              <li><span className="font-medium">Legal and compliance:</span> To comply with legal, regulatory, tax and anti-money laundering obligations, and to exercise or defend legal claims.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We do not use your personal data for automated decision-making that produces legal or similarly significant effects on you.
            </p>
          </section>

          {/* 5. Legal Bases for Processing */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Legal Bases for Processing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on the context and applicable law, we rely on one or more of the following legal bases:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li><span className="font-medium">Consent:</span> Where you have given explicit consent, for example, to receive marketing communications or to be contacted about a specific enquiry.</li>
              <li><span className="font-medium">Contract:</span> Where processing is necessary to enter into or perform a contract with you (brokerage agreement, agency listing, service engagement).</li>
              <li><span className="font-medium">Legitimate interests:</span> Where processing is necessary for our legitimate business interests (such as responding to enquiries, running our business, improving services, preventing fraud), and those interests are not overridden by your rights and interests.</li>
              <li><span className="font-medium">Legal obligations:</span> Where we must process personal data to comply with applicable laws and regulations (anti-money laundering checks, record-keeping duties).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We may rely on different legal bases for different processing activities and will apply the appropriate basis in each case.
            </p>
          </section>

          {/* 6. How We Share Your Data */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. How We Share Your Data</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We may share your personal data with:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li><span className="font-medium">Internal staff and agents:</span> Our employees, agents and consultants who need the information to provide services to you, manage your enquiry or process your application.</li>
              <li><span className="font-medium">RE/MAX network:</span> Other RE/MAX offices or affiliates, where necessary to handle cross-border enquiries, referrals or relocations, and only to the extent relevant to your request.</li>
              <li>
                <span className="font-medium">Service providers:</span> Third-party providers who support our operations, such as:
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>CRM and lead management systems.</li>
                  <li>Email and communication platforms.</li>
                  <li>Website hosting, analytics and IT support.</li>
                  <li>Document management and e-signature tools.</li>
                </ul>
              </li>
              <li>
                <span className="font-medium">Transaction-related partners:</span>
                <ul className="list-circle pl-6 mt-1 space-y-1">
                  <li>Mortgage advisors and banks, where you have requested or authorised introductions or support.</li>
                  <li>Fit-out and design partners (such as TrueBuild), where you ask us to facilitate or coordinate on fit-out or related services.</li>
                  <li>Listing and data platforms, where your property is marketed or analysed using their tools.</li>
                </ul>
              </li>
              <li><span className="font-medium">Professional advisers:</span> Lawyers, auditors, accountants and consultants where necessary for advice, compliance or dispute handling.</li>
              <li><span className="font-medium">Public authorities and regulators:</span> Where required by law, regulation, court order or official request, or to establish, exercise or defend legal claims.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We do not sell your personal data to third parties for their independent marketing purposes.
            </p>
          </section>

          {/* 7. International Transfers */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. International Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Because we operate in the UAE and are part of the RE/MAX global network, your personal data may be stored or processed in other countries, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Where our service providers (cloud hosting, CRM, email providers) maintain their servers.</li>
              <li>Where another RE/MAX office or partner involved in your enquiry or transaction is located.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Where personal data is transferred internationally, we take reasonable steps to ensure an appropriate level of protection, in line with applicable data protection laws. This may include contractual protections (such as data processing agreements or standard contractual clauses) and technical safeguards.
            </p>
          </section>

          {/* 8. Data Retention */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We keep your personal data only for as long as reasonably necessary for the purposes described in this Policy and to comply with legal, regulatory, tax and accounting requirements.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">In particular:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Enquiries and communication records may be retained for a period after our last interaction to handle follow-ups, disputes or repeat business.</li>
              <li>Transaction-related records (contracts, agreements, invoices, AML documentation) may be retained for longer periods as required by applicable laws or professional rules.</li>
              <li>Recruitment-related data may be kept for a period after a hiring decision for record-keeping and potential future opportunities, unless you request deletion (subject to legal constraints).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              When personal data is no longer needed, we will delete it or anonymise it so it can no longer identify you.
            </p>
          </section>

          {/* 9. Your Rights */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on the laws that apply to you, you may have some or all of the following rights in relation to your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li><span className="font-medium">Access:</span> To request confirmation whether we process your personal data and to receive a copy of that data.</li>
              <li><span className="font-medium">Correction:</span> To request that inaccurate or incomplete personal data be corrected or updated.</li>
              <li><span className="font-medium">Deletion:</span> To request deletion of your personal data in certain circumstances (for example, where it is no longer needed for the purposes we collected it for, or where you withdraw consent).</li>
              <li><span className="font-medium">Restriction:</span> To request that we temporarily restrict the processing of your data in certain circumstances.</li>
              <li><span className="font-medium">Objection:</span> To object to processing based on our legitimate interests, including for direct marketing.</li>
              <li><span className="font-medium">Withdrawal of consent:</span> Where we rely on consent, you can withdraw it at any time; this will not affect processing carried out before withdrawal.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise any of these rights, please contact us using the details in the <span className="font-medium">How to Contact Us</span> section below. We may need to verify your identity before responding. Some rights may be limited where we have legal or legitimate grounds to continue processing.
            </p>
          </section>

          {/* 10. Cookies and Tracking Technologies */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We use cookies and similar technologies on our website to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Enable basic site functionality.</li>
              <li>Understand how visitors use the site (analytics).</li>
              <li>Improve performance, content and user experience.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files placed on your device. Some are necessary for the site to function; others help us analyse usage or remember your preferences.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can control cookies through your browser settings, and in some cases via on-site cookie preferences, but disabling certain cookies may affect how the site functions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              For more information about the types of cookies we use and your choices, please refer to our{' '}
              <Link href="/cookie-policy" className="text-[#00458b] hover:underline font-medium">
                Cookie Policy
              </Link>.
            </p>
          </section>

          {/* 11. Third-Party Links */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may contain links to third-party websites or services, including property portals, developers, partners and RE/MAX network sites.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are not responsible for the privacy practices or content of those external sites. If you follow a link to any third-party website, please review their privacy policy before providing any personal data.
            </p>
          </section>

          {/* 12. Security */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">12. Security</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, misuse or alteration.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">Measures may include:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Access controls and authentication for systems handling personal data.</li>
              <li>Encryption or pseudonymisation where appropriate.</li>
              <li>Secure hosting environments and regular software updates.</li>
              <li>Internal policies and training for staff handling personal data.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              However, no method of transmission over the internet or method of electronic storage is completely secure. We cannot guarantee absolute security, but we work to minimise risks.
            </p>
          </section>

          {/* 13. Updates to This Policy */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">13. Updates to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements or other factors.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              When we make material changes, we will update the "Last updated" date at the top of this page and, where appropriate, provide additional notice (for example, via the website or email).
            </p>
            <p className="text-gray-700 leading-relaxed">
              We encourage you to review this Policy periodically to stay informed about how we handle your personal data.
            </p>
          </section>

          {/* 14. How to Contact Us */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">14. How to Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or how we handle your personal data, or if you wish to exercise your rights, you can contact us at:
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 border-2 border-[#00458b]/20 rounded-xl p-8 mb-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="font-bold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email:
                  </p>
                  <a href="mailto:privacy@remaxhub.ae" className="text-[#00458b] hover:text-[#003366] font-medium transition-colors">
                    privacy@remaxhub.ae
                  </a>
                </div>
                
                <div>
                  <p className="font-bold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone:
                  </p>
                  <a href="tel:+97143983527" className="text-[#00458b] hover:text-[#003366] font-medium transition-colors">
                    +971 54 398 3527 
                  </a>
                </div>
              </div>
              
              <div>
                <p className="font-bold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Postal Address:
                </p>
                <div className="ml-7 text-gray-700 leading-relaxed">
                  <p className="font-medium">Purple Bricks Real Estate LLC</p>
                  <p>RE/MAX HUB</p>
                  <p>801 – Business Central Tower - B</p>
                  <p>Dubai Media City</p>
                  <p>Dubai, United Arab Emirates</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-[#00458b] p-4 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed">
                💬 You can also reach us via the{' '}
                <Link href="/contact-us" className="text-[#00458b] hover:text-[#003366] font-semibold underline transition-colors">
                  Contact page
                </Link>{' '}
                on our website for a quick response.
              </p>
            </div>
          </section>

          {/* Back to Home */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/" 
              className="inline-flex items-center text-[#00458b] hover:text-[#003366] font-semibold transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
