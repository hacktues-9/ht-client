module.exports = {
  siteUrl: process.env.SITE_URL || "https://hacktues.bg",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/api",
      },
      {
        userAgent: "*",
        disallow: "/admin",
      },
      {
        userAgent: "*",
        disallow: "/auth",
      },
    ],
  },
};
