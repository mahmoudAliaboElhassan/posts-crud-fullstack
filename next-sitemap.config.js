/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://posts-crud-fullstack.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  additionalPaths: async (config) => [
    {
      loc: "/",
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: "/posts",
      changefreq: "daily",
      priority: 0.9,
    },

    // لو عندك صفحات تانية زي /auth/login أو /dashboard زودها هنا
  ],
};
