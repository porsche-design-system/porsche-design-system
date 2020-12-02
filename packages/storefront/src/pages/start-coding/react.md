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
Also, it doesn't support `CSSStyleSheet.replace()`, `Intersection Observer`, `Element.prototype.scrollTo` and others.

As a workaround we provide a polyfill as part of the `@porsche-design-system/components-react` package.

To apply the polyfill, simply import it in your **setupTest.{js|ts}** file.

```tsx
// setupTest.{js|ts}

import '@porsche-design-system/components-react/jsdom-polyfill';
```

```tsx
// SingleComponent.tsx

import React, { useState } from 'react';
import { PTabsBar } from '@porsche-design-system/components-react';

export const SingleComponent = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <>
      <PTabsBar
        activeTabIndex={activeTab}
        onTabChange={(e) => {
          setActiveTab(e.detail.activeTabIndex);
        }}
        data-testid="host"
      >
        <button data-testid="button1">Some label</button>
        <button data-testid="button2">Some label</button>
        <button data-testid="button3">Some label</button>
      </PTabsBar>
      <div data-testid="debug">{`Active Tab: ${activeTab + 1}`}</div>
    </>
  );
}
```

```tsx
// SingleComponent.test.tsx

import { componentsReady } from '@porsche-design-system/components-js';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders Tabs Bar from Porsche Design System and uses its events', async () => {
  const { getByTestId } = render(<SingleComponent />);

  await componentsReady(); // we need to make sure Design System components have initialized

  const debug = getByTestId('debug');
  const button1 = getByTestId('button1');
  const button2 = getByTestId('button2');
  const button3 = getByTestId('button3');

  expect(debug.innerHTML).toBe('Active Tab: 1');

  userEvent.click(button2);
  expect(debug.innerHTML).toBe('Active Tab: 2');

  userEvent.click(button3);
  expect(debug.innerHTML).toBe('Active Tab: 3');

  userEvent.click(button1);
  expect(debug.innerHTML).toBe('Active Tab: 1');
});
```

### Additional information when using react-testing-library

If you try to submit a form via button click you will encounter issues with `react-testing-library` and `jsdom`.
It is simply not provided (see [Github Issue 755](https://github.com/testing-library/react-testing-library/issues/755)
and [Github Issue 1937](https://github.com/jsdom/jsdom/issues/1937)).

If you have to test a form submit use `Simulate`.

```
import { Simulate } from 'react-dom/test-utils';

const button = getByText('PDSButton');

Simulate.submit('button');
```

You are not able to use `getByRole` to query Porsche-Design-System components when using testing-library.
Testing-library is taking default `roles` in consideration. For example  a `<button>` gets the role `button` without explicitly setting the attribute.
To achieve this it uses the (Accessibility Tree)[https://developer.mozilla.org/en-US/docs/Glossary/Accessibility_tree], see (documentation) [https://testing-library.com/docs/guide-which-query/].

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
