"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";


export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const closeTimeoutRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (menuKey) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setOpenMenu(menuKey);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  const toggleMobileSubmenu = (menuKey) => {
    setMobileSubmenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setMobileSubmenu(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsProfileOpen(false);
    window.location.href = '/';
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {}
          <div className="flex items-center">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity"
              title="RE/MAX Home"
            >
              <img
                src="/assets/Remax_logo.jpeg"
                alt="RE/MAX"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {}
          <div className="hidden lg:flex items-center justify-between flex-1">
            
            {}
            <div className="flex items-center space-x-1">
              {}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("buy")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/buy-residential-dubai"
                  className="px-3 py-2 text-sm text-gray-700 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
                >
                  Buy
                </Link>
              {openMenu === "buy" && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200">
                  <ul className="py-1.5">
                    <li>
                      <Link
                        href="/buy-residential-dubai"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Buy a Home in Dubai</div>
                        <div className="text-xs text-gray-500 mt-0.5">Process, communities, costs.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/properties?type=sale"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Browse Our Listings</div>
                        <div className="text-xs text-gray-500 mt-0.5">View residential listings.</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              </div>

              {}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("invest")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/investors"
                  className="px-3 py-2 text-sm text-gray-700 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
                >
                  Invest
                </Link>
                {openMenu === "invest" && (
                  <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200">
                    <ul className="py-1.5">
                      <li>
                        <Link
                          href="/investors"
                          className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                        >
                          <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Investor Hub</div>
                          <div className="text-xs text-gray-500 mt-0.5">Strategies and support.</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/playbook-2026-2035"
                          className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                        >
                          <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Market Playbook</div>
                          <div className="text-xs text-gray-500 mt-0.5">Dubai 2026–2035 view.</div>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/guides/investment"
                          className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                        >
                          <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Data & Insights</div>
                          <div className="text-xs text-gray-500 mt-0.5">Investor articles.</div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

            {}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("offplan")}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/off-plan"
                className="px-3 py-2 text-sm text-gray-700 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
              >
                Off-Plan
              </Link>
              {openMenu === "offplan" && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200">
                  <ul className="py-1.5">
                    <li>
                      <Link
                        href="/off-plan"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Off-Plan Guide</div>
                        <div className="text-xs text-gray-500 mt-0.5">Compare vs ready.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/off-plan/projects"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Featured Projects</div>
                        <div className="text-xs text-gray-500 mt-0.5">Curated projects.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Submit Enquiry</div>
                        <div className="text-xs text-gray-500 mt-0.5">Share requirements.</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              </div>

              {}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("commercial")}
                onMouseLeave={handleMouseLeave}
              >
              <Link
                href="/commercial-real-estate-dubai"
                className="px-3 py-2 text-sm text-gray-700 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
              >
                Commercial
              </Link>
              {openMenu === "commercial" && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200">
                  <ul className="py-1.5">
                    <li>
                      <Link
                        href="/commercial-real-estate-dubai"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Commercial Real Estate</div>
                        <div className="text-xs text-gray-500 mt-0.5">Offices, retail, industrial.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/properties?segment=commercial"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Commercial Listings</div>
                        <div className="text-xs text-gray-500 mt-0.5">Browse stock.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/commercial-real-estate-dubai/fit-out"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Fit-Out Support</div>
                        <div className="text-xs text-gray-500 mt-0.5">Design and approvals.</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              </div>

              {}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("rent")}
                onMouseLeave={handleMouseLeave}
              >
              <Link
                href="/rent-dubai"
                className="px-3 py-2 text-sm text-gray-700 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
              >
                Rent
              </Link>
              {openMenu === "rent" && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200">
                  <ul className="py-1.5">
                    <li>
                      <Link
                        href="/rent-dubai"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Rent a Home</div>
                        <div className="text-xs text-gray-500 mt-0.5">Process and FAQs.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/landlords"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Lease Out Property</div>
                        <div className="text-xs text-gray-500 mt-0.5">Landlord support.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/properties?type=rent"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Rental Listings</div>
                        <div className="text-xs text-gray-500 mt-0.5">Browse rentals.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/guides/renting"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Rental Guide</div>
                        <div className="text-xs text-gray-500 mt-0.5">Tenant info.</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              </div>

              {}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("sell")}
                onMouseLeave={handleMouseLeave}
              >
              <Link
                href="/sell"
                className="px-3 py-2 text-sm text-gray-700 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
              >
                Sell
              </Link>
              {openMenu === "sell" && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200">
                  <ul className="py-1.5">
                    <li>
                      <Link
                        href="/sell"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Sell Your Property</div>
                        <div className="text-xs text-gray-500 mt-0.5">Valuation and marketing.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/guides/selling"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">Selling Guide</div>
                        <div className="text-xs text-gray-500 mt-0.5">Step-by-step guide.</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              </div>

              {}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("guides")}
                onMouseLeave={handleMouseLeave}
              >
              <Link
                href="/guides"
                className="px-3 py-2 text-sm text-gray-700 font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
              >
                Guides
              </Link>
              {openMenu === "guides" && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200">
                  <ul className="py-1.5">
                    <li>
                      <Link
                        href="/guides"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">All Guides</div>
                        <div className="text-xs text-gray-500 mt-0.5">Market insights.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/guides/buying"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">For Buyers</div>
                        <div className="text-xs text-gray-500 mt-0.5">Essential guides.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/guides/investment"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">For Investors</div>
                        <div className="text-xs text-gray-500 mt-0.5">Investment strategies.</div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/guides/selling-landlords"
                        className="block px-4 py-2 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="font-medium text-sm text-gray-900 group-hover:text-[#00458b]">For Landlords</div>
                        <div className="text-xs text-gray-500 mt-0.5">Property owner resources.</div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              </div>

            </div>

            {}
            <div className="flex items-center space-x-1">
              <Link
                href="/about"
                className="px-3 py-2 text-sm text-gray-600 font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 hover:text-gray-900"
              >
                About
              </Link>

              <Link
                href="/contact-us"
                className="px-3 py-2 text-sm text-gray-600 font-medium transition-all duration-200 rounded-lg hover:bg-gray-50 hover:text-gray-900"
              >
                Contact
              </Link>

              <Link
                href="/join"
                className="px-3 py-2 text-sm text-[#00458b] font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 ml-2"
              >
                Join RE/MAX HUB
              </Link>

              {}
              <div className="flex items-center space-x-2 ml-3 pl-3 border-l border-gray-200">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-1.5 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <div className="w-7 h-7 bg-remax-blue rounded-full flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.firstName}
                    </span>
                    <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                      {}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          Hello, {user.firstName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {user.email}
                        </p>
                      </div>

                      {}
                      <div className="py-2">
                        <Link
                          href="/account/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          Account Settings
                        </Link>
                        
                        <Link
                          href="/account/goals"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          My Goals
                        </Link>
                        
                        <Link
                          href="/account/searches"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                          </svg>
                          Saved Searches
                        </Link>
                        
                        <Link
                          href="/account/favorites"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          My Favourites
                        </Link>
                      </div>

                      {}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <button className="text-[#00458b] hover:text-remax-dark-blue font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all text-sm">
                      Log In
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="bg-[#00458b] text-white px-4 py-1.5 rounded-lg hover:bg-remax-dark-blue font-medium shadow-sm hover:shadow transition-all text-sm">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
            </div>
          </div>
        </div>

        {}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-4">
            {}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("buy")}
                className="w-full flex items-center justify-between text-left text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors"
              >
                <span>Buy</span>
                <span className={`transform transition-transform ${mobileSubmenu === "buy" ? "rotate-90" : ""}`}>▸</span>
              </button>
              {mobileSubmenu === "buy" && (
                <div className="space-y-3 pl-4">
                  <Link href="/buy-residential-dubai" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Buy a Home in Dubai
                  </Link>
                  <Link href="/properties?type=sale" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Browse Our Listings
                  </Link>
                </div>
              )}
            </div>

            {}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("invest")}
                className="w-full flex items-center justify-between text-left text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors"
              >
                <span>Invest</span>
                <span className={`transform transition-transform ${mobileSubmenu === "invest" ? "rotate-90" : ""}`}>▸</span>
              </button>
              {mobileSubmenu === "invest" && (
                <div className="space-y-3 pl-4">
                  <Link href="/investors" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Investor Hub
                  </Link>
                  <Link href="/playbook-2026-2035" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    2026–2035 Market Playbook
                  </Link>
                  <Link href="/guides/investment" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Data & Insights (Investor)
                  </Link>
                </div>
              )}
            </div>

            {}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("offplan")}
                className="w-full flex items-center justify-between text-left text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors"
              >
                <span>Off-Plan</span>
                <span className={`transform transition-transform ${mobileSubmenu === "offplan" ? "rotate-90" : ""}`}>▸</span>
              </button>
              {mobileSubmenu === "offplan" && (
                <div className="space-y-3 pl-4">
                  <Link href="/off-plan" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Off-Plan Guide
                  </Link>
                  <Link href="/off-plan/projects" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Featured Projects
                  </Link>
                  <Link href="/contact-us" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Submit an Off-Plan Enquiry
                  </Link>
                </div>
              )}
            </div>

            {}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("commercial")}
                className="w-full flex items-center justify-between text-left text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors"
              >
                <span>Commercial</span>
                <span className={`transform transition-transform ${mobileSubmenu === "commercial" ? "rotate-90" : ""}`}>▸</span>
              </button>
              {mobileSubmenu === "commercial" && (
                <div className="space-y-3 pl-4">
                  <Link href="/commercial-real-estate-dubai" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Commercial Real Estate in Dubai
                  </Link>
                  <Link href="/properties?segment=commercial" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Commercial Listings
                  </Link>
                  <Link href="/commercial-real-estate-dubai/fit-out" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Workspace & Fit-Out Support
                  </Link>
                </div>
              )}
            </div>

            {}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("rent")}
                className="w-full flex items-center justify-between text-left text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors"
              >
                <span>Rent</span>
                <span className={`transform transition-transform ${mobileSubmenu === "rent" ? "rotate-90" : ""}`}>▸</span>
              </button>
              {mobileSubmenu === "rent" && (
                <div className="space-y-3 pl-4">
                  <Link href="/rent-dubai" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Rent a Home in Dubai
                  </Link>
                  <Link href="/landlords" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Lease Out Your Property
                  </Link>
                  <Link href="/properties?type=rent" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Browse Rental Listings
                  </Link>
                  <Link href="/guides/renting" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Rental Guide
                  </Link>
                </div>
              )}
            </div>

            {}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("sell")}
                className="w-full flex items-center justify-between text-left text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors"
              >
                <span>Sell</span>
                <span className={`transform transition-transform ${mobileSubmenu === "sell" ? "rotate-90" : ""}`}>▸</span>
              </button>
              {mobileSubmenu === "sell" && (
                <div className="space-y-3 pl-4">
                  <Link href="/sell" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Sell Your Property
                  </Link>
                  <Link href="/guides/selling" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    Selling Guide
                  </Link>
                </div>
              )}
            </div>

            {}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("guides")}
                className="w-full flex items-center justify-between text-left text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors"
              >
                <span>Guides</span>
                <span className={`transform transition-transform ${mobileSubmenu === "guides" ? "rotate-90" : ""}`}>▸</span>
              </button>
              {mobileSubmenu === "guides" && (
                <div className="space-y-3 pl-4">
                  <Link href="/guides" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    All Guides & Articles
                  </Link>
                  <Link href="/guides/buying" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    For Buyers & End-Users
                  </Link>
                  <Link href="/guides/investment" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    For Investors
                  </Link>
                  <Link href="/guides/selling-landlords" onClick={handleMobileLinkClick} className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors">
                    For Landlords & Sellers
                  </Link>
                </div>
              )}
            </div>

            {}
            <Link href="/about" onClick={handleMobileLinkClick} className="block text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors">
              About
            </Link>

            {}
            <Link href="/contact-us" onClick={handleMobileLinkClick} className="block text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors">
              Contact
            </Link>

            {}
            <Link href="/join" onClick={handleMobileLinkClick} className="block text-[#00458b] font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors">
              Join RE/MAX HUB
            </Link>

            <div className="pt-4 border-t border-gray-200 space-y-3">
              {user ? (
                <>
                  <div className="px-2 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      Hello, {user.firstName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {user.email}
                    </p>
                  </div>
                  
                  <Link
                    href="/account"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-sm text-gray-700 py-2 hover:text-remax-blue transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Your Account
                  </Link>
                  
                  <Link
                    href="/account/settings"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-sm text-gray-700 py-2 hover:text-remax-blue transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    Account Settings
                  </Link>
                  
                  <Link
                    href="/account/goals"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-sm text-gray-700 py-2 hover:text-remax-blue transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    My Goals
                  </Link>
                  
                  <Link
                    href="/account/searches"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-sm text-gray-700 py-2 hover:text-remax-blue transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    Saved Searches
                  </Link>
                  
                  <Link
                    href="/account/favorites"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-sm text-gray-700 py-2 hover:text-remax-blue transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    My Favourites
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-sm text-red-600 py-2 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={handleMobileLinkClick}
                    className="block text-sm text-gray-700 hover:text-remax-blue transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={handleMobileLinkClick}
                    className="inline-flex items-center justify-center w-full bg-[#00458b] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-remax-dark-blue transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}