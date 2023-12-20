import type { AppProps } from 'next/app';
import type { JSX } from 'react';
import Head from 'next/head';
import { Providers } from '../app/providers';

// NOTE: mostly unused since we are using app directory for generated pages
// this is only used for custom pages in pages directory
// but nevertheless part of final build to verify 'use client'; directive has no negative impact
const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Porsche Design System - NextJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div id="app">
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </div>
    </>
  );
};

export default App;
