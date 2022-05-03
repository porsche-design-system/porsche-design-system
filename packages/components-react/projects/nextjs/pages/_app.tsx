import '@porsche-design-system/shared/css/styles.css';
import type { AppProps } from 'next/app';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import { routes } from '../routes';
import { useState } from 'react';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();
  const [selected, setSelected] = useState(router.route);

  return (
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

      <div id="app">
        <Component {...pageProps} />
      </div>
    </PorscheDesignSystemProvider>
  );
};

export default App;

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
