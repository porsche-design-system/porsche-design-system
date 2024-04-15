/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nav.porsche.com',
      },
      {
        protocol: 'https',
        hostname: 'porsche-design-system.github.io',
      },
    ],
  },
};

module.exports = nextConfig;
