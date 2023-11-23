import { type JSX, useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation, useNavigate } from '@remix-run/react';
import { componentsReady, PorscheDesignSystemProvider, type Theme } from '@porsche-design-system/components-react/ssr';
import { HeadPartials } from '~/head-partials.server';
import { BodyPartials } from '~/body-partials.server';
import { routes } from '~/routes';

export const meta: MetaFunction = () => [
  { charset: 'utf-8' },
  { title: 'Porsche Design System - Remix' },
  {
    name: "viewport",
    content: "width=device-width,initial-scale=1",
  },
];

export default function App(): JSX.Element {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>('light');
  const themes: Theme[] = ['light', 'dark', 'auto'];

  return (
    <html lang="en">
      <head>
        <Meta />
        {HeadPartials && <HeadPartials />}
      </head>
      <body>
        <select value={useLocation().pathname} onChange={(e) => navigate(e.target.value)}>
          <option disabled value="">
            Select a page
          </option>
          {routes.map((route, i) => (
            <option key={i} value={route.path} children={route.name} />
          ))}
        </select>

        <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
          {themes.map((item) => (
            <option key={item} value={item} children={item} />
          ))}
        </select>

        <PorscheDesignSystemProvider theme={theme}>
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
