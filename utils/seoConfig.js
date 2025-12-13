/**
 * SEO Metadata Utility for RE/MAX Dubai
 * Provides consistent metadata configuration across all pages
 */

export const seoConfig = {
  baseUrl: 'https://remax.com',
  siteName: 'RE/MAX Dubai',
  defaultImage: 'https://remax.com/og-image.png',
  twitterHandle: '@remaxdubai',
  locale: 'en_US',
}

/**
 * Generate metadata for a page
 */
export function generateMetadata({
  title,
  description,
  path = '/',
  image = seoConfig.defaultImage,
  keywords = [],
  type = 'website',
  robots = 'index, follow',
}) {
  const url = `${seoConfig.baseUrl}${path}`
  
  return {
    metadataBase: new URL(seoConfig.baseUrl),
    title,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    robots,
    authors: [{ name: 'RE/MAX Dubai' }],
    creator: 'RE/MAX Dubai',
    publisher: 'RE/MAX Dubai',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title,
      description,
      type,
      locale: seoConfig.locale,
      url,
      siteName: seoConfig.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: seoConfig.twitterHandle,
      image,
    },
    canonical: url,
  }
}

/**
 * Generate structured data for different page types
 */
export function generateSchemaData(type, data = {}) {
  const baseSchema = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'organization':
      return {
        ...baseSchema,
        '@type': 'Organization',
        name: 'RE/MAX Dubai',
        url: seoConfig.baseUrl,
        logo: `${seoConfig.baseUrl}/logo.png`,
        description: 'Leading real estate agency in Dubai offering luxury properties, investment opportunities, and expert advisory services.',
        sameAs: [
          'https://www.facebook.com/remaxhubdubai',
          'https://www.instagram.com/remaxhubdubai/',
          'https://www.linkedin.com/company/remaxhubdubai/',
          'https://www.youtube.com/@remaxhubdubai',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+971-4-XXXXXXX',
          contactType: 'Sales',
        },
        areaServed: 'AE',
      }

    case 'property':
      return {
        ...baseSchema,
        '@type': 'RealEstateAgent',
        name: 'RE/MAX Dubai',
        url: seoConfig.baseUrl,
        telephone: '+971-4-XXXXXXX',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
        ...data,
      }

    case 'breadcrumb':
      return {
        ...baseSchema,
        '@type': 'BreadcrumbList',
        itemListElement: data.items || [],
      }

    case 'faq':
      return {
        ...baseSchema,
        '@type': 'FAQPage',
        mainEntity: data.items?.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })) || [],
      }

    default:
      return baseSchema
  }
}

/**
 * Create breadcrumb items
 */
export function createBreadcrumbs(items) {
  return items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }))
}
