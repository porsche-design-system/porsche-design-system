# Porsche Design System React
React wrappers for Porsche Design System web components package.  

## Install
```
// install with npm:
npm install @porsche-design-system/components-react

// install with yarn:
yarn add @porsche-design-system/components-react
``` 

## Usage
The React wrappers of web components can be used like every other React component (even with Typescript support). 

After adding `@porsche-design-system/components-react` package to your project, import component(s).
The following setup is a standard React Scripts (Create React App) setup with SCSS support:

#### Index file
``` 
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

``` 

#### App file
``` 
import React from 'react';
import { PHeadline } from '@porsche-design-system/components-react';

const App: React.FC = () => {
  return (
    <div className="App">
      <PHeadline variant="headline-1">Headline</PHeadline>
    </div>
  )
}

export default App;
```

#### App.test file

To enable jest testing we provide mocks. You can access them in your jest.mock function with ComponentNameMock. 

``` 
jest.mock('@porsche-design-system/components-react', () => {
  const { PHeadlineMock } = require('@porsche-design-system/components-react');

  return({
      PHeadline: PHeadlineMock,
  });
});
```