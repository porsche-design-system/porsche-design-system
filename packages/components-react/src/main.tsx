import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { componentsReady } from '@porsche-design-system/components-react';
import '@porsche-design-system/shared/css/styles.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);

(window as unknown as Window & { componentsReady: () => Promise<number> }).componentsReady = componentsReady; // for vrt
(
  window as unknown as Window & { waitForComponentsReadyWithinIFrames: () => Promise<unknown[]> }
).waitForComponentsReadyWithinIFrames = async () => {
  return await Promise.all(
    Array.from(document.querySelectorAll('iframe')).map(async (iframe) => {
      const pollForComponentsReady = (resolve: (value: unknown) => void) =>
        setTimeout(() => {
          if (
            (iframe.contentWindow as unknown as Window & { componentsReady: () => Promise<number> })?.componentsReady
          ) {
            (iframe.contentWindow as unknown as Window & { componentsReady: () => Promise<number> })
              .componentsReady()
              // this solves a race condition where the html page with the pds markup is loaded async and componentsReady()
              // is called before the markup is initialized, it can resolve early with 0
              .then((res: number) => (res > 0 ? resolve(res) : pollForComponentsReady(resolve)));
          } else {
            pollForComponentsReady(resolve);
          }
        }, 0);

      return new Promise((resolve) => pollForComponentsReady(resolve));
    })
  );
};
