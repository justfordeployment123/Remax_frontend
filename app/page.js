'use client'
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [activeTab, setActiveTab] = useState('BUY');

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Matching Official Design */}
      <section className="relative w-full overflow-hidden" style={{ height: '500px' }}>
        {/* Background image matching official site */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://static-images.remax.com/assets/web/homepage/homepage-hero-4-2025.jpg')`,
            width: '100%',
            height: '100%'
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4">
          <h1 className="text-white font-bold text-center mb-6 max-w-4xl leading-tight uppercase tracking-wide" 
              style={{ 
                fontSize: '2.5rem', 
                lineHeight: '3rem',
                fontFamily: '"Montserrat", "Montserrat Fallback", sans-serif',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)'
              }}>
            WHEN HOME MATTERS MOST,<br />GO WITH THE MOST TRUSTED.
          </h1>

          {/* Search Container - Matching Official Tabs */}
          <div className="flex flex-col items-center w-full max-w-2xl">
            {/* Tabs - Matching Official Style */}
            <div className="bg-white flex rounded-t-lg w-full shadow-sm">
              {['BUY', 'RENT', 'SELL', 'AGENTS', 'OFFICES'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 ${
                    activeTab === tab
                      ? 'text-remax-blue border-remax-blue bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Bar - Enhanced to match official */}
            <div className="bg-white rounded-b-lg shadow-xl w-full p-1">
              <div className="flex gap-1">
                <input
                  type="text"
                  placeholder="Address, City, ZIP, and More"
                  className="flex-1 px-4 py-3 text-base border-0 focus:outline-none focus:ring-0"
                />
                <button className="bg-remax-red text-white px-8 py-3 hover:bg-red-700 transition-all duration-300 rounded-md flex items-center gap-2 font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>

            {/* Last Updated Info - Matching Official Style */}
            <p className="text-xs text-white mt-3 text-center flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              LISTING DATA LAST UPDATED TODAY AT 01:07 AM
            </p>

            {/* Global Search Link - Matching Official */}
            <p className="text-white text-sm mt-4 text-center flex items-center justify-center hover:underline cursor-pointer font-medium">
              Search for RE/MAX properties in over 110 countries and territories
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badge Section - Exact Official Style */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="border border-gray-300 rounded-lg p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src="https://static-images.remax.com/assets/web/homepage/bmta-red-2024.png"
                alt="BrandSpark Most Trusted"
                className="w-20 h-28 object-contain"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-bold text-gray-900 mb-3 text-xl">
                Voted #1 Most Trusted Real Estate Agents in the USA
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Voted most trusted Real Estate Agency brand by American shoppers based on the BrandSpark® American Trust Study, years 2022-2024 and 2019.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Block */}
            <div className="flex">
              <img
                src="https://static-images.remax.com/assets/web/homepage/Exteriors_Fuji_3520.jpg"
                alt="Have confidence in any market with us."
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text Content */}
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

              {/* Buttons - Matching Official Style */}
              <div className="flex flex-col gap-4">
                <button className="bg-remax-blue text-white px-6 py-3 hover:bg-remax-dark-blue transition-all duration-300 font-semibold text-sm w-fit rounded-lg">
                  Find Your RE/MAX Agent Today
                </button>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="bg-remax-blue text-white px-6 py-3 hover:bg-remax-dark-blue transition-all duration-300 font-semibold text-sm flex-1 rounded-lg">
                    Get the Homebuyer's Guide
                  </button>
                  <button className="bg-remax-blue text-white px-6 py-3 hover:bg-remax-dark-blue transition-all duration-300 font-semibold text-sm flex-1 rounded-lg">
                    Get the Homeseller's Guide
                  </button>
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
                link: '/homes-for-sale?newListingOffset=7'
              },
              { 
                title: 'Luxury Homes', 
                image: 'https://static-images.remax.com/assets/web/homepage/02_LuxuryHomes.jpg',
                link: '/luxury'
              },
              { 
                title: 'Open Houses', 
                image: 'https://static-images.remax.com/assets/web/homepage/03_OpenHouses.jpg',
                link: '/homes-for-sale?openHouseOffset=0'
              },
              { 
                title: 'Price Reductions', 
                image: 'https://static-images.remax.com/assets/web/homepage/04_PriceReductions.jpg',
                link: '/homes-for-sale?priceReducedOffset=14'
              },
              { 
                title: 'Virtual Tours', 
                image: 'https://static-images.remax.com/assets/web/homepage/05_VirtualTours.jpg',
                link: '/homes-for-sale?hasVirtualTour=1'
              },
              { 
                title: 'Miracle Homes', 
                image: 'https://static-images.remax.com/assets/web/childrens_hospitals/childrens_hospital.jpg',
                link: 'https://www.remax.com/resources/childrensmiraclenetwork'
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


      {/* Worldwide Section */}
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


      {/* Commercial Section */}
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


      {/* Luxury Section */}
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


      {/* Enhanced Footer - City Links Section */}
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

      {/* Footer */}
      <Footer />
    </main>
  )
}