"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { menuConfig } from "../config/menuConfig";


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
        <div className="flex justify-between items-center h-16">
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
                className="h-12 w-auto"
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
          <div className="hidden lg:flex items-center space-x-1">
            
            {}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("buy")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="px-4 py-2 text-gray-700 font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
                aria-expanded={openMenu === "buy"}
              >
                Buy
              </button>
              {openMenu === "buy" && (
                <div className="absolute left-0 top-full mt-3 w-56 bg-white shadow-xl rounded-lg border border-gray-400">
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/homes-for-sale"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Property Search
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/buying-guide"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Buying Guide
                      </Link>
                    </li>
                    {}
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
              <button
                className="px-4 py-2 text-gray-700 font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
                aria-expanded={openMenu === "sell"}
              >
                Sell
              </button>
              {openMenu === "sell" && (
                <div className="absolute left-0 top-full mt-3 w-56 bg-white shadow-xl rounded-lg border border-gray-400">
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/selling-guide"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Selling Guide
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
              <button
                className="px-4 py-2 text-gray-700 font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
                aria-expanded={openMenu === "rent"}
              >
                Rent
              </button>
              {openMenu === "rent" && (
                <div className="absolute left-0 top-full mt-3 w-56 bg-white shadow-xl rounded-lg border border-gray-400">
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/rental-search"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Rental Search
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/rental-agent"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Find a Rental Agent
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/rental-guide"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Rental Guide
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("agents")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="px-4 py-2 text-gray-700 font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
                aria-expanded={openMenu === "agents"}
              >
                Agents
              </button>
              {openMenu === "agents" && (
                <div className="absolute left-0 top-full mt-3 w-64 bg-white shadow-xl rounded-lg border border-gray-400">
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/find-agent"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Agent Search
                      </Link>
                    </li>
                  </ul>
                  <hr className="my-2 border-gray-200" />
                  <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                    <p className="text-sm text-gray-700 mb-3">
                      We have the tools and the experience to lead you to
                      success!
                    </p>
                    <Link
                      href="/join-remax"
                      className="inline-flex items-center text-remax-blue hover:text-remax-dark-blue font-semibold text-sm transition-colors"
                    >
                      Join RE/MAX
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("more")}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="px-4 py-2 text-gray-700 font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 hover:text-gray-900"
                aria-expanded={openMenu === "more"}
              >
                More
              </button>
              {openMenu === "more" && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200">
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/luxury"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Luxury
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/global"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Global
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/commercial"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Commercial
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/articles-advice"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Articles and Advice
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about-us"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact-us"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {}
            <div className="flex items-center space-x-2 ml-4 border-l border-gray-200 pl-4">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <div className="w-8 h-8 bg-remax-blue rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.firstName}
                    </span>
                    <svg className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
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
                    <button className="text-remax-blue hover:text-remax-dark-blue font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all text-sm">
                      Log In
                    </button>
                  </Link>
                  <Link href="/sign-up">
                    <button className="bg-remax-blue text-white px-5 py-2 rounded-lg hover:bg-remax-dark-blue font-semibold shadow-sm hover:shadow transition-all text-sm">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
            
          </div>
        </div>

        {}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 space-y-4">
            {Object.entries(menuConfig).map(([key, section]) => (
              <div key={key}>
                <button
                  onClick={() => toggleMobileSubmenu(key)}
                  className="w-full flex items-center justify-between text-left text-gray-900 font-semibold py-3 hover:bg-blue-50 rounded-lg px-2 transition-colors"
                >
                  <span>{section.title}</span>
                  <span
                    className={`transform transition-transform ${
                      mobileSubmenu === key ? "rotate-90" : ""
                    }`}
                  >
                    ▸
                  </span>
                </button>
                {mobileSubmenu === key && (
                  <div className="space-y-3 pl-4">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleMobileLinkClick}
                        className="block text-sm text-gray-600 py-1 hover:text-remax-blue transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

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