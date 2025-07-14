/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://posts-crud-fullstack.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Set to false to avoid issues
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*", "/admin/*", "/_next/*"], // Exclude API routes and admin pages
  outDir: "./public", // Ensure output goes to public directory

  // Add proper XML formatting
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async (config) => [
    {
      loc: "/",
      changefreq: "daily",
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: "/posts",
      changefreq: "daily",
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
  ],

  // Add robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: ["https://posts-crud-fullstack.vercel.app/sitemap.xml"],
  },
};
