"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FAQAccordion from '../../components/FAQAccordion';

export default function ContactUs() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: searchParams?.get('topic') || '',
    message: '',
    hearAboutUs: '',
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

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Submitting form data:', formData);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts/submit`, {
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

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                Contact RE/MAX HUB
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6">
                Talk to the RE/MAX HUB Team
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're buying, selling, renting, or ready to build your career with us, our specialists are here to help. Fill in the form below and we'll get back to you within 1 business day.
              </p>
              <button
                onClick={scrollToForm}
                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Send Us a Message
              </button>
            </div>
            
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/off-plan/image-offplan-index-hero-1.png"
                alt="Featured off-plan projects in Dubai"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                We're Here to Help
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Complete the form and a member of our team will reach out to you within 1 business day. We'll connect you with the right specialist based on your inquiry.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                All fields marked with an asterisk (*) are required. We respect your privacy and will never share your information with third parties.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
              {!submitted ? (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">Contact Form</h3>
                  <p className="text-sm text-gray-600 mb-6">We'll respond within 1 business day</p>

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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors bg-white"
                        placeholder="Your full name"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors bg-white"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors bg-white"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                        What can we help you with? *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors bg-white"
                      >
                        <option value="">Select a topic</option>
                        <option value="Buy">Buy Property</option>
                        <option value="Sell">Sell Property</option>
                        <option value="Rent">Rent Property</option>
                        <option value="Invest">Investment Opportunities</option>
                        <option value="Off-Plan">Off-Plan Projects</option>
                        <option value="Commercial">Commercial Real Estate</option>
                        <option value="Other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors resize-none bg-white"
                        placeholder="Tell us more about your needs..."
                      />
                    </div>

                    <div>
                      <label htmlFor="hearAboutUs" className="block text-sm font-semibold text-gray-700 mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        id="hearAboutUs"
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors bg-white"
                      >
                        <option value="">Select an option</option>
                        <option value="Referral">Referral from a friend</option>
                        <option value="Portal">Property portal (Bayut, Property Finder, etc.)</option>
                        <option value="Social media">Social media</option>
                        <option value="Search">Google search</option>
                        <option value="Event">Event or conference</option>
                        <option value="Other">Other</option>
                      </select>
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
                        I agree to be contacted by RE/MAX HUB regarding my inquiry. *
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#00458b] text-white px-6 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Send Message'}
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h3>
                  <p className="text-base text-gray-600 mb-6">
                    We've received your message and will get back to you within 1 business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                        hearAboutUs: '',
                        consent: false
                      });
                    }}
                    className="text-[#00458b] font-semibold hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
              Contact Details
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Other Ways to Reach Us
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Prefer to call or email? No problem. We're available through multiple channels and happy to help however you'd like to connect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Phone</h3>
              <a href="tel:+97143983527" className="text-base text-[#00458b] hover:underline font-medium">
                +971 4 398 3527
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00458b]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <a href="https://wa.me/97143983527" target="_blank" rel="noopener noreferrer" className="text-base text-[#00458b] hover:underline font-medium">
                +971 4 398 3527
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Email</h3>
              <a href="mailto:hello@remaxhub.ae" className="text-base text-[#00458b] hover:underline font-medium">
                hello@remaxhub.ae
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
              <div className="w-12 h-12 bg-[#00458b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-[#00458b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Office Location</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Office 801, Business Central Tower – B, Dubai Media City
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
              Find Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Visit Our Office
            </h2>
          </div>

          <div className="bg-gray-200 rounded-xl overflow-hidden" style={{ height: '450px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1739073032647!2d55.26238931501204!3d25.197197383881974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600">
              Quick answers to common questions about contacting us.
            </p>
          </div>

          <FAQAccordion category="contact-us" />

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Still have questions?</p>
            <button
              onClick={scrollToForm}
              className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
            >
              Go Back to Contact Form
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}