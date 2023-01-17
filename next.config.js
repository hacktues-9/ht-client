/** @type {import('next').NextConfig} */
const path = require("node:path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  /*   webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  }, */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["i.imgur.com"],
  },
  siteUrl: process.env.SITE_URL || 'https://hacktues.bg',
  generateRobotsTxt: true, 
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: '/api',
      },
      {
        userAgent: '*',
        disallow: '/admin',
      },
      {
        userAgent: '*',
        disallow: '/auth',
      },
    ],
  }
};

module.exports = nextConfig;
