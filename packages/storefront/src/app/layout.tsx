import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { getMetaTagsAndIconLinks } from '@porsche-design-system/components-react/partials';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { Canvas } from '@/components/layout/Canvas';
import { Providers } from '@/components/providers/Providers';
import { StorefrontThemeProvider } from '@/components/providers/StorefrontThemeProvider';
import { HeaderPartials } from '@/partials/HeaderPartials';
import { getBasePath } from '@/utils/getBasePath';
import { isDevEnvironment } from '@/utils/isDev';

const title = 'Porsche Design System';

const { themeColor, appleWebApp, icons } = getMetaTagsAndIconLinks({
  appTitle: title,
  format: 'js',
  ogImage: false, // Custom og:image added below
});

/* injects meta theme-color. */
export const viewport: Viewport = {
  themeColor,
};

/* injects favicon, apple touch icons, android touch icons, etc. */
export const metadata: Metadata = {
  title,
  description:
    'Find all the fundamental UXI guidelines and pattern-based web components to build brand driven, consistent and intuitive designs for digital Porsche products.',
  appleWebApp,
  icons: isDevEnvironment ? undefined : icons,
};

const getCSPMetaTag = (): ReactNode => {
  const cdnUrl = isDevEnvironment ? 'http://localhost:3000 http://localhost:3001' : 'https://cdn.ui.porsche.com';

  const connectUrls = [
    'https://*.algolia.net',
    'https://*.algolianet.com',
    'https://registry.npmjs.org/@porsche-design-system/components-js',
    'https://jsonplaceholder.typicode.com/users',
  ].join(' ');

  return (
    <meta
      httpEquiv="Content-Security-Policy"
      content={`
      default-src 'self' ${cdnUrl};
      style-src 'self' 'unsafe-inline' ${cdnUrl};
      script-src 'self' 'unsafe-inline' 'unsafe-eval' ${cdnUrl};
      img-src 'self' ${cdnUrl} data:;
      media-src 'self' https://porsche-design-system.github.io;
      frame-src 'self' https://porsche-design-system.github.io;
      connect-src 'self' ${connectUrls}`}
    />
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = getBasePath();

  return (
    <html lang="en" className="auto">
      <head>
        <base href={basePath ? `/${basePath}/` : '/'} />
        {getCSPMetaTag()}
        <meta property="og:image" content="/assets/og-image.png" />
        <meta property="og:image:alt" content="Porsche Wordmark" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Porsche Design System" />
        <meta
          property="og:description"
          content="Find all the fundamental UXI guidelines and pattern-based web components to build brand driven, consistent and intuitive designs for digital Porsche products."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Porsche Design System" />
        <meta
          name="twitter:description"
          content="Find all the fundamental UXI guidelines and pattern-based web components to build brand driven, consistent and intuitive designs for digital Porsche products."
        />
        <meta name="twitter:image" content="/assets/og-image.png" />
        <HeaderPartials />
      </head>
      <body>
        <StorefrontThemeProvider>
          <Providers>
            <Canvas>{children}</Canvas>
          </Providers>
        </StorefrontThemeProvider>
        {/* Framebuster script see: https://en.wikipedia.org/wiki/Framekiller?utm_source=chatgpt.com */}
        <Script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: ok
          dangerouslySetInnerHTML={{
            __html: `self===top?document.getElementsByTagName('body')[0].style.display='block':top.location=self.location;`,
          }}
        />
      </body>
    </html>
  );
}
