import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1A3668] text-white">
      <div className="max-w-9xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid font-bold grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          <div>
            <h3 className="font-bold text-sm mb-3">Worldwide Property Search</h3>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#" className="hover:text-gray-300 transition-colors">RE/MAX Canada</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">RE/MAX Commercial</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">The RE/MAX Collection</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Real Estate Articles and Advice</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-sm mb-3">Homes For Sale</h3>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#" className="hover:text-gray-300 transition-colors">New Listings For Sale</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Newest Rentals</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Open Houses</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Neighborhood Guides</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">News</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Leadership</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Investor Relations</a></li>
            </ul>
          </div>

          {/* Column 3 - RE/MAX Holdings */}
          <div>
            <h3 className="font-bold text-sm mb-3">RE/MAX Holdings</h3>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Invest in a RE/MAX Franchise</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">RE/MAX, LLC Careers</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Become a RE/MAX Agent</a></li>
            </ul>
          </div>

          {/* Column 4 - Resources + Icon */}
          <div>
            <h3 className="font-bold text-sm mb-3">NAHREP English-Spanish Glossary of Real Estate Industry Terms</h3>
            <ul className="space-y-1.5 text-sm mb-4">
              <li><a href="#" className="hover:text-gray-300 transition-colors">Advertise on the RE/MAX Media Network</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">LifeLock™ Home Title Protect</a></li>
            </ul>
          </div>
        </div>

        {/* Divider with Our Family of Brands */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[#1e3a5f] px-4 text-xs">Our Family of Brands</span>
          </div>
        </div>

        {/* Brand Logos */}
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="bg-white px-4 py-1.5 rounded flex items-center gap-1">
            <div className="w-5 h-5 bg-gray-700 rounded-sm"></div>
            <div className="text-[#1e3a5f] font-bold text-sm">
              <span>MOTTO</span>
              <br />
              <span className="text-xs">MORTGAGE</span>
            </div>
          </div>
          <div>
            <span className="text-cyan-400 font-bold text-2xl">wemlo.</span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 text-xs">
          {/* Left Side - Copyright */}
          <div className="text-gray-300 space-y-0.5 max-w-2xl">
            <p>Each office independently owned and operated.</p>
            <p>RE/MAX, LLC is an Equal Opportunity Employer and supports the Fair Housing Act and equal opportunity housing.</p>
            <p>If you have a disability that is preventing you from experiencing this website, call (800) 525-7452.</p>
            <p>© 2025 RE/MAX, LLC. All Rights Reserved.</p>
          </div>

          {/* Right Side - Social Icons & Links */}
          <div className="flex flex-col items-start md:items-end gap-3">
            {/* Social Icons */}
            <div className="flex gap-3">
              <a 
                href="https://facebook.com/remaxhubdubai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors" 
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/remaxhubdubai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors" 
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12c0-3.403 2.759-6.162 6.162-6.162 3.403 0 6.162 2.759 6.162 6.162 0 3.403-2.759 6.162-6.162 6.162-3.403 0-6.162-2.759-6.162-6.162zm2.889 0c0 1.861 1.512 3.373 3.373 3.373 1.861 0 3.373-1.512 3.373-3.373 0-1.861-1.512-3.373-3.373-3.373-1.861 0-3.373 1.512-3.373 3.373zm11.294-5.817c0 .795.645 1.44 1.44 1.44.795 0 1.44-.645 1.44-1.44 0-.795-.645-1.44-1.44-1.44-.795 0-1.44.645-1.44 1.44z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@remaxhubdubai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors" 
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://tiktok.com/@remaxhubdubai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors" 
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.498 5.913c1.528 0 2.761-1.234 2.761-2.762C22.259 1.623 21.025.389 19.498.389s-2.761 1.234-2.761 2.762c0 1.528 1.234 2.762 2.761 2.762zm3.928 1.678h-4.046v8.654c0 1.023-.833 1.854-1.857 1.854s-1.857-.83-1.857-1.854V7.591h-4.045v8.654c0 3.284 2.663 5.945 5.945 5.945 3.282 0 5.945-2.661 5.945-5.945L23.426 7.591h.568z"/>
                </svg>
              </a>
            </div>

            {/* Footer Links */}
            <div className="flex gap-4 text-xs">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Notice</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Use</a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Your Privacy Choices</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}