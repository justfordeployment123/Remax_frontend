
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static-images.remax.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'd3juk9vapto0h.cloudfront.net',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  compress: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'geolocation=(), microphone=(), camera=()'
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-src 'self'; object-src 'none'"
        }
      ]
    },
    {
      source: '/robots.txt',
      headers: [
        {
          key: 'Content-Type',
          value: 'text/plain'
        }
      ]
    },
    {
      source: '/sitemap.xml',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/xml'
        }
      ]
    }
  ],
  redirects: async () => [
    {
      source: '/index.html',
      destination: '/',
      permanent: true,
    },
  ],
}

module.exports = nextConfig
