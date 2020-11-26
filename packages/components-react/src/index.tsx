import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.css';
import { App } from './App';

ReactDOM.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
