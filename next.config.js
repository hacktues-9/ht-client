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
  i18n: {
    locales: ["bg", /*"en"*/],
    defaultLocale: "bg",
  },
};

module.exports = nextConfig;
