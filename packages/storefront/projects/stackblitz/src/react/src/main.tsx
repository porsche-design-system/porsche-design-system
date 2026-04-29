import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import { Example } from './Example.tsx';

// biome-ignore lint/style/noNonNullAssertion: ok
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PorscheDesignSystemProvider>
      <Example />
    </PorscheDesignSystemProvider>
  </StrictMode>
);
