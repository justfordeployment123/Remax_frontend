import React from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsOfUsePage() {
  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-[#00458b] to-[#0B2340] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl align-middle text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">Terms of Use</h1>
              <p className="text-xl md:text-2xl text-blue-100 text-center">Last updated: 05 December 2025</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 lg:p-16">
          
          <div className="mb-12 pb-8 border-b border-gray-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              These Terms of Use ("Terms") govern your use of this website operated by Purple Bricks Real Estate LLC, trading as RE/MAX HUB ("we", "us", "our"). By accessing or using this website, you agree to be bound by these Terms. If you do not agree, you should not use this website.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              These Terms apply only to your use of the website. They do not replace or override any separate agreements you may enter into with us (such as brokerage, listing, agency or employment agreements).
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Acceptance of These Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing, browsing or using this website in any way, you:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6 leading-relaxed">
              <li>Confirm that you have read and understood these Terms; and</li>
              <li>Agree to be bound by them, as well as any additional terms and policies referred to here (such as our Privacy Policy and Cookie Policy).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              If you use this website on behalf of a company or other legal entity, you represent that you are authorised to accept these Terms on its behalf.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Who We Are</h2>
            <p className="text-gray-700 leading-relaxed mb-4">This website is operated by:</p>
            <div className="bg-blue-50 border-l-4 border-[#00458b] p-6 rounded-r-lg mb-6">
              <p className="font-bold text-lg text-gray-900 mb-2">Purple Bricks Real Estate LLC</p>
              <p className="text-gray-700 mb-1">Trading as RE/MAX HUB</p>
              <p className="text-gray-600 text-sm">(Trade License No. 1486788, RERA ORN 50737)</p>
              <p className="text-gray-700 mt-2">Dubai, United Arab Emirates</p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              RE/MAX HUB is a locally owned and operated franchise of the global RE/MAX network. Strategic decisions, hiring and client services are managed by Purple Bricks Real Estate LLC in Dubai.
            </p>
            <p className="text-gray-700 leading-relaxed">
              References in these Terms to "we", "us" and "our" are to Purple Bricks Real Estate LLC / RE/MAX HUB.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Use of the Website</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may use this website only for lawful purposes and in accordance with these Terms.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-4">
              <p className="font-bold text-gray-900 mb-3">You must not:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the website in any way that violates applicable laws or regulations.</li>
                <li>Attempt to gain unauthorised access to the website, its servers or any related systems.</li>
                <li>Introduce malicious code, viruses, worms, trojans or other harmful materials.</li>
                <li>Scrape, harvest, or attempt to systematically collect data from the website without our prior written consent.</li>
                <li>Interfere with or disrupt the security, integrity or performance of the website.</li>
                <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity when using forms or contact options.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right, at our sole discretion, to suspend, restrict or terminate your access to the website if we believe you have violated these Terms or any applicable law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. No Professional Advice</h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-4">
              <p className="text-gray-700 leading-relaxed mb-3">
                The content on this website is provided for general information purposes only.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>It does not constitute legal, financial, tax, investment or other professional advice.</li>
                <li>It should not be relied upon as a substitute for independent professional advice tailored to your particular circumstances.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Before making any decision regarding property transactions, investments, financing, tax or legal matters, you should seek appropriate advice from qualified professionals (such as lawyers, financial advisors, tax consultants or regulated mortgage advisors).
            </p>
            <p className="text-gray-700 leading-relaxed font-medium">
              We do not accept any responsibility or liability for actions taken based on information provided on this website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Property Listings and Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any property listings, project descriptions, price indications, yields, payment plans, handover dates or other details displayed on this website are provided for illustrative and informational purposes only.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
              <p className="font-bold text-gray-900 mb-3">You acknowledge and agree that:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Listings and project information may change at any time and may be updated, withdrawn or no longer available without prior notice.</li>
                <li>Prices, areas, layouts, availability, handover dates, service charges, yields and any other property details are subject to confirmation and may differ from final agreed terms or official documents.</li>
                <li>CGI renders, sample floor plans, images and visualisations may not accurately reflect the final delivered product or unit.</li>
              </ul>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We make reasonable efforts to keep information updated, but we do not guarantee that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4 leading-relaxed">
              <li>All information on the website is accurate, complete, current or free from errors; or</li>
              <li>Any specific property or project shown will be available on any particular terms at any given time.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Any transaction or service will be governed by separate agreements and formal documentation, which take priority over any website content.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Third-Party Services and Links</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This website may contain links to third-party websites, platforms or services, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4 leading-relaxed">
              <li>Property portals (e.g. listing sites).</li>
              <li>Developer websites and project pages.</li>
              <li>RE/MAX global network sites.</li>
              <li>Service providers such as mortgage advisors, banks, fit-out partners and other professional firms.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Such links are provided for convenience only. We:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4 leading-relaxed">
              <li>Do not control and are not responsible for the content, privacy practices or terms of any third-party websites or services.</li>
              <li>Do not endorse or make any representations about third-party sites, their content, or any products or services offered there.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              If you access any third-party site or engage any third-party service, you do so at your own risk and should review their terms and policies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unless otherwise stated, all content on this website is owned by or licensed to us and is protected by applicable intellectual property laws. This includes, without limitation:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6 leading-relaxed">
              <li>Text, copy, articles and market commentary.</li>
              <li>Graphics, logos, icons and visual identities.</li>
              <li>Photographs, images, CGI renders and illustrations.</li>
              <li>Page layouts, design elements and user interface components.</li>
              <li>Any proprietary tools, frameworks or data presentations.</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="font-bold text-gray-900 mb-2">✓ You may:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  <li>View pages from this website in your browser.</li>
                  <li>Print or download extracts for your personal, non-commercial use related to evaluating our services.</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <p className="font-bold text-gray-900 mb-2">✗ You may not:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                  <li>Copy, reproduce, modify, distribute, or commercially exploit any content without consent.</li>
                  <li>Use automated systems to scrape or monitor the website.</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              All trademarks, trade names and logos appearing on this website are the property of their respective owners. No licence to use any such trademarks is granted by these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. User Submissions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you submit information through this website (for example via contact forms, "Share Your Requirements", recruitment applications or other fields), you agree that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4 leading-relaxed">
              <li>The information you provide is accurate, complete and not misleading.</li>
              <li>You have the right to provide any information you submit (including any third-party data, if applicable).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain ownership of your own content and information, but you grant us a non-exclusive, royalty-free, worldwide licence to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4 leading-relaxed">
              <li>Use, store, process and analyse the information for the purpose of responding to your enquiry, providing services, evaluating applications and operating our business.</li>
              <li>Maintain records of communications and enquiries as required for record-keeping, compliance and service history.</li>
            </ul>
            <div className="bg-blue-50 border-l-4 border-[#00458b] p-4 rounded-r-lg mb-4">
              <p className="text-sm text-gray-700">
                We will handle any personal data in line with our{' '}
                <Link href="/privacy-policy" className="text-[#00458b] hover:text-[#003366] font-semibold underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3 font-medium">You must not submit any content that:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4 leading-relaxed">
              <li>Is illegal, defamatory, offensive or discriminatory.</li>
              <li>Contains confidential or proprietary information of a third party without their permission.</li>
              <li>Infringes any intellectual property rights or privacy rights of others.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right (but are not obliged) to remove or reject any submission that we consider inappropriate or in breach of these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Disclaimer of Warranties</h2>
            <div className="bg-gray-100 border-l-4 border-gray-500 p-6 rounded-r-lg mb-4">
              <p className="text-gray-700 leading-relaxed mb-3">
                To the fullest extent permitted by law, the website and its content are provided on an <span className="font-bold">"as is"</span> and <span className="font-bold">"as available"</span> basis, without any warranties of any kind, whether express, implied or statutory.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3 font-medium">We do not warrant that:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4 leading-relaxed">
              <li>The website will be available, uninterrupted, secure or error-free.</li>
              <li>Any defects or errors will be corrected.</li>
              <li>The website or the server that makes it available are free of viruses or other harmful components.</li>
              <li>The information provided (including listings, market insights or commentary) is complete, accurate, up to date or suitable for your specific needs.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To the extent permitted by law, we expressly disclaim all warranties of any kind, including but not limited to implied warranties of merchantability, fitness for a particular purpose and non-infringement, and any warranties arising from course of dealing or usage of trade.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Limitation of Liability</h2>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-4">
              <p className="text-gray-700 leading-relaxed mb-3">
                To the fullest extent permitted by law, we and our directors, officers, employees, agents, affiliates and franchise partners shall not be liable for any:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
                <li>Indirect, incidental, special, consequential or punitive damages.</li>
                <li>Loss of profits, revenue, business, goodwill, data or anticipated savings.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-sm">
                arising out of or in connection with your use of or inability to use the website, any information or content provided, actions taken based on website content, or third-party websites accessed via links.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our total aggregate liability to you for any claim arising from or relating to your use of the website shall, to the extent permitted by law, be limited to an amount equivalent to AED 1,000 or any higher minimum amount required by applicable law.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium">
              Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Indemnity</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify, defend and hold harmless Purple Bricks Real Estate LLC / RE/MAX HUB, its directors, officers, employees, agents and affiliates from and against any and all claims, liabilities, damages, losses, costs and expenses (including reasonable legal fees) arising out of or related to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4 leading-relaxed">
              <li>Your use of the website in violation of these Terms.</li>
              <li>Your violation of any applicable law or the rights of any third party.</li>
              <li>Any content or information you submit to us via the website or in connection with it.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to assume the exclusive defence and control of any matter otherwise subject to indemnification by you, in which case you agree to cooperate with our defence.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">12. Governing Law and Jurisdiction</h2>
            <div className="bg-blue-50 border-l-4 border-[#00458b] p-6 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed mb-3">
                These Terms and any dispute arising out of or in connection with them, or with your use of the website, shall be governed by and construed in accordance with the <span className="font-bold">laws of the United Arab Emirates</span>, as applied in the Emirate of Dubai.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any disputes shall be subject to the <span className="font-bold">exclusive jurisdiction of the courts of Dubai</span>, without prejudice to any mandatory laws that may apply.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">13. Changes to These Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update or modify these Terms from time to time at our discretion.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4 leading-relaxed">
              <li>Any changes will be posted on this page with an updated "Last updated" date.</li>
              <li>Changes become effective when posted, unless otherwise stated.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of the website after changes have been posted constitutes your acceptance of the updated Terms. If you do not agree to the updated Terms, you should stop using the website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">14. Contact</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              If you have any questions or concerns about these Terms or your use of this website, you can contact us at:
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-gray-50 border-2 border-[#00458b]/20 rounded-xl p-8 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-bold text-gray-900 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email:
                  </p>
                  <a href="mailto:hello@remaxhub.ae" className="text-[#00458b] hover:text-[#003366] font-medium transition-colors">
                    hello@remaxhub.ae
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
                    +971 4 398 3527
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
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
