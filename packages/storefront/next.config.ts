import createMDX from '@next/mdx';
import { remarkPlugins } from '@porsche-design-system/docs-components/mdx-options';
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
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // These workspaces are exported as raw TypeScript, so they have to be compiled by the storefront build.
  transpilePackages: ['@porsche-design-system/skills', '@porsche-design-system/docs-components'],
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

// Shared with the Markdown build of `@porsche-design-system/docs-components`, so both outputs parse a page the same way.
const withMDX = createMDX({
  options: {
    remarkPlugins,
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
