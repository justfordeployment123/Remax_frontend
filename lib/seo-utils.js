export const generateMetadata = (page) => {
  const baseMetadata = {
    metadataBase: new URL('https://remax.com'),
    charset: 'utf-8',
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    alternates: {
      canonical: `https://remax.com${page.path || '/'}`,
      languages: {
        'en-US': 'https://remax.com',
      },
    },
  };

  return {
    ...baseMetadata,
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://remax.com${page.path || '/'}`,
      type: page.type || 'website',
      siteName: 'RE/MAX Dubai',
      ...page.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      creator: '@remax',
    },
  };
};

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://remax.com${item.url}`
  }))
});

export const faqSchema = (questions) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map(q => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer
    }
  }))
});

export const articleSchema = (article) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "image": article.image,
  "datePublished": article.publishedDate,
  "dateModified": article.modifiedDate,
  "author": {
    "@type": "Organization",
    "name": "RE/MAX Dubai"
  },
  "publisher": {
    "@type": "Organization",
    "name": "RE/MAX Dubai",
    "logo": {
      "@type": "ImageObject",
      "url": "https://remax.com/logo.png"
    }
  }
});

export const eventSchema = (event) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.name,
  "description": event.description,
  "startDate": event.startDate,
  "endDate": event.endDate,
  "location": {
    "@type": "Place",
    "name": event.location,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "RE/MAX Dubai",
    "url": "https://remax.com"
  }
});

export const personSchema = (person) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": person.name,
  "jobTitle": person.title,
  "url": person.url,
  "image": person.image,
  "email": person.email,
  "telephone": person.phone,
  "knowsAbout": person.expertise,
  "worksFor": {
    "@type": "Organization",
    "name": "RE/MAX Dubai"
  }
});
