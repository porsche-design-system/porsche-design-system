import '../styles.css';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';

function MyApp({ Component, pageProps }) {
  return (
    <PorscheDesignSystemProvider>
      <Component {...pageProps} />
    </PorscheDesignSystemProvider>
  );
}

export default MyApp;
