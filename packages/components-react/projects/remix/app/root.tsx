import globalStyles from '@porsche-design-system/components-react/index.css';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { type JSX } from 'react';
import { HeadPartials } from '~/head-partials.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: globalStyles }];

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'Porsche Design System - Remix' },
  {
    name: 'viewport',
    content: 'width=device-width,initial-scale=1',
  },
];

export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {HeadPartials && <HeadPartials />}
      </head>
      <body style={{ colorScheme: 'light dark' }}>
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

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
