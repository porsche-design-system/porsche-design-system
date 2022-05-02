import '@porsche-design-system/shared/css/styles.css';
import type { AppProps } from 'next/app';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

const NextJsApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <PorscheDesignSystemProvider>
      <Component {...pageProps} />
    </PorscheDesignSystemProvider>
  );
};

export default NextJsApp;
