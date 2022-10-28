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
  ima
};

module.exports = nextConfig;
