export default function SEO() {
  return (
    <>
      {/* Canonical URL - will be set per page via metadata */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* Meta Tags for Mobile */}
      <meta name="msapplication-TileColor" content="#1A3668" />
      <meta name="theme-color" content="#1A3668" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="RE/MAX Dubai" />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      
      {/* Additional Meta Tags */}
      <meta name="google-site-verification" content="your-google-verification-code" />
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Schema.org Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RE/MAX Dubai",
            "url": "https://remax.com",
            "logo": "https://remax.com/logo.png",
            "description": "Leading real estate agency in Dubai offering luxury properties, investment opportunities, and expert advisory services.",
            "sameAs": [
              "https://www.facebook.com/remaxhubdubai",
              "https://www.instagram.com/remaxhubdubai/",
              "https://www.linkedin.com/company/remaxhubdubai/",
              "https://www.youtube.com/@remaxhubdubai"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+971-4-XXXXXXX",
              "contactType": "Sales"
            },
            "areaServed": "AE",
            "foundingDate": "2020"
          })
        }}
      />
      
      {/* Schema.org LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "RE/MAX Dubai",
            "image": "https://remax.com/logo.png",
            "description": "Premium real estate brokerage in Dubai",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Dubai, UAE",
              "addressLocality": "Dubai",
              "addressCountry": "AE"
            },
            "priceRange": "AED 500000 - AED 100000000+"
          })
        }}
      />
      
      {/* BreadcrumbList for Navigation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://remax.com"
              }
            ]
          })
        }}
      />
    </>
  )
}
