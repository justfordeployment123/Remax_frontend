"use client";
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function JoinRemaxHub() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
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
              <button className="bg-remax-blue text-white px-8 py-3 rounded hover:bg-remax-dark-blue transition font-semibold">
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

      {/* Training Section */}
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
      <section className="py-16 bg-remax-blue text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your Future with RE/MAX?
          </h2>
          <p className="text-lg mb-8 leading-relaxed">
            Join a global brand with local expertise and unlimited growth potential. Your ambition. Our platform. Unlimited potential.
          </p>
          <button className="bg-white text-remax-blue px-8 py-3 rounded hover:bg-gray-100 transition font-semibold text-lg">
            APPLY TO JOIN NOW
          </button>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Application</h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and our recruitment team will get in touch with you.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-remax-blue"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-remax-blue"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-remax-blue"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                    Real Estate Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-remax-blue"
                  >
                    <option value="">Select experience level</option>
                    <option value="New to Real Estate">New to Real Estate</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tell us about yourself
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-remax-blue"
                  placeholder="Why are you interested in joining RE/MAX? What are your goals?"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-remax-blue text-white px-8 py-3 rounded hover:bg-remax-dark-blue transition font-semibold"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Have questions? Get in touch with us:</p>
            <div className="flex flex-wrap justify-center gap-8">
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-gray-600">+971 XXX XXX XXX</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-600">careers@remax.ae</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Location</p>
                <p className="text-gray-600">Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
