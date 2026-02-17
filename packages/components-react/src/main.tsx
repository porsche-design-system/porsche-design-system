import { componentsReady } from '@porsche-design-system/components-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { App } from './App';
import { Providers } from './Providers.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <Router>
        <App />
      </Router>
    </Providers>
  </StrictMode>
);

(window as any).componentsReady = componentsReady; // for vrt
(window as any).waitForComponentsReadyWithinIFrames = async () => {
  return await Promise.all(
    Array.from(document.querySelectorAll('iframe')).map(async (iframe) => {
      const pollForComponentsReady = (resolve: any) =>
        setTimeout(() => {
          if ((iframe.contentWindow as any)?.componentsReady) {
            (iframe.contentWindow as any)
              .componentsReady()
              // this solves a race condition where the html page with the pds markup is loaded async and componentsReady()
              // is called before the markup is initialized, it can resolve early with 0
              .then((res: any) => (res > 0 ? resolve(res) : pollForComponentsReady(resolve)));
          } else {
            pollForComponentsReady(resolve);
          }
        }, 0);

      return new Promise((resolve) => pollForComponentsReady(resolve));
    })
  );
};
