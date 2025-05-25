module.exports = {
  siteUrl: `https://${process.env.NEXT_PUBLIC_BASE_URL}/`,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404"],
  alternateRefs: [
    {
      href: `https://${process.env.NEXT_PUBLIC_BASE_URL}/en`,
      hreflang: 'en'
    },
    {
      href: `https://${process.env.NEXT_PUBLIC_BASE_URL}/fa`,
      hreflang: 'fa'
    },
    {
      href: `https://${process.env.NEXT_PUBLIC_BASE_URL}/it`,
      hreflang: 'it'
    }
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404']
      }
    ],
    additionalSitemaps: [
      `https://${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
    ]
  }
};
