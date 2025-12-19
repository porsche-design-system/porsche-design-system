import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
  useRouteLoaderData,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { getFontLinks, getIconLinks, getMetaTagsAndIconLinks } from '@porsche-design-system/components-react/partials';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { useState } from 'react';
import { routes } from '~/routes';

export async function loader() {
  return {
    headPartials: (
      <>
        {getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'React Router' })}
        {getFontLinks({ format: 'jsx', weights: ['regular', 'semi-bold', 'bold'] })}
        {getIconLinks({ format: 'jsx', icons: ['arrow-head-right', 'arrow-head-left'] })}
        {/*{getComponentChunkLinks({ format: 'jsx', components: ['button', 'link'] })}*/}
      </>
    ),
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const partials = useRouteLoaderData<typeof loader>('root');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {partials?.headPartials}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export type Theme = 'light' | 'dark' | 'auto';

export default function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>('light');
  const themes: Theme[] = ['light', 'dark', 'auto'];

  return (
    <>
      <select value={useLocation().pathname} onChange={(e) => navigate(e.target.value)} style={{ width: '200px' }}>
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

      <PorscheDesignSystemProvider>
        <div id="app" className={theme}>
          <Outlet />
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
