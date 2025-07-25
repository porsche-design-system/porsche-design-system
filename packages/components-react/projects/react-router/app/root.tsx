import {isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData} from 'react-router';

import type {Route} from './+types/root';
import './app.css';
import {componentsReady, PorscheDesignSystemProvider} from '@porsche-design-system/components-react/ssr';
import {
  getBrowserSupportFallbackScript,
  getCookiesFallbackScript,
  getFontFaceStyles,
  getFontLinks,
  getIconLinks,
  getInitialStyles,
  getMetaTagsAndIconLinks
} from '@porsche-design-system/components-js/partials';

export async function loader() {
  return {
    headPartials: (
      <>
        {getMetaTagsAndIconLinks({ format: 'jsx', appTitle: 'React Router' })}
        {getInitialStyles({ format: 'jsx' })}
        {getFontFaceStyles({ format: 'jsx' })}
        {getFontLinks({ format: 'jsx', weights: ['regular', 'semi-bold', 'bold'] })}
        {getIconLinks({ format: 'jsx', icons: ['arrow-head-right', 'arrow-head-left'] })}
      </>
    ),
    bodyPartials: (
      <>
        {getBrowserSupportFallbackScript({ format: 'jsx' })}
        {getCookiesFallbackScript({ format: 'jsx' })}
      </>
    ),
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const partials = useLoaderData<typeof loader>();

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
        {partials?.bodyPartials}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div id="app">
      <PorscheDesignSystemProvider>
        <Outlet />
      </PorscheDesignSystemProvider>
    </div>
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
