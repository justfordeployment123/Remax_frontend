const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "RE/MAX Dubai",
  "image": "https://remaxhub.ae/logo.png",
  "description": "Leading real estate agency in Dubai offering luxury properties, residential apartments, and commercial spaces",
  "url": "https://remaxhub.ae",
  "telephone": "+971-XXXXXXXXX",
  "email": "info@remaxhub.ae",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dubai",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.2048",
    "longitude": "55.2708"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "10:00",
      "closes": "16:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "closed"
    }
  ],
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
    },
    {
      "@type": "City",
      "name": "Ajman"
    }
  ],
  "knowsAbout": [
    "Residential Real Estate",
    "Commercial Real Estate",
    "Luxury Properties",
    "Property Investment",
    "Rental Properties",
    "Off-Plan Properties",
    "Real Estate Photography",
    "Real Estate Marketing"
  ],
  "priceRange": "AED50000 - AED100000000",
  "sameAs": [
    "https://www.facebook.com/remaxhubdubai",
    "https://www.instagram.com/remaxhubdubai/",
    "https://www.linkedin.com/company/remaxhubdubai/",
    "https://www.youtube.com/@remaxhubdubai"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "250"
  }
};

const propertySchema = {
  "@context": "https://schema.org",
  "@type": "Residence",
  "name": "Property in Dubai",
  "description": "Luxury residential property in Dubai",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.2048",
    "longitude": "55.2708"
  },
  "priceRange": "AED500000+",
  "image": "https://remaxhub.ae/property.jpg",
  "realEstateAgent": {
    "@type": "RealEstateAgent",
    "name": "RE/MAX Dubai",
    "url": "https://remaxhub.ae"
  }
};

export { localBusinessSchema, propertySchema };
