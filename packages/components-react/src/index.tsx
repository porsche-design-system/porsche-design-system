import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { componentsReady, PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import '@porsche-design-system/shared/dist/css/styles.css'; // dist path is needed since package.json isn't copied
import { App } from './App';

ReactDOM.render(
  <StrictMode>
    <Router>
      <PorscheDesignSystemProvider>
        <App />
      </PorscheDesignSystemProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root')
);

(window as any).componentsReady = componentsReady; // for vrt
