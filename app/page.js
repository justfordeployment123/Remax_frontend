'use client'
import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState('BUY');

  return (
    <main className="min-h-screen bg-white">
      
      <Header />

      <section className="relative w-full overflow-hidden" style={{ height: '562px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://static-images.remax.com/assets/web/homepage/homepage-hero-4-2025.jpg')`,
            width: '100%',
            height: '100%'
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>

        <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 lg:px-20">
          <div className="max-w-2xl">

            <h1 className="text-white font-bold mb-6 leading-tight" 
                style={{ 
                  fontSize: '3.5rem',
                  lineHeight: '1.1',
                  fontFamily: '"Montserrat", "Montserrat Fallback", sans-serif',
                  textShadow: '2px 2px 12px rgba(0, 0, 0, 0.8)'
                }}>
              Discover Your
              <span className="text-remax-gold block">Dream Property</span>
              In Dubai
            </h1>

            <p className="text-white text-xl mb-8 leading-relaxed max-w-lg opacity-90">
              Luxury villas, modern apartments, and premium commercial spaces 
              in the most sought-after locations across Dubai.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/homes-for-sale" passHref>
                <button className="bg-[#1A3668] text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-5 shadow-lg">
                  Explore Properties
                </button>
              </Link>
              <Link href="/rental-agent" passHref>
                <button className="bg-white text-[#1A3668] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-5 shadow-lg">
                  Contact an Agent
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-white">
                <div className="text-2xl font-bold text-remax-gold">500+</div>
                <div className="text-sm opacity-80">Properties Listed</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold text-remax-gold">AED 2B+</div>
                <div className="text-sm opacity-80">Property Value Sold</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold text-remax-gold">99%</div>
                <div className="text-sm opacity-80">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="border border-gray-300 rounded-lg p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src="https://static-images.remax.com/assets/web/homepage/bmta-red-2025.png"
                alt="UAE Real Estate Excellence Award"
                className="w-20 h-28 object-contain"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-bold text-gray-900 mb-3 text-xl">
                Recognized as the Most Trusted Real Estate Brand in the UAE
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Honored for excellence and trust by UAE property buyers and investors, 
                based on the GCC Real Estate Trust Index (2022–2025). Proudly serving 
                communities across Dubai, Abu Dhabi, Sharjah, and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {}
            <div className="flex">
              <img
                src="https://static-images.remax.com/assets/web/homepage/Exteriors_Fuji_3520.jpg"
                alt="Have confidence in any market with us."
                className="w-full h-full object-cover"
              />
            </div>
            
            {}
            <div className="flex flex-col justify-center">
              <h2 className="font-bold text-gray-900 mb-6 text-2xl leading-tight">
                Have confidence in any market with us.
              </h2>
              
              <div className="text-gray-600 mb-6 space-y-4 text-base leading-relaxed">
                <p>
                  RE/MAX® agents have the experience to get the job done in today's market<sup>1</sup>, 
                  backed by a robust network of over 140,000 agents in more than 9,000 offices worldwide. 
                  With our extensive global connections and deep local insights, you gain an edge that 
                  transcends what you'll find online.
                </p>
                <p>
                  The right time to move is when you're with the right agent—nobody sells more real estate than RE/MAX<sup>2</sup>.
                </p>
              </div>

              <div className="text-gray-500 text-sm mb-8">
                <sup>1, 2</sup>As measured by residential transaction sides.
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/rental-agent" passHref>
                  <button className="bg-[#1A3668] text-white px-6 py-3 hover:bg-remax-dark-blue transition-all duration-300 font-semibold text-sm w-fit rounded-lg">
                    Find Your RE/MAX Agent Today
                  </button>
                </Link>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/buying-guide" passHref>
                    <button className="bg-[#1A3668] text-white px-6 py-3 hover:bg-remax-dark-blue transition-all duration-300 font-semibold text-sm flex-1 rounded-lg">
                      Get the Homebuyer's Guide
                    </button>
                  </Link>
                  <Link href="/selling-guide" passHref>
                    <button className="bg-[#1A3668] text-white px-6 py-3 hover:bg-remax-dark-blue transition-all duration-300 font-semibold text-sm flex-1 rounded-lg">
                      Get the Homeseller's Guide
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'New Listings', 
                image: 'https://static-images.remax.com/assets/web/homepage/01_NewListings.jpg',
                link: '/property?newListingOffset=7'
              },
              { 
                title: 'Luxury Homes', 
                image: 'https://static-images.remax.com/assets/web/homepage/02_LuxuryHomes.jpg',
                link: '/luxury'
              },
              { 
                title: 'Open Houses', 
                image: 'https://static-images.remax.com/assets/web/homepage/03_OpenHouses.jpg',
                link: '/property?openHouseOffset=0'
              },
              { 
                title: 'Price Reductions', 
                image: 'https://static-images.remax.com/assets/web/homepage/04_PriceReductions.jpg',
                link: '/property?priceReducedOffset=14'
              },
              { 
                title: 'Virtual Tours', 
                image: 'https://static-images.remax.com/assets/web/homepage/05_VirtualTours.jpg',
                link: '/property?hasVirtualTour=1'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-md overflow-hidden transition-all duration-300 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`Quick search for ${item.title}`}
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-600 text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {}
      <section className="relative h-[410px] flex items-center justify-end text-right">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://static-images.remax.com/assets/web/homepage/07_Worldwide.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-white/65"></div>

        <div className="relative z-10 flex justify-center mr-[10%]">
          <div className="flex flex-col items-center text-center space-y-5">
            <img 
              src="https://media.remax-prod.eng.remax.tech/9883e187-6f7f-3727-9d7f-b4e87dd89a6a/worldmap.png" 
              alt="Worldwide" 
              className="w-20 h-20 mb-2"
            />
            <h2 className="text-3xl font-bold text-gray-700">Worldwide</h2>
            <div className="w-20 h-1 bg-remax-red"></div>
            <p className="text-gray-700 text-lg font-bold">One World. One Search.</p>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-sm hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-sm tracking-wide">
                SEARCH GLOBAL
              </button>
            </a>
          </div>
        </div>
      </section>


      {}
      <section className="relative h-[410px] mt-0.5 flex items-center justify-start text-left">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://static-images.remax.com/assets/web/homepage/08_Commercial.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex justify-center ml-[15%] w-[400px]">
          <div className="flex flex-col items-center text-center space-y-5 w-full">
            <img 
              src="https://media.remax-prod.eng.remax.tech/ed03ac06-4d95-3f3d-85d1-c2915e1466c2/commercial.png" 
              alt="Commercial" 
              className="w-35 h-22 mb-2"
            />
            <h2 className="text-3xl font-bold text-white">Commercial</h2>
            <div className="w-20 h-1 bg-remax-red"></div>
            <p className="text-white text-lg font-bold">Commercial with Confidence</p>
            <button className="border-2 border-white text-white px-6 py-2 rounded-sm hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-sm tracking-wide">
              Explore Commercial Real Estate
            </button>
          </div>
        </div>
      </section>


      {}
      <section className="relative h-[410px] mt-0.5 flex items-center justify-end text-right">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://static-images.remax.com/assets/web/homepage/09_Collection.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-blue-900/40"></div>

        <div className="relative z-10 flex justify-center mr-[15%] w-[400px]">
          <div className="flex flex-col items-center text-center space-y-5 w-full">
            <img 
              src="https://media.remax-prod.eng.remax.tech/868d7bce-0109-34ae-a054-4762c4966f4b/collection.png" 
              alt="Luxury" 
              className="w-32 h-26 mb-2"
            />
            <h2 className="text-3xl font-bold text-white">Luxury</h2>
            <div className="w-20 h-1 bg-remax-red"></div>
            <p className="text-white text-lg font-bold">Fine Homes & Luxury Properties</p>
            <button className="border-2 border-white text-white px-6 py-2 rounded-sm hover:bg-white hover:text-gray-900 transition-all duration-300 font-semibold text-sm tracking-wide">
              Discover Luxury
            </button>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Trusted Partners</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We collaborate with leading real estate platforms and trusted partners to provide comprehensive property solutions across the UAE.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {}
            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 h-16 flex items-center justify-center">
                <img
                  src="https://static.bayut.com/assets/logoBayutGreenEN_noinline.68ecc5e338a09cc96f4d88ab0feb815f.svg"
                  alt="Bayut Logo"
                  className="h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bayut</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                UAE's leading property portal, connecting buyers, sellers, and renters with comprehensive property listings and market insights.
              </p>
            </div>

            {/* Dubizzle */}
            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 h-16 flex items-center justify-center">
                <img
                  src="https://dbz-monolith-media.dubizzle.com/images/location_switcher/logos/dubizzle-logo.png"
                  alt="Dubizzle Logo"
                  className="h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Dubizzle</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The region's largest online marketplace, providing extensive reach for property listings and connecting with a vast network of potential clients.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 h-16 flex items-center justify-center">
                <img
                  src="https://truebuild.ae/images/logo3.png"
                  alt="TrueBuild Logo"
                  className="h-12 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">TrueBuild</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Innovative construction and development partner, specializing in high-quality residential and commercial projects across the UAE.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Real Estate Listings By Location</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Properties in Dubai Marina',
              'Properties in Downtown Dubai',
              'Properties in Palm Jumeirah',
              'Properties in Abu Dhabi',
              'Properties in Jumeirah Beach Residence',
              'Properties in Business Bay',
              'Properties in Dubai Hills Estate',
              'Properties in Arabian Ranches'
            ].map((location, index) => (
              <a 
                key={index} 
                href="#" 
                className="text-remax-blue hover:text-remax-dark-blue hover:underline transition-colors duration-300 text-center md:text-left py-2"
              >
                {location}
              </a>
            ))}
          </div>
        </div>
      </section>

      {}
      <Footer />
    </main>
  )
}