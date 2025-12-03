"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ChevronDown, MapPin, Phone, X, Loader2, Calendar, Languages, Award } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function FindAgent() {
  const searchParams = useSearchParams();
  const [searchCity, setSearchCity] = useState("");
  const [searchName, setSearchName] = useState("");
  const [allAgents, setAllAgents] = useState([]);
  const [displayedAgents, setDisplayedAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("No Sort");
  
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
    expertise: false,
    sort: false
  });

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
    "Abu Dhabi",
    "Dubai",
    "Sharjah",
    "Ajman",
    "Umm Al Quwain",
    "Ras Al Khaimah",
    "Fujairah",
  ];

  const sortOptions = [
    "No Sort",
    "Last Name (A-Z)",
    "Last Name (Z-A)",
    "Experience (High to Low)",
    "Experience (Low to High)"
  ];

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError("");
      
      const params = new URLSearchParams();
      
      if (searchCity.trim()) {
        if (/^\d{5}$/.test(searchCity.trim())) {
          params.append('zip', searchCity.trim());
        } else {
          params.append('city', searchCity.trim());
        }
      }
      
      if (searchName.trim()) {
        params.append('name', searchName.trim());
      }
      
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
      
      params.append('page', currentPage.toString());
      params.append('limit', '10');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agents?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        if (currentPage === 1) {
          setAllAgents(data.data.agents);
        } else {
          setAllAgents(prev => [...prev, ...data.data.agents]);
        }
        setTotalResults(data.data.total);
        setTotalPages(data.data.totalPages);
      } else {
        setError(data.message || 'Failed to fetch agents');
        setAllAgents([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      setError('Failed to fetch agents. Please try again.');
      setAllAgents([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const sortAgents = (agents, sortType) => {
    const sortedAgents = [...agents];
    
    switch (sortType) {
      case "Last Name (A-Z)":
        return sortedAgents.sort((a, b) => a.lastName.localeCompare(b.lastName));
      case "Last Name (Z-A)":
        return sortedAgents.sort((a, b) => b.lastName.localeCompare(a.lastName));
      case "Experience (High to Low)":
        return sortedAgents.sort((a, b) => 
          (b.agentProfile?.yearsOfExperience || 0) - (a.agentProfile?.yearsOfExperience || 0)
        );
      case "Experience (Low to High)":
        return sortedAgents.sort((a, b) => 
          (a.agentProfile?.yearsOfExperience || 0) - (b.agentProfile?.yearsOfExperience || 0)
        );
      case "No Sort":
      default:
        return agents;
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [searchCity, searchName, filters, currentPage]);

  useEffect(() => {
    const sorted = sortAgents(allAgents, sortBy);
    setDisplayedAgents(sorted);
  }, [allAgents, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

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

  const toggleFilter = (filterType) => {
    setShowFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

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

  const handleSearchChange = (type, value) => {
    if (type === 'city') {
      setSearchCity(value);
    } else if (type === 'name') {
      setSearchName(value);
    }
    setCurrentPage(1);
  };

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
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              RE/MAX<sup className="text-xs align-top">®</sup> Agent Search
            </h1>
            <p className="text-gray-700 font-medium">
              We know the market, schools, and communities — both as agents and neighbors. Use the search below to find a RE/MAX agent who fits your needs.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 mb-8 border border-gray-300 shadow-sm">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => handleSearchChange('city', e.target.value)}
                  placeholder="Search by city, state or ZIP"
                  className="w-full pl-11 pr-4 py-3 text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent bg-white"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => handleSearchChange('name', e.target.value)}
                  placeholder="Search by agent name"
                  className="w-full pl-11 pr-4 py-3 text-gray-800 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] focus:border-transparent bg-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6 text-sm">
              <div className="relative">
                <button 
                  onClick={() => toggleFilter('language')}
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors font-medium ${
                    filters.language ? 'border-[#1A3668] text-[#1A3668]' : 'border-gray-400 text-gray-700'
                  }`}
                >
                  <Languages className="w-4 h-4" />
                  Language {filters.language && `(${filters.language})`} <ChevronDown className="w-4 h-4" />
                </button>
                {showFilters.language && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-400 rounded-md shadow-lg z-10 min-w-[200px]">
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Enter language..."
                        value={filters.language}
                        onChange={(e) => handleFilterChange('language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1A3668] text-gray-800"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => handleFilterChange('expertise', filters.expertise === 'Rentals' ? '' : 'Rentals')}
                  className={`px-4 py-2 border rounded-md flex items-center gap-2 transition-colors font-medium ${
                    filters.expertise === 'Rentals' 
                      ? 'border-[#1A3668] text-[#1A3668]' 
                      : 'border-gray-400 text-gray-700 bg-white hover:border-[#1A3668]'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  Rentals {filters.expertise === 'Rentals' && <X className="w-4 h-4" />}
                </button>
              </div>

              <div className="relative">
                <button 
                  onClick={() => toggleFilter('experience')}
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors font-medium ${
                    filters.experience ? 'border-[#1A3668] text-[#1A3668]' : 'border-gray-400 text-gray-700'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Experience {filters.experience && `(${experienceOptions.find(opt => opt.value === filters.experience)?.label})`} <ChevronDown className="w-4 h-4" />
                </button>
                {showFilters.experience && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-400 rounded-md shadow-lg z-10 min-w-[200px]">
                    <div className="p-2">
                      {experienceOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            handleFilterChange('experience', option.value);
                            toggleFilter('experience');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-800 font-medium"
                        >
                          {option.label}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          handleFilterChange('experience', '');
                          toggleFilter('experience');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-600"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => toggleFilter('licenseState')}
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors font-medium ${
                    filters.licenseState ? 'border-[#1A3668] text-[#1A3668]' : 'border-gray-400 text-gray-700'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Licensed In {filters.licenseState && `(${filters.licenseState})`} <ChevronDown className="w-4 h-4" />
                </button>
                {showFilters.licenseState && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-400 rounded-md shadow-lg z-10 min-w-[200px] max-h-60 overflow-y-auto">
                    <div className="p-2">
                      {stateOptions.map((state) => (
                        <button
                          key={state}
                          onClick={() => {
                            handleFilterChange('licenseState', state);
                            toggleFilter('licenseState');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-800 font-medium"
                        >
                          {state}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          handleFilterChange('licenseState', '');
                          toggleFilter('licenseState');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-600"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <button 
                  onClick={() => toggleFilter('expertise')}
                  className={`px-4 py-2 border rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors font-medium ${
                    filters.expertise && filters.expertise !== 'Rentals' ? 'border-[#1A3668] text-[#1A3668]' : 'border-gray-400 text-gray-700'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  Expertise {filters.expertise && filters.expertise !== 'Rentals' && `(${filters.expertise})`} <ChevronDown className="w-4 h-4" />
                </button>
                {showFilters.expertise && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-400 rounded-md shadow-lg z-10 min-w-[200px]">
                    <div className="p-2">
                      {expertiseOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            handleFilterChange('expertise', option.value);
                            toggleFilter('expertise');
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-800 font-medium"
                        >
                          {option.label}
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          handleFilterChange('expertise', '');
                          toggleFilter('expertise');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-600"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-md bg-white hover:border-[#1A3668] transition-colors cursor-pointer font-medium text-gray-700">
                <input 
                  type="checkbox" 
                  checked={filters.mustHavePhoto}
                  onChange={(e) => handleFilterChange('mustHavePhoto', e.target.checked)}
                  className="w-4 h-4 text-[#1A3668] rounded focus:ring-[#1A3668]" 
                />
                <span>Must have photo</span>
              </label>

              {(filters.language || filters.experience || filters.licenseState || filters.expertise || filters.mustHavePhoto) && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 border border-red-400 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-3 font-medium">
                <span>Sort by:</span>
                <div className="relative">
                  <button 
                    onClick={() => setShowFilters(prev => ({ ...prev, sort: !prev.sort }))}
                    className="px-4 py-2 border border-gray-400 rounded-md bg-white flex items-center gap-2 hover:border-[#1A3668] transition-colors text-gray-700"
                  >
                    {sortBy} <ChevronDown className="w-4 h-4" />
                  </button>
                  {showFilters.sort && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-400 rounded-md shadow-lg z-10 min-w-[200px]">
                      <div className="p-2">
                        {sortOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSortBy(option);
                              setShowFilters(prev => ({ ...prev, sort: false }));
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-800 font-medium"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-4 py-2 rounded-full border border-gray-400 text-gray-800 font-semibold bg-white">
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
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-8">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {loading && allAgents.length === 0 ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex items-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-[#1A3668]" />
                <span className="text-gray-700 font-medium">Loading agents...</span>
              </div>
            </div>
          ) : displayedAgents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-700 text-lg mb-4 font-medium">No agents found matching your criteria.</p>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {displayedAgents.map((agent) => {
                  const agentImageUrl = getAgentImageUrl(agent.agentProfile?.profileImage);
                  const defaultImage = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop";
                  
                  return (
                    <div
                      key={agent._id}
                      className="bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-all duration-200 h-full flex flex-col"
                    >
                      <div className="flex gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-300">
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
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                              {agent.firstName} {agent.lastName}
                            </h3>
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-[#1A3668] text-sm font-semibold mb-3">
                              {agent.agentProfile?.expertise || 'Real Estate Agent'}
                            </div>
                            {agent.agentProfile?.licenseStates && agent.agentProfile.licenseStates.length > 0 && (
                              <p className="text-xs uppercase tracking-wide text-gray-600 mb-2 font-medium">
                                Licensed in {agent.agentProfile.licenseStates.join(', ')}
                              </p>
                            )}
                            {agent.agentProfile?.office?.address && (
                              <p className="text-sm text-gray-800 font-semibold flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                {agent.agentProfile.office.address.city}, {agent.agentProfile.office.address.state}
                              </p>
                            )}
                            {agent.agentProfile?.office?.name && (
                              <p className="text-sm text-gray-700 font-medium">{agent.agentProfile.office.name}</p>
                            )}
                            {agent.agentProfile?.yearsOfExperience && (
                              <p className="text-sm text-gray-700 mt-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                {agent.agentProfile.yearsOfExperience} years of experience
                              </p>
                            )}
                            {agent.agentProfile?.specialties && agent.agentProfile.specialties.length > 0 && (
                              <p className="text-sm text-gray-700 mt-2">
                                <span className="font-semibold">Specialties:</span> {agent.agentProfile.specialties.slice(0, 3).join(', ')}
                                {agent.agentProfile.specialties.length > 3 && ` +${agent.agentProfile.specialties.length - 3} more`}
                              </p>
                            )}
                          </div>

                          <div className="space-y-3 mt-auto">
                            <div className="flex gap-2">
                              <button className="flex-1 bg-[#1A3668] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#15294d] transition-colors">
                                View Details
                              </button>
                              <button className="flex-1 border border-[#1A3668] text-[#1A3668] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#1A3668] hover:text-white transition-colors">
                                Contact
                              </button>
                            </div>
                            {(agent.phoneNumbers?.length > 0 || agent.agentProfile?.contact?.officePhone || agent.agentProfile?.contact?.mobilePhone) && (
                              <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
                                <p className="text-sm text-gray-800 font-semibold flex items-center justify-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-600" />
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
                  <p className="text-gray-700 mt-4 text-sm font-medium">
                    Showing {displayedAgents.length} of {totalResults} agents
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