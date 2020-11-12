# React

## Quick start
To build your own application with the **React** components of Porsche Design System, follow these steps:

* Follow the instructions at [Introduction](#/start-coding/introduction) to get the required npm package
* Run `yarn create react-app my-app --template typescript` or `npx create-react-app my-app --template typescript` to create a directory inside the current 
folder with the initial project structure called `my-app` 
* To add TypeScript to your **Create React App**, you have to install it:
```shell script
// install with yarn:
yarn add typescript @types/node @types/react @types/react-dom @types/jest

// install with npm:
npm install typescript @types/node @types/react @types/react-dom @types/jest
```

* Install the Porsche Design System

```shell script
// install with yarn:
yarn add @porsche-design-system/components-react

// install with npm:
npm install @porsche-design-system/components-react
```

You are ready to start building your own application.

The following project is a standard React (Create React App) setup:

### Index file
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
``` 

### App file

Change your App file to use at least one Porsche Design System Component, for example:

```tsx
import React from 'react';
import { PHeadline } from '@porsche-design-system/components-react';

export const App = (): JSX.Element => (
  <div className="App">
    <PHeadline variant="headline-1">Headline from Porsche Design System</PHeadline>
  </div>
);
```

Run `yarn start` or `npm start` and check if the components are displayed correctly.

## Test the application

**Jest** uses **jsdom** and supports ShadowDOM since Version 12.2.0.  
However, it doesn't support JavaScript modules as described in this [issue](https://github.com/jsdom/jsdom/issues/2475).  
Also, it doesn't support `CSSStyleSheet.replace()`.

As a workaround we provide a polyfill as part of the `@porsche-design-system/components-react` package.

To apply the polyfill, simply import it in your **setupTest.{js|ts}** file.

```tsx
// setupTest.{js|ts}

import '@porsche-design-system/components-react/jsdom-polyfill';
```

```tsx
// SingleComponent.tsx

export const SingleComponent = (): JSX.Element => (
  <PHeadline>Some headline</PHeadline>
)
```

```tsx
// SingleComponent.test.tsx
test('renders a headline from Porsche Design System', async () => {
  const { getByText } = render(<SingleComponent />);
  const headLineElement = getByText('Some headline');
  expect(headLineElement).toBeInTheDocument();
});
```
   
We also provide test examples in our [sample integration project](https://github.com/porscheui/sample-integration-react/blob/master/src/tests/App.test.tsx).

## Advanced usage

### Prefixing

A way of preventing conflicts is by using a unique custom prefix for the components.  
You can create components with your prefix with the provided `getPrefixedComponents`
function. Just provide the desired prefix as first parameter as a string.  
It will return an object with components that will render with the provided prefix.
The object keys are the component names in upper camel-case, without the prefix.  
Keep in mind. that prefixed versions only work with components that use shadow root. This means, that if you
do use prefixes, you can't use `p-grid`, `p-grid-item`, `p-flex` or `p-flex-item`.

Caution: `getPrefixedComponents` needs to be deep imported. For usage of the
unprefixed components the web components will be defined without a prefix
automatically. That would also happen, if we would provide `getPrefixedComponents`
components also within the same barrel export. This way we can ensure, that
only the prefixed web components are getting defined.

```tsx
import React from 'react';
import { getPrefixedComponents } from '@porsche-design-system/components-react/prefixed-components';

const { PHeadline } = getPrefixedComponents({ prefix: 'sample-prefix' });

export const App = (): JSX.Element => (
  <div className="App">
    <PHeadline variant="headline-1">Headline from Porsche Design System</PHeadline>
  </div>
);
```

In the example the `PHeadline` component will render as `<sample-prefix-p-headline>`.
We recommend to call `getPrefixedComponents` only once in your app and import it from
there, that you can change the prefix in a single place.

```tsx
// PorscheDesignSystem.ts
import { getPrefixedComponents } from '@porsche-design-system/components-react/prefixed-components';
export const PorscheDesignComponents = getPrefixedComponents({ prefix: 'sample-prefix' });
```

```tsx
// SingleComponent.tsx
import { PorscheDesignComponents } from './PorscheDesignSystem';
const { PHeadline } = PorscheDesignComponents;

export const SingleComponent = (): JSX.Element => (
  <PHeadline>Some headline</PHeadline>
)
```

## Sample integration
We provide a public Github repository with a basic sample project setup to show how it is managed in real code.
You can find the repository of the React example project here: [Sample integration React](https://github.com/porscheui/sample-integration-react)

### Get the project up and running
* Clone the repository by executing  
`git clone https://github.com/porscheui/sample-integration-react.git`
* Follow the installation guidelines in the README.md file
