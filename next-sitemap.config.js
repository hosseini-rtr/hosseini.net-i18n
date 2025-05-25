module.exports = {
  siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404"],
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
      hreflang: 'en'
    },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/fa`,
      hreflang: 'fa'
    },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/it`,
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
    ]
  }
};
