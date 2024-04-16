import NextScript from 'next/script';
import type { PropsWithChildren } from 'react';
import { preload } from 'react-dom';
import { FooterPartials, HeaderPartials } from '../components';
import { Providers } from './providers';
import type { Metadata, Viewport } from 'next';
import {
  getComponentChunkLinks,
  getFontLinks,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-react/partials';

const { themeColor, appleWebApp, icons } = getMetaTagsAndIconLinks({
  appTitle: 'Porsche Design System - NextJS',
  format: 'js',
});

export const viewport: Viewport = {
  themeColor,
};

export const metadata: Metadata = {
  title: 'Porsche Design System - NextJS',
  appleWebApp,
  icons,
};

export default function RootLayout({ children }: PropsWithChildren<{}>): JSX.Element {
  const cdn = 'local';
  const getCdnURL = (href: string) =>
    cdn !== 'local' ? href : href.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001');

  getComponentChunkLinks({ format: 'js', components: ['heading'] }).forEach(({ href, options }) =>
    preload(getCdnURL(href), options)
  );

  getFontLinks({ format: 'js', weights: ['regular', 'semi-bold', 'bold'] }).forEach(({ href, options }) =>
    preload(getCdnURL(href), options)
  );

  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="app">{children}</div>
        </Providers>
        <HeaderPartials cdn={cdn} />
        <NextScript />
        <FooterPartials cdn={cdn} />
      </body>
    </html>
  );
}
