# Porsche UI Kit React
React wrappers for Porsche UI Kit web components package.  

## Install
```
// install with npm:
npm install @porsche-ui/ui-kit-react

// install with yarn:
yarn add @porsche-ui/ui-kit-react
``` 

## Usage
The React wrappers of web components can be used like every other React component (even with Typescript support). 

After adding `@porsche-ui/ui-kit-react` package to your project, import component(s) and (S)CSS.
The following setup is a standard React Scripts (Create React App) setup with SCSS support:

#### Index file
``` 
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import '@porsche-ui/ui-kit-js/dist/porsche-ui-kit/porsche-ui-kit.css';
import './index.scss';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

``` 

#### App file
``` 
import React from 'react';
import { PHeadline } from '@porsche-ui/ui-kit-react';

const App: React.FC = () => {
  return (
    <div className="App">
      <PHeadline variant="headline-1">Headline</PHeadline>
    </div>
  )
}

export default App;
```