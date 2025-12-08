'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RequirementsModal from '../components/RequirementsModal';
import { ArrowRight, Home, Search } from 'lucide-react';

export default function NotFound() {
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const referrer = document.referrer;
      
      console.log('404_view', {
        path_attempted: path,
        referrer: referrer,
        timestamp: new Date().toISOString()
      });
    }
  }, []);

  const openRequirementsForm = () => {
    console.log('404_cta_share_requirements_click');
    setIsRequirementsModalOpen(true);
  };

  const goHome = () => {
    if (typeof window !== 'undefined') {
      console.log('404_cta_home_click');
      window.location.href = '/';
    }
  };

  const quickLinks = [
    { label: 'Home', href: '/', icon: true },
    { label: 'Buy a Home in Dubai', href: '/buy-residential-dubai' },
    { label: 'Invest in Dubai', href: '/investors' },
    { label: 'Off-Plan Guide', href: '/off-plan' },
    { label: 'Commercial Real Estate', href: '/commercial-real-estate-dubai' },
    { label: 'Contact Us', href: '/contact-us' }
  ];

  const trackQuickLinkClick = (linkName) => {
    console.log('404_quick_link_click', { link: linkName });
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex-1 relative overflow-hidden">
       
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('/404/404.png')`,
          }}
        />

        <div className="absolute inset-0" />

        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
          <div className="p-10 w-full max-w-2xl">
            
            <div className="text-center mb-8">
              <div className="inline-block">
                <p className="text-8xl lg:text-9xl font-black text-gray-300 leading-none" style={{ WebkitTextStroke: '2px #00458b' }}>
                  404
                </p>
              </div>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
              Page Not Found
            </h1>

            <p className="text-center text-gray-600 text-base lg:text-lg mb-12 max-w-xl mx-auto">
              We couldn't find the page you were looking for. It may have moved, been renamed or never existed.
            </p>

            <div className="mb-12">
              <h2 className="text-lg font-semibold text-gray-900 text-center mb-6">
                Start again from one of these:
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {quickLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={() => trackQuickLinkClick(link.label)}
                    className="group flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#00458b] hover:bg-blue-50 transition-all duration-200"
                  >
                    <span className="text-gray-700 font-medium text-sm group-hover:text-[#00458b] transition-colors">
                      {link.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#00458b] transition-colors group-hover:translate-x-1 transform" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={goHome}
                className="flex-1 bg-[#00458b] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#003366] transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go to Home
              </button>
              <button
                onClick={openRequirementsForm}
                className="flex-1 border-2 border-[#00458b] text-[#00458b] px-8 py-4 rounded-lg font-semibold hover:bg-[#00458b] hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Share Your Requirements
              </button>
            </div>

            <p className="text-center text-xs lg:text-sm text-gray-500 max-w-xl mx-auto">
              If you were following a link from an email or another website and keep seeing this page, feel free to let us know via the{' '}
              <Link href="/contact-us" className="text-[#00458b] hover:underline font-medium">
                Contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <RequirementsModal 
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        pageSource="404_page"
      />

      <Footer />
    </main>
  );
}
