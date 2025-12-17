"use client";
import Link from 'next/link';
import { MdCheckCircle } from 'react-icons/md';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#00458b]/5 to-white flex flex-col">
      <Header />
      
      <section className="flex-grow py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-100">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <MdCheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                No Account Required
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Access all our resources, guides, and property listings without creating an account. Explore Dubai's real estate market freely.
              </p>
            </div>

            {/* For Customers Section */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">For Customers & Investors</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Browse our comprehensive guides, search properties, explore market insights, and get expert advice on buying, selling, renting, or investing in Dubai – all without signing up.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-gray-700">Browse all residential, commercial, and off-plan properties</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-gray-700">Access expert guides and market insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold text-lg">✓</span>
                  <span className="text-gray-700">Contact our agents directly for consultations</span>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/find-agent"
                  className="flex-1 bg-[#00458b] text-white px-6 py-3 rounded-lg hover:bg-[#003366] transition-colors font-semibold text-center"
                >
                  Connect with an Agent
                </Link>
                <Link
                  href="/guides"
                  className="flex-1 bg-white text-[#00458b] border-2 border-[#00458b] px-6 py-3 rounded-lg hover:bg-[#00458b] hover:text-white transition-colors font-semibold text-center"
                >
                  Explore Guides
                </Link>
              </div>
            </div>

            {/* For Team Members Section */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">For RE/MAX Hub Dubai Team Members</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                If you're a member of the RE/MAX HUB Dubai team and need access to the admin panel or exclusive team features, please contact our support team for credentials and access.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-amber-600 font-bold">📧</span>
                  <div>
                    <p className="text-sm text-gray-600">Email:</p>
                    <a href="mailto:support@remaxhubdubai.com" className="text-[#00458b] hover:underline font-semibold">
                      support@remaxhubdubai.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-600 font-bold">📞</span>
                  <div>
                    <p className="text-sm text-gray-600">Call or WhatsApp:</p>
                    <a href="tel:+971" className="text-[#00458b] hover:underline font-semibold">
                      Available 24/7
                    </a>
                  </div>
                </div>
              </div>
              
              <Link
                href="/contact-us"
                className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-center inline-block"
              >
                Contact Support
              </Link>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600">
                Ready to get started? <Link href="/" className="text-[#00458b] hover:underline font-semibold">
                  Return to Home
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}