import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { Canvas } from '@/components/layout/Canvas';
import { Providers } from '@/components/providers/Providers';
import { StorefrontThemeProvider } from '@/components/providers/StorefrontThemeProvider';
import { HeaderPartials } from '@/partials/HeaderPartials';
import { getMetaTagsAndIconLinks } from '@porsche-design-system/components-react/partials';

const title = 'Porsche Design System';

const { themeColor, appleWebApp, icons } = getMetaTagsAndIconLinks({
  appTitle: title,
  format: 'js',
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
  icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <base href={process.env.NEXT_PUBLIC_BASE_PATH ? `/${process.env.NEXT_PUBLIC_BASE_PATH}/` : '/'} />
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
      </body>
    </html>
  );
}
