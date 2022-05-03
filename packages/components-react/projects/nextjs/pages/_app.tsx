import '@porsche-design-system/shared/css/styles.css';
import type { AppProps } from 'next/app';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <PorscheDesignSystemProvider>
      <Component {...pageProps} />
    </PorscheDesignSystemProvider>
  );
};

export default App;

if (typeof window !== 'undefined') {
  (window as any).componentsReady = componentsReady; // for vrt
}
