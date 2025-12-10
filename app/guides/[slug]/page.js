"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ConsultationModal from '../../../components/ConsultationModal';
import RequirementsModal from '../../../components/RequirementsModal';
import { FiClock, FiEye, FiChevronRight, FiHome } from 'react-icons/fi';

export default function GuideArticlePage({ params }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [relatedGuides, setRelatedGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState('');
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [requirementsSource, setRequirementsSource] = useState('');

  useEffect(() => {
    if (params?.slug) {
      fetchArticle(params.slug);
    }
  }, [params?.slug]);

  const fetchArticle = async (slug) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/guide-articles/slug/${slug}`
      );
      const data = await response.json();
      
      if (data.success) {
        setArticle(data.data);
        fetchRelatedGuides(data.data._id);
        
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'guide_view', {
            guide_title: data.data.title,
            guide_category: data.data.category,
            guide_slug: slug
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
        setRelatedGuides(data.data);
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
          text: 'Share My Requirements',
          action: () => openRequirements('buy')
        },
        secondary: {
          text: 'Book a Buyer Consultation',
          action: () => openConsultation('Buying Process')
        }
      },
      'INVEST': {
        primary: {
          text: 'Share Your Investment Requirements',
          action: () => openRequirements('invest')
        },
        secondary: {
          text: 'Book an Investor Strategy Call',
          action: () => openConsultation('Investment Strategy')
        }
      },
      'OFF-PLAN': {
        primary: {
          text: 'Discuss an Off-Plan Project',
          action: () => openConsultation('Off-Plan')
        },
        secondary: {
          text: 'View Our Off-Plan Guide',
          action: () => router.push('/off-plan')
        }
      },
      'COMMERCIAL': {
        primary: {
          text: 'Share Commercial Requirements',
          action: () => openRequirements('commercial')
        },
        secondary: {
          text: 'Book a Commercial Consultation',
          action: () => openConsultation('Commercial')
        }
      },
      'SELL & RENT': {
        primary: {
          text: 'Share My Property Details',
          action: () => openRequirements('sell')
        },
        secondary: {
          text: 'Talk to a Selling/Leasing Advisor',
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
      window.gtag('event', 'cta_click', {
        cta_type: 'consultation',
        cta_topic: topic,
        guide_title: article?.title
      });
    }
  };

  const openRequirements = (source) => {
    setRequirementsSource(source);
    setIsRequirementsModalOpen(true);
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click', {
        cta_type: 'requirements',
        cta_source: source,
        guide_title: article?.title
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
      <div key={index} className="my-8 flex items-center justify-between p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
        <p className="text-gray-700 text-lg">{cta.copy}</p>
        <button
          onClick={handleClick}
          className="ml-6 px-6 py-3 bg-[#00458b] text-white rounded-lg hover:bg-[#003366] transition-colors whitespace-nowrap font-semibold"
        >
          {cta.buttonText}
        </button>
      </div>
    );
  };

  const renderBodyWithCTAs = (body, inlineCtas) => {
    if (!inlineCtas || inlineCtas.length === 0) {
      return <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: body }} />;
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
          <div key={`content-${ctaIndex}`} className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: currentHtml }} />
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
        <div key="content-final" className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: currentHtml }} />
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
    return null;
  }

  const categoryCTAs = getCategoryCTAs(article.category);

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#00458b] transition-colors flex items-center gap-1">
                <FiHome className="w-4 h-4" />
                Home
              </Link>
              <FiChevronRight className="w-4 h-4" />
              <Link href="/guides" className="hover:text-[#00458b] transition-colors">
                Guides & Insights
              </Link>
              <FiChevronRight className="w-4 h-4" />
              <span className="text-[#00458b] font-semibold">{article.category}</span>
              <FiChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium truncate max-w-md">{article.title}</span>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="max-w-7xl mx-auto px-4 py-12 max-w-4xl">
          {/* Meta Bar */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiClock className="w-4 h-4" />
              <span className="font-medium">{article.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiEye className="w-4 h-4" />
              <span className="font-medium">{article.views.toLocaleString()} views</span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Summary */}
          {article.summary && (
            <p className="text-xl text-gray-600 mb-10 leading-relaxed border-l-4 border-[#00458b] pl-6 py-2">
              {article.summary}
            </p>
          )}

          {/* Hero Image */}
          {article.heroImage && (
            <div className="mb-12">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {article.heroImageCaption && (
                <p className="text-sm text-gray-500 mt-3 text-center italic">
                  {article.heroImageCaption}
                </p>
              )}
            </div>
          )}

          {/* Article Body with Inline CTAs */}
          <div className="mb-12">
            {renderBodyWithCTAs(article.body, article.inlineCtas)}
          </div>

          {/* FAQs */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mb-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 border-2 border-gray-100">
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

          {/* Bottom CTA Section */}
          <div className="bg-gradient-to-br from-[#00458b] to-[#003366] rounded-2xl p-10 md:p-12 text-white mb-16 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take the Next Step?</h2>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Our expert team is here to help you navigate your Dubai real estate journey with confidence and clarity.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={categoryCTAs.primary.action}
                className="px-8 py-4 bg-white text-[#00458b] rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg shadow-md"
              >
                {categoryCTAs.primary.text}
              </button>
              <button
                onClick={categoryCTAs.secondary.action}
                className="px-8 py-4 bg-transparent text-white rounded-lg hover:bg-white/10 transition-colors font-bold text-lg border-2 border-white"
              >
                {categoryCTAs.secondary.text}
              </button>
            </div>
          </div>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-[#00458b] rounded"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Related Guides</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide._id}
                    href={`/guides/${guide.slug}`}
                    className="group bg-white rounded-xl border-2 border-gray-100 overflow-hidden hover:border-[#00458b] hover:shadow-xl transition-all duration-300"
                  >
                    {guide.heroImage && (
                      <div className="relative w-full h-48 overflow-hidden">
                        <img
                          src={guide.heroImage}
                          alt={guide.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 ${getCategoryColor(guide.category)}`}>
                        {guide.category}
                      </span>
                      <h3 className="font-bold text-gray-900 mb-3 group-hover:text-[#00458b] transition-colors text-lg leading-snug">
                        {guide.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 pt-3 border-t border-gray-100">
                        <FiClock className="w-4 h-4" />
                        <span>{guide.readTime} min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

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
