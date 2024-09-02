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
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
