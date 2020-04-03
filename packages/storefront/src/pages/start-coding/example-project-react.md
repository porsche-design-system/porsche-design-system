# Sample project integration react
You can find the repository of the react example project here: [Sample integration react](https://github.com/porscheui/sample-integration-react.git)

---

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
yarn add typescript @types/node @types/react @types/react-dom @types/jest

or  

npm install --save typescript @types/node @types/react @types/react-dom @types/jest  
```
* Install the Porsche Design System  

``` 
// install with yarn:
yarn add @porsche-design-system/components-react

or

// install with npm:
npm install @porsche-design-system/components-react
```

You are ready to start building your own application. The React wrappers for web components can be used like every other React 
component. 

The following setup is a standard React Scripts (Create React App) setup with SCSS support:

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
      <PHeadline variant="headline-1">Headline from PorscheDesignSystem</PHeadline>
    </div>
  );
}

export default App;
```

Run `yarn start` or `npm start` and check if the components are displayed correctly.

---

## Test the application

**Jest** uses **jsdom**. It is not yet possible to render web components via jsdom. 

To ensure your tests dont fail, we provide mocks for every Porsche Design System Component. 
They are distributed in the `@porsche-design-system/components-react/` so they dont have to be installed separately.

You have to access them in the Mock-Factory inside of the `jest.mock()` function, where the mocks follow the same naming pattern **ComponentNameMock** (eg. `PHeadlineMock`).
We have to use `require` because the mock factory doesn't allow otherwise. You can copy the `jest.mock()` function beneath and keep a mock for every component you have used. 

``` 
jest.mock('@porsche-design-system/components-react', () => {

    const {PHeadlineMock, PIconMock, PButtonMock, PButtonPureMock, PDividerMock, 
           PGridMock, PGridItemMock, PFlexMock, PFlexItemMock, PSelectWrapperMock, 
           PCheckboxWrapperMock, PRadioButtonWrapperMock, PTextareaWrapperMock, 
           PTextFieldWrapperMock, PLinkMock, PLinkPureMock, PSpinnerMock, PPaginationMock} = require('@porsche-design-system/components-react/dist/mocks/jest-Mocks');

    return ({
        PHeadline: PHeadlineMock,
        PIcon: PIconMock,
        PButton: PButtonMock,
        PButtonPure: PButtonPureMock,
        PDivider: PDividerMock,
        PGrid: PGridMock,
        PGridItem: PGridItemMock,
        PFlex: PFlexMock,
        PFlexItem: PFlexItemMock,
        PSelectWrapper: PSelectWrapperMock,
        PCheckboxWrapper: PCheckboxWrapperMock,
        PRadioButtonWrapper: PRadioButtonWrapperMock,
        PTextareaWrapper: PTextareaWrapperMock,
        PTextFieldWrapper: PTextFieldWrapperMock,
        PLink: PLinkMock,
        PLinkPure: PLinkPureMock,
        PSpinner: PSpinnerMock,
        PPagination: PPaginationMock
    });
});
```
Use this solution until **Creat React App** upgrades to a newer **jsdom** version, which hopefully
provides support for **webcomponents**. In the meantime we keep providing mocks.
 
You find detailed information on how to use mock functions in jest [here](https://jestjs.io/docs/en/mock-functions.html).
   
We also provide test examples in our example-project. You can find them in the `App.test.js`.

