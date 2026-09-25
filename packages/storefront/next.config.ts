import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import { getBasePath } from '@/utils/getBasePath';

const basePath = getBasePath();

const nextConfig: NextConfig = {
  basePath: basePath ? `/${basePath}` : '',
  output: 'export',
  trailingSlash: true, // Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  //skipTrailingSlashRedirect: true,
  distDir: 'dist',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // The skill registry is exported as raw TypeScript, so it has to be compiled by the storefront build.
  transpilePackages: ['@porsche-design-system/skills'],
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

/**
 * Lets `next dev` answer the folder URL of an example, e.g. `/examples/patterns/header/stacked/`.
 *
 * The examples are static files in `public/examples/`, which `next dev` serves by their exact path only, while the
 * static hosts of the exported site resolve a folder to its `index.html` themselves. Rewrites are not part of a static
 * export, so this is added to the development server alone; `afterFiles` is the default, so a file that exists – a
 * medium, an `index.html` – is still served as it is.
 */
const devRewrites: NextConfig['rewrites'] = async () => [
  { source: '/examples/:path*/', destination: '/examples/:path*/index.html' },
];

// Merge MDX config with Next.js config
export default (phase: string): NextConfig =>
  withMDX(phase === PHASE_DEVELOPMENT_SERVER ? { ...nextConfig, rewrites: devRewrites } : nextConfig);
