"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { menuConfig } from "../config/menuConfig";
import { 
  User, 
  Settings, 
  Target, 
  Search, 
  Heart, 
  LogOut,
  ChevronDown
} from "lucide-react";

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
          {/* RE/MAX Logo */}
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

          {/* Mobile Menu Toggle */}
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

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            
            {/* !!! Note that just commented it as mentioned on the document to do so, not removing*/}
            {/* <div
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
                        href="/property-search"
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
                    <li>
                      <Link
                        href="/virtual-buying"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Virtual Home Buying
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div> */}

            {/* Sell Menu */}
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

            {/* Rent Menu */}
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

                    {/* commented out the rental search, mentioned in document */}
                    {/* <li>
                      <Link
                        href="/rental-search"
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-remax-blue transition-colors"
                      >
                        Rental Search
                      </Link>
                    </li> */}
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

            {/* Agents Menu */}
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

            {/* More Menu */}
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

            {/* User Profile or Login/Signup Buttons */}
            <div className="flex items-center space-x-2 ml-4 border-l border-gray-200 pl-4">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <div className="w-8 h-8 bg-remax-blue rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.firstName}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg border border-gray-200 py-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          Hello, {user.firstName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {user.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href="/account/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Account Settings
                        </Link>
                        
                        <Link
                          href="/account/goals"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Target className="w-4 h-4 mr-3" />
                          My Goals
                        </Link>
                        
                        <Link
                          href="/account/searches"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Search className="w-4 h-4 mr-3" />
                          Saved Searches
                        </Link>
                        
                        <Link
                          href="/account/favorites"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Heart className="w-4 h-4 mr-3" />
                          My Favourites
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
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

        {/* Mobile Menu */}
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
                    <User className="w-4 h-4 mr-3" />
                    Your Account
                  </Link>
                  
                  <Link
                    href="/account/settings"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-sm text-gray-700 py-2 hover:text-remax-blue transition-colors"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Account Settings
                  </Link>
                  
                  <Link
                    href="/account/goals"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-sm text-gray-700 py-2 hover:text-remax-blue transition-colors"
                  >
                    <Target className="w-4 h-4 mr-3" />
                    My Goals
                  </Link>
                  
                  <Link
                    href="/account/searches"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-sm text-gray-700 py-2 hover:text-remax-blue transition-colors"
                  >
                    <Search className="w-4 h-4 mr-3" />
                    Saved Searches
                  </Link>
                  
                  <Link
                    href="/account/favorites"
                    onClick={handleMobileLinkClick}
                    className="flex items-center text-sm text-gray-700 py-2 hover:text-remax-blue transition-colors"
                  >
                    <Heart className="w-4 h-4 mr-3" />
                    My Favourites
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-sm text-red-600 py-2 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
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