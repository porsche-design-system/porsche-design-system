/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    useLightningcss: true,
    lightningCssFeatures: {
      // Disables light-dark() polyfill of lightningcss which is broken https://github.com/porsche-design-system/porsche-design-system/issues/4257
      exclude: ['light-dark'],
    },
  },
  reactStrictMode: true,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nav.porsche.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
