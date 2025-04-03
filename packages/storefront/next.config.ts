import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import remarkGfm from 'remark-gfm';

const cdnUrl =
  process.env.NODE_ENV === 'production' ? 'https://cdn.ui.porsche.com' : 'http://localhost:8080 http://localhost:3001';

const connectUrls = [
  'https://*.algolia.net',
  'https://*.algolianet.com',
  'https://registry.npmjs.org/@porsche-design-system/components-js',
].join(' ');

const cspHeader = `
    default-src 'self' ${cdnUrl};
    frame-src https://stackblitz.com;
    style-src 'self' 'unsafe-inline' ${cdnUrl};
    script-src 'self' 'unsafe-inline' 'unsafe-eval' ${cdnUrl};
    img-src 'self' ${cdnUrl} data:;
    media-src 'self' https://porsche-design-system.github.io;
    connect-src 'self' ${connectUrls}"
`;

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
  compiler: {
    styledComponents: true,
  },
  // biome-ignore lint/suspicious/useAwait: <explanation>
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
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
