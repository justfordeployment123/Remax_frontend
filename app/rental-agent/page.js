"use client";
import { useState } from "react";
import { Search, ChevronDown, MapPin, Phone } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AgentSearch() {
  const [searchCity, setSearchCity] = useState("");
  const [searchName, setSearchName] = useState("");

  const agents = [
    {
      id: 1,
      name: "Matthew Karjalahti",
      title: "Broker, Owner",
      licensed: "Licensed in IA",
      location: "Grinnell",
      company: "RE/MAX Partners Realty",
      phone: "(641) 260-0672",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Trey LaQuey",
      title: "Associate",
      licensed: "Licensed in TX",
      location: "Plano",
      company: "RE/MAX Dallas Suburbs",
      phone: "(469) 734-3815",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop",
    },
    {
      id: 3,
      name: "Sean Seigel",
      title: "Associate",
      licensed: "Licensed in CT, RI",
      location: "Mystic",
      company: "RE/MAX Coast and Country",
      phone: "(401) 207-5367",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Patrick Stracuzzi",
      title: "Broker Owner",
      licensed: "Licensed in FL",
      location: "Stuart",
      company: "RE/MAX Community",
      phone: "",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              RE/MAX<sup className="text-xs align-top">®</sup> Rental Agent Search
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We know the market, schools and communities — both as agents and neighbors. Use the search below to find a RE/MAX agent who fits your rental needs.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="Search by city, state or ZIP"
                  className="w-full pl-11 pr-4 py-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent bg-white"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Search by agent name"
                  className="w-full pl-11 pr-4 py-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent bg-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6 text-sm">
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors">
                Language <ChevronDown className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 border border-[#1A3668] rounded-md bg-[#1A3668] text-white flex items-center gap-2">
                Rentals ✕
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors">
                Years of Experience <ChevronDown className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors">
                Licensed In <ChevronDown className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors">
                Expertise <ChevronDown className="w-4 h-4" />
              </button>
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:border-[#1A3668] transition-colors cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#1A3668] rounded focus:ring-[#1A3668]" />
                <span>Must have photo</span>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <span>Sort by:</span>
                <button className="px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors">
                  No Sort <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-medium">
                6,130 results found
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{agent.name}</h3>
                      <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-[#1A3668] text-xs font-medium mb-2">
                        {agent.title}
                      </div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                        {agent.licensed}
                      </p>
                      <p className="text-sm text-gray-700 font-medium flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {agent.location}
                      </p>
                      <p className="text-sm text-gray-600">{agent.company}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <button className="flex-1 bg-[#1A3668] text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-[#15294d] transition-colors">
                          View Details
                        </button>
                        <button className="flex-1 border border-[#1A3668] text-[#1A3668] px-3 py-2 rounded-md text-sm font-semibold hover:bg-[#1A3668] hover:text-white transition-colors">
                          Contact
                        </button>
                      </div>
                      {agent.phone && (
                        <div className="border border-gray-200 rounded-md p-2">
                          <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {agent.phone}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="bg-[#1A3668] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#15294d] transition-colors">
              Load More Agents
            </button>
            <p className="text-gray-600 mt-4 text-sm">Showing 4 of 6,130 agents</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}