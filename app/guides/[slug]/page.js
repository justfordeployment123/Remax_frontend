"use client";
import { useState, useEffect, useRef, useMemo, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ConsultationModal from '../../../components/ConsultationModal';
import RequirementsModal from '../../../components/RequirementsModal';
import { FiClock, FiEye, FiChevronRight, FiHome, FiChevronDown, FiDownload, FiUser, FiAlertCircle, FiInfo, FiAward, FiTag, FiCheckCircle, FiMessageCircle, FiShare2, FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

// Utility to extract headings from HTML
function extractHeadings(htmlString) {
  if (!htmlString) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const headings = [];
  
  doc.querySelectorAll('h2, h3').forEach((heading, index) => {
    const level = heading.tagName === 'H2' ? 2 : 3;
    const id = `heading-${index}`;
    heading.id = id;
    headings.push({
      id,
      text: heading.textContent,
      level
    });
  });
  
  return headings;
}

// Utility to inject IDs into body HTML
function injectHeadingIds(htmlString) {
  if (!htmlString) return htmlString;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  let index = 0;
  doc.querySelectorAll('h2, h3').forEach((heading) => {
    heading.id = `heading-${index}`;
    index++;
  });
  
  return doc.body.innerHTML;
}

// TOC Component - Mobile with Better UX
function TableOfContents({ headings, onHeadingClick }) {
  const [isOpen, setIsOpen] = useState(false);
  
  if (headings.length === 0) return null;
  
  const handleClick = (id) => {
    onHeadingClick(id);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    setIsOpen(false);
  };
  
  const level2Headings = headings.filter(h => h.level === 2);
  
  return (
    <div className="md:hidden mb-8 sticky top-20 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-blue-50 to-transparent border-2 border-[#00458b] rounded-xl p-4 flex items-center justify-between font-bold text-gray-900 text-base hover:bg-blue-100 transition-colors"
      >
        <span className="flex items-center gap-2"><FiMenu className="w-5 h-5 text-[#00458b]" /> {level2Headings.length} Sections</span>
        <FiChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="mt-2 bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2">
          <nav className="divide-y divide-gray-100">
            {level2Headings.map((heading, idx) => (
              <button
                key={heading.id}
                onClick={() => handleClick(heading.id)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center justify-between group"
              >
                <span className="text-gray-900 font-medium text-sm group-hover:text-[#00458b]">{idx + 1}. {heading.text}</span>
                <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#00458b] transition-colors" />
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

// Desktop TOC Sidebar with Enhanced Quick Links
function DesktopTOC({ headings, onHeadingClick }) {
  if (headings.length === 0) return null;
  
  const handleClick = (id) => {
    onHeadingClick(id);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  const level2Headings = headings.filter(h => h.level === 2);
  
  return (
    <div>
      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-1 text-base">Quick Links</h3>
        <p className="text-xs text-gray-500">{level2Headings.length} sections</p>
      </div>
      
      <nav className="space-y-1.5">
        {level2Headings.map((heading, idx) => (
          <button
            key={heading.id}
            onClick={() => handleClick(heading.id)}
            className="w-full text-left px-3 py-2 rounded-lg transition-all duration-200 group hover:bg-blue-50 hover:border-l-4 hover:border-[#00458b] text-gray-700 hover:text-[#00458b] hover:font-semibold text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#00458b] font-bold opacity-0 group-hover:opacity-100 transition-opacity text-xs">→</span>
              <span className="truncate">{idx + 1}. {heading.text}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
}

function TLDRBox({ bullets }) {
  if (!bullets || bullets.length === 0) return null;
  
  const getIcon = (iconType) => {
    const iconMap = {
      'check': <FiCheckCircle className="w-5 h-5" />,
      'clock': <FiClock className="w-5 h-5" />,
      'dollar': <span className="font-bold">$</span>,
      'warning': <FiAlertCircle className="w-5 h-5" />,
      'star': <FiAward className="w-5 h-5" />,
      'info': <FiInfo className="w-5 h-5" />,
      'target': <span className="font-bold text-sm">●</span>
    };
    return iconMap[iconType] || <span className="font-bold">•</span>;
  };
  
  return (
    <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-10 border-2 border-blue-200 shadow-lg">
      <h2 className="flex items-center gap-3 mb-6 text-2xl md:text-3xl font-bold text-gray-900">
        <div className="w-10 h-10 md:w-14 md:h-14 bg-[#00458b] rounded-full flex items-center justify-center text-white font-bold text-xs md:text-lg shrink-0">TL;DR</div>
        <span>Quick Summary</span>
      </h2>
      
      <ul className="space-y-2 md:space-y-3">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-3 md:gap-4 group">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center text-[#00458b] flex-shrink-0 shadow-sm">
              {getIcon(bullet.icon)}
            </div>
            <span className="text-gray-800 text-sm md:text-base leading-relaxed font-medium group-hover:text-[#00458b] transition-colors pt-0.5">
              {bullet.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Enhanced Disclaimer Box
function DisclaimerBox({ disclaimer }) {
  if (!disclaimer) return null;
  
  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 md:p-8 my-10 border-l-4 border-amber-500 shadow-lg">
      <div className="flex gap-3 md:gap-4">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-amber-900">
          <FiAlertCircle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-amber-900 mb-2 text-base md:text-lg">Legal Disclaimer</h4>
          <p className="text-xs md:text-sm text-amber-900 leading-relaxed">{disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

// Enhanced Sidebar with Tags, Author, Reviewer, and CTA
function EnhancedSidebar({ article, categoryCTAs }) {
  return (
    <div className="hidden lg:flex flex-col gap-6">
      {/* Primary CTA Button */}
      <button
        onClick={categoryCTAs.primary.action}
        className="w-full px-6 py-4 bg-gradient-to-r from-[#00458b] to-[#003366] text-white rounded-xl hover:shadow-xl transition-all duration-300 font-bold text-base shadow-lg"
      >
        {categoryCTAs.primary.text}
      </button>
      
      {/* Featured Badge */}
      {article.featured && (
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-5 h-5 bg-amber-400 rounded-full"></span>
            <span className="font-bold text-amber-900">Featured Guide</span>
          </div>
          <p className="text-xs text-amber-800">Expert-selected content for you</p>
        </div>
      )}
      
      {/* Author & Reviewer Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border-2 border-gray-100">
        {article.author && (
          <div className="mb-5 pb-5 border-b border-gray-200">
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-2">Written by</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00458b] to-[#003366] rounded-full flex items-center justify-center">
                <FiUser className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">
                  {article.author.firstName} {article.author.lastName}
                </p>
                <p className="text-xs text-gray-600">RE/MAX Advisor</p>
              </div>
            </div>
          </div>
        )}
        
        {article.reviewedBy && (
          <div>
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-2">Reviewed by</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <FiCheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">
                  {article.reviewedBy.firstName} {article.reviewedBy.lastName}
                </p>
                <p className="text-xs text-gray-600">Expert Reviewer</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Tags Section */}
      {article.tags && article.tags.length > 0 && (
        <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
            <FiTag className="w-4 h-4" /> Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, idx) => (
              <Link
                key={idx}
                href={`/guides?tag=${tag}`}
                className="px-3 py-1.5 bg-blue-50 text-[#00458b] text-xs font-semibold rounded-full hover:bg-[#00458b] hover:text-white transition-colors border border-blue-200"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Secondary CTA - Agent Card */}
      <div className="bg-white rounded-xl p-5 border-2 border-gray-100 hover:border-[#00458b] transition-colors">
        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-3">Talk to an Expert</p>
        <button
          onClick={categoryCTAs.secondary.action}
          className="w-full px-4 py-3 border-2 border-[#00458b] text-[#00458b] rounded-lg hover:bg-[#00458b] hover:text-white transition-all duration-200 font-bold text-sm"
        >
          {categoryCTAs.secondary.text}
        </button>
      </div>
      
      <div className="bg-white rounded-xl p-5 border-2 border-gray-100">
        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-3">Share Article</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (typeof window !== 'undefined' && navigator.share) {
                navigator.share({
                  title: article.title,
                  url: window.location.href
                });
              }
            }}
            className="flex-1 px-3 py-2 bg-blue-50 text-[#00458b] rounded-lg hover:bg-[#00458b] hover:text-white transition-colors font-semibold text-sm flex items-center justify-center gap-2"
          >
            <FiShare2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileStickyCTA({ categoryCTAs, isVisible }) {
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 md:hidden z-50">
      <button
        onClick={categoryCTAs.primary.action}
        className="w-full px-6 py-3 bg-[#00458b] text-white rounded-lg hover:bg-[#003366] transition-colors font-bold text-base shadow-lg"
      >
        {categoryCTAs.primary.text}
      </button>
    </div>
  );
}

function CalloutBox({ type = 'info', title, children }) {
  const styles = {
    info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-900',
    warning: 'bg-red-50 border-l-4 border-red-500 text-red-900',
    pro: 'bg-green-50 border-l-4 border-green-500 text-green-900'
  };
  
  const icons = {
    info: FiInfo,
    warning: FiAlertCircle,
    pro: FiAward
  };
  
  const Icon = icons[type] || FiInfo;
  
  return (
    <div className={`${styles[type]} rounded-r-xl p-6 my-8`}>
      {title && <h4 className="font-bold mb-2 flex items-center gap-2"><Icon className="w-5 h-5" /> {title}</h4>}
      <div className="text-base leading-relaxed">{children}</div>
    </div>
  );
}

export default function GuideArticlePage({ params: paramsProp }) {
  const params = use(paramsProp);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [article, setArticle] = useState(null);
  const [relatedGuides, setRelatedGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState('');
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [requirementsSource, setRequirementsSource] = useState('');
  
  const contentRef = useRef(null);
  const trackedScrollDepths = useRef(new Set());
  const currentArticleIdRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    if (params?.slug) {
      fetchArticle(params.slug, isMounted);
    }

    return () => {
      isMounted = false;
    };
  }, [params?.slug]);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const element = contentRef.current;
        const elementHeight = element.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY - element.offsetTop;
        const scrollPercent = Math.round((scrollTop / (elementHeight - windowHeight)) * 100);
        
        if (scrollTop > 0) {
          [25, 50, 75, 90].forEach(depth => {
            if (scrollPercent >= depth && !trackedScrollDepths.current.has(depth)) {
              trackedScrollDepths.current.add(depth);
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'guide_scroll_depth', {
                  depth,
                  guide_slug: article?.slug
                });
              }
            }
          });
        }
        
        // Show mobile CTA after scrolling past initial content
        setShowMobileCTA(scrollPercent > 20);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article?.slug]);

  const fetchArticle = async (slug, isMounted = true) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/guide-articles/slug/${slug}`
      );
      const data = await response.json();
      
      // Abort if component unmounted (Strict Mode)
      if (!isMounted) return;
      
      if (data.success) {
        const article = data.data;
        
        // Handle archived guides
        if (article.status === 'archived' && article.archivedRedirectTo) {
          // Would do 301 redirect on server-side in production
          router.push(`/guides/${article.archivedRedirectTo.slug}`);
          return;
        }
        
        setArticle(article);
        
        // Increment views with -1 then +1 to handle race conditions
        if (typeof window !== 'undefined') {
          const viewedGuidesKey = 'remax_viewed_guides';
          const viewedGuides = JSON.parse(sessionStorage.getItem(viewedGuidesKey) || '[]');
          
          if (!viewedGuides.includes(article._id)) {
            try {
              // First send -1 to clear any accidental double increments
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/guide-articles/${article._id}/decrement-views`, {
                method: 'POST'
              }).catch(() => {});
              
              // Then send +1 to increment properly
              fetch(`${process.env.NEXT_PUBLIC_API_URL}/guide-articles/${article._id}/increment-views`, {
                method: 'POST'
              }).catch(() => {});
              
              // Mark guide as viewed in this session
              viewedGuides.push(article._id);
              sessionStorage.setItem(viewedGuidesKey, JSON.stringify(viewedGuides));
            } catch (error) {
              console.error('Error updating views:', error);
            }
          }
        }
        
        // Extract headings from body
        const bodyHeadings = extractHeadings(article.body);
        setHeadings(bodyHeadings);
        
        // Inject heading IDs into body for anchor links
        if (article.body && bodyHeadings.length > 0) {
          article.body = injectHeadingIds(article.body);
        }
        
        fetchRelatedGuides(article._id);
        
        // Track page view
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'guide_viewed', {
            guide_title: article.title,
            guide_category: article.category,
            guide_slug: slug,
            source: searchParams.get('utm_source') || 'direct'
          });
        }
      } else {
        router.push('/guides');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      router.push('/guides');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedGuides = async (articleId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/guide-articles/${articleId}/related`
      );
      const data = await response.json();
      if (data.success) {
        // Deduplicate guides by _id
        const uniqueGuides = Array.from(
          new Map(data.data.map(guide => [guide._id, guide])).values()
        );
        setRelatedGuides(uniqueGuides);
      }
    } catch (error) {
      console.error('Error fetching related guides:', error);
    }
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

  const getCategoryCTAs = (category) => {
    const ctas = {
      'BUY': {
        primary: {
          text: 'Get a Buyer Plan on WhatsApp',
          action: () => openRequirements('buy')
        },
        secondary: {
          text: 'Book a Consultation',
          action: () => openConsultation('Buying Process')
        }
      },
      'INVEST': {
        primary: {
          text: 'Discuss Investment Strategy',
          action: () => openRequirements('invest')
        },
        secondary: {
          text: 'Book an Investor Call',
          action: () => openConsultation('Investment Strategy')
        }
      },
      'OFF-PLAN': {
        primary: {
          text: 'Get Current Availability',
          action: () => openConsultation('Off-Plan')
        },
        secondary: {
          text: 'View More Off-Plan Projects',
          action: () => router.push('/off-plan')
        }
      },
      'COMMERCIAL': {
        primary: {
          text: 'Share Commercial Requirements',
          action: () => openRequirements('commercial')
        },
        secondary: {
          text: 'Book Commercial Consultation',
          action: () => openConsultation('Commercial')
        }
      },
      'SELL & RENT': {
        primary: {
          text: 'Request a Valuation',
          action: () => openRequirements('sell')
        },
        secondary: {
          text: 'Talk to a Leasing Advisor',
          action: () => openConsultation('Selling Process')
        }
      }
    };
    return ctas[category] || ctas['BUY'];
  };

  const openConsultation = (topic) => {
    setConsultationTopic(topic);
    setIsConsultationModalOpen(true);
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'guide_cta_clicked', {
        cta_type: 'consultation',
        cta_topic: topic,
        guide_slug: article?.slug
      });
    }
  };

  const openRequirements = (source) => {
    setRequirementsSource(source);
    setIsRequirementsModalOpen(true);
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'guide_cta_clicked', {
        cta_type: 'requirements',
        cta_source: source,
        guide_slug: article?.slug
      });
    }
  };

  const renderInlineCTA = (cta, index) => {
    const handleClick = () => {
      if (cta.buttonAction === 'consultation') {
        openConsultation(cta.preselectedValue || article?.category);
      } else {
        openRequirements(cta.preselectedValue?.toLowerCase() || 'guide');
      }
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'guide_inline_cta_clicked', {
          cta_position: index,
          guide_slug: article?.slug
        });
      }
    };

    if (cta.type === 'card') {
      return (
        <div key={index} className="my-10 p-8 bg-gradient-to-br from-blue-50 to-gray-50 border-l-4 border-[#00458b] rounded-xl shadow-md">
          {cta.title && (
            <h3 className="text-2xl font-bold text-gray-900 mb-3">{cta.title}</h3>
          )}
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">{cta.copy}</p>
          <button
            onClick={handleClick}
            className="px-8 py-4 bg-[#00458b] text-white rounded-lg hover:bg-[#003366] transition-colors font-semibold text-lg shadow-md"
          >
            {cta.buttonText}
          </button>
        </div>
      );
    }

    return (
      <div key={index} className="my-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl border-2 border-gray-200">
        <p className="text-gray-700 text-base md:text-lg leading-relaxed">{cta.copy}</p>
        <button
          onClick={handleClick}
          className="px-4 md:px-6 py-3 md:py-3 bg-[#00458b] text-white rounded-lg hover:bg-[#003366] transition-colors font-semibold text-sm md:text-base whitespace-nowrap w-full md:w-auto"
        >
          {cta.buttonText}
        </button>
      </div>
    );
  };

  const renderBodyWithCTAs = (body, inlineCtas) => {
    if (!inlineCtas || inlineCtas.length === 0) {
      return <div className="prose prose-lg max-w-none text-gray-900 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-[#00458b]" dangerouslySetInnerHTML={{ __html: body }} />;
    }

    // Split body into paragraphs
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = body;
    const elements = Array.from(tempDiv.children);

    // Sort CTAs by position
    const sortedCtas = [...inlineCtas].sort((a, b) => a.position - b.position);

    const content = [];
    let currentHtml = '';
    let elementIndex = 0;

    sortedCtas.forEach((cta, ctaIndex) => {
      // Add elements up to this CTA position
      while (elementIndex < cta.position && elementIndex < elements.length) {
        currentHtml += elements[elementIndex].outerHTML;
        elementIndex++;
      }

      // Add the accumulated HTML
      if (currentHtml) {
        content.push(
          <div key={`content-${ctaIndex}`} className="prose prose-lg max-w-none text-gray-900 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-[#00458b]" dangerouslySetInnerHTML={{ __html: currentHtml }} />
        );
        currentHtml = '';
      }

      // Add the CTA
      content.push(renderInlineCTA(cta, ctaIndex));
    });

    // Add remaining elements
    while (elementIndex < elements.length) {
      currentHtml += elements[elementIndex].outerHTML;
      elementIndex++;
    }

    if (currentHtml) {
      content.push(
        <div key="content-final" className="prose prose-lg max-w-none text-gray-900 prose-headings:text-gray-900 prose-strong:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-[#00458b]" dangerouslySetInnerHTML={{ __html: currentHtml }} />
      );
    }

    return <>{content}</>;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00458b]"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Guide Not Found</h1>
            <p className="text-gray-600 mb-6">The guide you're looking for doesn't exist or has been removed.</p>
            <Link href="/guides" className="text-[#00458b] font-bold hover:underline">
              Browse all guides →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const categoryCTAs = getCategoryCTAs(article.category);

  return (
    <>
      <Header />
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.summary,
            image: article.heroImage,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            author: {
              '@type': 'Person',
              name: article.author?.firstName ? `${article.author.firstName} ${article.author.lastName}` : 'RE/MAX HUB Dubai'
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://remaxhub.ae/guides/${article.slug}`
            },
            publisher: {
              '@type': 'Organization',
              name: 'RE/MAX HUB Dubai',
              logo: {
                '@type': 'ImageObject',
                url: 'https://remaxhub.ae/logo.png'
              }
            },
            articleBody: article.body
          })
        }}
      />
      
      <main className="min-h-screen bg-white pb-20 md:pb-0" ref={contentRef}>
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
              <Link href="/" className="hover:text-[#00458b] transition-colors flex items-center gap-1">
                <FiHome className="w-4 h-4" />
                Home
              </Link>
              <FiChevronRight className="w-4 h-4" />
              <Link href="/guides" className="hover:text-[#00458b] transition-colors">
                Guides
              </Link>
              <FiChevronRight className="w-4 h-4" />
              <span className="text-[#00458b] font-semibold">{article.category}</span>
              <FiChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium truncate max-w-md">{article.title}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex gap-8">
            {/* Left/Main Content */}
            <div className="flex-1 min-w-0">
              {/* Meta Bar - Enhanced */}
              <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {article.featured && (
                    <span className="px-2 md:px-3 py-1 md:py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 text-xs font-bold rounded-full border border-amber-300 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 md:w-3 md:h-3 bg-amber-500 rounded-full"></span> Featured
                    </span>
                  )}
                  <span className={`px-2 md:px-3 py-1 md:py-1.5 text-xs font-bold rounded-full border-2 ${getCategoryColor(article.category)} border-opacity-30`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-700 bg-gray-50 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                    <FiClock className="w-3 h-3 md:w-4 md:h-4 text-[#00458b]" />
                    <span className="font-semibold">{article.readTime} min</span>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-gray-700 bg-gray-50 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                    <FiEye className="w-3 h-3 md:w-4 md:h-4 text-[#00458b]" />
                    <span className="font-semibold">{article.views.toLocaleString()}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 font-medium">
                  Updated {new Date(article.updatedAt || article.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Subtitle/Dek */}
              {article.summary && (
                <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-10 leading-relaxed border-l-4 border-[#00458b] pl-4 md:pl-6 py-2">
                  {article.summary}
                </p>
              )}

              {/* Hero Image */}
              {article.heroImage && (
                <div className="mb-8 md:mb-12">
                  <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-[450px] rounded-lg md:rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  {article.heroImageCaption && (
                    <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-3 text-center italic font-medium px-2">
                      {article.heroImageCaption}
                    </p>
                  )}
                </div>
              )}

              {/* Tags Display */}
              {article.tags && article.tags.length > 0 && (
                <div className="mb-8 md:mb-10 p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg md:rounded-xl border border-blue-200">
                  <p className="text-xs text-gray-600 font-bold uppercase tracking-widest mb-2 md:mb-3 flex items-center gap-2">
                    <FiTag className="w-3 h-3 md:w-4 md:h-4" /> Topics Covered
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {article.tags.map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/guides?tag=${encodeURIComponent(tag)}`}
                        className="px-3 md:px-4 py-1.5 md:py-2 bg-white text-[#00458b] font-semibold rounded-full border-2 border-[#00458b] hover:bg-[#00458b] hover:text-white transition-all duration-200 text-xs md:text-sm shadow-sm hover:shadow-md"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <TLDRBox bullets={article.tldrBullets} />

              <TableOfContents 
                headings={headings} 
                onHeadingClick={(id) => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'guide_toc_used', {
                      heading_id: id,
                      guide_slug: article.slug
                    });
                  }
                }}
              />

              <div className="mb-12">
                <style>{`
                  .prose h2, .prose h3, .prose h4 {
                    font-weight: 700;
                    color: #111827;
                  }
                  .prose p, .prose li, .prose td {
                    color: #374151;
                  }
                  .prose strong {
                    color: #111827;
                  }
                `}</style>
                {renderBodyWithCTAs(article.body, article.inlineCtas)}
              </div>

              {article.faqs && article.faqs.length > 0 && (
                <div className="mb-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-10 border-2 border-gray-100">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {article.faqs.map((faq, index) => (
                      <div key={index} className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-[#00458b] transition-colors">
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                          className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-bold text-gray-900 text-lg pr-4">{faq.question}</span>
                          <FiChevronRight 
                            className={`w-5 h-5 text-[#00458b] transition-transform flex-shrink-0 ${
                              expandedFaq === index ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                        {expandedFaq === index && (
                          <div className="px-6 pb-5 text-gray-700 leading-relaxed text-lg border-t border-gray-100 pt-4">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mid-Article Related Guides */}
              {relatedGuides.length > 0 && (
                <div className="mb-12 md:mb-16">
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="h-1 w-8 md:w-12 bg-[#00458b] rounded"></div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Related Guides</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    {relatedGuides.slice(0, 3).map((guide, idx) => (
                      <Link
                        key={guide._id}
                        href={`/guides/${guide.slug}`}
                        onClick={() => {
                          if (typeof window !== 'undefined' && window.gtag) {
                            window.gtag('event', 'guide_related_clicked', {
                              from_slug: article.slug,
                              to_slug: guide.slug,
                              position: idx
                            });
                          }
                        }}
                        className="group bg-white rounded-lg md:rounded-xl border-2 border-gray-100 overflow-hidden hover:border-[#00458b] hover:shadow-xl transition-all duration-300"
                      >
                        {guide.heroImage && (
                          <div className="relative w-full h-40 md:h-48 overflow-hidden">
                            <img
                              src={guide.heroImage}
                              alt={guide.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-4 md:p-5">
                          <span className={`inline-block px-2 md:px-3 py-0.5 md:py-1 text-xs font-bold rounded-full mb-2 md:mb-3 ${getCategoryColor(guide.category)}`}>
                            {guide.category}
                          </span>
                          <h3 className="font-bold text-gray-900 mb-3 group-hover:text-[#00458b] transition-colors text-base md:text-lg leading-snug line-clamp-2">
                            {guide.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 pt-3 border-t border-gray-100">
                            <FiClock className="w-4 h-4 flex-shrink-0" />
                            <span>{guide.readTime} min</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <DisclaimerBox disclaimer={article.disclaimer} />

              {/* Bottom CTA Section */}
              <div className="bg-gradient-to-br from-[#00458b] to-[#003366] rounded-lg md:rounded-2xl p-6 md:p-12 text-white mb-8 shadow-xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">Want this done properly without surprises?</h2>
                <p className="text-blue-100 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                  Our expert team is here to guide you through every step of your Dubai real estate journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button
                    onClick={() => {
                      categoryCTAs.primary.action();
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'guide_bottom_cta_clicked', {
                          cta_type: 'primary',
                          guide_slug: article.slug
                        });
                      }
                    }}
                    className="px-4 md:px-8 py-3 md:py-4 bg-white text-[#00458b] rounded-lg hover:bg-gray-100 transition-colors font-bold text-sm md:text-lg shadow-md flex-1 sm:flex-none"
                  >
                    {categoryCTAs.primary.text}
                  </button>
                  <button
                    onClick={() => {
                      categoryCTAs.secondary.action();
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'guide_bottom_cta_clicked', {
                          cta_type: 'secondary',
                          guide_slug: article.slug
                        });
                      }
                    }}
                    className="px-4 md:px-8 py-3 md:py-4 bg-transparent text-white rounded-lg hover:bg-white/10 transition-colors font-bold text-sm md:text-lg border-2 border-white flex-1 sm:flex-none"
                  >
                    {categoryCTAs.secondary.text}
                  </button>
                </div>
              </div>

              {/* More Guides - Bottom */}
              {relatedGuides.length > 3 && (
                <div>
                  <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <div className="h-1 w-8 md:w-12 bg-[#00458b] rounded"></div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Keep Reading</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {relatedGuides.map((guide, idx) => (
                      <Link
                        key={guide._id}
                        href={`/guides/${guide.slug}`}
                        onClick={() => {
                          if (typeof window !== 'undefined' && window.gtag) {
                            window.gtag('event', 'guide_related_clicked', {
                              from_slug: article.slug,
                              to_slug: guide.slug,
                              position: idx,
                              section: 'bottom'
                            });
                          }
                        }}
                        className="group bg-white rounded-lg md:rounded-xl border-2 border-gray-100 overflow-hidden hover:border-[#00458b] hover:shadow-xl transition-all duration-300"
                      >
                        {guide.heroImage && (
                          <div className="relative w-full h-40 md:h-48 overflow-hidden">
                            <img
                              src={guide.heroImage}
                              alt={guide.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-4 md:p-5">
                          <span className={`inline-block px-2 md:px-3 py-0.5 md:py-1 text-xs font-bold rounded-full mb-2 md:mb-3 ${getCategoryColor(guide.category)}`}>
                            {guide.category}
                          </span>
                          <h3 className="font-bold text-gray-900 mb-3 group-hover:text-[#00458b] transition-colors text-base md:text-lg leading-snug line-clamp-2">
                            {guide.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 pt-3 border-t border-gray-100">
                            <FiClock className="w-4 h-4 flex-shrink-0" />
                            <span>{guide.readTime} min</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden lg:flex flex-col gap-6 w-72 h-fit">
              <div className="bg-white rounded-2xl p-5 border-2 border-gray-100 shadow-lg max-h-96 overflow-y-auto">
                <DesktopTOC 
                  headings={headings}
                  onHeadingClick={(id) => {
                    if (typeof window !== 'undefined' && window.gtag) {
                      window.gtag('event', 'guide_toc_used', {
                        heading_id: id,
                        guide_slug: article.slug,
                        location: 'sidebar'
                      });
                    }
                  }}
                />
              </div>
              <div className="sticky top-24">
                <EnhancedSidebar article={article} categoryCTAs={categoryCTAs} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA categoryCTAs={categoryCTAs} isVisible={showMobileCTA} />

      <Footer />

      {/* Modals */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        preselectedTopic={consultationTopic}
      />

      <RequirementsModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        pageSource={requirementsSource}
      />
    </>
  );
}
