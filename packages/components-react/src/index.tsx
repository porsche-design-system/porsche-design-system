import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import '@porsche-design-system/utils/dist/visual-regression-test.css';
import { App } from './App';

ReactDOM.render(<App />, document.getElementById('root'));
