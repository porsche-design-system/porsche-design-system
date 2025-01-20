import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
  basePath:
    process.env.NODE_ENV === 'production' ? (process.env.GITHUB_REF_NAME ? `/${process.env.GITHUB_REF_NAME}` : '') : '',
  output: 'export',
  trailingSlash: true, // Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  //skipTrailingSlashRedirect: true,
  distDir: 'dist',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
