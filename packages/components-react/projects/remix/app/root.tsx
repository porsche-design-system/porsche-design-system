import type { MetaFunction } from '@remix-run/node';
import { LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useNavigate } from '@remix-run/react';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { HeadPartials } from '~/head-partials.server';
import { BodyPartials } from '~/body-partials.server';
import type { MouseEvent } from 'react';
import { useCallback } from 'react';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Porsche Design System - Remix',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App(): JSX.Element {
  const navigate = useNavigate();

  // global click handler for custom elements with href property
  const onContentClick = useCallback((e: MouseEvent<HTMLDivElement>): void => {
    const { href } = e.target as any;
    if (href?.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <html lang="en">
      <head>
        <Meta />
        {HeadPartials && <HeadPartials />}
      </head>
      <body>
        <PorscheDesignSystemProvider>
          <div id="app" onClick={onContentClick}>
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
