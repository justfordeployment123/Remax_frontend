"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ChevronDown, MapPin, Phone, X, Loader2 } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function FindAgent() {
  const searchParams = useSearchParams();
  const [searchCity, setSearchCity] = useState("");
  const [searchName, setSearchName] = useState("");
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter states - initialize with URL parameters
  const [filters, setFilters] = useState({
    language: "",
    experience: "",
    licenseState: "",
    expertise: searchParams?.get('expertise') || "",
    mustHavePhoto: false
  });
  
  const [showFilters, setShowFilters] = useState({
    language: false,
    experience: false,
    licenseState: false,
    expertise: false
  });

  // Available filter options
  const experienceOptions = [
    { value: "0-2", label: "0-2 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "6-10", label: "6-10 years" },
    { value: "11-20", label: "11+ years" }
  ];

  const expertiseOptions = [
    { value: "Residential", label: "Residential" },
    { value: "Commercial", label: "Commercial" },
    { value: "Luxury", label: "Luxury" },
    { value: "Investment", label: "Investment" },
    { value: "Rentals", label: "Rentals" }
  ];

  const stateOptions = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  // Fetch agents from API
  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError("");
      
      const params = new URLSearchParams();
      
      // Add search parameters
      if (searchCity.trim()) {
        // Check if it's a ZIP code (5 digits) or city/state
        if (/^\d{5}$/.test(searchCity.trim())) {
          params.append('zip', searchCity.trim());
        } else {
          params.append('city', searchCity.trim());
        }
      }
      
      if (searchName.trim()) {
        params.append('name', searchName.trim());
      }
      
      // Add filter parameters
      if (filters.language) {
        params.append('language', filters.language);
      }
      
      if (filters.experience) {
        params.append('experience', filters.experience);
      }
      
      if (filters.licenseState) {
        params.append('licenseState', filters.licenseState);
      }
      
      if (filters.expertise) {
        params.append('expertise', filters.expertise);
      }
      
      // Add pagination
      params.append('page', currentPage.toString());
      params.append('limit', '10');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setAgents(data.data.agents);
        setTotalResults(data.data.total);
        setTotalPages(data.data.totalPages);
      } else {
        setError(data.message || 'Failed to fetch agents');
        setAgents([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      setError('Failed to fetch agents. Please try again.');
      setAgents([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch agents on component mount and when search/filter parameters change
  useEffect(() => {
    fetchAgents();
  }, [searchCity, searchName, filters, currentPage]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      language: "",
      experience: "",
      licenseState: "",
      expertise: "",
      mustHavePhoto: false
    });
    setCurrentPage(1);
  };

  // Toggle filter dropdown
  const toggleFilter = (filterType) => {
    setShowFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  // Get agent image URL
  const getAgentImageUrl = (profileImage) => {
    if (!profileImage) return null;
    
    if (profileImage.startsWith('http')) {
      return profileImage;
    }
    
    if (profileImage.startsWith('/')) {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace('/api', '');
      return `${baseUrl}${profileImage}`;
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace('/api', '');
    return `${baseUrl}/uploads/agents/${profileImage}`;
  };

  // Handle search input changes with debouncing
  const handleSearchChange = (type, value) => {
    if (type === 'city') {
      setSearchCity(value);
    } else if (type === 'name') {
      setSearchName(value);
    }
    setCurrentPage(1);
  };

  // Load more agents (pagination)
  const loadMoreAgents = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              RE/MAX<sup className="text-xs align-top">®</sup> Agent Search
            </h1>
            <p className="text-gray-600">
              We know the market, schools, and communities — both as agents and neighbors. Use the search below to find a RE/MAX agent who fits your needs.
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
                  onChange={(e) => handleSearchChange('city', e.target.value)}
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
                  onChange={(e) => handleSearchChange('name', e.target.value)}
                  placeholder="Search by agent name"
                  className="w-full pl-11 pr-4 py-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent bg-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6 text-sm">
              {/* Language Filter */}
              <div className="relative">
                <button 
                  onClick={() => toggleFilter('language')}
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors ${
                    filters.language ? 'border-[#1A3668] bg-[#1A3668] text-white' : 'border-gray-300'
                  }`}
                >
                  Language {filters.language && `(${filters.language})`} <ChevronDown className="w-4 h-4" />
                </button>
                {showFilters.language && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-[200px]">
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Enter language..."
                        value={filters.language}
                        onChange={(e) => handleFilterChange('language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Rentals Filter (Expertise) */}
              <div className="relative">
                <button 
                  onClick={() => handleFilterChange('expertise', filters.expertise === 'Rentals' ? '' : 'Rentals')}
                  className={`px-4 py-2 border rounded-md flex items-center gap-2 transition-colors ${
                    filters.expertise === 'Rentals' 
                      ? 'border-[#1A3668] bg-[#1A3668] text-white' 
                      : 'border-gray-300 bg-white hover:border-[#1A3668]'
                  }`}
                >
                  Rentals {filters.expertise === 'Rentals' && <X className="w-4 h-4" />}
                </button>
              </div>

              {/* Experience Filter */}
              <div className="relative">
                <button 
                  onClick={() => toggleFilter('experience')}
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors ${
                    filters.experience ? 'border-[#1A3668] bg-[#1A3668] text-white' : 'border-gray-300'
                  }`}
                >
                  Years of Experience {filters.experience && `(${experienceOptions.find(opt => opt.value === filters.experience)?.label})`} <ChevronDown className="w-4 h-4" />
                </button>
                {showFilters.experience && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-[200px]">
                    <div className="p-2">
                      {experienceOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            handleFilterChange('experience', option.value);
                            toggleFilter('experience');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                        >
                          {option.label}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          handleFilterChange('experience', '');
                          toggleFilter('experience');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-500"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* License State Filter */}
              <div className="relative">
                <button 
                  onClick={() => toggleFilter('licenseState')}
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors ${
                    filters.licenseState ? 'border-[#1A3668] bg-[#1A3668] text-white' : 'border-gray-300'
                  }`}
                >
                  Licensed In {filters.licenseState && `(${filters.licenseState})`} <ChevronDown className="w-4 h-4" />
                </button>
                {showFilters.licenseState && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-[200px] max-h-60 overflow-y-auto">
                    <div className="p-2">
                      {stateOptions.map((state) => (
                        <button
                          key={state}
                          onClick={() => {
                            handleFilterChange('licenseState', state);
                            toggleFilter('licenseState');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                        >
                          {state}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          handleFilterChange('licenseState', '');
                          toggleFilter('licenseState');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-500"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Expertise Filter */}
              <div className="relative">
                <button 
                  onClick={() => toggleFilter('expertise')}
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors ${
                    filters.expertise && filters.expertise !== 'Rentals' ? 'border-[#1A3668] bg-[#1A3668] text-white' : 'border-gray-300'
                  }`}
                >
                  Expertise {filters.expertise && filters.expertise !== 'Rentals' && `(${filters.expertise})`} <ChevronDown className="w-4 h-4" />
                </button>
                {showFilters.expertise && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 min-w-[200px]">
                    <div className="p-2">
                      {expertiseOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            handleFilterChange('expertise', option.value);
                            toggleFilter('expertise');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                        >
                          {option.label}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          handleFilterChange('expertise', '');
                          toggleFilter('expertise');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-500"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Must Have Photo Filter */}
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:border-[#1A3668] transition-colors cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={filters.mustHavePhoto}
                  onChange={(e) => handleFilterChange('mustHavePhoto', e.target.checked)}
                  className="w-4 h-4 text-[#1A3668] rounded focus:ring-[#1A3668]" 
                />
                <span>Must have photo</span>
              </label>

              {/* Clear All Filters Button */}
              {(filters.language || filters.experience || filters.licenseState || filters.expertise || filters.mustHavePhoto) && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 border border-red-300 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <span>Sort by:</span>
                <button className="px-4 py-2 border border-gray-300 rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors">
                  Rating (High to Low) <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 font-medium">
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Searching...
                  </div>
                ) : (
                  `${totalResults} results found`
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {loading && agents.length === 0 ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-[#1A3668]" />
                <span className="text-gray-600">Loading agents...</span>
              </div>
            </div>
          ) : agents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">No agents found matching your criteria.</p>
              <p className="text-gray-500">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-8">
                {agents.map((agent) => {
                  const agentImageUrl = getAgentImageUrl(agent.agentProfile?.profileImage);
                  const defaultImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop";
                  
                  return (
                    <div
                      key={agent._id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
                            <img
                              src={agentImageUrl || defaultImage}
                              alt={`${agent.firstName} ${agent.lastName}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = defaultImage;
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {agent.firstName} {agent.lastName}
                            </h3>
                            <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-50 text-[#1A3668] text-xs font-medium mb-2">
                              {agent.agentProfile?.expertise || 'Real Estate Agent'}
                            </div>
                            {agent.agentProfile?.licenseStates && agent.agentProfile.licenseStates.length > 0 && (
                              <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                                Licensed in {agent.agentProfile.licenseStates.join(', ')}
                              </p>
                            )}
                            {agent.agentProfile?.office?.address && (
                              <p className="text-sm text-gray-700 font-medium flex items-center gap-1 mb-1">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                {agent.agentProfile.office.address.city}, {agent.agentProfile.office.address.state}
                              </p>
                            )}
                            {agent.agentProfile?.office?.name && (
                              <p className="text-sm text-gray-600">{agent.agentProfile.office.name}</p>
                            )}
                            {agent.agentProfile?.yearsOfExperience && (
                              <p className="text-sm text-gray-600 mt-1">
                                {agent.agentProfile.yearsOfExperience} years of experience
                              </p>
                            )}
                            {agent.agentProfile?.specialties && agent.agentProfile.specialties.length > 0 && (
                              <p className="text-sm text-gray-600 mt-1">
                                Specialties: {agent.agentProfile.specialties.join(', ')}
                              </p>
                            )}
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
                            {(agent.phoneNumbers?.length > 0 || agent.agentProfile?.contact?.officePhone || agent.agentProfile?.contact?.mobilePhone) && (
                              <div className="border border-gray-200 rounded-md p-2">
                                <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  {agent.phoneNumbers?.[0] || agent.agentProfile?.contact?.mobilePhone || agent.agentProfile?.contact?.officePhone}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {currentPage < totalPages && (
                <div className="text-center mt-16">
                  <button 
                    onClick={loadMoreAgents}
                    disabled={loading}
                    className="bg-[#1A3668] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#15294d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Load More Agents'
                    )}
                  </button>
                  <p className="text-gray-600 mt-4 text-sm">
                    Showing {agents.length} of {totalResults} agents
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}