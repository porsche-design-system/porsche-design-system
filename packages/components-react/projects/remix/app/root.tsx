import type { MetaFunction } from '@remix-run/node';
import { LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { getFontLinks, getInitialStyles } from '@porsche-design-system/components-react/partials';
import { getSharedStyles } from '../../nextjs/styles/getSharedStyles';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Porsche Design System - Remix',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <Meta />
        <link rel="icon" href="http://localhost:3001/meta-icons/favicon-32x32.10be24507223bc4ef63effe0eb750e58.png" />

        <link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css" />
        {!process.browser && (
          <>
            {getInitialStyles({ format: 'jsx' })}
            {getFontLinks({ weights: ['regular', 'semi-bold', 'bold'], withoutTags: true })
              .map((x) => x.replace('https://cdn.ui.porsche.com/porsche-design-system', 'http://localhost:3001'))
              .map((url) => (
                <link key={url} rel="preload" href={url} as="font" type="font/woff2" crossOrigin="true" />
              ))}
            {getSharedStyles()}
          </>
        )}
      </head>
      <body>
        <PorscheDesignSystemProvider>
          <div id="app">
            <Outlet />
          </div>
        </PorscheDesignSystemProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
