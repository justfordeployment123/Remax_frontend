"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FiClock, FiEye, FiSearch, FiFilter } from 'react-icons/fi';

const CATEGORIES = [
  { value: '', label: 'All Guides' },
  { value: 'BUY', label: 'Buy' },
  { value: 'INVEST', label: 'Invest' },
  { value: 'OFF-PLAN', label: 'Off-Plan' },
  { value: 'COMMERCIAL', label: 'Commercial' },
  { value: 'SELL & RENT', label: 'Sell & Rent' },
  { value: 'LANDLORDS', label: 'Landlords' }
];

function GuidesContent() {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const matchedCategory = CATEGORIES.find(
        cat => cat.value.toUpperCase() === categoryParam.toUpperCase()
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.value);
      }
    } else {
      setSelectedCategory('');
    }
  }, [searchParams]);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        status: 'published',
        ...(selectedCategory && { category: selectedCategory })
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/guide-articles?${queryParams}`
      );
      const data = await response.json();

      if (data.success) {
        setArticles(data.data);
        
        if (!selectedCategory && !searchTerm) {
          const featured = data.data.filter(article => article.featured).slice(0, 3);
          setFeaturedArticles(featured);
        } else {
          setFeaturedArticles([]);
        }
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    if (!searchTerm) {
      setDisplayedArticles(articles);
      return;
    }

    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedArticles(filtered);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'BUY': 'bg-blue-100 text-blue-800',
      'INVEST': 'bg-purple-100 text-purple-800',
      'OFF-PLAN': 'bg-orange-100 text-orange-800',
      'COMMERCIAL': 'bg-green-100 text-green-800',
      'SELL & RENT': 'bg-red-100 text-red-800',
      'LANDLORDS': 'bg-amber-100 text-amber-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const ArticleCard = ({ article, featured = false }) => (
    <Link
      href={`/guides/${article.slug}`}
      className="group bg-white rounded-md border border-gray-200 overflow-hidden hover:border-[#00458b] hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
    >
      {article.heroImage && (
        <div className={`relative w-full overflow-hidden bg-gray-200 ${featured ? 'h-48 sm:h-56' : 'h-40 sm:h-48'}`}>
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {featured && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#00458b] text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-lg">
              Featured
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className={`flex flex-col flex-1 ${featured ? 'p-5 sm:p-6' : 'p-4 sm:p-5'}`}>
        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md mb-3 w-fit ${getCategoryColor(article.category)}`}>
          {article.category}
        </span>
        <h3 className={`font-bold text-gray-900 mb-2 group-hover:text-[#00458b] transition-colors leading-snug ${
          featured ? 'text-xl sm:text-2xl' : 'text-lg'
        }`}>
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-sm sm:text-base flex-grow">
            {article.summary}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-1.5">
            <FiClock className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{article.readTime} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiEye className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">{article.views.toLocaleString()}</span>
          </div>
          <span className="text-xs whitespace-nowrap ml-auto">{new Date(article.publishedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric'
          })}</span>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <div className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#00458b]/5 via-white to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#00458b]/70 block mb-3 sm:mb-4">
                Expert Insights
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
                Dubai Real Estate Guides
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed px-2">
                Expert advice and comprehensive guides to help you navigate Dubai's real estate market with confidence
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl text-gray-900 border-2 border-gray-200 focus:ring-2 focus:ring-[#00458b] focus:border-[#00458b] focus:outline-none shadow-sm text-base"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar - Mobile friendly */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
              <FiFilter className="w-5 h-5 text-[#00458b] flex-shrink-0" />
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 sm:px-5 py-2 rounded-md font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                    selectedCategory === category.value
                      ? 'bg-[#00458b] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-4 border-t-[#00458b]"></div>
            </div>
          ) : (
            <>
              {/* Featured Section */}
              {featuredArticles.length > 0 && !searchTerm && (
                <div className="mb-12 sm:mb-16">
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="h-1.5 w-8 sm:w-12 bg-[#00458b] rounded-md"></div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Featured Guides</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {featuredArticles.map((article) => (
                      <ArticleCard key={article._id} article={article} featured={true} />
                    ))}
                  </div>
                </div>
              )}

              {/* All Guides Section */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-8 sm:w-12 bg-[#00458b] rounded-md"></div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                      {selectedCategory 
                        ? `${CATEGORIES.find(c => c.value === selectedCategory)?.label} Guides` 
                        : 'All Guides'
                      }
                    </h2>
                  </div>
                  <span className="text-sm sm:text-base text-gray-600 font-medium">
                    {displayedArticles.length} {displayedArticles.length === 1 ? 'guide' : 'guides'}
                  </span>
                </div>

                {displayedArticles.length === 0 ? (
                  <div className="text-center py-16 sm:py-20 bg-gray-50 rounded-md">
                    <div className="text-gray-300 mb-4">
                      <FiSearch className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No guides found</h3>
                    <p className="text-base sm:text-lg text-gray-600 px-4">
                      {searchTerm 
                        ? 'Try adjusting your search terms or filters'
                        : 'Check back soon for new content'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {displayedArticles.map((article) => (
                      <ArticleCard key={article._id} article={article} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#00458b] to-[#003366] py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 block mb-3 sm:mb-4">
              Need Expert Help?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Get Personalized Guidance
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Our expert team is ready to help you find your perfect property in Dubai
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact-us"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#00458b] rounded-md hover:bg-gray-100 transition-colors font-semibold text-base sm:text-lg shadow-lg"
              >
                Contact Us
              </Link>
              <Link
                href="/find-agent"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-[#00458b] text-white border-2 border-white rounded-md hover:bg-white hover:text-[#00458b] transition-colors font-semibold text-base sm:text-lg"
              >
                Find an Agent
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function GuidesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-4 border-t-[#00458b]"></div>
      </div>
    }>
      <GuidesContent />
    </Suspense>
  );
}
