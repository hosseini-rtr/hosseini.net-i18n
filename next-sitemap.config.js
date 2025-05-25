module.exports = {
  siteUrl: "https://hosseini-rtr.ir",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404"],
  alternateRefs: [
    {
      href: 'https://hosseini-rtr.ir/en',
      hreflang: 'en'
    },
    {
      href: 'https://hosseini-rtr.ir/fa',
      hreflang: 'fa'
    },
    {
      href: 'https://hosseini-rtr.ir/it',
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
      'https://hosseini-rtr.ir/sitemap.xml'
    ]
  }
};
