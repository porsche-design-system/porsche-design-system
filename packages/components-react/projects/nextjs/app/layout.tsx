import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { getSharedStyles } from '../styles/getSharedStyles';
import {
  getBrowserSupportFallbackScript,
  getCookiesFallbackScript,
  getDSRPonyfill,
  getFontLinks,
  getInitialStyles,
} from '@porsche-design-system/components-react/partials';
import NextScript from 'next/script';
import { Select } from '../components/Select';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Porsche Design System - NextJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.5638ae59e85b68cac7febfffe555dbe7.png" />

        {getInitialStyles({ format: 'jsx' })}
        <link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css" />
        {Array.from(getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }).matchAll(/https:\/\/[a-z0-9./-]+/g))
          .map(([url]) => url.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'))
          .map((url) => (
            <link key={url} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="" />
          ))}
        {getSharedStyles()}
      </head>
      <body>
        <PorscheDesignSystemProvider>
          <Select />
          {children}
        </PorscheDesignSystemProvider>
        <NextScript />
        {getDSRPonyfill({ format: 'jsx' })}
        {getBrowserSupportFallbackScript({ format: 'jsx' })}
        {getCookiesFallbackScript({ format: 'jsx' })}
      </body>
    </html>
  );
}
