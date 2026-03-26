/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevents Next.js from wrapping PDS components in React.lazy boundaries during SSR bundling,
  // which would cause splitChildren() to fail detecting slot props on children.
  serverExternalPackages: ['@porsche-design-system/components-react'],
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
