export default function Canonical() {
  return (
    <>
      <link rel="canonical" href="https://remax.com" />
      <link rel="alternate" hrefLang="en" href="https://remax.com" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#1A3668" />
      <meta name="theme-color" content="#1A3668" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RE/MAX Dubai",
            "url": "https://remax.com",
            "logo": "https://remax.com/logo.png",
            "description": "Leading real estate agency in Dubai",
            "sameAs": [
              "https://www.facebook.com/remax",
              "https://www.instagram.com/remax",
              "https://www.linkedin.com/company/remax",
              "https://www.twitter.com/remax"
            ]
          })
        }}
      />
    </>
  )
}
