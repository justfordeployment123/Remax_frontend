export async function GET() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "RE/MAX Dubai",
    "description": "Leading real estate agency in Dubai offering luxury properties, residential apartments, and commercial spaces",
    "url": "https://remax.com",
    "telephone": "+971-XXXXXXXXX",
    "email": "info@remax.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dubai, UAE",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "postalCode": "00000",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.2048",
      "longitude": "55.2708"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Dubai"
      },
      {
        "@type": "City",
        "name": "Abu Dhabi"
      },
      {
        "@type": "City",
        "name": "Sharjah"
      }
    ],
    "knowsAbout": [
      "Residential Real Estate",
      "Commercial Real Estate",
      "Luxury Properties",
      "Property Investment",
      "Rental Properties"
    ],
    "sameAs": [
      "https://www.facebook.com/remaxhubdubai",
      "https://www.instagram.com/remaxhubdubai/",
      "https://www.linkedin.com/company/remaxhubdubai/",
      "https://www.linkedin.com/company/remaxhubdubai/",
    ]
  };

  return new Response(JSON.stringify(structuredData), {
    headers: {
      "Content-Type": "application/ld+json",
    },
  });
}
