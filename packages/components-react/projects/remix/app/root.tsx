import type { MetaFunction } from '@remix-run/node';
import { LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { HeadPartials } from '~/head-partials.server';
import { BodyPartials } from '~/body-partials.server';

export const meta: MetaFunction = () => ([
  { charset: 'utf-8' },
  { title: 'Porsche Design System - Remix' },
  { viewport: 'width=device-width,initial-scale=1' },
]);

export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <Meta />
        {HeadPartials && <HeadPartials />}
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
        {BodyPartials && <BodyPartials />}
      </body>
    </html>
  );
}

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
