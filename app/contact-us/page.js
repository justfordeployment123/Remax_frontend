"use client";
import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaHome, FaUserTie, FaChartLine } from 'react-icons/fa';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    {
      name: 'instagram',
      icon: <FaInstagram className="w-4 h-4" />,
      url: 'https://instagram.com/remaxhubdubai'
    },
    {
      name: 'facebook',
      icon: <FaFacebookF className="w-4 h-4" />,
      url: 'https://facebook.com/remaxhubdubai'
    },
    {
      name: 'youtube',
      icon: <FaYoutube className="w-4 h-4" />,
      url: 'https://youtube.com/@remaxhubdubai'
    },
    {
      name: 'tiktok',
      icon: <FaTiktok className="w-4 h-4" />,
      url: 'https://tiktok.com/@remaxhubdubai'
    }
  ];

  const quickLinks = [
    {
      href: '/selling-guide',
      title: 'Sell Property',
      copy: 'Request a property valuation',
      icon: <FaHome className="w-6 h-6 text-[#00458b] mb-3" />
    },
    {
      href: '/find-agent',
      title: 'Find an Agent',
      copy: 'Connect with local specialists',
      icon: <FaUserTie className="w-6 h-6 text-[#00458b] mb-3" />
    },
    {
      href: '/join-remax',
      title: 'Join RE/MAX',
      copy: 'Build your career with us',
      icon: <FaChartLine className="w-6 h-6 text-[#00458b] mb-3" />
    }
  ];

  return (
    <main className="min-h-screen bg-[#F4F4F4]">
      <Header />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3">
            Let's Talk About Your Next Move
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Buying or selling, leasing or launching your real estate career—our team is ready to help. Share a few details and we will connect you with the right specialist inside RE/MAX Hub.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b]"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b]"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b]"
                    >
                      <option value="">Select a subject</option>
                      <option value="Buy Property">Buy Property</option>
                      <option value="Sell Property">Sell Property</option>
                      <option value="Rent Property">Rent Property</option>
                      <option value="Join RE/MAX">Join RE/MAX</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b]"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#003366] transition-colors duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <span className="text-xs font-semibold text-[#00458b] uppercase tracking-wide">Office</span>
                <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-3">RE/MAX Hub Dubai</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Business Bay, Dubai<br />
                  United Arab Emirates
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Phone</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    +971 4 398 3527 (Phone) <br />
                    +971 4 398 3527 (WhatsApp)
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    hub@remax.ae
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Office Hours</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a 
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 border border-gray-200 rounded-full flex items-center justify-center hover:text-[#00458b] hover:border-[#00458b] transition-colors duration-200"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Visit Our Office</h2>
          <div className="bg-gray-200 rounded-xl overflow-hidden" style={{ height: '360px' }}>
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

      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">Looking for something specific?</h2>
            <p className="text-base text-gray-600">Quick links to help you get started.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {quickLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-[#00458b] transition-colors duration-200 hover:shadow-lg group"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#00458b] transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-gray-600">{link.copy}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}