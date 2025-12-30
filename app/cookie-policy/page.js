'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CookiePolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-[#00458b] to-[#0B2340] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4">
              Cookie Policy
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Last updated: 05 December 2025
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 lg:p-16">
              
              <div className="mb-12 pb-8 border-b border-gray-200">
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  This Cookie Policy explains how Purple Bricks Real Estate LLC, trading as RE/MAX HUB ("we", "us", "our"), uses cookies and similar technologies on our website.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  It should be read together with our <Link href="/privacy-policy" className="text-[#00458b] hover:underline font-semibold">Privacy Policy</Link>, which explains how we handle personal data.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  By continuing to use our website, you agree to our use of cookies as described in this Policy, subject to any preferences you set in your browser or on our site.
                </p>
              </div>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">1. What Are Cookies?</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Cookies are small text files that are placed on your computer, smartphone or other device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the site owners.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-[#00458b] rounded-r-lg p-6 mb-6">
                  <p className="text-gray-700 leading-relaxed mb-3 font-semibold">Cookies can be:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>First-party cookies</strong> – set by the website you are visiting.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Third-party cookies</strong> – set by other domains (for example, analytics providers or advertising networks).</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6 mb-6">
                  <p className="text-gray-700 leading-relaxed mb-3 font-semibold">Cookies can also be:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Session cookies</strong> – which are deleted when you close your browser.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span><strong>Persistent cookies</strong> – which remain on your device for a set period or until you delete them.</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  We may also use similar technologies such as pixels, tags, local storage or scripts that perform functions similar to cookies.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">2. How We Use Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We use cookies and similar technologies on our website for the following purposes:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-6">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>To make the site work properly (for example, remembering your cookie preferences or enabling form submissions).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>To understand how visitors use our site, so we can improve content, navigation and performance.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>To measure the effectiveness of our pages and campaigns, for example, which landing pages or CTAs are actually being used.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Where applicable, to support marketing and remarketing, so that our ads and communications are more relevant (if and when we use such tools).</span>
                  </li>
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    We do not use cookies to directly identify you by name, but some cookies may collect information that can be associated with you, especially when combined with other data. For more information on how we handle personal data, see our <Link href="/privacy-policy" className="text-[#00458b] hover:underline font-semibold">Privacy Policy</Link>.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Types of Cookies We Use</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  We group the cookies we use into the following categories. Not all cookies will be used at all times; this is the functional set we may deploy.
                </p>

                <h3 className="text-xl font-bold text-[#00458b] mb-4">3.1 Strictly Necessary Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These cookies are essential for the operation of our website and cannot be switched off in our systems. They are usually set only in response to actions made by you, such as:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Navigating between pages.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Submitting forms (contact, "Share Your Requirements", applications).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Setting your privacy or cookie preferences.</span>
                  </li>
                </ul>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 mb-8">
                  <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
                    Without these cookies, parts of the site may not function correctly.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-2 font-semibold">Examples of what they do:</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Keep you logged in across pages (if applicable).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Ensure forms submit securely.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Remember your consent choices.</span>
                    </li>
                  </ul>
                </div>

                <h3 className="text-xl font-bold text-[#00458b] mb-4">3.2 Performance / Analytics Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These cookies help us understand how visitors use our website so we can measure and improve performance. They collect information such as:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Which pages are visited and for how long.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Which links are clicked.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Which browser and device types are used.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>General location information (city/country) based on IP address.</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We typically use third-party analytics tools (such as Google Analytics or similar services) that set their own cookies to provide these insights. The data is generally aggregated and does not directly identify you.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You can opt out of some analytics cookies via browser settings or the tools provided by the analytics providers.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-[#00458b] mb-4">3.3 Functionality Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These cookies allow the website to remember choices you make and provide enhanced, more personalised features. For example:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Remembering basic preferences or form inputs for a short period (so you don't have to retype information).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Remembering certain filters or settings on search or listing pages during a session.</span>
                  </li>
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-6 mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    If you disable these cookies, some features may not remember your preferences, and your experience may be less tailored.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-[#00458b] mb-4">3.4 Marketing / Advertising Cookies (If Used)</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Where we run digital marketing campaigns (for example via platforms like Google, Meta or others), we may use marketing or advertising cookies and pixels to:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Measure the effectiveness of our campaigns (which ad led to a visit or enquiry).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Build anonymised audiences or segments for remarketing or lookalike audiences.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Show adverts that are more relevant to users who have visited our site.</span>
                  </li>
                </ul>
                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-6 mb-4">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    These cookies are typically set by third-party advertising networks. They may track your activity across multiple websites, and the information collected is used to build a profile of your interests.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You can usually manage preferences for these cookies directly with the relevant platform (Google Ads settings, Facebook Ad Preferences), in addition to your browser settings.
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  If we use such tools, we will reference them in our Privacy Policy and ensure any required consents are obtained where applicable.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Third-Party Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some cookies used on our website may be set by third parties, including:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-6">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Analytics providers (Google Analytics or similar).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Marketing and advertising platforms.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Embedded services such as maps, video players or chat widgets.</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-[#00458b] rounded-r-lg p-6 mb-4">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    These third parties may use the data collected through their cookies for their own purposes, in accordance with their own privacy and cookie policies.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We do not control these third-party cookies directly. You should review the relevant third-party privacy/cookie policies for more information about how they use your data.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Cookie Duration</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Cookies may remain on your device for different periods of time:
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Session cookies:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      These exist only while your browser is open and are deleted automatically when you close your browser.
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-[#00458b] rounded-r-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Persistent cookies:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      These remain on your device after you close your browser and can be used to recognise you when you return to our site.
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  The specific duration of each cookie depends on its purpose and is determined by us or the third-party provider that sets it. You can view and manage cookies in your browser settings.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Managing Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  You have several options for managing cookies on your device:
                </p>

                <h3 className="text-xl font-bold text-[#00458b] mb-4">6.1 Browser Settings</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Most web browsers allow you to:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>View which cookies are set on your device.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Delete individual cookies or all cookies.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Block cookies from specific sites.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Block all cookies altogether.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Receive a warning before cookies are stored.</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The steps to manage cookies vary by browser. You can usually find them in the browser's Help or Settings menu.
                </p>
                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6 mb-8">
                  <p className="text-gray-700 leading-relaxed font-semibold">
                    Please note: if you block or delete cookies, some parts of our website may not function as intended.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-[#00458b] mb-4">6.2 On-Site Preferences (If Implemented)</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Where we provide a cookie banner or preference center on the website, you may be able to:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Accept or reject non-essential cookies (such as analytics and marketing cookies).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Change your cookie preferences at any time by revisiting your settings.</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Your choices may be stored in a consent cookie, so if you clear cookies, you may need to set your preferences again.
                </p>

                <h3 className="text-xl font-bold text-[#00458b] mb-4">6.3 Third-Party Opt-Outs</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some third-party services we use (such as Google Analytics or advertising platforms) offer their own opt-out mechanisms. For example:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Google Analytics:</strong> browser add-on to disable analytics tracking.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span><strong>Ad platforms:</strong> ad preference and personalisation settings.</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Refer to the relevant third-party documentation for details.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Impact of Disabling Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  If you choose to disable or block certain cookies:
                </p>
                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-5">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Strictly necessary cookies</strong> – Disabling these may cause the website or some features (such as forms) to stop working properly.
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-[#00458b] rounded-r-lg p-5">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Performance/analytics cookies</strong> – Disabling these will limit our ability to understand how the site is used and improve it, but should not affect core functionality.
                    </p>
                  </div>
                  <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-5">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Functionality cookies</strong> – Disabling these may mean some saved preferences or improved experiences will no longer work.
                    </p>
                  </div>
                  <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-5">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Marketing cookies</strong> – Disabling these means you may still see ads, but they may be less relevant or not tailored based on your activity.
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mt-6">
                  You remain free to adjust your cookie settings based on your preferences.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Updates to This Cookie Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may update this Cookie Policy from time to time, for example to:
                </p>
                <ul className="space-y-3 text-gray-700 leading-relaxed mb-6">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Reflect changes in the cookies we use.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Reflect changes in legal or regulatory requirements.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Reflect changes in the services or tools we rely on.</span>
                  </li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    When we update this Policy, we will revise the "Last updated" date at the top of this page. Significant changes may also be highlighted via our website (for example, via a notice or updated cookie banner).
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We encourage you to review this Policy periodically to stay informed about how we use cookies.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Contact</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  If you have any questions about this Cookie Policy or our use of cookies and similar technologies, you can contact us at:
                </p>

                <div className="bg-gradient-to-br from-blue-50 to-gray-50 border-2 border-blue-100 rounded-xl p-8 mb-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start mb-6">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-gray-900 mb-2">Email:</h4>
                          <a href="mailto:hello@remaxhub.ae" className="text-[#00458b] hover:underline text-lg">
                            hello@remaxhub.ae
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-gray-900 mb-2">Phone:</h4>
                          <a href="tel:+97143983527" className="text-[#00458b] hover:underline text-lg">
                            +971 50 210 4130 
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="font-bold text-gray-900 mb-2">Postal address:</h4>
                          <p className="text-gray-700 leading-relaxed">
                            Purple Bricks Real Estate LLC<br />
                            RE/MAX HUB<br />
                            801 – Business Central Tower B,<br />
                            Dubai Media City,<br />
                            Dubai, United Arab Emirates
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-[#00458b] rounded-r-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    You can also reach us via the Contact page at{' '}
                    <Link href="/contact-us" className="text-[#00458b] hover:underline font-semibold">
                      contact
                    </Link>.
                  </p>
                </div>
              </section>

              <div className="pt-8 border-t border-gray-200">
                <Link 
                  href="/"
                  className="group inline-flex items-center text-[#00458b] hover:text-[#0B2340] font-semibold transition-colors"
                >
                  <svg 
                    className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
