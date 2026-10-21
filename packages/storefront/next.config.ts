import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import { getBasePath } from '@/utils/getBasePath';

const basePath = getBasePath();

const nextConfig: NextConfig = {
  basePath: basePath ? `/${basePath}` : '',
  output: 'export',
  trailingSlash: true, // Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  //skipTrailingSlashRedirect: true,
  distDir: 'dist',
  // `next dev` would otherwise write its own rules block into the hand-maintained AGENTS.md whenever an agent runs it.
  agentRules: false,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // These packages export raw TypeScript, so the storefront build compiles them (and `next dev` reloads them on change).
  transpilePackages: [
    '@porsche-design-system/examples-framework',
    '@porsche-design-system/examples-stories',
    '@porsche-design-system/skills',
    '@porsche-design-system/story-generator',
  ],
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    useLightningcss: true,
    // Disables light-dark() polyfill of lightningcss which is broken https://github.com/porsche-design-system/porsche-design-system/issues/4257
    lightningCssFeatures: {
      exclude: ['light-dark'],
    },
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: ['remark-gfm'],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
