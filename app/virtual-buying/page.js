'use client'
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Video, Home, FileCheck, CheckCircle, Monitor, Smartphone, Globe } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function VirtualBuying() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      number: 1,
      title: "Virtual Consultation",
      description: "Schedule phone calls or virtual appointments with your agent to review everything on your property wish list. Connect from anywhere in the world.",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=600&fit=crop",
      icon: Video
    },
    {
      number: 2,
      title: "Sharing Properties",
      description: "You and your agent can share listings and preferred properties within your REMAX tools to be viewed at any time, on any device.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      icon: Home
    },
    {
      number: 3,
      title: "Virtual Tours & Inspections",
      description: "Experience properties through high-quality virtual tours, 3D walkthroughs, and live video inspections with your agent.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      icon: Monitor
    },
    {
      number: 4,
      title: "Digital Documentation",
      description: "Sign contracts, review documents, and complete all paperwork securely online with our digital tools and e-signature capabilities.",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
      icon: FileCheck
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: "Buy From Anywhere",
      description: "Purchase your dream home from any location worldwide with complete confidence and security."
    },
    {
      icon: Smartphone,
      title: "Mobile-Friendly",
      description: "Access all tools and resources from your phone, tablet, or computer at your convenience."
    },
    {
      icon: CheckCircle,
      title: "Secure & Reliable",
      description: "Industry-leading security measures protect your information and transactions throughout the process."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-white">
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Image on Top */}
          <div className="mb-12">
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Virtual Home Buying"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className=" max-w-6xl">
            <h1 className="text-4xl font-semibold text-[#1A3668] mb-6 leading-tight">
              Welcome to REMAX’s Virtual Home Buying Guide!
            </h1>
            <p className="text-base text-gray-700 leading-relaxed">
              Did you know that you can buy your dream home from anywhere in the world, with convenience and confidence? Whether you’re relocating across the country, navigating a disability, or you’re simply exploring options to make the purchasing process less stressful and more efficient, here’s what you need to know about buying a home virtually.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className=" mb-8">
            <h2 className="text-3xl font-semibold text-[#1A3668] mb-6">
              Why Choose Virtual Home Buying?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              Whether you're relocating across the country, have mobility challenges, or simply prefer a more efficient process, virtual home buying offers unmatched convenience and flexibility.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              return (
                <div key={index} className="group bg-white p-8 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-600 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Virtual Home Buying Steps */}
      <section className="py-16 bg-gray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-left mb-16">
            <h2 className="text-3xl font-semibold text-[#1A3668] mb-6">
              Virtual Home Buying, Step By Step
            </h2>
          </div>

          {/* Enhanced Step Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {slides.map((slide, index) => {
              const IconComponent = slide.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-gray-200 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-remax-blue/10 to-remax-dark-blue/10 rounded-full -translate-y-10 translate-x-10"></div>

                  <div className="relative z-10">
                    <div className="text-sm font-bold text-remax-blue mb-3">
                      STEP {slide.number}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-[#1A3668] mb-6">
                Cutting-Edge Technology Meets Personal Service
              </h2>
              <p className="text-md text-gray-600 mb-2 leading-relaxed">
                As technology evolves, so does the way we buy homes. RE/MAX combines state-of-the-art virtual tools with the personalized expertise of experienced real estate professionals.
              </p>
              <p className="text-gray-600 text-md mb-3 leading-relaxed">
                There are times when buyers can't be present in person to view a property, but with RE/MAX's cutting-edge home buying tools, everything can be done seamlessly from your phone, computer, or tablet. Our experienced <span className="text-remax-blue font-semibold">real estate agents</span> dedicate their time to providing you with all the details you need about your property, ensuring you feel informed and confident, even from a distance.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-xl">
                  <div className="w-10 h-10 bg-[#1A3668] rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">3D Virtual Tours</h4>
                    <p className="text-gray-600 text-sm">Explore every corner of properties with immersive 3D walkthroughs</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-4 bg-green-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Live Video Consultations</h4>
                    <p className="text-gray-600 text-sm">Connect face-to-face with agents through secure video calls</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-4 bg-purple-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">Digital Document Management</h4>
                    <p className="text-gray-600 text-sm">Sign and manage all paperwork securely online</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Technology and Real Estate"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating Tech Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-remax-blue">AI-Powered</div>
                <div className="text-sm text-gray-600">Smart Matching</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-gray-700 relative overflow-hidden" style={{ backgroundColor: '#f5f6f9' }}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            Ready to Start Your Virtual Home Buying Journey?
          </h2>
          <p className="text-sm mb-6 leading-relaxed text-gray/90">
            Connect with a trusted RE/MAX agent today and discover how easy it is to buy your dream home from anywhere in the world. Our experts are ready to guide you through every step of the process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-[#1A3668] text-white px-6 py-2 font-semibold text-md">
              FIND A RE/MAX AGENT
            </button>
            <button className="border-2 bg-[#1A3668] text-white px-6 py-2 font-semibold text-md">
              SCHEDULE A CONSULTATION
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}