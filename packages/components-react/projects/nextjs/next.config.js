/** @type {import('next').NextConfig} */
const nextConfig = {
  // `next dev` would otherwise create AGENTS.md and CLAUDE.md here whenever an agent runs it.
  agentRules: false,
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
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
