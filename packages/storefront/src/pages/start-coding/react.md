# React
## Sample integration

You can find the repository of the react example project here: [Sample integration react](https://github.com/porscheui/sample-integration-react.git)

## Get the project up and running
* Clone the repository by executing <br>
`git clone https://github.com/porscheui/sample-integration-react.git`

### yarn
* Install dependencies via `yarn install`
* Run tests via `yarn test`
* Run the application via `yarn start`
* Build the application via `yarn build`

### npm
* Install dependencies via `npm install`
* Run tests via `npm test`
* Run the application via `npm start`
* Build the application via `npm run build`

---

## Reproduce on your own
To build your own application which is provided with the Porsche Design System follow these simple steps:

* Run `yarn create react-app my-app --template typescript` or `npx create-react-app my-app --template typescript` to create a directory inside the current 
folder with the initial project structure called `my-app` 
* To add TypeScript to your **Create React App**, you have to install it:
```
// install with yarn:
yarn add typescript @types/node @types/react @types/react-dom @types/jest

// install with npm:
npm install typescript @types/node @types/react @types/react-dom @types/jest
```
* Install the Porsche Design System  

``` 
// install with yarn:
yarn add @porsche-design-system/components-react

// install with npm:
npm install @porsche-design-system/components-react
```

You are ready to start building your own application.

The following project is a standard React Scripts (Create React App) setup:

### Index file
``` 
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

``` 
import React from 'react';
import { PHeadline } from '@porsche-design-system/components-react';

export function App() {
  return (
    <div className="App">
      <PHeadline variant="headline-1">Headline from Porsche Design System</PHeadline>
    </div>
  );
}

export default App;
```

Run `yarn start` or `npm start` and check if the components are displayed correctly.

---

## Test the application

**Jest** uses **jsdom** and supports ShadowDOM since Version 12.2.0.  
However, it doesn't support JavaScript modules as described in this [issue](https://github.com/jsdom/jsdom/issues/2475).  
Also, it doesn't support `CSSStyleSheet.replace()`.

As a workaround you can try to install the `construct-style-sheets-polyfill` npm package and apply it in your **setupTest.{js|ts}** file.

```tsx
// setupTest.{js|ts}

import 'construct-style-sheets-polyfill';
```

If it doesn't work or if you are using a Jest/Jsdom version which doesn't support ShadowDOM at all then you can
use the provided React testing mocks which are distributed in the `@porsche-design-system/components-react` npm package.

The mocks must only be used if the functionality of the web component is required within the test.
As we test and ensure the functionality of our web components extensively, we recommend using the mocks only as a last option.

You have to access the mocks in the Mock-Factory of the `jest.mock()` function. 

### Global Mocks

To consume the mocks you can set them up via your **setupTest.{js|ts}** file in your root folder and copy the following snippet into the setup file.

```
// setupTest.{js|ts}

jest.mock('@porsche-design-system/components-react', () => require('@porsche-design-system/components-react/mocks'));
```

```
// SingleComponent.tsx

export const SingleComponent = () => (
    <PHeadline>Some headline</PHeadline>
)
```

```
// SingleComponent.test.tsx

test('renders a headline from Porsche Design System', async () => {
    const { getByText } = render(<SingleComponent />);
    const headLineElement = getByText('Some headline');
    expect(headLineElement).toBeInTheDocument();
});
```

### Local Mocks
If you only need a single component mock you can also consume the mock directly in your test. All of our mocks are named like **p-name-mock** for example **p-headline-mock**.

```
// SingleComponent.tsx

export const SingleComponent = () => (
    <PHeadline>Some headline</PHeadline>
)
```

```
// SingleComponent.test.tsx

jest.mock('@porsche-design-system/components-react', () => require('@porsche-design-system/components-react/mocks/p-headline-mock'));

test('renders a headline from Porsche Design System', async () => {
    const { getByText } = render(<SingleComponent />);
    const headLineElement = getByText('Some headline');
    expect(headLineElement).toBeInTheDocument();
});
```

Use this solution until **Creat React App** upgrades to a newer **jsdom** version which provides support for **Web Components**.
In the meantime, we keep providing mocks.
 
You find detailed information on how to use mock functions in **Jest** [here](https://jestjs.io/docs/en/mock-functions.html).
   
We also provide test examples in our [sample integration project](https://github.com/porscheui/sample-integration-react/blob/master/src/tests/App.test.tsx).
