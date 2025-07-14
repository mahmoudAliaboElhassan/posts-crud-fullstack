/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://posts-crud-fullstack.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Try setting this to false first
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
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
};
