"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Building2, MapPin, Calendar, Home, CheckCircle, Filter } from 'lucide-react';

function OffPlanProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [filters, setFilters] = useState({
    area: searchParams?.get('area') || 'all',
    developer: searchParams?.get('developer') || 'all',
    priceRange: searchParams?.get('priceRange') || 'all',
    handoverYear: searchParams?.get('handoverYear') || 'all'
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    areas: [],
    developers: []
  });

  const priceRanges = [
    { value: 'all', label: 'All Price Bands' },
    { value: 'below-1m', label: 'Below AED 1M' },
    { value: '1m-2m', label: 'AED 1M – 2M' },
    { value: '2m-5m', label: 'AED 2M – 5M' },
    { value: '5m-plus', label: 'AED 5M+' }
  ];

  const handoverYears = ['2026', '2027', '2028', '2029', '2030+'];

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();
      if (filters.area !== 'all') params.append('area', filters.area);
      if (filters.developer !== 'all') params.append('developer', filters.developer);
      if (filters.priceRange !== 'all') params.append('priceRange', filters.priceRange);
      if (filters.handoverYear !== 'all') params.append('handoverYear', filters.handoverYear);
      params.append('status', 'active');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/off-plan-projects?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data);
        setFilterOptions({
          areas: data.filters.areas || [],
          developers: data.filters.developers || []
        });
      } else {
        setError(data.message || 'Failed to load projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Unable to load projects. Please try again later.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const updateFilter = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k] !== 'all') {
        params.set(k, newFilters[k]);
      }
    });
    const newUrl = params.toString() ? `/off-plan/projects?${params.toString()}` : '/off-plan/projects';
    router.push(newUrl, { scroll: false });
  };

  const shareRequirements = (source = 'hero') => {
    // Track event
    console.log('offplan_share_brief_click', { source });
    window.location.href = '/contact-us?topic=Off-Plan';
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(2)}M`;
    }
    return `AED ${(price / 1000).toFixed(0)}K`;
  };

  const scrollToGrid = () => {
    const grid = document.getElementById('projects-grid');
    if (grid) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                Off-Plan in Dubai
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Featured Off-Plan Projects in Dubai
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Carefully selected projects across key Dubai communities – filtered for real end-user and investor appeal, not just launch hype.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Only projects we're prepared to discuss honestly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Focus on payment plans, handover and location – not just marketing slides.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#00458b] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Advisory-first: we'll tell you when a project doesn't fit your brief.</span>
                </li>
              </ul>

              <button
                onClick={() => shareRequirements('hero')}
                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200 mb-4"
              >
                Share Your Off-Plan Brief
              </button>

              <button
                onClick={scrollToGrid}
                className="block text-sm text-gray-600 hover:text-[#00458b] transition-colors"
              >
                Prefer to browse first? Scroll to see our featured projects ↓
              </button>
            </div>

            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/off-plan/image-offplan-index-hero-1.png"
                alt="Featured off-plan projects in Dubai"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section id="projects-grid" className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Area Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                Area
              </label>
              <select
                value={filters.area}
                onChange={(e) => updateFilter('area', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors bg-white"
                disabled={loading}
              >
                <option value="all">All Areas</option>
                {filterOptions.areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Developer Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                Developer
              </label>
              <select
                value={filters.developer}
                onChange={(e) => updateFilter('developer', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors bg-white"
                disabled={loading}
              >
                <option value="all">All Developers</option>
                {filterOptions.developers.map((dev) => (
                  <option key={dev} value={dev}>
                    {dev}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                Price Band
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => updateFilter('priceRange', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors bg-white"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Handover Year Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                Handover Year
              </label>
              <select
                value={filters.handoverYear}
                onChange={(e) => updateFilter('handoverYear', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00458b]/30 focus:border-[#00458b] transition-colors bg-white"
                disabled={loading}
              >
                <option value="all">All Handover Years</option>
                {handoverYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            {loading ? (
              <span>Loading projects...</span>
            ) : (
              <>
                Showing <strong>{projects.length}</strong> {projects.length === 1 ? 'project' : 'projects'}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {error ? (
            // Error State
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-red-500 text-2xl">!</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Unable to Load Projects
              </h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchProjects}
                className="inline-flex items-center gap-2 bg-[#00458b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#003366] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : loading ? (
            // Loading State
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-[#00458b] rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Loading Projects...
              </h2>
              <p className="text-gray-600">Please wait while we fetch the latest off-plan projects</p>
            </div>
          ) : projects.length === 0 ? (
            // Empty State
            <div className="text-center py-20">
              <Filter className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Projects Matching These Filters
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
                We don't have any featured off-plan projects that match these criteria right now, or they may be better suited to a private conversation.
              </p>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Most serious off-plan decisions start with a clear brief, not a long list of random launches.
              </p>
              <button
                onClick={() => shareRequirements('empty')}
                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Share Your Off-Plan Brief
              </button>
            </div>
          ) : (
            // Projects Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project._id}
                  href={`/off-plan/projects/${project.slug}`}
                  className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#00458b] hover:shadow-lg transition-all duration-200"
                  onClick={() => console.log('offplan_project_card_click', { projectId: project._id })}
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <Image
                      src={project.images && project.images.length > 0 
                        ? (() => {
                            const imageUrl = project.images.find(img => img.isPrimary)?.url || project.images[0].url;
                            return imageUrl.startsWith('http') ? imageUrl : `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
                          })()
                        : '/off-plan/buy-off-plan-hero.png'
                      }
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = '/off-plan/buy-off-plan-hero.png';
                      }}
                    />
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-4">
                    {/* Header */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#00458b] transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#00458b] flex-shrink-0" />
                        {project.developer}
                      </p>
                    </div>

                    {/* Price & Location */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Starting From</p>
                        <p className="text-xl font-bold text-[#00458b]">{formatPrice(project.startingPrice)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 flex items-center justify-end gap-1 mb-0.5">
                          <MapPin className="w-3 h-3" />
                          Location
                        </p>
                        <p className="text-xs font-medium text-gray-700 line-clamp-1">{project.area}</p>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Home className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span className="line-clamp-1">{project.unitTypes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <span>{project.handoverQuarter} {project.handoverYear}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Can't See What You're Looking For?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Not every project we work on is listed here. Some launches move quickly, and some opportunities are better handled off-market. If you share your brief, we can tell you which developers and projects actually fit your strategy.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => shareRequirements('cta')}
                className="bg-[#00458b] text-white px-8 py-4 rounded-lg text-base font-semibold hover:bg-[#003366] transition-colors duration-200"
              >
                Share Your Off-Plan Brief
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function OffPlanProjects() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-4 border-t-[#00458b]"></div>
      </div>
    }>
      <OffPlanProjectsContent />
    </Suspense>
  );
}
