import type { AppProps } from 'next/app';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react/ssr';
import { routes } from '../routes';
import type { MouseEvent } from 'react';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();
  const [selected, setSelected] = useState(router.route);

  // global click handler for custom elements with href property
  const onContentClick = useCallback((e: MouseEvent<HTMLDivElement>): void => {
    const { href } = e.target as any;
    if (href?.startsWith('/')) {
      e.preventDefault();
      router.push(href);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Head>
        <title>Porsche Design System - NextJS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PorscheDesignSystemProvider>
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

        <div id="app" onClick={onContentClick}>
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
