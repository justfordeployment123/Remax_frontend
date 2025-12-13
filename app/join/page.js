"use client";
import { useState, useRef } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FAQAccordion from '../../components/FAQAccordion';

export default function JoinRemaxHub() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseStatus: '',
    interest: '',
    joinAs: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.licenseStatus || !formData.interest || !formData.joinAs) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agent-applications/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          licenseStatus: '',
          interest: '',
          joinAs: '',
          message: ''
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(data.message || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Join RE/MAX and Take Your Career to New Heights
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At RE/MAX UAE, we believe success in real estate should have no ceiling. Whether you're an experienced broker in Dubai or just starting your career in the UAE property market, we give you the platform, training, and tools to build your business and maximize your earnings.
              </p>
              <button 
                onClick={scrollToForm}
                className="bg-[#1A3668] text-white px-8 py-3 rounded hover:bg-remax-dark-blue transition font-semibold"
              >
                APPLY NOW
              </button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                alt="RE/MAX Team"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join RE/MAX Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join RE/MAX?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              You're not an employee — you're an entrepreneur. RE/MAX UAE is where independent agents thrive within a supportive environment, backed by the world's most recognized real estate brand.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 pb-3 border-b-2 border-remax-blue">Industry-Leading Commissions</h3>
              <p className="text-gray-600 leading-relaxed">
                Keep more of what you earn with our competitive commission structure that rewards your hard work.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 pb-3 border-b-2 border-remax-blue">Global Brand Recognition</h3>
              <p className="text-gray-600 leading-relaxed">
                Leverage the power of the world's most recognized real estate brand in 110+ countries.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 pb-3 border-b-2 border-remax-blue">Continuous Training</h3>
              <p className="text-gray-600 leading-relaxed">
                Access world-class training and mentorship programs to enhance your skills and grow your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80"
                alt="Real estate professionals"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What We Offer
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-remax-blue pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Flexible Business Model</h4>
                  <p className="text-gray-600">Build your business your way with the freedom to be your own boss</p>
                </div>
                <div className="border-l-4 border-remax-blue pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Advanced Technology</h4>
                  <p className="text-gray-600">Access cutting-edge CRM, marketing tools, and lead generation systems</p>
                </div>
                <div className="border-l-4 border-remax-blue pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Marketing Support</h4>
                  <p className="text-gray-600">Professional marketing materials and digital advertising support</p>
                </div>
                <div className="border-l-4 border-remax-blue pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Collaborative Culture</h4>
                  <p className="text-gray-600">Join a team that celebrates your success and supports your growth</p>
                </div>
                <div className="border-l-4 border-remax-blue pl-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Global Network</h4>
                  <p className="text-gray-600">Connect with agents worldwide and access international opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Path Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Path to Success
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've designed a seamless onboarding and growth path that helps you get productive fast.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-remax-red text-white rounded flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connect</h3>
                <p className="text-gray-600">
                  Meet our recruitment team and learn how RE/MAX can help you grow your career.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-remax-red text-white rounded flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Onboard</h3>
                <p className="text-gray-600">
                  Receive full induction training on RE/MAX tools, systems, and compliance.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-remax-red text-white rounded flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Launch</h3>
                <p className="text-gray-600">
                  Start building your portfolio with access to exclusive listings and marketing support.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-remax-red text-white rounded flex items-center justify-center font-bold text-xl">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Grow</h3>
                <p className="text-gray-600">
                  Build your personal brand, expand your client base, and increase your earnings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                World-Class Training & Development
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Through RE/MAX University and in-house coaching programs, we ensure every agent gains the confidence and skills to lead in today's fast-paced property market.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-remax-blue">•</span>
                  Real Estate Law & Compliance
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-remax-blue">•</span>
                  Negotiation and Closing Techniques
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-remax-blue">•</span>
                  Marketing and Personal Branding
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-remax-blue">•</span>
                  CRM and Digital Tools Mastery
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-remax-blue">•</span>
                  Investment and Off-plan Sales Strategies
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <span className="text-remax-blue">•</span>
                  Client Relationship Management
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Training and Development"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1A3668] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Future with RE/MAX?
          </h2>
          <p className="text-lg mb-8 leading-relaxed">
            Join a global brand with local expertise and unlimited growth potential. Your ambition. Our platform. Unlimited potential.
          </p>
          <button 
            onClick={scrollToForm}
            className="bg-white text-[#1A3668] px-8 py-3 rounded hover:bg-gray-100 transition font-semibold text-lg"
          >
            APPLY TO JOIN NOW
          </button>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-white" ref={formRef}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started</h2>
            <p className="text-lg text-gray-600">
              Complete the form below to apply for our agent program
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">✓ Thank you for your application! Our team will review it shortly and contact you within 3-5 business days.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                    placeholder="First"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                    placeholder="Last"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="licenseStatus" className="block text-sm font-semibold text-gray-700 mb-2">
                    License Status <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="licenseStatus"
                    name="licenseStatus"
                    value={formData.licenseStatus}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                  >
                    <option value="">Select license status</option>
                    <option value="Active License">Active License</option>
                    <option value="Expired License">Expired License</option>
                    <option value="No License">No License</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-2">
                    I am interested in <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                  >
                    <option value="">Select interest</option>
                    <option value="Dubai">Dubai</option>
                    <option value="International">International</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="joinAs" className="block text-sm font-semibold text-gray-700 mb-2">
                  I would like to join as <span className="text-red-600">*</span>
                </label>
                <select
                  id="joinAs"
                  name="joinAs"
                  value={formData.joinAs}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                >
                  <option value="">Select role</option>
                  <option value="Agent">Agent</option>
                  <option value="Broker">Broker</option>
                  <option value="Team Lead">Team Lead</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message <span className="text-gray-500">(0 of 250 max characters)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  maxLength={250}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent"
                  placeholder="Tell us why you're interested in joining RE/MAX"
                />
              </div>

              <div className="text-xs text-gray-600 leading-relaxed">
                By clicking "SUBMIT" below, you are agreeing to the{" "}
                <a href="#" className="text-[#1A3668] hover:underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#1A3668] hover:underline">
                  Privacy Policy
                </a>{" "}
                and are agreeing to receive marketing email messages from RE/MAX, LLC and/or marketing emails, calls or texts placed by or on behalf of a local RE/MAX franchised office, to any phone number and/or email address that you provided, even if your number is on a federal, state, or our internal Do Not Call List. You further agree that call/texts may be sent with an automated system for selection or dialing of numbers and/or with an artificial or prerecorded voice. Please note: Consent is not a condition of purchase. Standard data and messaging rate may apply. You may unsubscribe at any time.
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1A3668] text-white px-10 py-3 rounded-lg hover:bg-[#0f2447] transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'SUBMIT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about joining RE/MAX
            </p>
          </div>
          <FAQAccordion category="join" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
