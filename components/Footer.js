import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1A3668] text-white">
      <div className="max-w-9xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid font-bold grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Column 1 - Worldwide Property Search */}
          <div>
            <h3 className="font-bold text-sm mb-3">Worldwide Property Search</h3>
            <ul className="space-y-1.5 text-sm">
              <li><a href="#" className="hover:text-gray-300 transition-colors">RE/MAX Canada</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">RE/MAX Commercial</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">The RE/MAX Collection</a></li>
              <li><a href="#" className="hover:text-gray-300 transition-colors">Real Estate Articles and Advice</a></li>
            </ul>
          </div>

          {/* Column 2 - Homes For Sale */}
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
            
            {/* Location Icon */}
            <div className="flex items-start gap-2">
              <MapPin className="w-6 h-6 flex-shrink-0" />
              <div className="text-xs leading-tight">
                <div>Children's</div>
                <div>Miracle Network</div>
                <div>Hospitals</div>
              </div>
            </div>
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
              <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors" aria-label="Pinterest">
                <div className="w-4 h-4 flex items-center justify-center font-bold text-xs">P</div>
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
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