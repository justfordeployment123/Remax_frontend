"use client";
import { useState, useEffect } from 'react';
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
  { value: 'SELL & RENT', label: 'Sell & Rent' }
];

export default function GuidesPage() {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const searchParams = useSearchParams();

  // Read URL query parameters on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const matchedCategory = CATEGORIES.find(
        cat => cat.value.toUpperCase() === categoryParam.toUpperCase()
      );
      if (matchedCategory) {
        setSelectedCategory(matchedCategory.value);
      }
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
        
        // Separate featured articles
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
      'SELL & RENT': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const ArticleCard = ({ article, featured = false }) => (
    <Link
      href={`/guides/${article.slug}`}
      className={`group bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:border-[#00458b] hover:shadow-xl transition-all duration-300 ${
        featured ? 'md:col-span-1' : ''
      }`}
    >
      {article.heroImage && (
        <div className={`relative w-full overflow-hidden ${featured ? 'h-64' : 'h-52'}`}>
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {featured && (
            <div className="absolute top-4 left-4 bg-[#00458b] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
              Featured
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className={`p-${featured ? '6' : '5'}`}>
        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 ${getCategoryColor(article.category)}`}>
          {article.category}
        </span>
        <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-[#00458b] transition-colors leading-snug ${
          featured ? 'text-2xl' : 'text-lg'
        }`}>
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <FiClock className="w-4 h-4" />
            <span>{article.readTime} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiEye className="w-4 h-4" />
            <span>{article.views.toLocaleString()}</span>
          </div>
          <span className="text-xs">{new Date(article.publishedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        
        <div className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
                Expert Insights
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                Dubai Real Estate Guides & Insights
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Expert advice and comprehensive guides to help you navigate Dubai's real estate market with confidence
              </p>
              
              <div className="relative max-w-2xl mx-auto">
                <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for guides, topics, or advice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-xl text-gray-900 border-2 border-gray-200 focus:ring-2 focus:ring-[#00458b] focus:border-[#00458b] focus:outline-none shadow-sm text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-3 overflow-x-auto py-5">
              <FiFilter className="w-5 h-5 text-[#00458b] flex-shrink-0" />
              {CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
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

        <div className="max-w-7xl mx-auto px-4 py-16">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00458b]"></div>
            </div>
          ) : (
            <>
              {featuredArticles.length > 0 && !searchTerm && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-1 w-12 bg-[#00458b] rounded"></div>
                    <h2 className="text-4xl font-bold text-gray-900">Featured Guides</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredArticles.map((article) => (
                      <ArticleCard key={article._id} article={article} featured={true} />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-12 bg-[#00458b] rounded"></div>
                    <h2 className="text-4xl font-bold text-gray-900">
                      {selectedCategory 
                        ? `${CATEGORIES.find(c => c.value === selectedCategory)?.label} Guides` 
                        : 'All Guides'
                      }
                    </h2>
                  </div>
                  <span className="text-gray-600 font-medium">
                    {displayedArticles.length} {displayedArticles.length === 1 ? 'guide' : 'guides'}
                  </span>
                </div>

                {displayedArticles.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <div className="text-gray-300 mb-4">
                      <FiSearch className="w-20 h-20 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No guides found</h3>
                    <p className="text-lg text-gray-600">
                      {searchTerm 
                        ? 'Try adjusting your search terms or filters'
                        : 'Check back soon for new content'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedArticles.map((article) => (
                      <ArticleCard key={article._id} article={article} />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00458b]/70 block mb-4">
              Get Expert Help
            </span>
            <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-6">
              Need Personalized Guidance?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our expert team is ready to help you find your perfect property in Dubai with tailored advice and support
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact-us"
                className="px-8 py-4 bg-[#00458b] text-white rounded-lg hover:bg-[#003366] transition-colors font-semibold text-lg shadow-md"
              >
                Contact Us
              </Link>
              <Link
                href="/find-agent"
                className="px-8 py-4 bg-white text-[#00458b] border-2 border-[#00458b] rounded-lg hover:bg-[#00458b] hover:text-white transition-colors font-semibold text-lg"
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
