import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import '@porsche-design-system/shared/css/styles.css';
import { App } from './App';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <Router>
      <PorscheDesignSystemProvider cdn="auto">
        <App />
      </PorscheDesignSystemProvider>
    </Router>
  </StrictMode>
);

(window as any).componentsReady = componentsReady; // for vrt
