import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import '@porsche-ui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css';
import '@porsche-ui/utils/dist/components-overview.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
