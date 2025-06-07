module.exports = {
  siteUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404", "/500", "/_error", "/api/*"],
  transform: async (config, path) => {
    // Custom priority for different types of pages
    const priorities = {
      "/": 1.0,
      "/blog": 0.9,
      "/about": 0.8,
      "/contact": 0.7,
    };

    // Determine priority based on path
    let priority = 0.7;
    for (const [route, routePriority] of Object.entries(priorities)) {
      if (path.startsWith(route)) {
        priority = routePriority;
        break;
      }
    }

    // Return the transformed entry
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
      hreflang: "en",
    },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/fa`,
      hreflang: "fa",
    },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/it`,
      hreflang: "it",
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/404",
          "/500",
          "/_error",
          "/api/*",
          "/*.json$",
          "/*_buildManifest.js$",
          "/*_middlewareManifest.js$",
          "/*_ssgManifest.js$",
          "/*.js$",
        ],
      },
    ],
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`],
  },
};
