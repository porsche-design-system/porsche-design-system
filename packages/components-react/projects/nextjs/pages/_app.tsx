import type { AppProps } from 'next/app';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { routes } from '../routes';
import { type JSX, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// NOTE: technically unused since we are using app directory
// but nevertheless part of final build to verify 'use client'; directive has no negative impact
const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();
  const [selected, setSelected] = useState(router.route);

  return (
    <>
      <Head>
        <title>Porsche Design System - NextJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PorscheDesignSystemProvider cdn="auto">
        <select
          value={selected}
          onChange={(e) => {
            const { value } = e.target;
            setSelected(value);
            router.push(value);
          }}
        >
          <option disabled value="">
            Select a page
          </option>
          {routes.map((route) => (
            <option key={route.path} value={route.path} children={route.name} />
          ))}
        </select>

        <div id="app">
          <Component {...pageProps} />
        </div>
      </PorscheDesignSystemProvider>
    </>
  );
};

export default App;

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
