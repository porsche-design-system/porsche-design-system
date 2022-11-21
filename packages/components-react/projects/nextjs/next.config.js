/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nav.porsche.com',
      },
    ],
  },
};

module.exports = nextConfig;
