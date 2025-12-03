"use client";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutUs() {
  const partners = [
    {
      name: 'Bayut',
      description: 'UAE leading property portal, connecting buyers, sellers, and renters with comprehensive property listings and market insights.',
      logo: 'https://static.bayut.com/assets/logoBayutGreenEN_noinline.68ecc5e338a09cc96f4d88ab0feb815f.svg'
    },
    {
      name: 'Dubizzle',
      description: 'The region largest online marketplace, providing extensive reach for property listings and connecting with a vast network of potential clients.',
      logo: 'https://dbz-monolith-media.dubizzle.com/images/location_switcher/logos/dubizzle-logo.png'
    },
    {
      name: 'TrueBuild',
      description: 'Innovative construction and development partner, specializing in high-quality residential and commercial projects across the UAE.',
      logo: 'https://truebuild.ae/images/logo3.png'
    }
  ];

  return (
    <main className="min-h-screen bg-[#F4F4F4]">
      <Header />

      {}
      <section className="relative h-[420px] md:h-[480px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,23,59,0.55), rgba(0,23,59,0.55)), url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2070&q=80')`
          }}
        />
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center text-white">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase mb-5 text-white/80">
            About Our Company
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 max-w-3xl leading-tight">
            Built on Global Expertise. Driven by Local Insight.
          </h1>
          <p className="text-sm md:text-base text-white/80 max-w-2xl">
            RE/MAX Hub connects international reach with local market knowledge to help clients move with confidence across the UAE.
          </p>
        </div>
      </section>

      {}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1973&q=80"
                alt="Dubai skyline"
                className="w-full rounded-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                About RE/MAX Hub
              </h2>
              <p className="text-base text-gray-600 mb-5 leading-relaxed">
                RE/MAX Hub is a proud part of the world's leading real estate network — trusted by millions of buyers, sellers, and agents across 110+ countries and territories.
              </p>
              <p className="text-base text-gray-600 mb-5 leading-relaxed">
                Based in the heart of Dubai, we bring a new standard of professionalism, integrity, and market knowledge to the UAE property landscape. Our team specializes in residential, commercial, and luxury properties across Dubai, Abu Dhabi, Sharjah, and the Northern Emirates.
              </p>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Whether you're looking to find your dream home in the UAE, invest in Dubai real estate, or accelerate your property career, RE/MAX Hub is your trusted partner in every step of the journey.
              </p>
              <button className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">Our Story</h2>
            <p className="text-base text-gray-600">A legacy of excellence in real estate since 1973</p>
          </div>

          <div className="relative">
            {}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-[#D9E3F8]"></div>

            <div className="space-y-12">
              {}
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">1973 – The Beginning</h3>
                    <p className="text-sm text-gray-600">RE/MAX is founded in Denver, Colorado, revolutionizing the industry with an agent-centric model.</p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-[#00458b] rounded-full border-4 border-white z-10"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {}
              <div className="flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-6 h-6 bg-[#00458b] rounded-full border-4 border-white z-10"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">1995 – Global Expansion</h3>
                    <p className="text-sm text-gray-600">RE/MAX becomes the first real estate brand to expand globally, establishing presence in over 50 countries.</p>
                  </div>
                </div>
              </div>

              {}
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2010 – Middle East Entry</h3>
                    <p className="text-sm text-gray-600">RE/MAX establishes a strong presence in the Middle East, bringing world-class real estate services to the region.</p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-[#00458b] rounded-full border-4 border-white z-10"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {}
              <div className="flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-6 h-6 bg-[#00458b] rounded-full border-4 border-white z-10"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2020 – RE/MAX Hub Dubai</h3>
                    <p className="text-sm text-gray-600">RE/MAX Hub opens in Dubai, becoming a leading force in UAE real estate with a focus on innovation and client satisfaction.</p>
                  </div>
                </div>
              </div>

              {}
              <div className="flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2025 – Leading the Market</h3>
                    <p className="text-sm text-gray-600">RE/MAX Hub continues to grow, serving clients across Dubai, Abu Dhabi, and the UAE with unmatched expertise and service.</p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-[#00458b] rounded-full border-4 border-white z-10"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading real estate platforms, trusted developers, and global networks to provide comprehensive property solutions and market coverage.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300 h-full">
                {partner.logo && (
                  <div className="mb-4 h-16 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      className="h-12 object-contain"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-[#00458b] mb-3">
                  {partner.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3">Discover Our Latest Listings</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Explore Dubai's most sought-after communities — from waterfront apartments and luxury villas to off-plan investments. Our expert agents help you find the right property, at the right value.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {['Off-Plan Projects', 'Ready Properties', 'Commercial', 'For Rent'].map((label) => (
              <button
                key={label}
                className="bg-white text-gray-800 px-5 py-3 rounded-lg text-sm font-medium border border-gray-200"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-[#00458b] text-white px-6 py-3 rounded-lg text-sm font-semibold">
              Browse All Listings
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}