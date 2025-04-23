import { isDevEnvironment } from '@/utils/isDev';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import remarkGfm from 'remark-gfm';

const getBasePath = () => {
  if (!isDevEnvironment && process.env.GITHUB_REF_NAME) {
    // Use branch name as base path expect for main where it needs to be nightly
    if (process.env.GITHUB_REF_NAME === 'main') return '/nightly';
    return `/${process.env.GITHUB_REF_NAME}`;
  }
  return '';
};

const nextConfig: NextConfig = {
  basePath: getBasePath(),
  output: 'export',
  trailingSlash: true, // Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  //skipTrailingSlashRedirect: true,
  distDir: 'dist',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
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
