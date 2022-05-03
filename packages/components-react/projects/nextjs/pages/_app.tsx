import '@porsche-design-system/shared/css/styles.css';
import type { AppProps } from 'next/app';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <PorscheDesignSystemProvider>
      {/* select doesn't have any functionality, yet but is crucial to rendering an identical page in vrt */}
      <select>
        <option disabled value="">
          Select a page
        </option>
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
