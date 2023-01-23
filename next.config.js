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
    domains: ["i.imgur.com", "cdn.thebrandingjournal.com", "https://www.thebrandingjournal.com/"],
  },
  i18n: {
    locales: ["bg", /*"en"*/],
    defaultLocale: "bg",
  },
  // valid page extensions
  pageExtensions: ["page.tsx"],
};

module.exports = nextConfig;
