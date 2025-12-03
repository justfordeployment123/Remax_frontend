'use client'
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function DropdownMenu({ title, items, isOpen, onClick }) {
  return (
    <div className="relative">
      {/* Main Menu Button */}
      <button 
        onClick={onClick}
        className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
      >
        {title}
        {items && items.length > 0 && (
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        )}
      </button>

      {/* Dropdown Menu with Animation */}
      {items && items.length > 0 && (
        <div 
          className={`absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top ${
            isOpen 
              ? 'opacity-100 visible scale-100 translate-y-0' 
              : 'opacity-0 invisible scale-95 -translate-y-2'
          }`}
          style={{ zIndex: 100 }}
        >
          <div className="py-2">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group border-b border-gray-50 last:border-b-0"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors mb-1">
                      {item.title}
                    </div>
                    {/* <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors leading-relaxed">
                      {item.description}
                    </div> */}
                  </div>
                  <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}